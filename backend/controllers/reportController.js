const db = require("../models");
const Report = db.report_hotel;
const User = db.User;
const Hotel = db.hotel;
const Owner = db.owner;
const sequelize = require('sequelize');
const Op  = sequelize.Op

const getReport = async (req, res) => {
    try {
      const id = req.params.id;
      const report = await Report.findAll({
          where:{id_hotel:id},
          include:[
            {model: Hotel, attributes: []},
            {model: User, attributes: []}
          ]
        });
        res.json(report);
    } catch (error) {
        console.log(error);
    }
}

const addReport = async (req, res) => {
    try {
      const id = req.params.id;
      const {id_hotel , comment_report} = req.body;
      const existUser = User.findByPk(id);
      if(!existUser){
        return res.status(201).json({message: 'Không tìm thấy user'});
      }else{
        await report_hotel.create({
          comment_report: comment_report,
          id_hotel: id_hotel,
          id_user: id,
        });
        return res.status(200).json({message: 'Báo cáo thành công'});
      }
    } catch (error) {
      console.log(error);
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