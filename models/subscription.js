'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Subscription.belongsTo(models.Pastor, {
        foreignKey: "PastorId"
      })
      Subscription.belongsTo(models.Member, {
        foreignKey: "MemberId"
      })

    }
  }
  Subscription.init({
    MemberId: DataTypes.INTEGER,
    PastorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};