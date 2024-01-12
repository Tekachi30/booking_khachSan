const express = require("express");
const { getOwner } = require("../controllers/dashboardController");
const routerDashboard = express.Router();

//routerDashboard.get("", );
routerDashboard.get("/api/dashboard/getOwner", getOwner)

module.exports = {
    routerDashboard,
};
 