const express = require("express");
const { getOrder, updateOrder, searchOrder, getOrderbyUser } = require("../controllers/orderController");
const routerOrder = express.Router();

routerOrder.get("/api/order/get/:id", getOrder);
routerOrder.get("/api/order/getOrderUser/:id", getOrderbyUser);

routerOrder.post("/api/order/search", searchOrder);

routerOrder.put("/api/order/update/:id", updateOrder);


module.exports = {
    routerOrder,
};
