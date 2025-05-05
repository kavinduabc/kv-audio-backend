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
      required: false, 
      default : "uncategorized"
    },
    dimensions : {
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
    },
    image:{
      type : [String],
      required : true,
      default :["https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw0uCU9t72Sm51_RBTIJ2OxU&ust=1739456529253000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCbiuCqvosDFQAAAAAdAAAAABAE"]
    },
    featured: { 
      type: Boolean, 
      default: false 
   }
})


const Product = mongoose.model("products",productSchema);

export default Product;