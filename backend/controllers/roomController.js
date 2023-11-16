const db = require('../models');
const Room = db.room_hotel;
const ImgRoom = db.img_room;
const Hotel = db.hotel;
const Owner = db.owner;


const getRoom = async (req, res) => {
    try {
        const room = await Room.findAll({
            include:[
                {model: ImgRoom, attributes: ['id', 'name_img', 'url', 'id_room']},
            ]
        });
        res.json(room);
    } catch (error) {
        console.log(error);
    }
}

const getRoomByHotel = async (req, res) => {
    try {
        const room = await Room.findAll({
            include:[
                {model: ImgRoom, attributes: ['id', 'name_img', 'url', 'id_room']},
                {model: Hotel, attributes: ['id','fullname'], where: { id: idOwner }}, 
            ]
        });
        res.json(room);
    } catch (error) {
        console.log(error);
    }
}

const addRoom = async (req, res) => {
    try {
        const { id_hotel,type_room,book_status,price } = req.body;
        await Room.create({
            id_hotel: id_hotel,
            type_room: type_room,
            book_status: book_status,
            price: price,
        })
        return res.status(200).json({message: 'Thêm phòng thành công.'});
    } catch (error) {
        console.log(error);
    }
}

const updateRoom = async (req, res) => {
    try {
        const id = req.pramas.id;
        const existRoom = await Room.findByPk(id);
        const { type_room,book_status,price } = req.body;
        if(!existRoom){
            return res.status(201).json({message: 'Không tìm thấy phòng.'});
        }else{
            await Room.update({
                type_room: type_room,
                book_status: book_status,
                price: price,
            })
            return res.status(200).json({message: 'Thêm phòng thành công.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteRoom = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getRoom,
    addRoom,
    updateRoom,
    deleteRoom,
}