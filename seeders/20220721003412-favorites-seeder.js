'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const favorites = require('../data/favorites.json');

    favorites.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Favorites', favorites, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};
