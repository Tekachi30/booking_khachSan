const db = require("../models");
const Hotel = db.hotel;

const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findAll();
        res.status(200).json(hotel);
    } catch (error) {
        console.log(error);
    }
}
 


module.exports = {
    getHotel,
    
}