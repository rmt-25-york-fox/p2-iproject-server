"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  History.init(
    {
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      neck: {
        type: DataTypes.INTEGER,
      },
      waist: {
        type: DataTypes.INTEGER,
      },
      hip: {
        type: DataTypes.INTEGER,
      },
      activitylevel: {
        type: DataTypes.INTEGER,
      },
      goal: {
        type: DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "History",
      hooks: {
        beforeCreate(instance) {
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return History;
};
