"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Pizza peperoni",
        CategoryId: 1,
        imageUrl: "test",
        description: "pizza with peperoni",
        price: "90000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pizza Sosig",
        CategoryId: 1,
        imageUrl: "test",
        description: "pizza with Sossig",
        price: "85000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pizza peperoni & pinapple",
        CategoryId: 1,
        imageUrl: "test",
        description: "pizza with peperoni and pinapple",
        price: "90000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pizza cheese",
        CategoryId: 1,
        imageUrl: "test",
        description: "pizza with extra cheesy",
        price: "90000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
