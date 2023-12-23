const express = require("express");
const { getRating, searchRating, addRating, getRatingAll } = require("../controllers/ratingController");
const routerRating = express.Router();

routerRating.get("/api/rating/get/", getRatingAll);
routerRating.get("/api/rating/get/:id", getRating);

routerRating.post("/api/rating/add/:id", addRating);
routerRating.post("/api/rating/search", searchRating);



module.exports = {
    routerRating,
};
