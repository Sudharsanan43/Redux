import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoAsync, deleteTodoAsync } from "../redux/todoSlice"; // ✅ Correct imports
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemText, Checkbox, IconButton, Paper } from "@mui/material";

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    const handleCheckboxClick = () => {
        console.log(id);
        dispatch(toggleTodoAsync(id)); // ✅ Use correct async thunk
    };

    const handleDeleteClick = () => {
        dispatch(deleteTodoAsync(id)); // ✅ Use correct async thunk
    };

    return (
        <Paper
            elevation={2}
            sx={{
                mb: 2,
                p: 2,
                backgroundColor: completed ? "#d4edda" : "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: completed ? "0px 2px 10px rgba(0, 128, 0, 0.2)" : "0px 2px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
            }}
        >
            {/* ✅ Checkbox */}
            <Checkbox
                checked={completed}
                onChange={handleCheckboxClick}
                color="success"
                sx={{ mr: 2 }}
            />

            {/* ✅ Todo Text */}
            <ListItemText
                primary={title}
                sx={{
                    textDecoration: completed ? "line-through" : "none",
                    color: completed ? "#2e7d32" : "black",
                    fontWeight: completed ? "bold" : "normal",
                }}
            />

            {/* ✅ Delete Button */}
            <IconButton onClick={handleDeleteClick} color="error">
                <DeleteIcon />
            </IconButton>
        </Paper>
    );
};

export default TodoItem;
