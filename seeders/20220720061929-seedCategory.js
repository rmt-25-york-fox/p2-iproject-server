"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Pizza",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pasta",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Drink",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bread",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
