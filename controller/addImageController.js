import addImage from "../models/addImage.js"; // Make sure the file name and path are correct

export async function addFunctionImage(req, res) {
    if (!req.user) {
        return res.status(401).json({
            message: "Please login and try again"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not authorized to perform this action"
        });
    }

    try {
        const data = req.body;
        console.log("Adding image data:", data);

        const newImage = new addImage(data); // ✅ Corrected model usage
        await newImage.save();

        res.json({
            message: "Image added successfully"
        });
    } catch (error) {
        console.error("Image save error:", error.message);
        res.status(500).json({
            error: "Image add failed"
        });
    }
}

export async function getAllImages(req, res) {
    if (!req.user) {
        return res.status(401).json({
            message: "Please login and try again"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not authorized to perform this action"
        });
    }

    try {
        const images = await addImage.find({}); 
        res.json(images);
    } catch (error) {
        console.error("Fetch images error:", error.message);
        res.status(500).json({
            error: "Failed to get images"
        });
    }
}
