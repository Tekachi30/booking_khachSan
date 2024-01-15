const express = require("express");
const { getFullNoti, getNotiByUser, addNoti, deleteNoti } = require("../controllers/noTiController");
const routerNoti = express.Router();

routerNoti.get("/api/noti/get", getFullNoti);
routerNoti.get("/api/noti/get/:id", getNotiByUser);
routerNoti.post("/api/noti/add", addNoti);
routerNoti.post("/api/noti/delete", deleteNoti);

module.exports = {
    routerNoti,
};
