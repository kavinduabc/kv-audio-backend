import express from "express";
import { createOrder, getOrders, getQuotetion,approveOrRejectOrder } from "../controller/ordereController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder);
orderRouter.post("/quotetion",getQuotetion);
orderRouter.get("/",getOrders);
orderRouter.put("/status/:orderId",approveOrRejectOrder)


export default orderRouter;