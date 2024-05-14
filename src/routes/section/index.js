import classController from "../../controller/section/index.js";
import { Router } from "express";

const classRouter = Router();

//GET ALL CLASSES
classRouter.get("/classes", classController.getAll);

//GET SINGLE CLASS
classRouter.get("/class/:name", classController.getClass);

//CREATE CLASS
classRouter.post("/classes", classController.create);

//UPDATE CLASS
classRouter.put("/class/:name", classController.update);

//DELETE CLASS
classRouter.delete("/class/:name", classController.delete);

export default classRouter;
