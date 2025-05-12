import express from "express";
import { blockOrUnblockUser, getAllUsers, getCustomer, getUser, registerUser, upload, userLogin, verifyToken } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/",upload.single("profilePicture"), registerUser);
userRouter.post("/login",userLogin);
userRouter.get("/all", getAllUsers);
userRouter.get("/up/:email",verifyToken,getCustomer);
userRouter.get("/block/:email",blockOrUnblockUser);
userRouter.get("/",getUser);





export default userRouter;