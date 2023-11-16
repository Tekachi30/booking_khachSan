const express = require("express");
const { getOrder, updateOder } = require("../controllers/orderController");
const routerOrder = express.Router();

routerOrder.get("/api/order/get", getOrder)
routerOrder.put("/api/order/update/:id", updateOder)



module.exports = {
    routerOrder,
};
