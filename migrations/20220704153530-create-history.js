"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "Users", key: "id" },
      },

      height: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      neck: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      waist: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      hip: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      activitylevel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      goal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Histories");
  },
};
