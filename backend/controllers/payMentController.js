const dotenv = require("dotenv");
dotenv.config();
const db = require('../models');
const sequelize = require('sequelize');
const Op  = sequelize.Op
const Order = db.order;
const User = db.User;
const Owner = db.owner;
const Hotel = db.hotel;
const OD = db.order_detail;
const Room = db.room_hotel;
const moment = require('moment');
//payMent vnpay
const payPost = async (req, res, next) => {
   try {

    // const {id_user,carts,checkin,checkout} = req.body

    // const order = await Order.create({
    //   status: "Đã Đặt",
    //   provider: "VNPAY",
    //   id_user: id_user
    // })

    // for(const cart in carts)
    // {
     
    //   await OD.create(
    //     {
    //       id_room:carts[cart].id,
    //       quanlity:carts[cart].quantity,
    //       single_price:carts[cart].price,
    //       check_in:checkin,
    //       check_out:checkout,
    //       id_order:order.id 
    //     }
    //   )
    // }
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // GET env
    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    let returnUrl = process.env.vnp_ReturnUrl;

    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    
    let locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.json({redirectUrl:vnpUrl})
   } catch (error) {
    console.log(error)
   }
  };
  
  const payIpnGet = async (req, res, next) => {
    var vnp_Params = req.query;
      var secureHash = vnp_Params['vnp_SecureHash'];
  
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];
  
      vnp_Params = sortObject(vnp_Params);
      var config = require('config');
      var secretKey = config.get('vnp_HashSecret');
      var querystring = require('qs');
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");     
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
       
  
      if(secureHash === signed){
          var orderId = vnp_Params['vnp_TxnRef'];
          var rspCode = vnp_Params['vnp_ResponseCode'];
          //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
          res.status(200).json({RspCode: '00', Message: 'success'})
      }
      else {
          res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
      }
  }
  
  const payReturnGet = async (req, res, next) => {
    var vnp_Params = req.query;
  
      var secureHash = vnp_Params['vnp_SecureHash'];
  
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];
  
      vnp_Params = sortObject(vnp_Params);
  
      var config = require('config');
      var tmnCode = config.get('vnp_TmnCode');
      var secretKey = config.get('vnp_HashSecret');
  
      var querystring = require('qs');
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");     
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  
      if(secureHash === signed){
          //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
  
          res.render('success', {code: vnp_Params['vnp_ResponseCode']})
      } else{
          res.render('success', {code: '97'})
      }
  }

  function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj){
      if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
      }
    }
    str.sort();
      for (key = 0; key < str.length; key++) {
          sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
  }

module.exports = {
    payPost,
    payIpnGet,
    payReturnGet,
}
