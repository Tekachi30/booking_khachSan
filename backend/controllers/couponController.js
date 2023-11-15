const db = require("../models");
const Coupon = db.coupon_owner;
const Hotel = db.hotel;

const getCoupon= async (req, res) => {
    try {
        const coupon = await Coupon.findAll({
            include:[
                {model: Hotel, attributes: ['id_owner','name_hotel']},
            ]
        });
        res.json(coupon);
    } catch (error) {
        console.log(error);
    }
}

const addCoupon= async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const updateCoupon= async (req, res) => {
    try {
        const id = req.params.id;
        const { code_coupon, discount } = req.body;
        const existCoupon = await Coupon.findByPk(id);
        if(!existCoupon){
            return res.status(404).json({message: 'Không tìm thấy mã.'});
          }else{
            await existCoupon.update({
                code_coupon: code_coupon, discount: discount
            });
            return res.status(200).json({message: 'Cập nhật mã thành công.'});
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
          return res.status(404).json({message: 'Không tìm thấy mã.'});
        }else{
            await existCoupon.destroy();
            return res.status(200).json({message: 'Xóa mã thành công.'});
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