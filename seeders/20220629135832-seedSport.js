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
    // const sports = require("../data/sports.json");
    // sports.forEach((movie) => {
    //   movie.createdAt = new Date();
    //   movie.updatedAt = new Date();
    // });
    // await queryInterface.bulkInsert("Sports", sports, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
