import Product from "../models/product.js";


export function addProduct(req,res){
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
     newProduct.save().then(()=>{

        res.json({message:"Product added successfully"});
     }).catch((error)=>{
        res.status(500).json({error : "Prodcut addition is failed"});
     })
     
}