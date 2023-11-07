'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorate_hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      favorate_hotel.belongsTo(models.hotel, { foreignKey: 'id_hotel' });
      favorate_hotel.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  favorate_hotel.init({
    id_hotel: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorate_hotel',
  });
  return favorate_hotel;
};