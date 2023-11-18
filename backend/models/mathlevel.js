'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MathLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MathLevel.belongsTo(models.hotel, { foreignKey: 'id_hotel' });
    }
  }
  MathLevel.init({
    id_hotel: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MathLevel',
  });
  return MathLevel;
};