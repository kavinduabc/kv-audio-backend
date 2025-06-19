import express from "express"
import {addFunctionImage} from "..//controller/addImageController.js"

const addImageRouter = express.Router()

addImageRouter.post("/", addFunctionImage);

export default addImageRouter;
