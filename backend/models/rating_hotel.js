'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating_hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rating_hotel.hasMany(models.img_rating, { foreignKey: 'id_rating' });

      rating_hotel.belongsTo(models.User, { foreignKey: 'id_user' });
      rating_hotel.belongsTo(models.hotel, { foreignKey: 'id_hotel' });

    }
  }
  rating_hotel.init({
    id_hotel: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    score_rating: DataTypes.DOUBLE,
    comment_rating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rating_hotel',
  });
  return rating_hotel;
};