const express = require("express");
const { getHotel, addHotel, updateHotel, deleteHotel, getHotelByOwner, addImgHotel } = require("../controllers/hotelController");
const routerHotel = express.Router();

routerHotel.get("/api/hotel/get", getHotel);
routerHotel.get("/api/hotel/get/:id", getHotelByOwner)

routerHotel.post("/api/hotel/add", addHotel);
routerHotel.post("/api/hotel/addImg/:id", addImgHotel);

routerHotel.put("/api/hotel/update/:id", updateHotel);
routerHotel.delete("/api/hotel/delete/:id", deleteHotel);


module.exports = {
  routerHotel,
};
