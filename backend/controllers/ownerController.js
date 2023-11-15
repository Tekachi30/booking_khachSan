const db = require('../models');
const Owner = db.owner;
const Hotel = db.hotel;
const Order = db.order;
const OD = db.order_detail;
const room = db.room_hotel;
const Rating = db.rating_hotel;
const Mess = db.messager;
const Report = db.report_hotel;
const Favorate = db.favorate_hotel;
const img = db.img_hotel;
const coupon = db.coupon_owner;


const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const Op  = sequelize.Op
const dayjs = require('dayjs');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

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
                email:email
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
    const {account, password} = req.body;
    const exsitOnwer = await Owner.findOne({where:{account: account}});
    if(exsitOnwer){
        const ismatch = await bcrypt.compare(password, exsitOnwer.password);
        if(!ismatch){
          return res.status(400).json({messsage: 'Mật khẩu không chính xác.'});
        }
        // Tạo JWT
        const token = jwt.sign({
            userId: exsitOnwer.id
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        return res.status(200).json({
            fullname: exsitOnwer.fullname,
            address: exsitOnwer.address, 
            phone: exsitOnwer.phone, 
            email: exsitOnwer.email,
            token
        });
    }else{
      return res.status(400).json({messsage: 'Tài khoản sai hoặc không tồn tại'});
    }
  } catch (error) {
    console.log(error);
  }
}

const updateOwner = async (req, res) => {
    try {
        const ownerId = req.params.id;
        const {fullname, address, phone, password, email} = req.body;
        const exsitOnwer = await Owner.findByPk(ownerId);
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
          return res.status(404).json({messsage: 'Không tìm thấy tài khoản.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteOwner = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitOnwer = await Owner.findByPk(id);
        const existHotel = await Hotel.findOne({ where: { id_owner: id } }); //tìm khách sạn của owner
        if(!exsitOnwer){
          return res.status(400).json({messsage: 'Không tìm thấy tài khoản.'});
        }else{
          if(!existHotel){
            return res.status(400).json({messsage: `Không tìm thấy khách sạn.`});
          }else{
            // xử lý hóa đơn
            const exitsOrder = await Order.findOne({
              where: { 
                id_hotel: id,
                [Op.or]: [{ status: 'Đã Thanh Toán' }, { status: 'Đã Đặt' }]
              }
            });
            if (exitsOrder) {
              /*
               note command
               Khi tồn tại hóa đơn chưa trả phòng
               Thực hiện => lấy ngày cuối cùng họ trả phòng để report lại admin
               Thực hiện bằng cách cú pháp find kết hợp ...
              */
              const last_checkout = await OD.findOne({
                attributes: ['id_order', [sequelize.fn('MAX', sequelize.col('check_out')), 'latest_checkout']],
                where: {
                  '$order.status$': 'Đã Thanh Toán',
                  '$order.id_user$': id,
                },
                include: [
                  {
                    model: Order,
                    as: 'order',
                    attributes: [],
                    where: {
                      status: 'Đã Thanh Toán',
                      id_user: id,
                    },
                  },
                ],
                group: ['id_order'],
                order: [[sequelize.fn('MAX', sequelize.col('check_out')), 'DESC']],
              })
              const time = new Date(last_checkout.getDataValue('latest_checkout'))
              var result_last = dayjs(time).format('DD/MM/YYYY h:MM:ss')
              return res.status(201).json({ message: `Không thể xóa user - Xóa sau thời gian: ${result_last}` });
            }
            else {
              await Order.destroy({ where: { id_hotel: existHotel.id } });
              await room.destroy({ where: { id_hotel: existHotel.id } });
              await Rating.destroy({ where: { id_hotel: existHotel.id } });
              await Report.destroy({ where: { id_hotel: existHotel.id } });
              await Favorate.destroy({ where: { id_hotel: existHotel.id } });
              await img.destroy({ where: { id_hotel: existHotel.id } });
              await coupon.destroy({ where: { id_hotel: existHotel.id } });

              await Hotel.destroy({ where: { id_owner: id } });
              await Mess.destroy({ where: { id_owner: id } }); 
              await Owner.destroy();
              return res.status(200).json({ message: 'Xóa thành công.' });
            }
          }
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