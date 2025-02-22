import Product from "../models/product.js";
import { isTtAdmin } from "./userController.js";


export async function addProduct(req,res){
   console.log("Decoded User:", req.user);

     if(req.user == null){
        res.status(401).json({
         message : "Please login and try again"
        })
        //** we can block the run this function using return   */
        return
     }


     //** create a condition for user is admin or customer */
     if(req.user.role != "admin")
     {
          res.status(401).json({
         message : "You are not authorized to perform this action"
        })
       
        return
     }
     
    const data = req.body;
    const newProduct = new Product(data);
    // newProduct.save().then(()=>{

       // res.json({message:"Product added successfully"});
     //}).catch((error)=>{
       // res.status(500).json({error : "Prodcut addition is failed"});
    // })

    try {
      await newProduct.save();
      res.json({
         message : "Product registered successfully"
      })

    } catch (error) {
      res.status(500).json({
         error : "Product registeration faild"
      })
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


