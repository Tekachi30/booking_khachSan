const express = require("express");
const { getReport } = require("../controllers/reportController");
const routerReport = express.Router();

routerReport.get("/api/report/getReport", getReport);


module.exports = {
    routerReport,
};
