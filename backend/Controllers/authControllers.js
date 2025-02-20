import studModel from "../models/studentModel.js";
import bcrypt from "bcryptjs";

// ✅ REGISTER USER
export const authRegController = async (req, res) => {
  try {
    const stud = await studModel.create(req.body); // User is already hashed in middleware
    console.log("Registered User:", stud);
    res.status(201).json({ message: "User registered successfully", user: stud });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ LOGIN USER
export const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await studModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
