const express = require("express");
const { payPost, payIpnGet, payReturnGet } = require("../controllers/payMentController");
const routerPay = express.Router();

routerPay.post("/api/create_payment_url", payPost);
routerPay.get("/api/vnpay_ipn", payIpnGet);
routerPay.get("/api/vnpay_return", payReturnGet);

module.exports = {
    routerPay,
};
