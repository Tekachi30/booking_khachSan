const express = require("express");
const { getBanner, addBanner, updateBanner, deleteBanner, searchBanner } = require("../controllers/bannerController");
const routerBanner = express.Router();

routerBanner.get("/api/banner/get", getBanner);

routerBanner.post("/api/banner/add", addBanner);
routerBanner.post("/api/banner/search", searchBanner);

routerBanner.put("/api/banner/update/:id", updateBanner);

routerBanner.delete("/api/banner/delete/:id", deleteBanner);



module.exports = {
    routerBanner,
};
