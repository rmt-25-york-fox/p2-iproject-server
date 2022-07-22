'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    static associate(models) {
      Merchant.belongsToMany(models.User, { through:  'Favorites' });
    }
  }
  Merchant.init({
    product: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};