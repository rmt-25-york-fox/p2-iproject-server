"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.SpaceShuttle);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      subscribe: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate(user, option) {
          user.password = hashPass(user.password, 8);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
