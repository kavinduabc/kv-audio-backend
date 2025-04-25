import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import InquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors"

dotenv.config();

let app = express()

app.use(cors());
app.use(bodyParser.json());

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

let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection = mongoose.connection

connection.once("open", () => {
    console.log("Mongo db connection successfully")
})

// Routes
app.use("/api/users", userRouter)
app.use("/api/product", productRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/inquiry", InquiryRouter)

app.get("/", (req, res) => {
    res.send("🎧 KV Audio Backend is running!");
});

app.listen(3000, () => {
    console.log("Server is runnin on port 3000");
})
