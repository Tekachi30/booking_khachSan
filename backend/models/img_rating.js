'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class img_rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      img_rating.belongsTo(models.rating_hotel, { foreignKey: 'id_rating' });
    }
  }
  img_rating.init({
    name_img: DataTypes.STRING,
    url: DataTypes.STRING,
    id_rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'img_rating',
  });
  return img_rating;
};