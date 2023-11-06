const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN



const getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({
          message: `Không tìm thấy user id ${userId}.`
        });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({
        message: "Xảy ra lỗi khi tìm user id " + userId
      });
    }
  };


const register = async (req, res) => {
    try {
        const {account, fullname, address, phone, sex, password, email} = req.body;
        const exsitEmail = await User.findOne({where:{email: email}});
        const exsitAccount = await User.findOne({where:{account: account}});
        if(!exsitAccount){
          if(!exsitEmail){
            let salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt);
            await User.create({
              account:account,
              fullname:fullname,
              address:address,
              phone:phone,
              sex:sex,
              password:hash,
              email:email,
              isactive:true
            })
            return res.status(200).json({messsage: 'Đăng ký thành công'});
          }else{
            return res.status(400).json({messsage: 'Email đã tồn tại'});
          }
        }else{
          return res.status(400).json({messsage: 'Tên tài khoản đã được sử dụng'});
        }
        
    } catch (error) {
        console.log(error);
    }
}

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const {
      fullname,
      address,
      phone,
      email,
      password
    } = req.body;
   // Mã hóa mật khẩu
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({
          message: `Không tìm thấy user id ${userId}.`
        });
      } else {
        await user.update({
          fullname: fullname,
          address: address, 
          phone: phone, 
          email: email,
          password : hashedPassword,
        });
  
        res.status(200).json({
          message: `Cập nhật thông tin với user id ${userId} thành công.`
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const exsitUser = await User.findOne({where:{email: email}});
        if(exsitUser){
            const ismatch = await bcrypt.compare(password, exsitUser.password);
            if(!ismatch){

            }
            // Tạo JWT
            const token = jwt.sign({
                userId: exsitUser.id
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
            res.status(200).json({
                username: exsitUser.username,
                email: exsitUser.email,
                avatar_url: exsitUser.avatar_url,
                token
            })
        }else{
            return res.status(400).json({messsage: 'Tài khoản không tồn tại'});
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getUser,
    getUserById,
    updateUserById,
    register,
    login
  };