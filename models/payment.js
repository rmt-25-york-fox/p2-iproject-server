"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "E-mail is required" },
          notNull: { msg: "E-mail is required" },
          isEmail: { msg: "Invalid e-mail address!" },
        },
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Amount is required" },
          notNull: { msg: "Amount is required" },
        },
      },
      OrderId: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
      hooks: {
        beforeCreate(instance) {
          if (!instance.name) {
            instance.name = "User";
          }

          instance.OrderId = new Date().getTime();
          instance.paymentStatus = "Pending";
        },
      },
    }
  );
  return Payment;
};
