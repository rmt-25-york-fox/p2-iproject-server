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
      DigimonUser.belongsTo(models.Digimon);
    }
  }
  DigimonUser.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      DigimonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "DigimonUser",
    }
  );
  return DigimonUser;
};
