const db = require('../models');
const Order = db.order;
const User = db.User;
const Hotel = db.hotel;

const getOrder = async (req, res) => {
    try {
        const order = await Order.findAll({
            include:[
                {model: Hotel, attributes: ['id_owner','name_hotel']},
                {model: User, attributes: ['Fullname']}
            ]
        });
        res.json(order);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getOrder,
}