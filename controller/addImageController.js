 import image from '../models/addImage.js';

export async function addFunctionImage(res,res){
    if(!req.user){
        return res.status(401).json({
            message:"Pleaes Login and try again"
        })
    }

    if(req.user.role !== "admin"){
        return res.status(403).json({
            message :"you are not authorized to perform this action"
        })
    }

    try{
        const data =req.body;
        console.log("adding image data:",data);

        const newImage = new  image(data);
        await newImage.save();

        res.json({
            message:"Image added   successfully"
        })
    }
    catch(error){
        console.error("Image save error:",error.message);
        res.status(500).json({
            error:"Image added failed"
        })
    }
}