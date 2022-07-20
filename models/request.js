'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.User)
    }
  }
  Request.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    points: DataTypes.INTEGER,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    picId: DataTypes.INTEGER,
    picName:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};