'use strict';
const {hashPassword} = require('../Helpers/brcyptHelper')
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
     let pastors = require('../data/Pastor.json')
     pastors.forEach(el=>{
       el.createdAt = new Date()
       el.updatedAt = new Date()
       el.password = hashPassword(el.password)
       return el
     })
      await queryInterface.bulkInsert('Pastors', pastors, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Pastors', null, {});

  }
};
