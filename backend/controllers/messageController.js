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

const addMessage = async (req, res) => {
    try {
        const { messager } = req.body;

        if (messager.length > 1000) {
            return res.status(400).json({ message: "Nội dung tin nhắn quá dài" });
        }else{
            const chat = await Message.create({
                messager: messager,
                deleted: false
            });
            res.status(200).json(chat.id);
            res.io.emit("chat", chat);
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitMessage = await Message.findByPk(id);
        if(exsitMessage){
            await exsitMessage.destroy();
        }else{
            return res.status(400).json({ message: "không tìm thấy tin nhắn." });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMessage,
    addMessage,
    deleteMessage,
}