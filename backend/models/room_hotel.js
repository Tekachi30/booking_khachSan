'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      room_hotel.hasMany(models.order_detail, { foreignKey: 'id_room' });
      room_hotel.hasMany(models.img_room, { foreignKey: 'id_room' });

      room_hotel.belongsTo(models.hotel, { foreignKey: 'id_hotel' });
    }
  }
  room_hotel.init({
    id_hotel: DataTypes.INTEGER,
    type_room: DataTypes.ENUM("Đơn","Đôi"),
    book_status: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room_hotel',
  });
  return room_hotel;
};