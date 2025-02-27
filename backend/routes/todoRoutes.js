import express from "express";
import Todo from "../models/todoModel.js";
import verifyToken from "../middleWare/jwtToken.js";
const router = express.Router();

// ✅ Get all todos for logged-in user
router.get("/", verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id }); // Fetch only user-specific todos
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Add a new todo for logged-in user
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        const newTodo = new Todo({
            title,
            userId: req.user.id, // Attach user ID from token
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Toggle completed status of a todo
router.patch("/:id", verifyToken, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Update a Todo (Edit title or other fields)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        console.log("Request Body:", req.body); // ✅ Log incoming request data
        console.log("Todo ID:", req.params.id);
        console.log("User ID:", req.user.id);

        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, 
            { title },
            { new: true,runValidators: true } // ✅ Return updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Server error" });
    }
});





// ✅ Delete a todo
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
