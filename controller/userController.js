import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });

export function registerUser(req, res) {
  const data = req.body;

  // Handle image upload
  if (req.file) {
    data.profilePicture = req.file.filename;
  }

  if (!data.password || typeof data.password !== 'string') {
    return res.status(400).json({ error: 'Password is required and must be a string' });
  }

  // Hash password
  data.password = bcrypt.hashSync(data.password, 10);

  const newUser = new User(data);

  newUser.save()
    .then(() => {
      res.json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'User registration failed' });
    });
}

export function userLogin(req, res) {
  const data = req.body;
  User.findOne({ email: data.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        error: "Your account is blocked. Please contact the admin."
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        phoneNumber: user.phoneNumber
      }, process.env.JWT_SECRET);

      res.json({ message: "Login successful", token, user });
    } else {
      res.status(404).json({ error: "Login failed" });
    }
  });
}

export async function blockOrUnblockUser(req, res) {
  const email = req.params.email;
  if (isTtAdmin(req)) {
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found" });

      await User.updateOne({ email }, { isBlocked: !user.isBlocked });
      res.json({ message: "User blocked/unblocked successfully" });
    } catch (e) {
      res.status(500).json({ error: "Failed to get user" });
    }
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
}

export async function getAllUsers(req, res) {
    if (isTtAdmin(req)) {
      try {
        const users = await User.find();
        const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
  
        // Add full URL to profilePicture
        const usersWithProfilePicture = users.map((user) => ({
          ...user._doc,
          profilePicture: user.profilePicture ? baseUrl + user.profilePicture : null,
        }));
  
        res.json(usersWithProfilePicture);
      } catch (e) {
        res.status(500).json({ error: "Failed to get users" });
      }
    } else {
      res.status(403).json({ error: "Unauthorized to perform this task" });
    }
  }

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

export async function getCustomer(req, res) {
  const { email } = req.params;
  const loggedInUser = req.user;

  if (loggedInUser && loggedInUser.email === email && loggedInUser.role === "customer") {
    try {
      const user = await User.findOne({ email });
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ error: "Failed to get user" });
    }
  } else {
    return res.status(403).json({ error: "Unauthorized to perform this task" });
  }
}

export function isTtAdmin(req) {
  return req.user?.role === "admin";
}

export function isItCustomer(req) {
  return req.user?.role === "customer";
}

export function getUser(req, res) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(403).json({ error: "User not found" });
  }
}


export function getUserCustomertCount(req,res){
  if (req.user && req.user.role === "admin"){
    User.countDocuments({ role:"customer"})
    .then((count)=>{
      res.json({customerCount : count});

    })
    .catch((err)=>{
      console.error(err);
      res.status(500).json({
        error :"Failed to get customer count"
      })
    })
  }
}