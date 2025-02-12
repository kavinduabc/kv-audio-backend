import express from "express"
import { addReview } from "../controller/reviewController.js";


const reviewRouter = express.Router();
reviewRouter.post("/",addReview)



export default reviewRouter;