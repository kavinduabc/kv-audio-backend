
//import the express dependency for using our project.

import express from "express"
//for using 
import bodyParser from "body-parser";
//import the mongoose library for using our software
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken"




//create a vearible for express coll
let app = express()

app.use(bodyParser.json());

app.use((req, res, next) => {
   let token = req.header("Authorization");

   if (token) {
       token = token.replace("Bearer ", "");

       jwt.verify(token, "kv-secret-89", (err, decoded) => {
           if (err) {
               console.error("JWT Verification Failed:", err.message);
           } else {
               req.user = decoded;
           }
       });
   }

   next();
});




//create a database connection 
/**
 * if i using the connection database string ,i can connect with data
 * base accesse inside  the code
 */
let mongoUrl = "mongodb+srv://piumalranepura2002:root@cluster0.rclha.mongodb.net/audio-shop?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)

let connection = mongoose.connection

connection.once("open",()=>{
   console.log("Mongo db connection successfully")
})
//** middleware
// reading the token and identify the user and 
// include user details for httprequest */
//start middleware 



//routing 
app.use("/api/users",userRouter)
app.use("/api/product",productRouter)

app.listen(3000,()=>{
   console.log("Server is runnin on port 3000"); 
})