const db = require("../models");
const Hotel = db.hotel;
const Owner = db.owner;
const User = db.User;
const ImgHotel = db.img_hotel;
const ImgRoom = db.img_room;
const Room = db.room_hotel;
const Rating = db.rating_hotel;
const Report = db.report_hotel;
const Favorate = db.favorate_hotel;
const Coupon = db.coupon_owner;
const Order = db.order;
const OD = db.order_detail;
const sequelize = require('sequelize');
const Op = sequelize.Op

// thống kê số bình luận theo 12 tháng của 1 khách sạn 

//đếm số lượng phòng của các khách sạn
const getRoomHotel = async (req, res) => {
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

// Bao nhiêu khách sạn được tạo ra theo từng tháng
const getHotelForMonth = async (req, res) => {
    try {
        // Lấy năm từ tham số yêu cầu (hoặc sử dụng mặc định nếu không có)
        const year = req.query.year || new Date().getFullYear();

        // Tạo một đối tượng chứa điều kiện tìm kiếm
        const whereCondition = {
            createdAt: {
                [Op.between]: [
                    new Date(`${year}-01-01T00:00:00.000Z`),
                    new Date(`${year}-12-31T23:59:59.999Z`)
                ]
            }
        };

        // Tạo một mảng chứa các tháng trong năm
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        // Thực hiện truy vấn để lấy số lượng khách sạn theo từng tháng
        const monthlyHotelCount = await Hotel.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: whereCondition,
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            raw: true
        });

        // Tạo một đối tượng chứa số lượng khách sạn theo từng tháng, điền giá trị 0 cho những tháng không có dữ liệu
        const result = allMonths.map((month) => ({
            month,
            count: monthlyHotelCount.find((item) => item.month === month)?.count || 0
        }));

        res.json({ monthlyHotelCount: result });
    } catch (error) {
        console.log(error);
    }
}

// Bao nhiêu phòng được tạo ra ở khách sạn đó theo từng tháng trong năm
const roomInMonth = async (req, res) => {
    try {
        const hotel_id = req.query.id;
        // const hotel_id = 5
        // Lấy năm từ tham số yêu cầu (hoặc sử dụng mặc định nếu không có)
        const year = req.query.year || new Date().getFullYear();

        // Thực hiện truy vấn để đếm số lượng theo từng tháng
        const monthlyRoom = await Room.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [
                        new Date(`${year}-01-01T00:00:00.000Z`),
                        new Date(`${year}-12-31T23:59:59.999Z`)
                    ]
                },
                id_hotel: hotel_id
            },
           
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            order: [[sequelize.literal('count DESC')]],
            raw: true
        });

        // Tạo một mảng chứa các tháng trong năm
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        const result = allMonths.map((month) => ({
            month,
            count: monthlyRoom.find((item) => item.month === month)?.count || 0
        }));

        res.json({monthlyRoom: result});
    } catch (error) {
        console.log(error);
    }
}

// Số lượng khách đăng ký trong tung năm
const countUserInYear = async (req, res) => {
    try {
        
        // Tạo một đối tượng chứa điều kiện tìm kiếm
        const whereCondition = {};

        // Thực hiện truy vấn để đếm số lượng người dùng theo từng năm
        const userCountsByYear = await User.findAll({
            attributes: [
                [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: whereCondition,
            group: [sequelize.fn('YEAR', sequelize.col('createdAt'))],
            raw: true
        });

        res.json({ userCountsByYear });
    } catch (error) {
        console.log(error);
    }
}

// Số lượng khách hàng mới đăng ký trong tháng này.
const countUserInMonth = async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();
        // const year = "2023"
        console.log(year)
        const whereCondition = {
            createdAt: {
                [Op.between]: [
                    new Date(`${year}-01-01T00:00:00.000Z`),
                    new Date(`${year}-12-31T23:59:59.999Z`)
                ]
            }
        };

        // Tạo một mảng chứa các tháng trong năm
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        const monthlyUserCount = await User.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: whereCondition,
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            raw: true
        });

        const result = allMonths.map((month) => ({
            month,
            count: monthlyUserCount.find((item) => item.month === month)?.count || 0
        }));

        res.json({ monthlyUserCount: result });
    } catch (error) {
        console.log(error);
    }
}

