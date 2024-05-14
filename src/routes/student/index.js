import studentController from "../../controller/student/index.js";
import { Router } from "express";

const studentRouter = Router();

//GET ALL STUDENTS
studentRouter.get("/students", studentController.getAll);

//GET SINGLE STUDENT
studentRouter.get("/student/:id", studentController.getStudent);

//CREATE STUDENT
studentRouter.post("/students", studentController.create);

//UPDATE STUDENT
studentRouter.put("/student/:id", studentController.update);

//DELETE STUDENT
studentRouter.delete("/student/:id", studentController.delete);

export default studentRouter;
