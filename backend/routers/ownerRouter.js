const express = require("express");
const { getOwner, updateOwner, addOwner, deleteOwner, loginOwner, searchOwner } = require("../controllers/ownerController");
const routerOwner = express.Router();

routerOwner.get("/api/owner/get", getOwner);

routerOwner.post("/api/owner/add", addOwner);
routerOwner.post("/api/owner/login", loginOwner);
routerOwner.post("/api/owner/search", searchOwner);

routerOwner.put("/api/owner/update/:id", updateOwner);

routerOwner.delete("/api/owner/delete/:id", deleteOwner);



module.exports = {
    routerOwner,
};
