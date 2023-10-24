'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class img_report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      img_report.belongsTo(models.report_hotel, { foreignKey: 'id_report' });
    }
  }
  img_report.init({
    public_id: DataTypes.STRING,
    url: DataTypes.STRING,
    id_report: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'img_report',
  });
  return img_report;
};