import express from "express"
import { addReview, approvedReview, deleteReviews, getReviews } from "../controller/reviewController.js";


const reviewRouter = express.Router();
reviewRouter.post("/",addReview)
reviewRouter.get("/",getReviews)
reviewRouter.delete("/:email",deleteReviews)
reviewRouter.put("/approve/:email",approvedReview)


export default reviewRouter;