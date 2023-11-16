'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.hasMany(models.order_detail, { foreignKey: 'id_order' });
      order.belongsTo(models.User, { foreignKey: 'id_user' });
      order.belongsTo(models.hotel, { foreignKey: 'id_hotel' });
    }
  }
  order.init({
    id_user: DataTypes.INTEGER,
    id_hotel: DataTypes.INTEGER,
    status: DataTypes.ENUM("Đã Đặt","Đã Thanh Toán","Đã Hủy","Đã Trả Phòng"),
    provider: DataTypes.ENUM("MOMO","VNPAY")
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};