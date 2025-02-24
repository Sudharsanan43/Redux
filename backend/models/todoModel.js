import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Link todo to user
}, { timestamps: true });

const Todo = mongoose.model("Todo", TodoSchema); // ✅ Use "Todo" (singular, capitalized)
export default Todo;
