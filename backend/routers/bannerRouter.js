const express = require("express");
const { getBanner, addBanner, updateBanner, deleteBanner } = require("../controllers/bannerController");
const routerBanner = express.Router();

routerBanner.get("/api/banner/get", getBanner);
routerBanner.post("/api/banner/add", addBanner);
routerBanner.put("/api/banner/update/:id", updateBanner);
routerBanner.delete("/api/banner/delete/:id", deleteBanner);



module.exports = {
    routerBanner,
};
