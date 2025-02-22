import express from "express";
import { addProduct, getProduct, updateProduct } from "../controller/productController.js";

const productRouter = express.Router();
productRouter.post("/",addProduct)
productRouter.get("/",getProduct)
productRouter.put("/",updateProduct)

export default productRouter;