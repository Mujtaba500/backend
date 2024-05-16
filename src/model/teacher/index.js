import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const teacherModel = sequelize.define(
  "Teacher",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    // sequelize, // We need to pass the connection instance
    // modelName: "User", // We need to choose the model name
  }
);

export default teacherModel;
