const express = require("express");
const { getOrder } = require("../controllers/orderController");
const routerOrder = express.Router();

routerOrder.get("/api/order/get", getOrder)


module.exports = {
    routerOrder,
};
