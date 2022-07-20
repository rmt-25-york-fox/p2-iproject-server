"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyToDo, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,

      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "E-mail address already in use!",
        },
        validate: {
          notNull: {
            msg: "E-mail is required!",
          },
          notEmpty: {
            msg: "E-mail is required!",
          },
          isEmail: {
            args: true,
            msg: "Invalid e-mail address!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password is required!",
          },
          // lengthMin5(val) {
          //   if (val.length < 5) {
          //     throw new Error(
          //       'Password has to be contained of minimum 5 characters!',
          //     )
          //   }
          // },
        },
      },

      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      neck: {
        type: DataTypes.INTEGER,
      },
      waist: {
        type: DataTypes.INTEGER,
      },
      hip: {
        type: DataTypes.INTEGER,
      },
      activitylevel: {
        type: DataTypes.INTEGER,
      },
      goal: {
        type: DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance) {
          instance.password = bcrypt.hashSync(instance.password, 8);
          instance.name = "Cody";
          instance.username = "hacktiv8";
          instance.phoneNumber = "081332322233";
          instance.address = "Jl. Sultan Iskandar no. 3";
          instance.createdAt = new Date();
          instance.updatedAt = new Date();
        },
      },
    }
  );

  // User.beforeCreate((instance) => {
  //   instance.password = bcrypt.hashSync(instance.password, 8)
  // })

  return User;
};
