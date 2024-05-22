import productController from "../../controller/product/product.js";
import { Router } from "express";

const productRouter = Router();

//GET ALL productS
productRouter.get("/products", productController.getAll);

//GET SINGLE product
productRouter.get("/product/:id", productController.getSingle);

//CREATE product
productRouter.post("/products", productController.create);

//DELETE product
productRouter.delete("/product/:id", productController.delete);

export default productRouter;
