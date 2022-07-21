"use strict";

const { DATE } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    let bensin = require("../Petrol.json");
    bensin.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Petrols", bensin, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Petrols", null, {});
  },
};
