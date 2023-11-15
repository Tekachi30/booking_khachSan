const express = require("express");
const { getRating } = require("../controllers/ratingController");
const routerRating = express.Router();

routerRating.get("/api/rating/get", getRating);


module.exports = {
    routerRating,
};
