import express from "express";
import { addProduct, deleteProduct, getFeaturedProducts, getProduct, getProductNew, updateProduct } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.post("/",addProduct)
productRouter.get("/",getProduct)
productRouter.get("/featured", getFeaturedProducts);
productRouter.put("/:key",updateProduct);
productRouter.delete("/:key",deleteProduct)
productRouter.get("/:key",getProductNew)

export default productRouter;