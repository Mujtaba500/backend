import studentRouter from "./student/index.js";
import teacherRouter from "./teacher/index.js";
import classRouter from "./section/index.js";
import saleRouter from "./sale/index.js";
import productRouter from "./product/product.js";

const allRoutes = [
  studentRouter,
  teacherRouter,
  classRouter,
  saleRouter,
  productRouter,
];

export default allRoutes;
