'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report_hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      report_hotel.belongsTo(models.User, { foreignKey: 'id_user' });
      report_hotel.belongsTo(models.hotel, { foreignKey: 'id_hotel' });
    }
  }
  report_hotel.init({
    id_hotel: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    comment_report: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'report_hotel',
  });
  return report_hotel;
};