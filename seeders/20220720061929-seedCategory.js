"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Fruits",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Meat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Snacks",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dairy",
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
