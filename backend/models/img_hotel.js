'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class img_hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      img_hotel.belongsTo(models.hotel, { foreignKey: 'id_hotel' });
    }
  }
  img_hotel.init({
    name_img: DataTypes.STRING,
    url: DataTypes.STRING,
    id_hotel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'img_hotel',
  });
  return img_hotel;
};