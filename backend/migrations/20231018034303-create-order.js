'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM("Đã Đặt","Đã Thanh Toán","Đã Hủy","Đã Trả Phòng")
      },
      provider: {
        type: Sequelize.ENUM("VNPAY")
      },
      vnp_orderID: {
        type: Sequelize.INTEGER
      },
      total_bank: {
        type: Sequelize.DOUBLE
      },
      date_bank: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};