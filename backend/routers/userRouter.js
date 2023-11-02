const express = require("express");
const { register, login, getUser, getUserById } = require("../controllers/userConrtroller");
const routerUser = express.Router();

routerUser.post("/api/user/login", login);
routerUser.post("/api/user/register", register);

routerUser.get("/api/user/get", getUser);
routerUser.get("/api/user/get", getUserById)


module.exports = {
  routerUser,
};
