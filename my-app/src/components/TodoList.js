import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';
import { Box, List, ListItem, Typography, Paper } from "@mui/material";
const TodoList = () => {
    const dispatch = useDispatch();

    // Dispatch API call on component mount
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    // Get todos and state status from Redux store
    const { todos, status, error } = useSelector((state) => state.todos);

    // Handle loading and error states
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        // <ul className='list-group'>
        //     {todos.length > 0 ? (
        //         todos.map((todo) => (
        //             <TodoItem 
        //                 id={todo.id} 
        //                 title={todo.title} 
        //                 key={todo.id} 
        //                 completed={todo.completed} 
        //             />
        //         ))
        //     ) : (
        //         <p>No Todos Available</p>
        //     )}
        // </ul>

<Box
  sx={{
    backgroundColor: "#fff", // ✅ White background for contrast
    padding: 3, // ✅ Adds spacing
    borderRadius: "8px", // ✅ Soft rounded corners
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // ✅ Adds subtle shadow
    border: "1px solid #ddd", // ✅ Adds light border
    mt: 3, // ✅ Adds top margin
  }}
>
  <Typography
    variant="h5"
    sx={{ textAlign: "center", color: "#1976d2", fontWeight: "bold", mb: 2 }}
  >
    My Todos
  </Typography>

  <List>
    {todos.length > 0 ? (
      todos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            borderBottom: "1px solid #eee", // ✅ Light separator
            "&:last-child": { borderBottom: "none" }, // ✅ Removes last border
          }}
        >
          <TodoItem 
            id={todo.id} 
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
