const db = require("../models");
const User = db.User;
const Order = db.order;
const OD = db.order_detail;
const Rating = db.rating_hotel;
const Mess = db.messager;
const Report = db.report_hotel;
const Favorate = db.favorate_hotel;
const Noti = db.notification;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const dayjs = require("dayjs");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({
      include: [{ model: Order }],
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: `Không tìm thấy user id ${userId}.` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Xảy ra lỗi khi tìm user id " + userId });
  }
};

const register = async (req, res) => {
  try {
    const { account, fullname, address, phone, sex, password, email } =
      req.body;
    const exsitEmail = await User.findOne({ where: { email: email } });
    const exsitAccount = await User.findOne({ where: { account: account } });
    if (!exsitAccount) {
      if (!exsitEmail) {
        let salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await User.create({
          account: account,
          fullname: fullname,
          address: address,
          phone: phone,
          sex: sex,
          password: hash,
          email: email,
          isactive: true,
        });
        return res.status(200).json({ message: "Đăng ký thành công" });
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

const login = async (req, res) => {
  try {
    const { account, password } = req.body;
    // Tìm kiếm user bằng account hoặc email
    const exsitUser = await User.findOne({
      where: {
        [Op.or]: [{ account: account }, { email: account }],
      },
    });

    if (exsitUser) {
      const ismatch = await bcrypt.compare(password, exsitUser.password);
      if (!ismatch) {
        return res.status(201).json({ message: "Mật khẩu không chính xác." });
      } else {
        // Tạo JWT
        const token = jwt.sign(
          {
            userId: exsitUser.id,
          },
          JWT_SECRET,
          {
            expiresIn: JWT_EXPIRES_IN,
          }
        );
        return res.status(200).json({
          id: exsitUser.id,
          account: exsitUser.account,
          fullname: exsitUser.fullname,
          address: exsitUser.address,
          sex: exsitUser.sex,
          phone: exsitUser.phone,
          email: exsitUser.email,
          token,
        });
      }
    } else {
      return res
        .status(201)
        .json({ message: "Tài khoản sai hoặc không tồn tại" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const {
    fullname,
    address,
    phone,
    sex,
    email,
    // password
  } = req.body;
  // Mã hóa mật khẩu
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(201).json({
        message: `Không tìm thấy user id ${userId}.`,
      });
    } else {
     const Updateuser =  await user.update({
        fullname: fullname,
        address: address,
        phone: phone,
        sex: sex,
        email: email,
        // password: hashedPassword,
      });

      return res.status(200).json({
        message: `Cập nhật thông tin thành công.`, Updateuser
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const exsitUser = await User.findByPk(id);
    if (!exsitUser) {
      return res.status(404).json({ error: `Không tìm thấy user` });
    } else {
      // xử lý hóa đơn
      const exitsOrder = await Order.findOne({
        where: {
          id_user: id,
          [Op.or]: [{ status: "Đã Thanh Toán" }, { status: "Đã Đặt" }],
        },
      });
      if (exitsOrder) {
        /*
         note command
         Khi tồn tại hóa đơn chưa trả phòng
         Thực hiện => lấy ngày cuối cùng họ trả phòng để report lại admin
         Thực hiện bằng cách cú pháp find kết hợp ...
        */
        const last_checkout = await OD.findOne({
          attributes: [
            "id_order",
            [
              sequelize.fn("MAX", sequelize.col("check_out")),
              "latest_checkout",
            ],
          ],
          where: {
            "$order.status$": "Đã Thanh Toán",
            "$order.id_user$": id,
          },
          include: [
            {
              model: Order,
              as: "order",
              attributes: [],
              where: {
                status: "Đã Thanh Toán",
                id_user: id,
              },
            },
          ],
          group: ["id_order"],
          order: [[sequelize.fn("MAX", sequelize.col("check_out")), "DESC"]],
        });
        const time = new Date(last_checkout.getDataValue("latest_checkout"));
        var result_last = dayjs(time).format("DD/MM/YYYY h:MM:ss");
        return res
          .status(201)
          .json({
            message: `Không thể xóa khách hàng - Xóa sau thời gian: ${result_last}`,
          });
      } else {
        
        const needOrder = await Order.findAll({ where: { id_user: id } });
        if(needOrder.length > 0)
        {
          for(const order of needOrder)
          {
            await OD.destroy({where:{id_order:order.id}})
            order.destroy()
          }
        }
        
        await Rating.destroy({ where: { id_user: id } });
        await Mess.destroy({ where: { id_user: id } });
        await Report.destroy({ where: { id_user: id } });
        await Favorate.destroy({ where: { id_user: id } });
        await Noti.destroy({ where: { id_user: id } });

        await User.destroy({ where: { id: id } });
        return res.status(200).json({ message: "Xóa thành công." });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const searchUser = async (req, res) => {
  try {
    const { search } = req.body;
    const result = await User.findAll({
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
  getUser,
  getUserById,
  register,
  updateUser,
  login,
  deleteUser,
  searchUser,
};
