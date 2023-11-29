const db = require('../models');
const Rating = db.rating_hotel;
const User = db.User;
const Hotel = db.hotel;
const sequelize = require('sequelize');
const Op  = sequelize.Op

const getRating = async (req, res) => {
    try {
        const rating = await Rating.findAll({
            include:[
                {model: Hotel, attributes: ['id_owner','name_hotel']},
                {model: User, attributes: ['Fullname']}
            ]
        });
        res.json(rating);
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
            return res.status(400).json({message: 'Đánh giá không tồn tại'});
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
    deleteRating,
    searchRating
}