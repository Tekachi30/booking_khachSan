const express = require("express");
const { getRoom, addRoom, addImgRoom, updateRoom, updateImgRoom, updateStatusRoom, deleteRoom, deleteImgRoom } = require("../controllers/roomController");
const routerRoom = express.Router();

routerRoom.get("/api/room/get", getRoom);

routerRoom.post("/api/room/add", addRoom);
routerRoom.post("/api/room/addImg/:id", addImgRoom);

routerRoom.put("/api/room/update/:id", updateRoom);
routerRoom.put("/api/room/updateImg/:id", updateImgRoom);
routerRoom.put("/api/room/updateStatus/:id", updateStatusRoom);

routerRoom.put("/api/room/delete/:id", deleteRoom);
routerRoom.put("/api/room/deleteImg/:id", deleteImgRoom);



module.exports = {
    routerRoom,
};
