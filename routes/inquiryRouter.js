import express from "express";
import { addInquiry, deleteInquiry, getInquiry } from "../controller/inquiryController.js";

const InquiryRouter = express.Router();

InquiryRouter.post("/", addInquiry);
InquiryRouter.get("/",getInquiry)
InquiryRouter.delete("/:id",deleteInquiry)

export default InquiryRouter;
