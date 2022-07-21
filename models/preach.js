'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Preach.belongsTo(models.Pastor)
    }
  }
  Preach.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Please insert the title"
        }
      }
    }, VideoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Don't forget your Video Url"
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Please insert the date"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Preach',
  });
  
  return Preach;
};