"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyToDo.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
        MyToDo.belongsTo(models.Sport, {
          foreignKey: "SportId",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }
  MyToDo.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "User name is required",
          },
          notNull: {
            args: true,
            msg: "User name is required",
          },
        },
      },
      SportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Sport title is required",
          },
          notNull: {
            args: true,
            msg: "Sport title is required",
          },
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },

    {
      sequelize,
      modelName: "MyToDo",
      hooks: {
        beforeCreate(instance) {
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return MyToDo;
};
