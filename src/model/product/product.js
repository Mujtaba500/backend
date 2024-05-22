import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const productModel = sequelize.define(
  "Product",
  {
    // Model attributes are defined here
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    // saleId: {
    //   type: DataTypes.INTEGER,
    //   // allowNull: false,
    // },
  },
  {
    // Other model options go here
    // sequelize, // We need to pass the connection instance
    // modelName: "User", // We need to choose the model name
  }
);

export default productModel;
