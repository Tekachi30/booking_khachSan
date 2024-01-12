const db = require("../models");
const Hotel = db.hotel;
const Owner = db.owner;
const ImgHotel = db.img_hotel;
const ImgRoom = db.img_room;
const Room = db.room_hotel;
const Rating = db.rating_hotel;
const Report = db.report_hotel;
const Favorate = db.favorate_hotel;
const coupon = db.coupon_owner;
const Order = db.order;
const OD = db.order_detail;
const sequelize = require('sequelize');
const Op = sequelize.Op

// thống kê số bình luận theo 12 tháng của 1 khách sạn 

//test
const getOwner = async (req, res) => {
    try {
        // đếm số lượng phòng của khách sạn
        const hotels = await Hotel.findAll({
            attributes: ['id', 'name_hotel'],
        });

        const arrayCount = []
        for (const hotel of hotels) {
            const count = await Room.count({
                where: { id_hotel: hotel.id }
            })
            arrayCount.push(
                {
                    count:count,
                    name_hotel:hotel.name_hotel
                }
            )
        }
        res.json(arrayCount)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getOwner
}