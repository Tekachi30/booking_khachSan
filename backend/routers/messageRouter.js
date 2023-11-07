const express = require("express");
const { getMessage } = require("../controllers/messageController");
const routerMessage = express.Router();

routerMessage.get("/api/message/getMessage", getMessage)


module.exports = {
    routerMessage,
};
