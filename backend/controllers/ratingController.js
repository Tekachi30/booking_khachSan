const db = require('../models');
const Rating = db.rating_hotel;
const User = db.User;
const Hotel = db.hotel;
const Owner = db.owner
const sequelize = require('sequelize');
const Op  = sequelize.Op

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
      where: {
        id_hotel: {
          [Op.like]: `%${search}%`
        }
      }
    }
    )
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    getRating,
    addRating,
    deleteRating,
    searchRating
}