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

//** create a function for delete review  */
export function deleteReviews(req,res){

    const email = req.params.email;
   //** admin can delete all reviews,but
   // customer can delete his's reviews */
    if(req.user == null){
        res.status(401).json({
            message:" Please login and try again"
        });
        return 
    }

    if(req.user.role == "admin")
    {
        Review.deleteOne({email : email}).then(()=>{
            res.json({
                message : "Review deleted successfully"
            });
        }).catch(()=>{
            res.status(500).json({
                message : " Review deletion failed"
            });
        });
        return 
    }

    if(req.user.role == "customer")
    {
       if(req.user.email == email)
       {
        Review.deleteOne({email : email}).then(()=>{
            res.json({
                message : "Review deleted successfully"
            });
        }).catch(()=>{
            res.status(500).json({
                message : " Review deletion failed"
            });
        });
       }
       else{
        res.status(403).json({
            message : "You are not authorized to perform this action"
        });
       }
       return 
    }


   
}

export function approvedReview(req,res){

    const email = req.params.email;
    //** check the user is allready login  */
    if(req.user == null)
    {
        res.status(401).json({
            message : "Please login and try again"
        });
        return 
    }
    if(req.user.role == " admin")
    {
        Review.updateOne(
            {
                email : email 
            },{
               isApproved : true
            }
        ).then(()=>{
           res.json({
            message : " Review approved successfully"
           }).catch(()=>{
            res.status(500).json({
                error : "Review approval failed"
            });
           });
        })
    }
    else{
        res.status(403).json({
            message: " You are not and admin.Only admins can approve the reviews "
        });
    }
}