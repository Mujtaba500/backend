import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const saleModel = sequelize.define(
  "Sale",
  {
    // Model attributes are defined here
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    // sequelize, // We need to pass the connection instance
    // modelName: "User", // We need to choose the model name
  }
);

export default saleModel;
