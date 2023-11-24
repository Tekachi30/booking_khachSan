const express = require("express");
const { getOrder, updateOrder } = require("../controllers/orderController");
const routerOrder = express.Router();

routerOrder.get("/api/order/get", getOrder)
routerOrder.put("/api/order/update/:id", updateOrder)



module.exports = {
    routerOrder,
};
