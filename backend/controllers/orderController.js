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

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const existOrder = await Order.findByPk(id);
        if(!existOrder){
            return res.status(201).json({ message: "Hóa đơn không tồn tại." });
        }else{
            if(existOrder.status == status){
                return res.status(201).json({ message: `Hiện đang ở trạng thái ${status}, không lặp lại trạng thái.` });
            }else{
                if (
                    (existOrder.status == "Đã Đặt" && (status == "Đã Thanh Toán" || status == "Đã Hủy")) ||
                    (existOrder.status == "Đã Thanh Toán" && (status == "Đã Trả Phòng" || status == "Đã Hủy"))
                ) {
                    await existOrder.update({ status: status });
                    return res.status(200).json({ message: "Cập nhật thành công." });
                } else {
                    return res.status(201).json({ message: "Không thể thực hiện chuyển đổi trạng thái này." });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

/*
   1: hiện đang ở trạng thái đó. không lặp lại trạng thái.
   đã đặt -> đã thanh toán -> đã trả phòng (hoặc đã hủy) 

*/

module.exports = {
    getOrder,
    updateOrder,
}