// Bao nhiêu chủ khách sạn được tạo theo từng tháng trong năm
const countOwnerInMonth = async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();
        // const year = "2023"

        const whereCondition = {
            createdAt: {
                [Op.between]: [
                    new Date(`${year}-01-01T00:00:00.000Z`),
                    new Date(`${year}-12-31T23:59:59.999Z`)
                ]
            }
        };

        // Tạo một mảng chứa các tháng trong năm
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        const monthlyOwnerCount = await Owner.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: whereCondition,
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            raw: true
        });

        // Tạo một đối tượng chứa số lượng khách sạn theo từng tháng, điền giá trị 0 cho những tháng không có dữ liệu
        const result = allMonths.map((month) => ({
            month,
            count: monthlyOwnerCount.find((item) => item.month === month)?.count || 0
        }));

        res.json({ monthlyOwnerCount: result });
    } catch (error) {
        console.log(error);
    }
}

// số lượng hóa đơn theo từng tháng trong năm
const orderInMonth = async (req, res) => {
    try {
        const hotel_id = req.query.id;
        // const hotel_id = 5;

        // Lấy năm từ tham số yêu cầu (hoặc sử dụng mặc định nếu không có)
        const year = req.query.year || new Date().getFullYear();

        // Thực hiện truy vấn để đếm số lượng hóa đơn theo từng tháng
        const monthlyOrder = await Order.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('order.createdAt')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('order.id')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [
                        new Date(`${year}-01-01T00:00:00.000Z`),
                        new Date(`${year}-12-31T23:59:59.999Z`)
                    ]
                }
            },
            include: [
                {
                  model: User,
                  attributes: ["id", "fullname"]
                },
                {
                  model: OD,
                  attributes: ["id", "id_order", "id_room"],
                  required: true,
                  include: [
                    {
                      model: Room,
                      attributes: ["id", "id_hotel"],
                      where: { id_hotel: hotel_id },
                      required: true,
                    }
                  ]
                }
              ],
           
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            order: [[sequelize.literal('count DESC')]],
            raw: true
        });

        // Tạo một mảng chứa các tháng trong năm
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        const result = allMonths.map((month) => ({
            month,
            count: monthlyOrder.find((item) => item.month === month)?.count || 0
        }));

        res.json({ monthlyOrder: result });
        
    } catch (error) {
        console.log(error)
    }
}

// Số tiền tháng này khách sạn kiếm được  
const castHotelInMonth = async (req, res) => {
    try {
        const hotel_id = req.query.id;
        // const hotel_id = 7
        const year = req.query.year || new Date().getFullYear();

        const monthlyRevenue = await Order.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('order.createdAt')), 'month'],
                [sequelize.fn('SUM', sequelize.col('total_bank')), 'totalBank']
            ],
            where: {
                createdAt: {
                    [Op.between]: [
                        new Date(`${year}-01-01T00:00:00.000Z`),
                        new Date(`${year}-12-31T23:59:59.999Z`)
                    ]
                }
            },
            include: [
                {
                  model: User,
                  attributes: ["id", "fullname"]
                },
                {
                  model: OD,
                  attributes: ["id", "id_order", "id_room"],
                  required: true,
                  include: [
                    {
                      model: Room,
                      attributes: ["id", "id_hotel"],
                      where: { id_hotel: hotel_id },
                      required: true,
                    }
                  ]
                }
              ],
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            raw: true
        });

        // Tạo một mảng chứa các tháng trong năm
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        const result = allMonths.map((month) => ({
            month,
            totalBank: monthlyRevenue.find((item) => item.month === month)?.totalBank || 0
        }));
        
        res.json({monthlyRevenue: result});

    } catch (error) {
        console.log(error);
    }
};

// Khách sạn tạo được bao nhiêu coupon trong tháng này
const couponHotelInMonth = async (req, res) => {
    try {
        const hotel_id = req.query.id;
        // const hotel_id = 8;
        const year = req.query.year || new Date().getFullYear();

        const monthlyCoupon = await Coupon.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [
                        new Date(`${year}-01-01T00:00:00.000Z`),
                        new Date(`${year}-12-31T23:59:59.999Z`)
                    ]
                },
                id_hotel: hotel_id
            },
           
            group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
            order: [[sequelize.literal('count DESC')]],
            raw: true
        });

        // Tạo một mảng chứa các tháng trong năm
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

        const result = allMonths.map((month) => ({
            month,
            count: monthlyCoupon.find((item) => item.month === month)?.count || 0
        }));

        res.json({monthlyCoupon: result});
    } catch (error) {
        console.log(error);
    }
}

const countRatingHotel = async (req, res) => {
    try {
        // đếm số lượng phòng của khách sạn
        const hotels = await Hotel.findAll({
            attributes: ['id', 'name_hotel'],
        });

        const arrayCount = []
        for (const hotel of hotels) {
            const count = await Rating.count({
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
    getRoomHotel,
    getHotelForMonth,
    roomInMonth,
    countUserInYear,
    countUserInMonth,
    countOwnerInMonth,
    orderInMonth,
    castHotelInMonth,
    couponHotelInMonth,
    countRatingHotel,
}