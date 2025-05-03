import express from "express";
import { createOrder, getOrders, getQuotetion } from "../controller/ordereController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder);
orderRouter.post("/quotetion",getQuotetion);
orderRouter.get("/",getOrders);


export default orderRouter;