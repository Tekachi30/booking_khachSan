const express = require("express");
const { getHotel, addHotel, updateHotel, deleteHotel, getHotelByOwner, addImgHotel, updateImgHotel, deleteImgHotel, getHotelNon, getHotelId,searchHotel ,HotelFavorate,renderFavorate} = require("../controllers/hotelController");
const routerHotel = express.Router();

routerHotel.get("/api/hotel/get", getHotel);
routerHotel.get("/api/hotel/get/:id", getHotelByOwner)
routerHotel.get("/api/hotel/get_non/:id",getHotelNon)
routerHotel.get("/api/hotel/getid/:id", getHotelId)
routerHotel.post("/api/hotel/search",searchHotel)

routerHotel.post("/api/hotel/add/:id", addHotel);
routerHotel.post("/api/hotel/addImg/:id", addImgHotel);

routerHotel.put("/api/hotel/update/:id", updateHotel);
routerHotel.put("/api/hotel/updateImg/:id", updateImgHotel);


routerHotel.delete("/api/hotel/delete/:id", deleteHotel);
routerHotel.delete("/api/hotel/deleteImg/:id", deleteImgHotel);

routerHotel.post("/api/favorate/handle",HotelFavorate);
routerHotel.get("/api/favorate/get",renderFavorate);

module.exports = {
  routerHotel,
};
