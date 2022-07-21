"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyOrder.belongsTo(models.User);
      MyOrder.belongsTo(models.Processor);
      MyOrder.belongsTo(models.Vga);
      MyOrder.belongsTo(models.Ram);
      MyOrder.belongsTo(models.Ssd);
      MyOrder.belongsTo(models.Psu);
    }
  }
  MyOrder.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      VgaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Vgas",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      ProcessorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Processors",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      PsuId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Psus",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      RamId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Rams",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      SsdId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Ssds",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "MyOrder",
    }
  );
  return MyOrder;
};
