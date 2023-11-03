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

module.exports = {
    getRating,
}