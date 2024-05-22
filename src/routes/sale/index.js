import saleController from "../../controller/sale/index.js";
import { Router } from "express";

const saleRouter = Router();

//GET ALL SALES
saleRouter.get("/sales", saleController.getAll);

//GET SINGLE SALE
saleRouter.get("/sale/:id", saleController.getSaleById);

//GET SALE WITH PRODUCT
saleRouter.get("/sales/:product", saleController.getSaleByProduct);

//CREATE SALE
saleRouter.post("/sales", saleController.create);

// CHANGE ONE PRODUCT AT A TIME
saleRouter.put("/sale/:id", saleController.update);

//DELETE SALE
saleRouter.delete("/sale/:id", saleController.delete);

export default saleRouter;
