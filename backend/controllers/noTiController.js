const db = require('../models');
const User = db.User;
const Noti = db.notification;
const sequelize = require('sequelize');
const Op = sequelize.Op


const getFullNoti = async (req, res) => {
    try {
        const noti = await Noti.findAll();
        res.json(noti);
    } catch (error) {
        console.log(error);
    }
}

const getNotiByUser = async (req, res) => {
    try {
        const id = req.pramas.id;
        const user = await User.findByFk(id);
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
    } catch (error) {
        console.log(error);
    }
}

const deleteNoti = async (req, res) => {
    try {
        const {noti_id, user_id} = res.body;

        const noti = await Noti.findOne({ where: {id: noti_id}});
        const user = await User.findOne({ where: {id: user_id}});
        if(!user){

        }else{
            if(!noti){
                
            }else{

            }
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