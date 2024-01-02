const db = require('../models');
const Order = db.order;
const User = db.User;
const Owner = db.owner;
const Hotel = db.hotel;
const OD = db.order_detail;
const Room = db.room_hotel;
const dotenv = require("dotenv");
const sequelize = require('sequelize');
const Op = sequelize.Op
const nodemailer = require('nodemailer');
dotenv.config();
const YOUR_EMAIL_ADDRESS = process.env.YOUR_EMAIL_ADDRESS;
const YOUR_EMAIL_PASSWORD = process.env.YOUR_EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: YOUR_EMAIL_ADDRESS,
    pass: YOUR_EMAIL_PASSWORD,
  },
});

const getOrder = async (req, res) => {
  try {
    const { idHotel, id_owner } = req.body;

    const hotel = await Hotel.findOne({
      where: { id_owner: id_owner, id: idHotel }
    })

    const exitsOwner = await Owner.findByPk(id_owner)
    if (exitsOwner) {
      const orders = await Order.findAll({

        attributes: ["id", "id_user", "status", "provider"],
        include: [
          {
            model: User,
            attributes: ["id", "fullname"]
          },
          {
            model: OD,
            attributes: ["id", "id_order", "id_room"],
            required: true,
            include: [
              {
                model: Room,
                attributes: ["id", "id_hotel"],
                where: { id_hotel: hotel.id },
                required: true,
              }
            ]
          }
        ]
      });
      res.json(orders);
    }
    else {
      res.json('Không tồn tại chủ khách sạn')
    }


  } catch (error) {
    console.log(error);
  }
};

const getOrderbyUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const orderUser = await Order.findAll({
      include: [
        {
          model: User, attributes: ['id', 'fullname']
        }
      ],
      where: { id_user: idUser }
    });
    res.json(orderUser)
  } catch (error) {
    console.log(error);
  }
}

const addOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, provider } = req.body;
    const existUser = await User.findByPk(id);
    if (!existUser) {
      return res.status(201).json({ message: 'Không tìm thấy user.' });
    } else {
      await Order.create({
        status: status,
        provider: provider,
        id_user: id
      });
      return res.status(200).json({ message: 'Thêm thành công.' });
    }
  } catch (error) {
    console.log(error);
  }
}

const addOrder_detail = async (req, res) => {
  try {
    const id = req.params.id;
    const { quanlity, single_price, checkin, checkout } = req.body;
    const existOrder = await User.findOne({ where: { id_user: id } });
    // const hasOD = await OD.findOne({where: {}})
    if (!existOrder) {
      return res.status(201).json({ message: 'Không tìm thấy đơn đặt phòng.' });
    } else {
      await OD.create({
        quanlity: quanlity,
        single_price: single_price,
        checkin: checkin,
        checkout: checkout,
        id_order: existOrder.id
      });
    }
  } catch (error) {
    console.log(error);
  }
}

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { vnp_orderID, total_bank, date_bank } = req.body
    const existOrder = await Order.findByPk(id);
    console.log(existOrder.status)
    if (!existOrder) {
      return res.status(201).json({ message: "Hóa đơn không tồn tại." });
    } else {
      if (existOrder.status === "Đã Thanh Toán") {
        res.json("Đã thanh toán")
      }
      else {
        existOrder.status = "Đã Thanh Toán"
        existOrder.vnp_orderID = vnp_orderID
        existOrder.total_bank = total_bank
        existOrder.date_bank = date_bank
        await existOrder.save()
        const user = await User.findOne({ where: { id: existOrder.id_user } })
        await sendMail(req, res, user.email)
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const sendMail = async (req, res, to) => {
  try {
    const text = 'Bạn vi phạm quy tắc cộng đồng nên bị khóa tài khoản.'
    const subject = 'Thông báo từ 404ViVu'


    const mailOptions = {
      from: YOUR_EMAIL_ADDRESS,
      to: to,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);

      } else {
        console.log('Email sent: ' + info.response);

      }
    });

  } catch (error) {
    console.log(error)
  }
}
/*
   1: hiện đang ở trạng thái đó. không lặp lại trạng thái.
   đã đặt -> đã thanh toán -> đã trả phòng (hoặc đã hủy) 

*/

// chưa xong
const searchOrder = async (req, res) => {
  try {
    const { search } = req.body
    const result = await Order.findAll(
      {
        where: {
          status: {
            [Op.like]: `%${search}%`
          }
        },
        include: [
          {
            model: User,
            where: {
              fullname: {
                [Op.like]: `%${search}%`
              }
            },
            attributes: []
          },
          {
            model: Hotel,
            attributes: [],
            include: [
              {
                model: Owner,
                attributes: []
              }
            ]
          }
        ]
      });
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getOrder,
  getOrderbyUser,
  addOrder,
  addOrder_detail,
  updateOrder,
  searchOrder,
}