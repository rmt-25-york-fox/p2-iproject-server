'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let preaches = require('../data/Preach.json')
    preaches.forEach(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
     await queryInterface.bulkInsert('Preaches', preaches, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Preaches', null, {});
  }
};
