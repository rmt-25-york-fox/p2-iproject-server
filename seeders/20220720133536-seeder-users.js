'use strict';
const { convertPhoneNumberID } = require('../helpers/preProcess');

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require('../data/users.json');

    users.forEach(el => {
      el.phoneNumber = convertPhoneNumberID(el.phoneNumber);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
