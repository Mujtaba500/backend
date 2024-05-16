import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const classModel = sequelize.define(
  "Class",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    // sequelize, // We need to pass the connection instance
    // modelName: "User", // We need to choose the model name
  }
);

export default classModel;
