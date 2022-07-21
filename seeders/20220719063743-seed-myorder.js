"use strict";

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
    const data = require("../data/myorder.json");

    for (let i = 0; i < data.length; i++) {
      data[i].createdAt = new Date();
      data[i].updatedAt = new Date();
    }

    await queryInterface.bulkInsert("MyOrders", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("MyOrders", null, {});
  },
};
