'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupon_owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      coupon_owner.belongsTo(models.hotel, { foreignKey: 'id_hotel' });
      coupon_owner.belongsTo(models.owner, { foreignKey: 'id_owner' });
    }
  }
  coupon_owner.init({
    id_hotel: DataTypes.INTEGER,
    id_owner: DataTypes.INTEGER,
    code_coupon: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    date_coupon: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'coupon_owner',
  });
  return coupon_owner;
};