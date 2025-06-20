import mongoose from "mongoose";

const addImageSchema = new mongoose.Schema({
    image:{
        type:String,
        required : true
    },
    functionName:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
       }
})

const addImage= mongoose.model("addImage",addImageSchema);

export default addImage;