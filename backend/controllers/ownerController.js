const db = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();
const Owner = db.owner;

const getOwner = async (req, res) => {
    try {
        const owner = await Owner.findAll();
        res.json(owner);
    } catch (error) {
        console.log(error);
    }
}

const addOwner = async (req, res) => {
    try {
        const {account, fullname, address, phone, password, email} = req.body;
        const exsitEmail = await Owner.findOne({where:{email: email}});
        const exsitAccount = await Owner.findOne({where:{account: account}});
        if(!exsitAccount){
            if(!exsitEmail){
              let salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(password,salt);
              await Owner.create({
                account:account,
                fullname:fullname,
                address:address,
                phone:phone,
                password:hash,
                email:email,
                isactive:true
              })
              return res.status(200).json({messsage: 'Đăng ký chủ khách sạn thành công'});
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

const loginOwner = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}

const updateOwner = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const {fullname, address, phone, password, email} = req.body;
        const exsitOnwer = await Owner.findByPk(ownerId);
        const exsitEmail = await Owner.findOne({where:{email: email}});
        if(exsitOnwer){
          let salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password,salt);
          exsitOnwer.fullname = fullname,
          exsitOnwer.address = address,
          exsitOnwer.phone = phone,
          exsitOnwer.password = hash,
          exsitOnwer.email = email
          await exsitOnwer.save();
          return res.status(200).json({messsage: 'Cập nhật chủ khách sạn thành công.'});
        }else{
          return res.status(400).json({messsage: 'Tài khoản không tồn tại.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteOwner = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitOnwer = await Owner.findByPk(id);
        if(exsitOnwer){
            await exsitOnwer.destroy();
            return res.status(200).json({messsage: 'Tên tài khoản đã được sử dụng'});
        }else{
            return res.status(400).json({messsage: 'Xóa thành công.'});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getOwner,
    loginOwner,
    addOwner,
    updateOwner,
    deleteOwner,
};