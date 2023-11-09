const express = require("express");
const { loginAmin } = require("../controllers/adminController");
const routerAdmin = express.Router();

routerAdmin.post("/api/admin/login", loginAmin);


module.exports = {
  routerAdmin,
};
