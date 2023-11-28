const db = require("../models");
const Hotel = db.hotel;
const Order = db.order;
const OD = db.order_detail;
const Room = db.room_hotel;
const Rating = db.rating_hotel;
const sequelize = require('sequelize');
const Op = sequelize.Op
const dayjs = require('dayjs');

// tính điểm của hotel
const final_score = async () => {
    try {
        // Tính điểm theo rating
        const hotel_rating = await Hotel.findAll({
            attributes: ['id'],
            include: [
                { model: Rating, attributes: ['id_hotel', 'score_rating'] }
            ]
        })
        /*
       totalScore = 0;
       score_rating >= 3 && score_rating < 4 => totalScore = 1;
       score_rating >= 4 && score_rating < 5 => totalScore = 2;
       score_rating = 5  => totalScore = 3;
       score_rating <= 2 => totalScore = -5;
       score_rating <= 1 => totalScore = -10;
       */
        // Tính toán totalScore cho từng khách sạn
        const hotelWithTotalScore = hotel_rating.map((hotel) => { // lặp qua từng khách sạn trong mảng hotels
            const totalScore = hotel.rating_hotels.reduce((acc, rating) => {
                const score_rating = rating.score_rating;

                if (score_rating >= 3 && score_rating < 4) {
                    return acc + 1;
                } else if (score_rating >= 4 && score_rating < 5) {
                    return acc + 2;
                } else if (score_rating === 5) {
                    return acc + 3;
                } else if (score_rating <= 2) {
                    return acc - 1;
                } else if (score_rating === 1) {
                    return acc - 2;
                }
                return acc;
            }, 0);

            return {
                id: hotel.id,
                totalScore: totalScore
            };
        });

        // deleteHotel sao cho xóa luôn được order
        // truy từ order => order_detail => room_hotel => hotel
        // Tính điểm theo hóa đơn
        const hotels = await Hotel.findAll({
            include: [
              {
                model: Room,
                include: {
                  model: OD,
                  include: Order,
                },
              },
            ],
          });
      
          const hotel_orders = hotels.map((hotel) => ({ //lặp qua từng khách sạn trong mảng hotels
            id: hotel.id,
            // flatMap được sử dụng để làm phẳng các mảng lồng nhau.
            orderCount: hotel.room_hotels.flatMap((room) => room.order_details.map((detail) => detail.order)).length, //  Ánh xạ qua từng phòng, sau đó qua từng chi tiết đơn đặt phòng trong phòng đó, và cuối cùng trích xuất thông tin về đơn đặt từ mỗi chi tiết.
          }));
       
        const finalScore = hotelWithTotalScore.map((hotel) => {
            const totalScore = hotel.totalScore;
            const orderCount = hotel_orders.find(hotelOrder => hotelOrder.id === hotel.id)?.orderCount || 0;

            const score_final = totalScore + orderCount;

            return {
                id_hotel: hotel.id,
                finalScore: score_final
            };
        });
        return finalScore
    } catch (error) {
        console.log(error)
    }
}

// tính level của hotel 
const result_math_level = (X, point) => {
    /*
    Cách tính level
    + Tạo ra một biến delta = X
        + Level 0: point < delta => Đây là mức level khi mới tạo khách sạn và phát triển ngắn hạn mặc định tạo ra ở level 0 và point = 0
        + Từ level tiếp theo nghĩa là level 1 : level = Math.floor((point) / delta);
    */
    const delta = X;
    let level = 0; // Change const to let

    if (point < delta) {
        level = 0;
    } else {
        level = Math.floor(point / delta);
    }

    return level;
};

// Thực hiện ghi lên table mathlevel
const mathLevel = async (req, res) => {
    try {
        const points = await final_score();
        const get_mathLevel = await Hotel.findAll();
        const array_mathLevel = get_mathLevel.map(math => ({
            level: math.level,
            point: math.point,
            id: math.id
        }))
        for (let i = 0; i < points.length; i++) {
            let hotelExists = false;
            for (let x = 0; x < array_mathLevel.length; x++) {
                if (points[i].id == array_mathLevel[x].id) {
                    hotelExists = true;
                    const level = result_math_level(2, points[i].finalScore)
                    await Hotel.update({
                        level: level,
                        point: points[i].point,
                    }, {
                        where: {
                            id: array_mathLevel[x].id,
                        }
                    })
                    break; 
                }
            }
            if (!hotelExists) {
                const level = result_math_level(2, points[i].finalScore)
                const createdMathLevel = await Hotel.create({
                    level: level,
                    point: points[i].finalScore,
                });
            }
        }
        console.log('Hoàn thành cập nhập');
    } catch (error) {
        console.log(error);
    }
}

const test = () =>{
    console.log('test')
}

module.exports = {
    test,
    mathLevel,
    final_score
}