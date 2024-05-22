import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import saleModel from "./index.js";
import productModel from "../product/product.js";

const saleProductModel = sequelize.define(
  "SaleProduct",
  {
    // Model attributes are defined here
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
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

saleModel.hasMany(saleProductModel);
saleProductModel.belongsTo(saleModel);

productModel.hasMany(saleProductModel);
saleProductModel.belongsTo(productModel);
export default saleProductModel;
