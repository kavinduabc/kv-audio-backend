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
    // data.name = req.user.firstName + " " + req.user.lastName;
    data.name = req.user.firstname + "" + req.user.lastname ;
     data.profilePicture = req.user.profilePicture;
     data.email = req.user.email;
  //** create a review for ,it can save the database  */
    const  newReview = new Review(data)
    newReview.save().then(()=>{
       return res.status(201).json({
        message : "Review added successfully"
       }) 
    }).catch((error)=>{
       return res.status(501).json({
            message : "Review addtion failed"
        })
    });


} 

export function getReviews(req,res){
     const user = req.user;
     //** cheke  the user role   */
     if(user == null || user.role != "admin")
     {
        Review.find({isApproved : true}).then((reviews)=>{
            res.json(reviews);
        })
        return 
     }
     if(user.role == "admin")
     {
        Review.find().then((reviews)=>{
            res.json(reviews);
        })
     }
}