import studentRouter from "./student/index.js";
import teacherRouter from "./teacher/index.js";
import classRouter from "./section/index.js";

const allRoutes = [studentRouter, teacherRouter, classRouter];

export default allRoutes;
