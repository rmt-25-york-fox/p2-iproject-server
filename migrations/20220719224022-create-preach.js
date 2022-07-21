'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Preaches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      VideoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PastorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
        model:{
          tableName: 'Pastors',
          key: 'id'
        }
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
    await queryInterface.dropTable('Preaches');
  }
};