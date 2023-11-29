const express = require("express");
const { getReport, searchReport } = require("../controllers/reportController");
const routerReport = express.Router();

routerReport.get("/api/report/get", getReport);

routerReport.post("/api/report/search", searchReport);



module.exports = {
    routerReport,
};
