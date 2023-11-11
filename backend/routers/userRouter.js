const express = require("express");
const { register, login, getUser, getUserById, updateUser, deleteUser } = require("../controllers/userConrtroller");
const routerUser = express.Router();

routerUser.post("/api/user/login", login);
routerUser.post("/api/user/register", register);

routerUser.get("/api/user/get", getUser);
routerUser.get("/api/user/getById/:id", getUserById);

routerUser.put("/api/user/update/:id", updateUser);
routerUser.delete("/api/user/delete/:id", deleteUser);


module.exports = {
  routerUser,
};
