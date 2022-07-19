"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Petrol extends Model {
    static associate(models) {
      Petrol.belongsToMany(models.User, {
        through: models.Transaksi,
        foreignKey: "PetrolId",
      });
    }
  }
  Petrol.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      harga: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Harga is required",
          },
          notNull: {
            msg: "Harga is required",
          },
        },
      },
      informasi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Informasi is required",
          },
          notNull: {
            msg: "Informasi is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Petrol",
    }
  );
  return Petrol;
};
