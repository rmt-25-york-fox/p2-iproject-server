"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ram.hasMany(models.MyOrder);
    }
  }
  Ram.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      power: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ram",
    }
  );
  return Ram;
};
