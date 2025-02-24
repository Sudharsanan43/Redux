import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js"

import dotenv from "dotenv"
import router from "./routes/authRoutes.js";
const app = express();
const PORT = 5000; 

dotenv.config();
// Middleware
app.use(express.json()); 
app.use(cors()); 


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));



  app.use("/api/auth",router)
  app.use("/api/todos",todoRoutes)

app.get('/',(req,res)=>{
 res.send("hello World")
})

app.listen(process.env.PORT||5000 , () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(process.env.MONGO_URL);
});

