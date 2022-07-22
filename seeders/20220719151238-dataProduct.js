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
    // const data = require("../data/product.json");
    // data.forEach((e) => {
    //   e.createdAt = e.updatedAt = new Date();
    // });
    // await queryInterface.bulkInsert("Products", data);
    const data = require("../data/category.json");
    data.forEach((e) => {
      e.createdAt = e.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Categories", null, {});
    // await queryInterface.bulkDelete("Products", null, {});
  },
};
