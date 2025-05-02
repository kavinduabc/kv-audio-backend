import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

//** load the enviorment variable file lode */
dotenv.config();

export function rejisterUser(req,res){
    //get all request data from body request
    const data = req.body;
     // hashing user password
    data.password =bcrypt.hashSync(data.password,10)
    const newUser = new User(data)
    //save the request data in database
    newUser.save().then(()=>{
        res.json(
            {
                message : "User registered successfully"
            }
        )
    }).catch((error)=>{
        res.status(500).json({error :"User rejistration faild"})
    })
}
//**
// crete a function for ligin and authontication 
// process */
export function userLogin(req,res){

    const data = req.body;
    User.findOne({
        email : data.email
    }).then(
        //**   become this result 
        // include the (user)  */
        (user)=>{
            if(user == null){
                res.status(404).json({error : "User not found"})
            }
            else{
            
                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);


                if(isPasswordCorrect)
                {
                   //create  a token for encryption process
                   const token = jwt.sign({
                      firstName :user.firstname,
                      lastName : user.lastname,
                      email :user.email,
                      role : user.role,
                      profilePicture : user.profilePicture,
                      phoneNumber : user.phoneNumber

                   },process.env.JWT_SECRET)

                    res.json({message : "Login successfull",token : token,user : user});
                }
                else{
                    res.status(404).json({error : "Login faild"});
                }
            }
        }
    )
}

export async function getAllUsers(req,res){

     if(isTtAdmin(req))
     {
        try {
           const users = await User.find();
           res.json(users); 
        } catch (e) {
            res.status(500).json(
                {
                    error : "Faild to get users "
                }
            )
        }
     }else{
        res.status(403).json({
            error : "Unauthorized to perform this task"
        })
     }
}


export  function isTtAdmin(req)
{
   let isAdmin = false;

   if(req.user != null){
      if(req.user.role == "admin")
      {
         isAdmin = true;
      }
   }
  

   return isAdmin;
}

export function isItCustomer(req){
    let isCustomer = false;

    if(req.user != null){
        if(req.user.role == "customer"){
            isCustomer = true;
        }
    }

    return isCustomer;
}