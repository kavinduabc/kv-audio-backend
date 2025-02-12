import Review from "../models/review.js";


export function addReview(req,res){
    //** create a condition for user is all redylogin  */
    if(req.user == null)
    {
        res.status(401).json({
            message : "please login and try again"
        })
        return;
    }

    const data = req.body;
     data.name = req.user.firstName + " " + req.user.lastName;
     data.profilePicture = req.user.profilePicture;
     data.email = req.user.email;
  //** create a review for ,it can save the database  */
    const  newReview = new Review(data)
    newReview.save().then(()=>{
        message : "Review added successfully"
    }).catch((error)=>{
        res.status(501).json({
            message : "Review addtion failed"
        })
    });


} 