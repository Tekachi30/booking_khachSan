const express = require("express");
const { getMessage } = require("../controllers/messageController");
const routerMessage = express.Router();

routerMessage.get("/api/message/get", getMessage)


module.exports = {
    routerMessage,
};
