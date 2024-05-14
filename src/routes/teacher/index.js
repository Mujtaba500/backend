import teacherController from "../../controller/teacher/index.js";
import { Router } from "express";

const teacherRouter = Router();

//GET ALL TEACHERS
teacherRouter.get("/teachers", teacherController.getAll);

//GET SINGLE TEACHER
teacherRouter.get("/teacher/:id", teacherController.getTeacher);

//CREATE TEACHER
teacherRouter.post("/teachers", teacherController.create);

// CHANGE TEACHER
teacherRouter.put("/teacher/:id", teacherController.update);

//DELETE TEACHER
teacherRouter.delete("/teacher/:id", teacherController.delete);

export default teacherRouter;
