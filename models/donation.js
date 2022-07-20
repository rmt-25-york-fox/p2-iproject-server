"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donation.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Email is not valid" },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Amount is required" },
          notNull: { msg: "Amount is required" },
        },
      },
      message: DataTypes.STRING,
      orderId: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Donation",
    }
  );
  Donation.beforeCreate((instance, options) => {
    if (!instance.name) {
      instance.name = "Anonymous";
    }

    if (!instance.message) {
      instance.message = "Keep your hard work!!";
    }

    instance.orderId = new Date().getTime();
    instance.paymentStatus = "pending";
  });
  return Donation;
};
