import express from "express"
import {addFunctionImage, getAllImages} from "..//controller/addImageController.js"

const addImageRouter = express.Router()

addImageRouter.post("/", addFunctionImage);
addImageRouter.get("/",getAllImages)

export default addImageRouter;
