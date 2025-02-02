import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

                   },"kv-secret-89")

                    res.json({message : "Login successfull",token : token});
                }
                else{
                    res.status(404).json({error : "Login faild"});
                }
            }
        }
    )
}