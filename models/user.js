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
    },
    profilePicture :
    {
       type : String,
       required : true, 
       default :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw0uCU9t72Sm51_RBTIJ2OxU&ust=1739456529253000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCbiuCqvosDFQAAAAAdAAAAABAE"
    }

});

//create a database collection for saving user values,
//** create  to relationship between backend and database collection */
const User = mongoose.model("User",userSchema);


export default User;

//"email": "john.doe@example.com",
//"password": "$2b$10$abcdefghij1234567890", 

//** "email": "john.doe@exaample.com",
   // "password": "$2b",  */