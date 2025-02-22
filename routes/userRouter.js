import express from "express";
import { rejisterUser, userLogin } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/",rejisterUser);
userRouter.post("/login",userLogin)





export default userRouter;