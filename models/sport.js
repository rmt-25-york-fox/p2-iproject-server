"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Sport.hasMany(models.MyToDo, {
        foreignKey: "SportId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Sport.init(
    {
      bodyPart: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            args: true,
            msg: "bodyPart is required!",
          },
          notNull: {
            args: true,
            msg: "Status is required!",
          },
        },
      },

      equipment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "bodyPart is required!",
          },
          notNull: {
            args: true,
            msg: "Status is required!",
          },
        },
      },

      gifUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "bodyPart is required!",
          },
          notNull: {
            args: true,
            msg: "Status is required!",
          },
        },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "bodyPart is required!",
          },
          notNull: {
            args: true,
            msg: "Status is required!",
          },
        },
      },

      target: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "bodyPart is required!",
          },
          notNull: {
            args: true,
            msg: "Status is required!",
          },
        },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Sport",
      hooks: {
        beforeCreate(instance) {
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );
  return Sport;
};
