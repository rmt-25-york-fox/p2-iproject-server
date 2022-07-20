"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const dummy = require("../dummy.json");
    await queryInterface.bulkInsert("Products", dummy);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
