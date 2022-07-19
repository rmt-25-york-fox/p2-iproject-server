"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DigimonUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DigimonUser.belongsTo(models.User);
    }
  }
  DigimonUser.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Silahkan pilih digimon anda" },
          notEmpty: { msg: "Silahkan pilih digimon anda" },
        },
      },
      img: DataTypes.STRING,
      level: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DigimonUser",
    }
  );
  return DigimonUser;
};
