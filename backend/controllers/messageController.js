const db = require("../models");
const Message = db.messager;
const User = db.User;
const Owner = db.owner;

const getMessage = async (req, res) => {
    try {
        const message = await Message.findAll();
        res.json(message);
    } catch (error) {
        console.log(error);
    }
}

const getHistoryMessage = async (req, res) => {
    try {
        const { id_user, id_owner} = req.body;
        const message = await Message.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id","fullname"],
                    where: {id: id_user}
                },
                {
                    model: Owner,
                    attributes: ["id","fullname"],
                    where: {id: id_owner}
                }
            ],
        });
        res.json(message);
    } catch (error) {
        console.log(error);
    }
}

const getRoomChat = async (req, res) => {
    try {
        const id_owner = req.params.id;
        const listUser = await Message.findAll({
            attributes: [],
            include: [
                {
                    model: User,
                    attributes: ['id', 'fullname'],
                },
            ],
            where: { id_owner: id_owner },
            raw: true, // Ensure that the result is in raw format for better manipulation
            nest: true, // Nest the result to make it easier to work with
        });

        // Filter out duplicate users based on 'User.id'
        const uniqueUsers = listUser.reduce((acc, message) => {
            const user = message.User;
            if (!acc.some((u) => u.id === user.id)) {
                acc.push(user);
            }
            return acc;
        }, []);

        res.json(uniqueUsers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const addMessage = async (req, res) => {
    try {
        const { messager, id_user, id_owner, check_send } = req.body;

        if (messager.length > 1000) {
            return res.status(400).json({ message: "Nội dung tin nhắn quá dài" });
        }else{
            const chat = await Message.create({
                messager: messager,
                deleted: false,
                id_owner: id_owner,
                id_user: id_user,
                check_send: check_send,
            });
            res.status(200).json(chat.id);
            const message = await Message.findOne({
                where:{id:chat.id},
                include: [
                    {
                        model: User,
                        attributes: ["id","fullname"],
                        where: {id: id_user}
                    },
                    {
                        model: Owner,
                        attributes: ["id","fullname"],
                        where: {id: id_owner}
                    }
                ],
            });
            res.io.emit("chat", message);
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
    getHistoryMessage,
    getRoomChat,
    addMessage,
    deleteMessage,
}