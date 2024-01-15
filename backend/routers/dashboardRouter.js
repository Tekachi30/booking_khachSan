const express = require("express");
const { getRoomHotel, getHotelForMonth, countUserInYear, countUserInMonth, countOwnerInMonth,
    orderInMonth, roomInMonth, castHotelInMonth, couponHotelInMonth, countRatingHotel } = require("../controllers/dashboardController");
const routerDashboard = express.Router();

//routerDashboard.get("", );
routerDashboard.get("/api/dashboard/getRoomHotel", getRoomHotel);
routerDashboard.get("/api/dashboard/getHotelForMonth", getHotelForMonth);
routerDashboard.get("/api/dashboard/countUserInYear", countUserInYear);
routerDashboard.get("/api/dashboard/countUserInMonth", countUserInMonth);
routerDashboard.get("/api/dashboard/countRatingHotel", countRatingHotel);

routerDashboard.get("/api/dashboard/countOwnerInMonth", countOwnerInMonth);
routerDashboard.get("/api/dashboard/orderInMonth", orderInMonth);
routerDashboard.get("/api/dashboard/roomInMonth", roomInMonth);
routerDashboard.get("/api/dashboard/castHotelInMonth", castHotelInMonth);
routerDashboard.get("/api/dashboard/couponHotelInMonth", couponHotelInMonth);


module.exports = {
    routerDashboard,
};
 