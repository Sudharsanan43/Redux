import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoAsync, deleteTodoAsync, editTodoAsync } from "../redux/todoSlice"; 
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemText, Checkbox, IconButton, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {Tooltip} from '@mui/material';

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleCheckboxClick = () => {
        dispatch(toggleTodoAsync(id)); 
    };

    const handleDeleteClick = async () => {
      toast.success("Task Removed",{duration:2000 }); 
      await dispatch(deleteTodoAsync(id)); 
      // Now it triggers after the task is actually removed
  };
  
  
    const handleEditClick = () => {
        setOpen(true); // Open the edit dialog
    };
    
    const handleEditSave = () => {
        if (newTitle.trim() === "") {
            toast.error("Title cannot be empty!");
            return;
        }
    
        dispatch(editTodoAsync({ id, updatedData: { title: newTitle } }))
            .unwrap() // ✅ Ensures we handle success & errors properly
            .then(() => {
                toast.success("Task updated successfully");
                setOpen(false); // ✅ Close modal only after update
            })
            .catch((error) => {
                toast.error("Failed to update task: " + error);
            });
    };
    
    return (
        <>
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
                <ToastContainer position='top-right' autoClose={2500} />

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

                {/* ✅ Edit Button */}
                <Tooltip 
      title="Edit" 
      arrow
      placement="top"
      enterDelay={300} 
      leaveDelay={200}
      sx={{
        "& .MuiTooltip-tooltip": { // Customizing the tooltip box
          backgroundColor: "#2196F3", // Blue background
          color: "white", // White text
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "8px",
        },
        "& .MuiTooltip-arrow": { // Customizing the arrow
          color: "#2196F3", // Matches background color
        }
      }}
    >
      <IconButton 
        onClick={handleEditClick} 
        color="primary" 
        sx={{
          backgroundColor: "#e3f2fd", // Light blue background
          "&:hover": { 
            backgroundColor: "#bbdefb" // Darker blue on hover
          },
          borderRadius: "50%", 
          padding: "5px"
        }}
      >
        <EditNoteIcon sx={{ fontSize: 25 }} /> {/* Larger Icon */}
      </IconButton>
    </Tooltip>
                {/* ✅ Delete Button */}
                <Tooltip 
      title="Delete" 
      arrow
      placement="top"
      enterDelay={300} 
      leaveDelay={200}
      sx={{
        "& .MuiTooltip-tooltip": { // Styling the tooltip box
          backgroundColor: "#d32f2f", // Red background for warning
          color: "white", // White text for contrast
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "8px",
        },
        "& .MuiTooltip-arrow": { // Styling the arrow
          color: "#d32f2f", // Matches the tooltip background
        }
      }}
    >
      <IconButton 
        onClick={handleDeleteClick} 
        color="error" 
        sx={{
          backgroundColor: "#ffebee", // Light red background
          "&:hover": { 
            backgroundColor: "#ffcdd2" // Slightly darker red on hover
          },
          marginLeft:"5px",
          borderRadius: "50%", 
          padding: "5px"
        }}
      >
        <DeleteIcon sx={{ fontSize: 25 }} /> {/* Enlarged Icon */}
      </IconButton>
    </Tooltip>
            </Paper>

            {/* ✅ Edit Dialog (Modal) */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Todo Title"
                        type="text"
                        fullWidth
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TodoItem;
