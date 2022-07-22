'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: 'UserId' });
      Favorite.belongsTo(models.Merchant, { foreignKey: 'MerchantId' });
    }
  }
  Favorite.init({
    UserId: DataTypes.INTEGER,
    MerchantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};