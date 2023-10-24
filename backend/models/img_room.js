'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class img_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      img_room.belongsTo(models.room_hotel, { foreignKey: 'id_room' });
    }
  }
  img_room.init({
    public_id: DataTypes.STRING,
    url: DataTypes.STRING,
    id_room: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'img_room',
  });
  return img_room;
};