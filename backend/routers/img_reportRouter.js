const express = require("express");
const { getImgReport, addImgReport, updateImgReport, deleteImgReport } = require("../controllers/img_reportController");
const routerImgHotel = express.Router();

routerImgHotel.get("/api/imgReport/get", getImgReport);
routerImgHotel.post("/api/imgReport/add", addImgReport);
routerImgHotel.put("/api/imgReport/update/:id", updateImgReport);
routerImgHotel.delete("/api/imgReport/delete/:id", deleteImgReport);


module.exports = {
  routerImgHotel,
};
