import studentModel from "../model/student/index.js";
import teacherModel from "../model/teacher/index.js";
import sequelize from "./config.js";

const syncDB = async () => {
  await sequelize.sync({ alter: true, force: false });
};

export default syncDB;
