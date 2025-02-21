import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    key :{
       type : String,
       required : true,
       unique : true
    },
    name :{
       type : String,
       required : true
    },
    price :{
        type : String,
        required : true
    },
    category :{
      type : String,
      required : null,
      default : "uncategorized"
    },
    dimentions : {
       type : String,
       required : true
    },
    description :{
        type : String,
        required : true
    },
    availability :
    {
       type : Boolean,
       required : true,
       default :true
    }
})


const Product = mongoose.model("product",productSchema);

export default Product;