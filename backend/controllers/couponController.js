const db = require("../models");
const Coupon = db.coupon_owner;
const Hotel = db.hotel;


const getCoupon= async (req, res) => {
    try {
        const id = req.params.id;
        const coupon = await Coupon.findAll({
            //where:{id_hotel:id},
            include:[
                {model: Hotel, attributes: ['id_owner','name_hotel']},
            ]
        });
        res.json(coupon);
    } catch (error) {
        console.log(error);
    }
}

const addCoupon = async (req, res) => {
    try {
        const id = req.params.id;
        const { code_coupon, discount, date_coupon } = req.body;
        const existHotel = await Hotel.findByPk(id);
        // check id hotel
        if(existHotel){ 
            await Coupon.create({
                code_coupon: code_coupon,
                discount: discount,
                date_coupon: date_coupon,
                id_hotel: id
            });
            return res.status(200).json({message: 'Thêm thành công.'});
        }else{
            return res.status(201).json({message: 'Không tìm thấy khách sạn.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const updateCoupon= async (req, res) => {
    try {
        const id = req.params.id;
        const { code_coupon, discount, date_coupon } = req.body;
        const existCoupon = await Coupon.findByPk(id);
        if(!existCoupon){
            return res.status(201).json({message: 'Không tìm thấy mã.'});
          }else{
            await existCoupon.update({
                code_coupon: code_coupon, discount: discount, date_coupon: date_coupon
            });
            return res.status(200).json({message: 'Cập nhật thành công.'});
          }
    } catch (error) {
        console.log(error);
    }
}

const deleteCoupon= async (req, res) => {
    try {
        const id = req.params.id;
        const existCoupon = await Coupon.findByPk(id);
        if(!existCoupon){
          return res.status(201).json({message: 'Không tìm thấy mã.'});
        }else{
            await existCoupon.destroy();
            return res.status(200).json({message: 'Xóa thành công.'});
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon,
}