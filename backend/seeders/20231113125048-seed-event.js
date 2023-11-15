'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // admin => chỉ tạo ra một admin quản lý tất cả
    // admin admin
    await queryInterface.bulkInsert('admins', [{
      account: 'admin2',
      password: '$2b$10$rtyEsgLL05JW5h8tGsFngOcNZk7eMjfAjfmT6aK6ngK.4GHkejgp6' //admin
    }], {});

    // owners
    await queryInterface.bulkInsert('owners', [{
      account: "owner1",
      fullname: "owner1 fullname",
      address: "owner1 address",
      phone: "owner1 phone",
      password: "$2b$10$PfsusDUBx6fsGWSl3Kph7e7dzf1JlwhsZ5LyJMXKGSgiljjD.G4ZO", //owner123+
      email: "owner1@gmail.com"
    },
    {
      account: "owner2",
      fullname: "owner2 fullname",
      address: "owner2 address",
      phone: "owner2 phone",
      password: "$2b$10$PfsusDUBx6fsGWSl3Kph7e7dzf1JlwhsZ5LyJMXKGSgiljjD.G4ZO", //owner123+
      email: "owner2@gmail.com"
    },
    ], {});
   
  },


  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
