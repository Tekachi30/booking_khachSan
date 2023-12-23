const express = require("express");
const { getOrder, updateOrder, searchOrder } = require("../controllers/orderController");
const routerOrder = express.Router();

routerOrder.get("/api/order/get/:id", getOrder)
routerOrder.post("/api/order/search", searchOrder);
routerOrder.put("/api/order/update/:id", updateOrder)


module.exports = {
    routerOrder,
};
