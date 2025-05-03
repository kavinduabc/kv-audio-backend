import express from "express";
import { getAllUsers, rejisterUser, userLogin } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/",rejisterUser);
userRouter.post("/login",userLogin);
userRouter.get("/all", getAllUsers);





export default userRouter;