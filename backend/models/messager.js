'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      messager.belongsTo(models.User, { foreignKey: 'id_user' });
      messager.belongsTo(models.owner, { foreignKey: 'id_owner' });

    }
  }
  messager.init({
    id_user: DataTypes.INTEGER,
    id_owner: DataTypes.INTEGER,
    messager: DataTypes.STRING,
    deleted: DataTypes.INTEGER,
    send: DataTypes.INTEGER,
    receive: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'messager',
  });
  return messager;
};