"use strict";
const { Model } = require("sequelize");
const { bcryptHash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Petrol, {
        through: models.Transaksi,
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email must be in Email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          minPass(value) {
            if (value === null || this.password.length < 5) {
              throw new Error("Password must be at least 5 characters");
            }
          },
        },
      },
      kendaraan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Kendaraan is required",
          },
          notNull: {
            msg: "Kendaraan is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((customer, options) => {
    const hash = bcryptHash(customer.password, 8);
    customer.password = hash;
  });
  return User;
};
