'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_hotel: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city_code: {
        type: Sequelize.INTEGER
      },
      district_code: {
        type: Sequelize.INTEGER
      },
      ward_code: {
        type: Sequelize.INTEGER
      },
      id_owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'owners',
          key: 'id'
        }
      },
      information: {
        type: Sequelize.STRING
      },
      isactive: {
        type: Sequelize.BOOLEAN
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      latitube: {
        type: Sequelize.DOUBLE
      },
      point: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('hotels');
  }
};