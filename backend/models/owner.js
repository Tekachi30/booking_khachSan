'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      owner.hasMany(models.messager, { foreignKey: 'id_owner' });
      owner.hasMany(models.hotel, { foreignKey: 'id_owner' });

    }
  }
  owner.init({
    account: DataTypes.STRING,
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'owner',
  });
  return owner;
};