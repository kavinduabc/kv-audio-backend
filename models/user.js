import mongoose from "mongoose";

//create schema for user
const userSchema = new mongoose.Schema({
  
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :
    {
        type : String,
        required :true
    },
    role :
    {
        type : String,
        required : true,
        default : "customer"
        //** if you not mention user type,
        // it all ready store type is customer */
    },
    firstname :
    {
        type : String,
        required : true
    },
    lastname :
    {
        type : String,
        required : true
    },
    address :
    {
        type : String,
        required : true
    },
    phoneNumber :
    {
        type : String,
        required:true
    }

});

//create a database collection for saving user values,
//** create  to relationship between backend and database collection */
const User = mongoose.model("User",userSchema);


export default User;

