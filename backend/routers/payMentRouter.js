const express = require("express");
const { payPost, payIpnGet, getPayment } = require("../controllers/payMentController");
const routerPay = express.Router();

routerPay.post("/api/create_payment_url", payPost);
routerPay.get("/api/vnpay_ipn", payIpnGet);
routerPay.post("/api/vnpay_get",getPayment)

module.exports = {
    routerPay,
};
