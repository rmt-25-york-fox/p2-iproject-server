"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.DigimonUser, {
        foreignKey: "UserId",
      });
      User.hasMany(models.Access_Token, {
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
          notNull: { msg: "Silahkan masukkan email" },
          notEmpty: { msg: "Silahkan masukkan email" },
          isEmail: {
            args: true,
            msg: "Silahkan masukkan format email yang benar",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Silahkan masukkan password" },
          notEmpty: { msg: "Silahkan masukkan password" },
          len: {
            args: [5, 32],
            msg: "Password minimal lima karakter",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password, 10);
  });
  return User;
};
