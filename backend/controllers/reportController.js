const db = require("../models");
const Report = db.report_hotel;
const User = db.User;
const Hotel = db.hotel;
const Owner = db.owner;
const Order = db.order;
const OD = db.order_detail;
const Room = db.room_hotel;
const sequelize = require('sequelize');
const Op  = sequelize.Op

const getReport = async (req, res) => {
    try {
      const report = await Report.findAll({
            include:[
              {model: Hotel, attributes: ['name_hotel'],},
              {model: User, attributes: ['fullname']}
          ]
        });
        res.json(report);
    } catch (error) {
        console.log(error);
    }
}

// tương tự đánh giá
const addReport = async (req, res) => {
    try {
      const id = req.params.id;
      const {id_hotel , comment_report} = req.body;

      const orders = await Order.findAll({
        attributes: ["id", "id_user", "status", "provider"],
        include: [
          {
            model: User,
            attributes: ["id", "fullname"],
          },
          {
            model: OD,
            attributes: ["id", "id_order", "id_room"],
            required: true,
            include: [
              {
                model: Room,
                attributes: ["id", "id_hotel"],
                where: { id_hotel: id_hotel },
                required: true,
              },
            ],
          },
        ],
      });

      const existingReport = await Report.findOne({
        where: { id_hotel, id_user: id },
      });
  
      if (existingReport) {
        return res.status(201).json({ message: 'Bạn đã báo cáo khách sạn này rồi' });
      }


      const existUser = User.findByPk(id);
      if(!existUser){
        return res.status(201).json({message: 'Không tìm thấy user'});
      }else{
        if(orders.status == "Đã Trả Phòng"){
          await Report.create({
            comment_report: comment_report,
            id_hotel: id_hotel,
            id_user: id,
          });
          return res.status(200).json({message: 'Báo cáo thành công'});
        }else{
          return res.status(201).json({message: 'Bạn chưa đủ điều kiện để báo cáo khách sạn này.'});
        }
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
      include:[
        {
          model: Hotel, attributes: ['name_hotel'],
        },
        {model: User, attributes: ['fullname']}
      ],
      where: {
        [Op.or]: [
          {
            '$Hotel.name_hotel$': {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$User.fullname$': {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
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