const db = require('../models');
const Rating = db.rating_hotel;
const User = db.User;
const Hotel = db.hotel;
const Owner = db.owner
const sequelize = require('sequelize');
const Op  = sequelize.Op

const getRatingAll = async (req, res) => {
  try {
      const rating = await Rating.findAll({
          include:[
              {model: Hotel, attributes: ['name_hotel'],},
              {model: User, attributes: ['fullname']}
          ]
      });
      res.json(rating);
  } catch (error) {
      console.log(error);
  }
}

const getRating = async (req, res) => {
    try {
      const ownerId = req.params.id;
        const rating = await Rating.findAll({
            include:[
                {
                  model: Hotel, attributes: ['name_hotel'],
                  include: [{
                    model: Owner, 
                    attributes: [],
                    where: { id: ownerId }
                  }]
                },
                {model: User, attributes: ['fullname']}
            ]
        });
        res.json(rating);
    } catch (error) {
        console.log(error);
    }
}

const getByHotel = async(req,res)=>
{
try {
  const id = req.params.id
  const stars = [1, 2, 3, 4, 5];
const ratingStatistics = [];

for (const star of stars) {
  const countResult = await Rating.count({
    where: {
      score_rating: {
        [sequelize.Op.and]: [
          { [sequelize.Op.gte]: star }, // Điểm đánh giá lớn hơn hoặc bằng mức sao hiện tại
          { [sequelize.Op.lt]: star + 1 } // Điểm đánh giá nhỏ hơn mức sao tiếp theo
        ]
      }
    }
  });

  const averageResult = await Rating.findAll({
    attributes: [[sequelize.fn('SUM', sequelize.col('score_rating')), 'total_score']],
    where: {
      score_rating: {
        [sequelize.Op.and]: [
          { [sequelize.Op.gte]: star }, // Điểm đánh giá lớn hơn hoặc bằng mức sao hiện tại
          { [sequelize.Op.lt]: star + 1 } // Điểm đánh giá nhỏ hơn mức sao tiếp theo
        ]
      }
    },
    raw: true
  });

  const totalScore = averageResult[0].total_score;
  const averageScore = totalScore / countResult;
 
  ratingStatistics.push({
    star,
    count: countResult,
    average_score: averageScore
  });
}
const overallAverage = ratingStatistics.reduce((acc, rating) => acc + rating.average_score, 0) / ratingStatistics.length;
res.json({ratingStatistics,
  overallAverage});
} catch (error) {
  console.log(error)
}
}

const addRating = async (req, res) => {
  try {
    const id = req.params.id;
    const {id_hotel ,score_rating, comment_rating} = req.body;
    const existUser = User.findByPk(id);
    if(!existUser){
      return res.status(201).json({message: 'Không tìm thấy user'});
    }else{
      await rating_hotel.create({
        score_rating: score_rating,
        comment_rating: comment_rating,
        id_hotel: id_hotel,
        id_user: id,
      });
      return res.status(200).json({message: 'Đánh giá thành công'});
    }
  } catch (error) {
    console.log(error);
  }
}


const deleteRating = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitRating = await Rating.findByPk(id);
        if(exsitRating){
            await exsitRating.destroy();
            return res.status(200).json({message: 'Xóa tin nhắn thành công'});
        }else{
            return res.status(201).json({message: 'Đánh giá không tồn tại'});
        }
    } catch (error) {
        console.log(error);
    }
}

const searchRating = async(req,res)=>
{
  try {
    const {search}= req.body
    const result = await Rating.findAll(
    {
      include:[
        {
          model: Hotel, attributes: ['name_hotel'],
        },
        {model: User, attributes: ['fullname']}
      ],
      where: {
        [Op.or]: [
          {
            '$Hotel.name_hotel$': {
              [Op.like]: `%${search}%`,
            },
          },
          {
            '$User.fullname$': {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    }
    )
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getRatingAll,
    getRating,
    addRating,
    deleteRating,
    searchRating,
    getByHotel
}