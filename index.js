import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url"; // Import this to handle __dirname equivalent
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import orderRouter from "./routes/orderRoute.js";
import addImageRouter from "./routes/addImageRouter.js";

dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Body parser middleware
app.use(express.json());

// Construct __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.use("api/addImage",addImageRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});