"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Access_Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Access_Token.belongsTo(models.User);
    }
  }
  Access_Token.init(
    {
      UserId: DataTypes.INTEGER,
      access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Access_Token",
    }
  );
  return Access_Token;
};
