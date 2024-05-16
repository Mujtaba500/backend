import studentController from "../../controller/student/index.js";
import { Router } from "express";

const studentRouter = Router();

//GET ALL STUDENTS
studentRouter.get("/students", studentController.getAll);

//GET STUDENTS BY NAME
studentRouter.get("/students/:name", studentController.getStudentsByName);

//GET SINGLE STUDENT
studentRouter.get("/student/:id", studentController.getStudentById);

//CREATE STUDENT
studentRouter.post("/students", studentController.create);

//UPDATE STUDENT
studentRouter.put("/student/:id", studentController.update);

//DELETE STUDENT
studentRouter.delete("/student/:id", studentController.delete);

export default studentRouter;
