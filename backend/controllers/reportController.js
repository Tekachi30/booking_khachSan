const db = require("../models");
const Report = db.report;
const User = db.User;

const getReport = async (req, res) => {
    try {
        const report = await Report.findAll();
        res.json(report);
    } catch (error) {
        console.log(error);
    }
}

const addReport = async (req, res) => {
    const iduser = req.query.id;
    const {comment_report} = req.body;
    const exsitUser = await User.findByPk(iduser);
    if(exsitUser){
        try {
            const report = await Report.create({
                comment_report: comment_report
            })
            return res.status(200).json({ message:"Thêm báo cáo thành công."});
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(404).json({ message:"Tài khoản không tồn tại."});
    }
}

module.exports = {
    getReport,
    addReport,
}