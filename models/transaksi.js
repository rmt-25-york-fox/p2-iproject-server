"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    static associate(models) {
      Transaksi.belongsTo(models.User, { foreignKey: "UserId" });
      Transaksi.belongsTo(models.Petrol, { foreignKey: "PetrolId" });
    }
  }
  Transaksi.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId is required",
          },
          notNull: {
            msg: "UserId is required",
          },
        },
      },
      PetrolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PetrolId is required",
          },
          notNull: {
            msg: "PetrolId is required",
          },
        },
      },
      TotalHarga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "TotalHarga is required",
          },
          notNull: {
            msg: "TotalHarga is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaksi",
    }
  );
  return Transaksi;
};
