const db = require('../models');
const User = db.User;
const Noti = db.notification;
const sequelize = require('sequelize');
const Op = sequelize.Op


const getFullNoti = async (req, res) => {
    try {
        const noti = await Noti.findAll({
            include: [
                { model: User, attributes: ["fullname"] },
              ],
        });
        res.json(noti);
    } catch (error) {
        console.log(error);
    }
}

const getNotiByUser = async (req, res) => {
    try {
        
        const id = req.params.id;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(201).json({ message: 'Không tồn tại user.' });
        }else{
            const noti = await Noti.findAll(
                {
                    where: { id_user: user.id } 
                }
            );
            res.json(noti);
        }
    } catch (error) {
        console.log(error);
    }
}

const addNoti = async (req, res) => {
    try {
        const { title_noti, content_noti } = req.body

        const users = await User.findAll();
        for(const user of users){
            const notification = await Noti.create({
                title_noti: title_noti,
                content_noti: content_noti,
                id_user: user.id
            });
            res.io.emit('notification', notification);
        }
        res.json({message:"Thêm thông báo thành công."})
    } catch (error) {
        console.log(error);
    }
}

const deleteNoti = async (req, res) => {
    try {
        const id = req.params.id;
        const noti = await Noti.findByPk(id);
            if(!noti){
                return res.status(201).json({ message: 'Không tồn tại thông báo.' });
            }else{
                noti.destroy();
                return res.status(200).json({ message: 'Xóa thành công.' });
            }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getFullNoti,
    getNotiByUser,
    addNoti,
    deleteNoti,
}