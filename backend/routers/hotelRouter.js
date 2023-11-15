const express = require("express");
const { getHotel, addHotel, updateHotel, deleteHotel } = require("../controllers/hotelController");
const routerHotel = express.Router();

routerHotel.get("/api/hotel/get", getHotel);
routerHotel.post("/api/hotel/add", addHotel);
routerHotel.put("/api/hotel/update/:id", updateHotel);
routerHotel.delete("/api/hotel/delete/:id", deleteHotel);


module.exports = {
  routerHotel,
};
