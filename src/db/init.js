import sequelize from "./config.js";
import studentModel from "../model/student/index.js";
import teacherModel from "../model/teacher/index.js";
import saleModel from "../model/sale/index.js";
import saleProductModel from "../model/sale/saleProduct.js";

const syncDB = async () => {
  await sequelize.sync({ alter: true, force: false });
};

export default syncDB;
