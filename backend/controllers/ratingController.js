const db = require('../models');
const Rating = db.rating;

const getRating = async (req, res) => {
    try {
        const rating = await Rating.findAll();
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
            res.status(200).json({messsage: 'Xóa tin nhắn thành công'});
        }else{
          res.status(400).json({messsage: 'Đánh giá không tồn tại'});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getRating,
    deleteRating
}