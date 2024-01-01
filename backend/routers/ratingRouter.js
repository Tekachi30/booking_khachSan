const express = require("express");
const { getRating, searchRating, addRating, getRatingAll ,getByHotel,getTopRating} = require("../controllers/ratingController");
const routerRating = express.Router();

routerRating.get("/api/rating/get/", getRatingAll);
routerRating.get("/api/rating/get/:id",getByHotel);

routerRating.get("/api/rating/get/:id", getRating);

routerRating.post("/api/rating/add/:id", addRating);
routerRating.post("/api/rating/search", searchRating);

routerRating.get("/api/rating/top",getTopRating)

module.exports = {
    routerRating,
};
