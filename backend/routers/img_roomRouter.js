const express = require("express");
const { getImgRoom, addImgRoom, updateImgRoom, deleteImgRoom } = require("../controllers/img_RoomController");
const routerImgRoom = express.Router();

routerImgRoom.get("/api/imgRoom/get", getImgRoom);
routerImgRoom.post("/api/imgRoom/add", addImgRoom);
routerImgRoom.put("/api/imgRoom/update/:id", updateImgRoom);
routerImgRoom.delete("/api/imgRoom/delete/:id", deleteImgRoom);


module.exports = {
  routerImgRoom,
};
