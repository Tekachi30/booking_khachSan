const express = require("express");
const { getCoupon, addCoupon, updateCoupon, deleteCoupon } = require("../controllers/couponController");
const routerCoupon = express.Router();

routerCoupon.get("/api/coupon/get", getCoupon);
routerCoupon.post("/api/coupon/add/:id", addCoupon);
routerCoupon.put("/api/coupon/update/:id", updateCoupon);
routerCoupon.delete("/api/coupon/delete/:id", deleteCoupon);


module.exports = {
  routerCoupon,
};
