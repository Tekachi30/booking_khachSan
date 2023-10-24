'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.notification, { foreignKey: 'id_user' });
      User.hasMany(models.favorate_hotel, { foreignKey: 'id_user' });
      User.hasMany(models.report_hotel, { foreignKey: 'id_user' });
      User.hasMany(models.rating_hotel, { foreignKey: 'id_user' });
      User.hasMany(models.order, { foreignKey: 'id_user' });
      User.hasMany(models.messager, { foreignKey: 'id_user' });
    }
  }
  User.init({
    account: DataTypes.STRING,
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    sex: DataTypes.ENUM("Nam","Nữ","LGBT"),
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};