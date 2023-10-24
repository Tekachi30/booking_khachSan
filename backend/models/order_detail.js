'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_detail.belongsTo(models.order, { foreignKey: 'id_order' });
      order_detail.belongsTo(models.room_hotel, { foreignKey: 'id_room' });

    }
  }
  order_detail.init({
    id_order: DataTypes.INTEGER,
    id_room: DataTypes.INTEGER,
    quanlity: DataTypes.INTEGER,
    sigle_price: DataTypes.INTEGER,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};