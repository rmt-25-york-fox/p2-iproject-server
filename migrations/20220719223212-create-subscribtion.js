'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MemberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
        model:{
          tableName: 'Members',
          key: 'id'
        },
      }
      },
      PastorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
        model:{
          tableName: 'Pastors',
          key: 'id'
        },
      }
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
    await queryInterface.dropTable('Subscriptions');
  }
};