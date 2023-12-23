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
    let delete_flag = false;
    const id_owner = req.params.id;
    const exits_owner = await Owner.findByPk(id_owner);
    if (exits_owner) {
      /*
         list liên quan
         => xóa hotel -> img_hotel -> room -> img_room -> rating -> report -> favorate -> coupon
         => xóa hóa đơn -> chi tiet hoa đơn
         => xóa messenger
      */

      // xóa hóa đơn trước tiên
      /*
        owner (id) hotel(id_owner) room (id_hotel) order(id) order_detail(id_order,id_room)
      */
      const get_order = await Owner.findAll({
        attributes: [],
        include: [
          {
            model: Hotel,
            attributes: ["id"],
            include: [
              {
                model: Room,
                attributes: ["id", "id_hotel"],
                include: [
                  {
                    model: OD,
                    attributes: ["id_order", "id", "id_room"],

                    include: [{ model: Order, attributes: ["id", "status"] }],
                  },
                ],
              },
            ],
          },
        ],
      });
      // Sử dụng hàm kiểm tra
      const canDelete = !hasUnprocessableOrders(get_order);

      // Nếu không có đơn hàng nào có thể xóa, thực hiện xóa
      if (canDelete) {
        // Thực hiện quá trình xóa ở đây
        for (const owner of get_order) {
          for (const hotel of owner.hotels) {
            for (const room of hotel.room_hotels) {
              for (const OD of room.order_details) {
                const orderId = OD.id_order;
                const ODId = OD.id;

                await OD.destroy({ where: { id: ODId } }); // Xóa chi tiết đơn hàng
                await Order.destroy({ where: { id: orderId } }); // Xóa đơn hàng
                hasdelete(hotel.id, room.id, id_owner);
              }
            }
          }
        }

        delete_flag = true;
      } else {
        for (const owner of get_order) {
          for (const hotel of owner.hotels) {
            for (const room of hotel.room_hotels) {
              hasdelete(hotel.id, room.id, id_owner);
            }
          }
        }
        console.log(
          "Không thể xóa đơn hàng với trạng thái đã đặt hoặc đã thanh toán."
        );
        return res.status(201).json({
          message: "Xóa thất bại vì đơn hàng đã được đặt hoặc đã thanh toán.",
        });
      }
      
      if (delete_flag) {
        await exits_owner.destroy();
        console.log("Có thể xóa tất cả các đơn hàng.");
        return res.status(200).json({ message: "Xóa thành công." });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// Hàm kiểm tra xem có đơn hàng nào có trạng thái là "Đã Đặt" hoặc "Đã Thanh Toán" không
function hasUnprocessableOrders(owners) {
  for (const owner of owners) {
    for (const hotel of owner.hotels) {
      for (const room of hotel.room_hotels) {
        for (const orderDetail of room.order_details) {
          const orderStatus = orderDetail.order.status;
          if (orderStatus === "Đã Đặt" || orderStatus === "Đã Thanh Toán") {
            return true; // Có ít nhất một đơn hàng không thể xóa
          }
        }
      }
    }
  }
  return false; // Tất cả đơn hàng đều có thể xóa
}

async function hasdelete(idHotel, idRoom, idOwner){

  const existCoupon = await Coupon.findOne({ where: {id_hotel: idHotel}})
  const existFavorate = await Favorate.findOne({ where: {id_hotel: idHotel}})
  const existReport = await Report.findOne({ where: {id_hotel: idHotel}})
  const existRating = await Rating.findOne({ where: {id_hotel: idHotel}})
  const existImgRoom = await ImgRoom.findOne({ where: {id_room: idRoom}})
  const existRoom = await Room.findOne({ where: {id: idRoom}})
  const existImgHotel = await ImgHotel.findOne({ where: {id_hotel: idHotel}})
  const existHotel = await Hotel.findOne({ where: {id: idHotel}})
  const exitOwner = await Hotel.findOne({ where: {id: idOwner}})
  
  if(existCoupon){await Coupon.destroy({ where: { id_hotel: idHotel } });}
  if(existFavorate){await Favorate.destroy({ where: { id_hotel: idHotel } });}
  if(existReport){await Report.destroy({ where: { id_hotel: idHotel } });}
  if(existRating){await Rating.destroy({ where: { id_hotel: idHotel } });}
  if(existImgRoom){
    const imagePath = `./uploads/${existImgRoom.name_img}`;
    deleteFile(imagePath);
  }
  if(existRoom){await Room.destroy({ where: { id: idRoom } });}
  if(existImgHotel){
    const imagePath = `./uploads/${existImgHotel.name_img}`;
    deleteFile(imagePath);
  }
  if(existHotel){await Hotel.destroy({where: { id_owner: idOwner},});}
  if(exitOwner){await Mess.destroy({where: { id_owner: idOwner},});}
}

// Sử dụng hàm để xóa file khỏi thư mục upload
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log(`File ${filePath} has been deleted`);
  });
}

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
  
