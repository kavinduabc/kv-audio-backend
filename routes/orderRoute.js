import express from "express";
import { createOrder, getOrders, getQuotetion,approveOrRejectOrder, TotalOrderCount } from "../controller/ordereController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder);
orderRouter.post("/quotetion",getQuotetion);
orderRouter.get("/",getOrders);
orderRouter.put("/status/:orderId",approveOrRejectOrder)
orderRouter.get("/orderCount",TotalOrderCount)

export default orderRouter;