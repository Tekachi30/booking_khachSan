const nodemailer = require('nodemailer');

// Hàm xử lý để gửi email
const sendMail = (req, res) => {
  // Lấy dữ liệu từ request body
  const { to, subject, text } = req.body;

  // Tạo đối tượng transporter sử dụng SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manfromhell2000@gmail.com',
      pass: 'Tekachi3030',
    },
  });

  // Thiết lập thông tin người nhận, người gửi, chủ đề và nội dung email
  const mailOptions = {
    from: 'manfromhell2000@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  // Sử dụng transporter để gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ success: 'Email sent successfully' });
    }
  });
};

module.exports = {
  sendMail,
};