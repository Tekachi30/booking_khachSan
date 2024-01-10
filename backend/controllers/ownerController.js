const db = require("../models");
const Owner = db.owner;
const Hotel = db.hotel;
const Order = db.order;
const OD = db.order_detail;
const Room = db.room_hotel;
const Rating = db.rating_hotel;
const Mess = db.messager;
const Report = db.report_hotel;
const Favorate = db.favorate_hotel;
const ImgHotel = db.img_hotel;
const ImgRoom = db.img_room;
const Coupon = db.coupon_owner;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const dayjs = require("dayjs");
dotenv.config();
const fs = require("fs"); // package thao tác vs file
const multer = require("multer"); // package sử dụng để thao tác upload file
// Được sử dụng để lưu trữ các tệp được tải lên trong thư mục uploads.
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const getOwner = async (req, res) => {
  try {
    const owner = await Owner.findAll();
    res.json(owner);
  } catch (error) {
    console.log(error);
  }
};

const addOwner = async (req, res) => {
  try {
    const { account, fullname, address, phone, password, email } = req.body;
    const exsitEmail = await Owner.findOne({ where: { email: email } });
    const exsitAccount = await Owner.findOne({ where: { account: account } });
    if (!exsitAccount) {
      if (!exsitEmail) {
        let salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await Owner.create({
          account: account,
          fullname: fullname,
          address: address,
          phone: phone,
          password: hash,
          email: email,
        });
        return res
          .status(200)
          .json({ message: "Đăng ký chủ khách sạn thành công" });
      } else {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }
    } else {
      return res.status(400).json({ message: "Tên tài khoản đã được sử dụng" });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginOwner = async (req, res) => {
  try {
    const { account, password } = req.body;
    const exsitOnwer = await Owner.findOne({ where: { account: account } });
    if (exsitOnwer) {
      const ismatch = await bcrypt.compare(password, exsitOnwer.password);
      if (!ismatch) {
        return res.status(400).json({ message: "Mật khẩu không chính xác." });
      }
      // Tạo JWT
      const token = jwt.sign(
        {
          userId: exsitOnwer.id,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );
      return res.status(200).json({
        id: exsitOnwer.id,
        fullname: exsitOnwer.fullname,
        address: exsitOnwer.address,
        phone: exsitOnwer.phone,
        email: exsitOnwer.email,
        token,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Tài khoản sai hoặc không tồn tại" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateOwner = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const { fullname, address, phone, password, email } = req.body;
    const exsitOnwer = await Owner.findByPk(ownerId);
    if (exsitOnwer) {
      let salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      (exsitOnwer.fullname = fullname),
        (exsitOnwer.address = address),
        (exsitOnwer.phone = phone),
        (exsitOnwer.password = hash),
        (exsitOnwer.email = email);
      await exsitOnwer.save();
      return res
        .status(200)
        .json({ message: "Cập nhật chủ khách sạn thành công." });
    } else {
      return res.status(404).json({ message: "Không tìm thấy tài khoản." });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteOwner = async (req, res) => {
  try {
    const id = req.params.id;
    const exitsOwner = await Owner.findByPk(id);
    if (!exitsOwner) {
      return res.status(201).json({ message: "Không tìm thấy tài khoản chủ khách sạn." });
    } else {
      const orders = await Order.findAll({
        attributes: ["id", "status"],
        include: [
          {
            model: OD,
            attributes: ["id", "id_room", "id_order"],
            required: true,
            include: [
              {
                model: Room,
                attributes: ["id", "id_hotel"],
                required: true,
                include: [
                  {
                    model: Hotel,
                    attributes: ["id", "id_owner"],
                    require: true,
                    where: { id_owner: id },
                  },
                ],
              },
            ],
          },
        ],
      });

      if (orders.length > 0) {

        let hotelIds = orders.flatMap((order) =>
          order.order_details.map((detail) => detail.room_hotel.hotel.id)
        );

        const hotels = await Hotel.findAll({where:{id_owner:id}})
        let HotelIds2 = hotels.flatMap((hotel)=>hotel.id);
       
        let uniqueHotelIds = [...new Set(hotelIds)];
        uniqueHotelIds = [...new Set([...uniqueHotelIds, ...HotelIds2])];

        let paidOrders = orders.filter(
          (order) => order.status == "Đã Thanh Toán"
        );

        if (paidOrders.length > 0) {
          return res.status(200).json({
            message: "Không thể xóa khách sạn vì có đơn hàng đã thanh toán.",
          });
        } else {

          for (const order of orders) {
            await OD.destroy({ where: { id_order: order.id } });
            await order.destroy();
          }

          for (var y = 0; y < uniqueHotelIds.length; y++) {

            const img_hotel = await ImgHotel.findAll({
              where: { id_hotel: uniqueHotelIds[y] },
            });
            if (img_hotel.length > 0) {
              for (const img of img_hotel) {
                const imagePath = `./uploads/${img.name_img}`;
                deleteFile(imagePath);
                await img.destroy();
              }
            }
            const room = await Room.findAll({
              where: { id_hotel: uniqueHotelIds[y] },
            });
            const roomIds = room.map((r) => r.id);
            const img_room = await ImgRoom.findAll({
              where: { id_room: roomIds },
            });
            if (img_room.length > 0) {
              for (const img of img_room) {
                const imagePath = `./uploads/${img.name_img}`;
                deleteFile(imagePath);
                await img.destroy();
              }
            }
            await Room.destroy({ where: { id_hotel: uniqueHotelIds[y] } });

            await Rating.destroy({ where: { id_hotel: uniqueHotelIds[y] } });

            await Report.destroy({ where: { id_hotel: uniqueHotelIds[y] } });

            await Favorate.destroy({ where: { id_hotel: uniqueHotelIds[y] } });

            await Coupon.destroy({ where: { id_hotel: uniqueHotelIds[y] } });

            await Hotel.destroy({ where: { id: uniqueHotelIds[y] } });

          }

          await Mess.destroy({ where: { id_owner: id } })
          await Owner.destroy({ where: { id: id } })
          return res.status(200).json({ message: "Xóa thành công." });
        }
      }
      else {
        const hotels = await Hotel.findAll({where:{id_owner:id}})
        let HotelIds2 = hotels.flatMap((hotel)=>hotel.id);
        
        for(var y=0 ; y< HotelIds2.length;y++)
        {
          const img_hotel = await ImgHotel.findAll({
            where: { id_hotel:  HotelIds2[y] },
          });
          if (img_hotel.length > 0) {
            for (const img of img_hotel) {
              const imagePath = `./uploads/${img.name_img}`;
              deleteFile(imagePath);
              await img.destroy();
            }
          }
          const room = await Room.findAll({
            where: { id_hotel:  HotelIds2[y] },
          });
          const roomIds = room.map((r) => r.id);
          const img_room = await ImgRoom.findAll({
            where: { id_room: roomIds },
          });
          if (img_room.length > 0) {
            for (const img of img_room) {
              const imagePath = `./uploads/${img.name_img}`;
              deleteFile(imagePath);
              await img.destroy();
            }
          }
          await Room.destroy({ where: { id_hotel:  HotelIds2[y] } });

          await Rating.destroy({ where: { id_hotel:  HotelIds2[y] } });

          await Report.destroy({ where: { id_hotel:  HotelIds2[y] } });

          await Favorate.destroy({ where: { id_hotel:  HotelIds2[y] } });

          await Coupon.destroy({ where: { id_hotel:  HotelIds2[y] } });

          await Hotel.destroy({ where: { id:  HotelIds2[y] } });
        }
        await Mess.destroy({ where: { id_owner: id } })
        await Owner.destroy({ where: { id: id } })
        return res.status(200).json({ message: "Xóa thành công." });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// Sử dụng hàm để xóa file khỏi thư mục upload
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
};

const searchOwner = async (req, res) => {
  try {
    const { search } = req.body;
    const result = await Owner.findAll({
      where: {
        fullname: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOwner,
  loginOwner,
  addOwner,
  updateOwner,
  deleteOwner,
  searchOwner,
};
