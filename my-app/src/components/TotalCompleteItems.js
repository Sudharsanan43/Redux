import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, CircularProgress } from "@mui/material";

const TotalCompleteItems = () => {
    const { todos, status } = useSelector((state) => state.todos);
    
    if (status === "loading") {
        return (
            <Box sx={{ textAlign: "center", mt: 3 }}>
                <CircularProgress /> {/* ✅ Show loading spinner */}
            </Box>
        );
    }

    const completedTodos = (todos || []).filter((todo) => todo.completed).length; // ✅ Ensures todos is always an array

    return (
        <Box
            sx={{
                mt: 3,
                backgroundColor: "#f1f1f1",
                padding: 2,
                borderRadius: "8px",
                textAlign: "center",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                {completedTodos > 0 
                    ? `Total Completed Todos: ${completedTodos}` 
                    : "No Completed Todos Yet"}
            </Typography>
        </Box>
    );
};

export default TotalCompleteItems;
