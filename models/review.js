import mongoose from "mongoose";

//** one user have one review */
const reviewSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true,
        unique : true

    },
    name:{
        type : String,
        required : true
    },
    rating:{
        type : Number,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    profilePicture :
    {
       type : String,
       required : true, 
       default :"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw0uCU9t72Sm51_RBTIJ2OxU&ust=1739456529253000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCbiuCqvosDFQAAAAAdAAAAABAE"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    isApproved :{
        type : Boolean,
        required : true,
        default: false
    }
})

//** create a model for store user's reviews in our database */
const Review = mongoose.model("Review",reviewSchema);


export default Review;