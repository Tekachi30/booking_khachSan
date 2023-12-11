const express = require("express");
const { getReport, searchReport, addReport } = require("../controllers/reportController");
const routerReport = express.Router();

routerReport.get("/api/report/get", getReport);

routerReport.post("/api/report/add/:id", addReport);
routerReport.post("/api/report/search", searchReport);



module.exports = {
    routerReport,
};
