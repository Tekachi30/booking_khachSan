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

const getUserOrder = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}

const getMoth = async (req, res) => {
  try {
    
    const { id_owner, month } = req.body;
    const exitsOwner = await Owner.findByPk(id_owner)
    if (exitsOwner) {
      const orders = await Order.findAll({
        attributes: ["id", "id_user", "status", "provider","createdAt"],
        where: sequelize.where
        (sequelize.fn('MONTH', sequelize.col('Order.createdAt')), month),

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
                required: true,
              }
            ]
          }
        ]
      });
      res.json(orders);
  }
  } catch (error) {
    console.log(error);
  }
}

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


    if (!existOrder) {
      return res.status(201).json({ message: "Hóa đơn không tồn tại." });
    } else {
      if (existOrder.status === "Đã Thanh Toán") {
        res.json("Đã thanh toán")
      }
      else {
        // order_detail(id,id_room,quanlity) room(id,real_quantity)
        // tính lại real_quantity = real_quantity - quanlity
        const orderDetails = await OD.findAll(
          {
            where: { id_order: existOrder.id },
            include: [Room]
          }
        )
        for (const orderDetail of orderDetails) {
          const room = orderDetail.room_hotel;
          const quantity = orderDetail.quanlity;
          await Room.update(
            { real_quantity: room.real_quantity - quantity },
            { where: { id: room.id } }
          );
        }

        existOrder.status = "Đã Thanh Toán"
        existOrder.vnp_orderID = vnp_orderID
        existOrder.total_bank = total_bank
        existOrder.date_bank = date_bank
        await existOrder.save()
        const text = "Chân thành cảm ơn Quý khách hàng đã tin tưởng và lựa chọn dịch vụ của chúng tôi thông qua trang web. Chúng tôi trân trọng sự ủng hộ của Quý khách, và sẽ luôn nỗ lực để mang đến trải nghiệm tốt nhất cho chuyến đi của bạn.<br>Đội ngũ chúng tôi hiểu rằng sự thoải mái và tiện nghi là yếu tố quan trọng trong mỗi chuyến đi của Quý khách. Chúng tôi cam kết cung cấp dịch vụ chất lượng, đảm bảo mọi chi tiết được chăm sóc và phục vụ tận tâm.<br>Nếu có bất kỳ nhu cầu hoặc yêu cầu đặc biệt nào, xin vui lòng liên hệ với chúng tôi. Chúng tôi sẽ cố gắng hết sức để đáp ứng mọi mong muốn của Quý khách.<br>Một lần nữa, chân thành cảm ơn sự lựa chọn của Quý khách hàng. Chúng tôi rất mong được phục vụ Quý khách và hy vọng rằng chuyến đi của bạn sẽ trở nên đặc biệt và nhớ mãi."
        const user = await User.findOne({ where: { id: existOrder.id_user } })
        await sendMail(req, res, user.email, user.fullname, text)
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const statusOrder = async (req, res) => {
  try {
    const { id, status } = req.body
    const existOrder = await Order.findByPk(id);
    let text = ""
    if (existOrder) {
      if (status == "Đã Hủy") {
        text = "Hủy đặt phòng thành công. <br> Chân thành cảm ơn Quý khách hàng đã tin tưởng và lựa chọn dịch vụ của chúng tôi thông qua trang web. Chúng tôi trân trọng sự ủng hộ của Quý khách, và sẽ luôn nỗ lực để mang đến trải nghiệm tốt nhất cho chuyến đi của bạn.<br>Đội ngũ chúng tôi hiểu rằng sự thoải mái và tiện nghi là yếu tố quan trọng trong mỗi chuyến đi của Quý khách. Chúng tôi cam kết cung cấp dịch vụ chất lượng, đảm bảo mọi chi tiết được chăm sóc và phục vụ tận tâm.<br>Nếu có bất kỳ nhu cầu hoặc yêu cầu đặc biệt nào, xin vui lòng liên hệ với chúng tôi. Chúng tôi sẽ cố gắng hết sức để đáp ứng mọi mong muốn của Quý khách.<br>Một lần nữa, chân thành cảm ơn sự lựa chọn của Quý khách hàng. Chúng tôi rất mong được phục vụ Quý khách và hy vọng rằng chuyến đi của bạn sẽ trở nên đặc biệt và nhớ mãi."
        // thực hiền hoàn tiền
      }
      else if (status == "Đã Trả Phòng") {
        text = "Trả phòng thành công. <br> Chân thành cảm ơn Quý khách hàng đã tin tưởng và lựa chọn dịch vụ của chúng tôi thông qua trang web. Chúng tôi trân trọng sự ủng hộ của Quý khách, và sẽ luôn nỗ lực để mang đến trải nghiệm tốt nhất cho chuyến đi của bạn.<br>Đội ngũ chúng tôi hiểu rằng sự thoải mái và tiện nghi là yếu tố quan trọng trong mỗi chuyến đi của Quý khách. Chúng tôi cam kết cung cấp dịch vụ chất lượng, đảm bảo mọi chi tiết được chăm sóc và phục vụ tận tâm.<br>Nếu có bất kỳ nhu cầu hoặc yêu cầu đặc biệt nào, xin vui lòng liên hệ với chúng tôi. Chúng tôi sẽ cố gắng hết sức để đáp ứng mọi mong muốn của Quý khách.<br>Một lần nữa, chân thành cảm ơn sự lựa chọn của Quý khách hàng. Chúng tôi rất mong được phục vụ Quý khách và hy vọng rằng chuyến đi của bạn sẽ trở nên đặc biệt và nhớ mãi."
      }

      const orderDetails = await OD.findAll(
        {
          where: { id_order: existOrder.id },
          include: [Room]
        }
      )
      for (const orderDetail of orderDetails) {
        const room = orderDetail.room_hotel;
        const quantity = orderDetail.quanlity;
        await Room.update(
          { real_quantity: room.real_quantity + quantity },
          { where: { id: room.id } }
        );
      }

      existOrder.status = status
      await existOrder.save()
      const user = await User.findOne({ where: { id: existOrder.id_user } })
      await sendMail(req, res, user.email, user.fullname, text)
      res.json({ message: "Update Thành công" })
    }
    else {
      res.json("Không tồn tại hóa đơn")
    }

  } catch (error) {
    console.log(error)
  }
}

const sendMail = async (req, res, to, name, text) => {
  try {
    const subject = 'Thông báo từ 404ViVu'

    const html = `
    <html>
      <head>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
      body {
          font-family: 'sans-serif';
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }

      .max-w-2xl {
          max-width: 42rem; /* 2xl in Tailwind CSS */
          margin-left: auto;
          margin-right: auto;
      }

      .px-6 {
          padding-left: 1.5rem; /* 6 in Tailwind CSS */
          padding-right: 1.5rem;
      }

      .py-8 {
          padding-top: 2rem; /* 8 in Tailwind CSS */
          padding-bottom: 2rem;
      }

      .mx-auto {
          margin-left: auto;
          margin-right: auto;
      }

      .bg-gradient-to-r {
          background: linear-gradient(to right, #a1e4f2, #63b3ed); /* from-cyan-200 to-blue-100 in Tailwind CSS */
      }

      .dark\:bg-gray-900 {
          background-color: #1a202c; /* dark:bg-gray-900 in Tailwind CSS */
      }

      .rounded-md {
          border-radius: 0.375rem; /* rounded-md in Tailwind CSS */
      }

      .shadow-xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-xl in Tailwind CSS */
      }

      .items-center {
          align-items: center;
      }

      .justify-center {
          justify-content: center;
      }

      .h-7 {
          height: 1.75rem; /* h-7 in Tailwind CSS */
      }

      .sm\:h-8 {
          height: 2rem; /* sm:h-8 in Tailwind CSS */
      }

      .font-bold {
          font-weight: 700;
      }

      .text-3xl {
          font-size: 1.875rem; /* 3xl in Tailwind CSS */
      }

      .mt-8 {
          margin-top: 2rem; /* mt-8 in Tailwind CSS */
      }

      .text-gray-700 {
          color: #4a5568; /* text-gray-700 in Tailwind CSS */
      }

      .dark\:text-gray-200 {
          color: #cbd5e0; /* dark:text-gray-200 in Tailwind CSS */
      }

      .mt-6 {
          margin-top: 1.5rem; /* mt-6 in Tailwind CSS */
      }

      .leading-loose {
          line-height: 1.75; /* leading-loose in Tailwind CSS */
      }

      .text-gray-600 {
          color: #718096; /* text-gray-600 in Tailwind CSS */
      }

      .dark\:text-gray-300 {
          color: #a0aec0; /* dark:text-gray-300 in Tailwind CSS */
      }

      .w-full {
          width: 100%;
      }

      .h-64 {
          height: 16rem; /* h-64 in Tailwind CSS */
      }

      .my-10 {
          margin-top: 2.5rem; /* my-10 in Tailwind CSS */
          margin-bottom: 2.5rem;
      }

      .rounded-lg {
          border-radius: 0.5rem; /* rounded-lg in Tailwind CSS */
      }

      .md\:h-80 {
          height: 20rem; /* md:h-80 in Tailwind CSS */
      }

      .text-gray-500 {
          color: #a0aec0; /* text-gray-500 in Tailwind CSS */
      }

      .dark\:text-gray-400 {
          color: #cbd5e0; /* dark:text-gray-400 in Tailwind CSS */
      }

      .font-medium {
          font-weight: 500; /* font-medium in Tailwind CSS */
      }

      .text-gray-800 {
          color: #2d3748; /* text-gray-800 in Tailwind CSS */
      }

      .dark\:text-white {
          color: #fff; /* dark:text-white in Tailwind CSS */
      }

      .mt-3 {
          margin-top: 0.75rem; /* mt-3 in Tailwind CSS */
      }

      .text-gray-500 {
          color: #a0aec0; /* text-gray-500 in Tailwind CSS */
      }

      .dark\:text-gray-400 {
          color: #cbd5e0; /* dark:text-gray-400 in Tailwind CSS */
      }
  </style>
      </head>
      <body>
      <section class="max-w-2xl px-6 py-8 mx-auto bg-gradient-to-r from-cyan-200 to-blue-100 dark:bg-gray-900 rounded-md shadow-xl">
      <header class="w-auto flex items-center justify-center h-7 sm:h-8 font-bold text-3xl">
        <a >
          404ViVu
        </a>
      </header>
  
      <main class="mt-8">
        <h2 class="mt-6 text-gray-700 dark:text-gray-200">Hi ${name},</h2>
  
        <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
          ${text}
        </p>
  
        <img  class="w-full h-64 my-10 rounded-lg md:h-80" src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/4/17/799236/KHACH-SAN.jpg" alt="">
  
        <p class="mt-2 text-gray-600 dark:text-gray-300">
          Trân thành cảm ơn, <br>
          404Vivu
        </p>
      </main>
  
  
      <footer class="mt-8 text-center">
        <h3 class="font-medium text-gray-800 dark:text-white">404ViVu đi cùng bạn đến khắp nơi</h3>
  
        <p class="mt-3 text-gray-500 dark:text-gray-400">© 2023 404ViVu.</p>
      </footer>
    </section>
    </html>
  `;
    const mailOptions = {
      from: YOUR_EMAIL_ADDRESS,
      to: to,
      subject: subject,
      text: text,
      html: html
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

const searchOrder = async (req, res) => {
  try {
    const { search } = req.body
    const result = await Order.findAll(
      {
        include: [
          {
            model: User,
            where: {
              fullname: {
                [Op.like]: `%${search}%`
              }
            },
          },
          {
            model: Hotel,

            include: [
              {
                model: Owner,
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
  statusOrder,
  getMoth
}