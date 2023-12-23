'use strict';
const {
  Model, DOUBLE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hotel.hasMany(models.room_hotel, { foreignKey: 'id_hotel' });
      hotel.hasMany(models.favorate_hotel, { foreignKey: 'id_hotel' });
      hotel.hasMany(models.img_hotel, { foreignKey: 'id_hotel' }); 
      hotel.hasMany(models.report_hotel, { foreignKey: 'id_hotel' }); 
      hotel.hasMany(models.coupon_owner, { foreignKey: 'id_hotel' });
      hotel.hasMany(models.rating_hotel, { foreignKey: 'id_hotel' });
      
      hotel.belongsTo(models.owner, { foreignKey: 'id_owner' });

    }
  }
  hotel.init({
    name_hotel: DataTypes.STRING,
    address: DataTypes.STRING,
    city_code: DataTypes.INTEGER,
    district_code: DataTypes.INTEGER,
    ward_code: DataTypes.INTEGER,
    id_owner: DataTypes.INTEGER,
    information: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN,
    longitude: DataTypes.DOUBLE,
    latitube: DataTypes.DOUBLE,
    point: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'hotel',
  });
  return hotel;
};