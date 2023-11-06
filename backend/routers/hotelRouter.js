const express = require("express");
const { getHotel, addHotel, updateHotel, deleteHotel } = require("../controllers/hotelController");
const routerHotel = express.Router();

routerHotel.get("/api/hotel/getHotel", getHotel);
routerHotel.post("/api/hotel/addHotel", addHotel);
routerHotel.put("/api/hotel/updateHotel/:id", updateHotel);
routerHotel.delete("/api/hotel/deleteHotel/:id", deleteHotel);


module.exports = {
  routerHotel,
};
