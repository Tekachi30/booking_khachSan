const express = require("express");
const { getRoom, addRoom, addImgRoom, updateRoom, updateImgRoom,  deleteRoom,  } = require("../controllers/roomController");
//deleteImgRoom
const routerRoom = express.Router();

routerRoom.get("/api/room/get/:id", getRoom);

routerRoom.post("/api/room/add/:id", addRoom);
routerRoom.post("/api/room/addImg/:id", addImgRoom);

routerRoom.put("/api/room/update/:id", updateRoom);
routerRoom.put("/api/room/updateImg/:id", updateImgRoom);

routerRoom.delete("/api/room/delete/:id", deleteRoom);
//routerRoom.put("/api/room/deleteImg/:id", deleteImgRoom);



module.exports = {
    routerRoom,
};
