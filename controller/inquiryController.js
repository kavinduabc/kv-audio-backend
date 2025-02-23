import Inquiry from "../models/inquiry.js";
import { isItCustomer } from "../controller/userController.js";

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
