import express from "express";
import { addInquiry, getInquiry } from "../controller/inquiryController.js";

const InquiryRouter = express.Router();

InquiryRouter.post("/", addInquiry);
InquiryRouter.get("/",getInquiry)

export default InquiryRouter;
