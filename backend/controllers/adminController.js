const db = require('../models');
const Admin = db.admin;

const loginAmin = async (req, res) => {
    try {
        const {account, password} = req.body;
        const exsitAdmin = await Admin.findOne({where:{account: account}});
        if(exsitAdmin){
            const ismatch = await bcrypt.compare(password, exsitAdmin.password);
            if(!ismatch){
                res.status(400).json({messsage: 'Tài khoản không tồn tại'});
            }
            // Tạo JWT
            const token = jwt.sign({
                adminId: exsitAdmin.id
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
            res.status(200).json({
                account: exsitAdmin.account,
                password: exsitAdmin.password,
                token
            })
        }else{
          res.status(400).json({messsage: 'Tài khoản không tồn tại'});
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    loginAmin,
}