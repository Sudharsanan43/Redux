import React from 'react';
import { useDispatch } from 'react-redux';
import {toggleComplete,deleteTodo} from "../redux/todoSlice"
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem, ListItemText, Checkbox, IconButton, Paper } from "@mui/material";

const TodoItem = ({ id, title, completed }) => {
const dispatch=useDispatch();
const handleCheckboxClick=()=>{
	console.log(id);
dispatch(toggleComplete({id,completed:!completed}));
};
const handleDeleteClick=()=>{
	dispatch(deleteTodo(id));
}

	return (
		<Paper
		elevation={2} // ✅ Adds soft shadow
		sx={{
			mb: 2, // ✅ Adds spacing between todos
			p: 2, // ✅ Padding inside
			backgroundColor: completed ? "#d4edda" : "white", // ✅ Green background for completed items
			borderRadius: "8px", // ✅ Smooth rounded corners
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			boxShadow: completed ? "0px 2px 10px rgba(0, 128, 0, 0.2)" : "0px 2px 8px rgba(0, 0, 0, 0.1)", // ✅ Shadow effect for completed
			width:"100%"
		}}
	>
		{/* ✅ Checkbox */}
		<Checkbox
			checked={completed}
			onChange={handleCheckboxClick}
			color="success"
			sx={{ mr: 2 }} // ✅ Adds space between checkbox and text
		/>

		{/* ✅ Todo Text */}
		<ListItemText
			primary={title}
			sx={{
				textDecoration: completed ? "line-through" : "none", // ✅ Cross out completed items
				color: completed ? "#2e7d32" : "black", // ✅ Green text for completed
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
