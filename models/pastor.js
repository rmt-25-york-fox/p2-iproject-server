'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pastor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pastor.hasMany(models.Subscription)
      Pastor.hasMany(models.Preach)
    }
  }
  Pastor.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Name is required"
        },
        notEmpty:{
          msg: "Name is required"
        }

      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      isEmail:true,
      isUnique:true,
      validate: {
        notNull:{
          msg:"Insert your Email Please!!!"
        },
        notEmpty:{
          msg:"Insert your Email Please!!!"
        },
        isEmail: {msg: "Email should be inserted with the correct format."},
      },
      
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Password is required"
        },
        notEmpty:{
          msg: "Password is required"
        }

      }
    }
  }, {
    sequelize,
    modelName: 'Pastor',
  });
  return Pastor;
};