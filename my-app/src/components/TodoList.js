import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';
import { Box, List, ListItem, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get todos and authentication state from Redux store
    const { todos, status, error } = useSelector((state) => state.todos);
    const token = useSelector((state) => state.auth.token);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!token) {
            navigate("/login"); // ✅ Redirect to login if no token
        } else {
            dispatch(getTodosAsync()); // ✅ Fetch todos only if logged in
        }
    }, [dispatch, token, navigate]);

    // Handle loading and error states
    if (status === "loading") return <Box sx={{ textAlign: "center", mt: 3 }}><CircularProgress /></Box>;
    if (status === "failed") return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                padding: 3,
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
                mt: 3,
            }}
        >
            <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "#1976d2", fontWeight: "bold", mb: 2 }}
            >
                My Todos
            </Typography>

            <List>
                {todos && todos.length > 0 ? (
                    todos.map((todo) => (
                        <ListItem
                            key={todo._id} // ✅ Use `_id` instead of `id`
                            sx={{
                                borderBottom: "1px solid #eee",
                                "&:last-child": { borderBottom: "none" },
                            }}
                        >
                            <TodoItem
                                id={todo._id} // ✅ Use `_id` to match MongoDB
                                title={todo.title}
                                completed={todo.completed}
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "center", color: "gray", py: 2 }}
                    >
                        No Todos Available
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default TodoList;
