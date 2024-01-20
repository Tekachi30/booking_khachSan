const express = require("express");
const { getMessage, getHistoryMessage, addMessage, getRoomChat, deleteMessage } = require("../controllers/messageController");
const routerMessage = express.Router();

routerMessage.get("/api/message/get", getMessage)
routerMessage.post("/api/message/add", addMessage)
routerMessage.get("/api/message/getRoom/:id", getRoomChat)
routerMessage.post("/api/message/getHistory", getHistoryMessage)

routerMessage.delete("/api/message/delete/:id", deleteMessage);


module.exports = {
    routerMessage,
};
