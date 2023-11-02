const express = require("express");
const { getHotel, getHotelById } = require("../controllers/hotelController");
const routerHotel = express.Router();

routerHotel.get("/api/hotel/get", getHotel);
routerHotel.get("/api/hotel/get", getHotelById)


module.exports = {
  routerHotel,
};
