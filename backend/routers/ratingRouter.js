const express = require("express");
const { getRating, searchRating } = require("../controllers/ratingController");
const routerRating = express.Router();

routerRating.get("/api/rating/get", getRating);

routerRating.post("/api/rating/search", searchRating);



module.exports = {
    routerRating,
};
