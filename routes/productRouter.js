import express from "express";
import { addProduct, deleteProduct, getFeaturedProducts, getHomePageProducts, getProduct, getProductNew, updateProduct } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.post("/",addProduct)
productRouter.get("/",getProduct)
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/getHomeproducts",getHomePageProducts)
productRouter.put("/:key",updateProduct);
productRouter.delete("/:key",deleteProduct)
productRouter.get("/:key",getProductNew)

export default productRouter;