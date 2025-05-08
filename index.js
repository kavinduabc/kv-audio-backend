import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

// ✅ Fixed CORS to allow multiple localhost ports
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Body parser middleware
app.use(express.json());

// JWT Authentication Middleware
app.use((req, res, next) => {
    let token = req.header("Authorization");
    if (token) {
        token = token.replace("Bearer ", "");
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            console.error("JWT Verification Failed:", err.message);
        }
    }
    next();
});

// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection failed:", err.message));

// Routes
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/orders", orderRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
