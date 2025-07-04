import Product from "../models/product.js";
import { isTtAdmin } from "./userController.js";


export async function addProduct(req, res) {
   console.log("Decoded User:", req.user);
 
   if (!req.user) {
     return res.status(401).json({ message: "Please login and try again" });
   }
 
   if (req.user.role !== "admin") {
     return res.status(403).json({ message: "You are not authorized to perform this action" });
   }
 
   try {
     const data = req.body;
     console.log("Received Product Data:", data);
 
     const newProduct = new Product(data);
     await newProduct.save();
 
     res.json({ message: "Product added successfully" });
   } catch (error) {
     console.error("Product Save Error:", error.message);
     res.status(500).json({ error: "Product registration failed" });
   }
 }
 

//** create to function view product */
export async function getProduct(req,res){
   //method for user role is admin
    let isAdmin = isTtAdmin(req)

    

   try {
      if(isTtAdmin(req)){
         const products = await Product.find()
         res.json(products);
         return ;
      }
      else
      {
         const products = await Product.find(
         {
            availability : true
         }
         )
         res.json(products);
         return ;
      }
   } catch (e) {
      res.status(500).json({
         message : "Faild to get products"
      })
     
   }
} 

//** implement the function update product */
export async function updateProduct(req,res){
   try {
      if(isTtAdmin(req)){
      
         const key = req.params.key;
         const data = req.body
         await Product.updateOne({key:key},data)

         res.json(
            {
               message : "product update successfully"
            }
         )
         return;
      }
      else{
         res.status(403).json({
            message:"you are not authorized the perform the this action"
         })
      }
   } catch (e) {
      res.status(500).json({
         message : "failed to update product"
      })
   }
}

//** create function for delete product  */
export async function deleteProduct(req,res){
   try {
      if(isTtAdmin(req)){
         const key = req.params.key;
         await Product.deleteOne({key:key})

         res.json({
            message :"product delete successfully"
         })
      }
      else{
         res.status(403).jeson({
            message:"you are not authorized to perform this action"
         })
      }
      
   } catch (e) {
       
      res.status(500).json({
         message : "failed to delete product"
      })
   }
}


export async function getProductNew(req,res){
    
   try{
      const key = req.params.key;
      const product = await Product.findOne({key:key})
      
      if(product == null)
       {
         res.status(404).json({
            message : "Product not found"
         })
         return ;
       }
       res.json(product)
   }
   catch (e) {
       
      res.status(500).json({
         message : "failed get product"
      })
   }
}

export async function getFeaturedProducts(req, res) {
   try {
     const products = await Product.find({ featured: true, availability: true });
     res.json(products);
   } catch (e) {
     res.status(500).json({ message: "Failed to get featured products" });
   }
 }
 export async function getHomePageProducts(req,res){
   try{
      const products = await Product.find({
         homepProduct :true,
         availability : true
      })
      res.json(products);
   }catch(e){
      console.log(e);
      res.status(500).json({
         message :"failed to get home page products"
      })
   }
 }

export function getProductCount(req, res) {
  if (isTtAdmin(req)) {
    Product.countDocuments({ availability: true })
      .then((count) => {
        res.json({
          totalProducts: count,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          error: "Failed to get product count",
        });
      });
  } else {
   
    res.status(403).json({ error: "Unauthorized access" });
  }
}




