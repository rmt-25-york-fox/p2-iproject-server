"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: "Wishlist",
        foreignKey: "ProductId",
      });
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name must exist!",
          },
          notNull: {
            msg: "name must exist!",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description must exist!",
          },
          notNull: {
            msg: "Description must exist!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price is required!",
          },
          notNull: {
            msg: "price is required!",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
