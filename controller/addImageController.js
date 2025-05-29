

export async function addImageGallery(req,res){
     try{
        if(isItAdmin(req)){
            const {image,functionName,discription} = req.body;

            if(!image || !functionName || !discription){
                return res.status(400).json({
                    message :"Plese file the all fields"
                })
            }
             const newImage = new image
             (
                {
                    image,
                    functionName,
                    discription
                }
             ).save();
             res.json({
                message : "Image added to gallery successfully",
                newImage
             })
        }

     }
     catch(e){
        res.status(500).json({
            message :"Failed to add image to gallery"
        })
     }
}