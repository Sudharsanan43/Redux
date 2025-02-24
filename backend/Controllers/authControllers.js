import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import studModel from "../models/studentModel.js"; // Adjust path if needed
import bcrypt from "bcryptjs";
dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || "SecretKey"; // Ensure it's properly set

export const authRegController = async (req, res) => {
  try {
    // Create user in the database (password is already hashed in middleware)
    const stud = await studModel.create(req.body);
    console.log("Registered User:", stud);
    console.log("JWT_SECRET:", JWT_SECRET); // Debugging line

    if (!JWT_SECRET) {
      console.error("ERROR: JWT_SECRET is not defined in .env file");
      return res.status(500).json({ error: "Server misconfiguration: JWT_SECRET missing" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: stud._id, email: stud.email }, // Payload
      JWT_SECRET, // Correctly passing the secret key
      { expiresIn: "1h" } // Token expiration
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: stud._id,
        username: stud.username,
        email: stud.email,
      },
      token, // Send token in response
    });
  } catch (err) {
    console.error("Registration Error:", err.message); // Better error logging
    res.status(500).json({ error: err.message });
  }
};





export const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Find user by email
    const user = await studModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // ✅ Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email }, // Use `id` instead of `userId`
      process.env.JWT_SECRET, // Use `.env` variable for security
      { expiresIn: "1d" } // Expiration: 1 day
    );

    // ✅ Send token & user info (excluding password)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // Send JWT token
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
