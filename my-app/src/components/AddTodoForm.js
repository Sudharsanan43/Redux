import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';
import { Box, TextField, Button } from "@mui/material";
const AddTodoForm = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

	const onSubmit = (event) => {
        event.preventDefault();
        if (value) {
            dispatch(
                addTodoAsync({
                    title: value,
                })
            );
        }
    };

    return (
      
<Box
  component="form"
  onSubmit={onSubmit}
  sx={{
    display: "flex",
    flexDirection: "column", // ✅ Stacks elements vertically
    gap: 2, // ✅ Adds spacing between elements
    alignItems: "center", // ✅ Centers content
    backgroundColor: "#f9f9f9", // ✅ Soft background
    padding: 3, // ✅ Adds spacing inside the box
    borderRadius: "8px", // ✅ Slightly rounded corners
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // ✅ Soft shadow for depth
    border: "1px solid #ddd", // ✅ Subtle border
    maxWidth: "500px", // ✅ Prevents it from being too wide
    mx: "auto", // ✅ Centers horizontally
    mt: 3, // ✅ Adds top margin
  }}
>
  <TextField
    id="todoInput"
    label="Add Todo"
    variant="outlined"
    fullWidth
    value={value}
    onChange={(event) => setValue(event.target.value)}
    sx={{
      backgroundColor: "white", // ✅ Ensures input stays clean
      borderRadius: "5px",
    }}
  />

  <Button 
    type="submit" 
    variant="contained" 
    color="primary" 
    sx={{ width: "100%" }} // ✅ Makes button full width
  >
    Submit
  </Button>
</Box>

    );
};

export default AddTodoForm;
