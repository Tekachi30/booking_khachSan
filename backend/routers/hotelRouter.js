const express = require("express");
const { getHotel, addHotel, updateHotel, deleteHotel, getHotelByOwner, addImgHotel, updateImgHotel, deleteImgHotel, getHotelNon } = require("../controllers/hotelController");
const routerHotel = express.Router();

routerHotel.get("/api/hotel/get", getHotel);
routerHotel.get("/api/hotel/get/:id", getHotelByOwner)
routerHotel.get("/api/hotel/get_non/:id",getHotelNon)
routerHotel.post("/api/hotel/add/:id", addHotel);
routerHotel.post("/api/hotel/addImg/:id", addImgHotel);

routerHotel.put("/api/hotel/update/:id", updateHotel);
routerHotel.put("/api/hotel/updateImg/:id", updateImgHotel);


routerHotel.delete("/api/hotel/delete/:id", deleteHotel);
routerHotel.delete("/api/hotel/deleteImg/:id", deleteImgHotel);




module.exports = {
  routerHotel,
};
