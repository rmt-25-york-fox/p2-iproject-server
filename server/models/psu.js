"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Psu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Psu.hasMany(models.MyOrder);
    }
  }
  Psu.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      power: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Psu",
    }
  );
  return Psu;
};
