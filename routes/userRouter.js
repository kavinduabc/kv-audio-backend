import express from "express";
import { blockOrUnblockUser, getAllUsers, rejisterUser, userLogin } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/",rejisterUser);
userRouter.post("/login",userLogin);
userRouter.get("/all", getAllUsers);
userRouter.get("/block/:email",blockOrUnblockUser)





export default userRouter;