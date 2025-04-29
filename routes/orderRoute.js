import express from "express";
import { createOrder } from "../controller/ordereController.js";

const orderRouter = express.Router();

orderRouter.post("/",createOrder);


export default orderRouter;