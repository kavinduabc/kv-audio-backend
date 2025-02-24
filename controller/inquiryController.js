import Inquiry from "../models/inquiry.js";
import { isItCustomer, isTtAdmin } from "../controller/userController.js";

export async function addInquiry(req, res) {
  try {
    if (!isItCustomer(req)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    

    const data = req.body;
    data.email = req.user.email;
    data.phone = req.user.phoneNumber; 

    if (!data.response) {
      data.response = "No response yet";
    }

    // Generate request id
    let id = 1;
    const lastInquiry = await Inquiry.findOne().sort({ id: -1 });

    if (lastInquiry) {
      id = lastInquiry.id + 1;
    }

    data.id = id;
    const newInquiry = new Inquiry(data);
    const response = await newInquiry.save();

    res.json({
      message: "Inquiry added successfully",
      id: response.id
    });
  } catch (e) {
    
    res.status(500).json({ message: "Failed to add inquiry" });
  }
}

//** create funtion for getting inquiries */
export async function getInquiry(req,res)
{
  try {
    if(isItCustomer(req)){
      const inquiries = await Inquiry.find({email:req.user.email});
      res.json(inquiries);
      return;
    }
    else if (isTtAdmin(req)) {
      const inquiries = await Inquiry.find();
      res.json(inquiries);
      return;
    } else {
      res.status(403).json({
        message : "you are not authorized to performe this action"
      })
    }
  } catch (e) {
    res.status(500).json({
      message : "Failed to get inquiries"
    })
  }
}
//** delete inquiry funtion  */
export async function deleteInquiry(req,res){
  try {
   if(isTtAdmin(req)){
       const id = req.params.id;

       await Inquiry.deleteOne({id:id})
       res.json({
        message : "Inquiry delete suucessfully"
       })
   }
   else if (isItCustomer(req)) {
        const id = req.params.id;
       const inquiry = await Inquiry.findOne({id:id});

       if(inquiry == null){
        res.status(403).json({
          message : "Inquiry not found"
        })
        return ;
       }
       else{
          if(inquiry.email == req.user.email){
            await Inquiry.deleteOne({id:id})
            res.json({
              message : "Inqiry delete successfully"
            })
            return ;
          }
          else{
            res.status(403).json({
              message :"You are not authorized to perform this action"
             })
             return ;
          }
       }

   } else {
     res.status(403).json({
      message :"You are not authorized to perform this action"
     })
     return ;
   }
  } catch (e) {
    res.status(500).json({
      message : "Failed to delete inquiry"
    })
  }
}

//** create function for update inquiry */
export async function updateInquiry(req,res){
   try {
    if(isTtAdmin(req)){
      const id = req.params.id;
      const data = req.body;

      await Inquiry.updateOne({id:id},data)
      res.json({
        message : "Inquiry update successfully"
      })
      return ;
    }
    else if (isItCustomer(req)) {
      
      const id = req.params.id;
      const data = req.body;

      const inquiry =await Inquiry.findOne({id:id});
      if(inquiry == null){
        res.status(404).json({
          message : "Inquiry not found"
        })
        return ;
      }
     else{
      if (inquiry.email == req.user.email) {
        await Inquiry.updateOne({id:id},{message :data.message})
        res.json({
          message :"Inquiry Updated successfully"
        })
        return ;
      } else {
        res.status(403).json({
          message :"you are not authorized to perform this action"
        })
        return ;
      }
     }

    } else {
      res.status(403).json({
        message :"you are not authorized to perform this action"
      })
      return ;
    }
    
   } catch (e) {
    res.status(500).json({
      message : "failed to update inquiry"
    })
   }
}