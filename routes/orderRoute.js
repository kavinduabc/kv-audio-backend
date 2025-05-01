import express from "express";
import { createOrder, getQuotetion } from "../controller/ordereController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder);
orderRouter.get("/quotetion",getQuotetion)


export default orderRouter;