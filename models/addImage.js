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
    }
})

const image= mongoose.model("addImage",addImageSchema);

export default image;