const express = require("express");
const { register, login, getUser, getUserById, updateUser, deleteUser } = require("../controllers/userConrtroller");
const routerUser = express.Router();

routerUser.post("/api/user/login", login);
routerUser.post("/api/user/register", register);

routerUser.get("/api/user/getUser", getUser);
routerUser.get("/api/user/getUserById/:id", getUserById);

routerUser.put("/api/user/updateUser/:id", updateUser);
routerUser.delete("/api/user/deleteUser/:id", deleteUser);


module.exports = {
  routerUser,
};
