import express from "express";
import { addInquiry, deleteInquiry, getInquiry, updateInquiry } from "../controller/inquiryController.js";

const InquiryRouter = express.Router();

InquiryRouter.post("/", addInquiry);
InquiryRouter.get("/",getInquiry)
InquiryRouter.delete("/:id",deleteInquiry)
InquiryRouter.put("/:id",updateInquiry)

export default InquiryRouter;
