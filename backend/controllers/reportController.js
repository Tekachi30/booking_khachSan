const db = require("../models");
const Report = db.report_hotel;
const User = db.User;
const sequelize = require('sequelize');
const Op  = sequelize.Op

const getReport = async (req, res) => {
    try {
        const report = await Report.findAll({
          where:{id_hotel:id},
          include:[{
              model: Hotel, attributes: ['id_owner','name_hotel'],
              model: Owner, attributes: ['id','fullname'],
          }]
        });
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
                comment_report: comment_report,
                id_user: iduser
            })
            return res.status(200).json({ message:"Thêm báo cáo thành công."});
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(404).json({ message:"Tài khoản không tồn tại."});
    }
}

const searchReport = async(req,res)=>
{
  try {
    const {search}= req.body
    const result = await Report.findAll(
    {
      where: {
        id_hotel: {
          [Op.like]: `%${search}%`
        }
      }
    }
    )
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getReport,
    addReport,
    searchReport
}