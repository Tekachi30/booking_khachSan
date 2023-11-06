const express = require("express");
const { getBanner, addBanner, updateBanner, deleteBanner } = require("../controllers/bannerController");
const routerBanner = express.Router();

routerBanner.get("/api/banner/getBanner", getBanner);
routerBanner.post("/api/banner/addBanner", addBanner);
routerBanner.get("/api/banner/uppdateBanner/:id", updateBanner);
routerBanner.get("/api/banner/deleteBanner/:id", deleteBanner);



module.exports = {
    routerBanner,
};
