const express = require("express");
const { addImgHotel, getImgHotel, deleteImgHotel, updateImgHotel } = require("../controllers/img_hotelController");
const routerImgHotel = express.Router();

routerImgHotel.get("/api/imgHotel/get", getImgHotel);
routerImgHotel.post("/api/imgHotel/add", addImgHotel);
routerImgHotel.put("/api/imgHotel/update/:id", updateImgHotel);
routerImgHotel.delete("/api/imgHotel/delete/:id", deleteImgHotel);


module.exports = {
  routerImgHotel,
};
