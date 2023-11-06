const db = require("../models");
const Message = db.messager;

const getMessage = async (req, res) => {
    try {
        const message = await Message.findAll();
        res.json(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMessage,
}