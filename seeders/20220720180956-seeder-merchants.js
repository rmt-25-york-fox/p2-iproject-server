'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const merchants = require('../data/merchants.json');

    merchants.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Merchants', merchants, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Merchants', null, {});
  }
};
