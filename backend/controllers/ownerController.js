const db = require('../models');
const Owner = db.owner;

const getOwner = async (req, res) => {
    try {
        const owner = await Owner.findAll();
        res.json(owner);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getOwner,
};