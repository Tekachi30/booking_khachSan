const db = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Admin = db.admin;
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const loginAmin = async (req, res) => {
    try {
        const {account, password} = req.body;
        const exsitAdmin = await Admin.findOne({where:{account: account}});
        if(exsitAdmin){
            // const ismatch = await bcrypt.compare(password, exsitAdmin.password);
            // if(!ismatch){
            //     return res.status(201).json({message: `Mật khẩu nhập vào sai ${exsitAdmin.password} vs ${password}`});
            // }else{
                // Tạo JWT
                const token = jwt.sign({
                    adminId: exsitAdmin.id
                }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRES_IN,
                });
                res.status(200).json({
                    account: exsitAdmin.account,
                    token
                })
            //}
            
        }else{
            return res.status(201).json({message: 'Tài khoản sai hoặc không tồn tại'});
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    loginAmin,
}