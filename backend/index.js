import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studModel from "./models/studentModel.js"
import hashpassword from "./middleWare/hashpassword.js";
import bcrypt from "bcryptjs";
import router from "./routes/authRoutes.js";
const app = express();
const PORT = 5000; 

// Middleware
app.use(express.json()); 
app.use(cors()); 


mongoose  
  .connect("mongodb://127.0.0.1:27017/sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  // app.post("/register", hashpassword, async (req, res) => {
  //   try {
  //     const stud = await studModel.create(req.body);
  //     console.log("Registered User:", stud);
  //     res.status(201).json({ message: "User registered successfully", user: stud });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
  

  // app.post("/login", async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
      
  //     // Find user by email
  //     const user = await studModel.findOne({ email });
  //     if (!user) return res.status(400).json({ error: "User not found" });
  
  //     // Compare entered password with stored hashed password
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
  //     res.status(200).json({ message: "Login successful" ,
  //       name:user.name
  //     });
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
  

  app.use("/api/auth",router)
app.get('/',(req,res)=>{
 res.send("hello World")
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
