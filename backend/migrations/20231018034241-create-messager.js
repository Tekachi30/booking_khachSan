'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messagers', {
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
      id_owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'owners',
          key: 'id'
        }
      },
      messager: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.INTEGER
      },
      check_send: {
        type: Sequelize.ENUM("User","Owner")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messagers');
  }
};