const express = require("express");
const { getOwner, updateOwner, addOwner, deleteOwner } = require("../controllers/ownerController");
const routerOwner = express.Router();

routerOwner.get("/api/owner/getOwner", getOwner);
routerOwner.post("/api/owner/addOwner", addOwner);
routerOwner.put("/api/owner/updateOwner/:id", updateOwner);
routerOwner.delete("/api/owner/deleteOwner/:id", deleteOwner);



module.exports = {
    routerOwner,
};
