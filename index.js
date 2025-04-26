import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import InquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware to check token
app.use((req, res, next) => {
   let token = req.header("Authorization");
   if (token) {
       token = token.replace("Bearer ", "");
       jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
           if (err) {
               console.error("JWT Verification Failed:", err.message);
           } else {
               req.user = decoded;
           }
       });
   }
   next();
});

// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const connection = mongoose.connection;
connection.once("open", () => {
   console.log("MongoDB connection successful");
});

// Routing
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/inquiry", InquiryRouter);

// FIXED: use dynamic port from environment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
