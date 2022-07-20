'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      VgaId: {
        type: Sequelize.INTEGER
      },
      ProcessorId: {
        type: Sequelize.INTEGER
      },
      PsuId: {
        type: Sequelize.INTEGER
      },
      RamId: {
        type: Sequelize.INTEGER
      },
      SsdId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MyOrders');
  }
};