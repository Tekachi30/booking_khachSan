const express = require("express");
const {updateImgRating, addImgRating, getImgRating, deleteImgRating } = require("../controllers/img_ratingController");
const routerImgHotel = express.Router();

routerImgHotel.get("/api/imgHotel/get", getImgRating);
routerImgHotel.post("/api/imgHotel/add", addImgRating);
routerImgHotel.put("/api/imgHotel/update/:id", updateImgRating);
routerImgHotel.delete("/api/imgHotel/delete/:id", deleteImgRating);


module.exports = {
  routerImgHotel,
};
