import mongoose from "mongoose";

const StudSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
});

// Create and export the model
const studModel = mongoose.model("Student", StudSchema);
export default studModel;
