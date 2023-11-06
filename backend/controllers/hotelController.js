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

const addHotel = async (req, res) => {
    try {
        const { name_hotel, address, city_code, district_code, ward_code, imformation} = req.body;
        const exsitName_hotel = await Hotel.findOne({ where: {name_hotel: name_hotel}});
        if(!exsitName_hotel){
            res.status(400).json({messsage: 'Tên Khách sạn đã được sử dụng.'});
        }else{
            await Hotel.create({
                name_hotel: name_hotel,
                address: address,
                city_code: city_code,
                district_code: district_code,
                ward_code: ward_code,
                imformation: imformation
            })
            res.status(200).json({messsage: 'Thêm khách sạn thành công.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const updateHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitHotel  = await Hotel.findByPk(id);
        const exsitName_hotel = await Hotel.findOne({ where: {name_hotel: name_hotel}}); 
        if(exsitHotel){
            if(!exsitName_hotel){
                exsitHotel.name_hotel = name_hotel,
                exsitHotel.address = address,
                exsitHotel.city_code = city_code,
                exsitHotel.district_code
                await exsitHotel.save();
            }else{
                res.status(200).json({messsage: 'Tên Khách sạn đã được sử dụng.'});
            }
        }else{
            res.status(200).json({messsage: 'Khách sạn không tồn tại.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitHotel  = await Hotel.findByPk(id);
        if(exsitHotel){
            await exsitHotel.destroy();
        }else{
            res.status(200).json({messsage: 'Khách sạn không tồn tại.'});
        }
    } catch (error) {
        console.log(error);
    }
}
 


module.exports = {
    getHotel,
    addHotel,
    updateHotel
}