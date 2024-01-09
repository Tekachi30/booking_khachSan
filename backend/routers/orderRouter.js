const express = require("express");
const { getOrder, updateOrder, searchOrder, getOrderbyUser,statusOrder, getMoth } = require("../controllers/orderController");
const routerOrder = express.Router();

routerOrder.get("/api/order/getOrderUser/:id", getOrderbyUser);

routerOrder.post("/api/order/get", getOrder);
routerOrder.post("/api/order/getMoth", getMoth)

routerOrder.post("/api/order/search", searchOrder);

routerOrder.put("/api/order/update/:id", updateOrder);

routerOrder.put("/api/order/update", statusOrder);

module.exports = {
    routerOrder,
};
