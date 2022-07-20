"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpaceShuttle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpaceShuttle.belongsTo(models.User);
    }
  }
  SpaceShuttle.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is requiered",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      name: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is requiered",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      information: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Information is requiered",
          },
          notEmpty: {
            msg: "Information is required",
          },
        },
      },
      imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ImgUrl is requiered",
          },
          notEmpty: {
            msg: "ImgUrl is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "SpaceShuttle",
    }
  );
  return SpaceShuttle;
};
