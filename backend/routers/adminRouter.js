const express = require("express");
const { loginAmin } = require("../controllers/adminController");
const routerAdmin = express.Router();

routerAdmin.get("/api/admin/loginAdmin", loginAmin);


module.exports = {
  routerAdmin,
};
