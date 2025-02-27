import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography, Paper, Box } from "@mui/material";
import AddTodoForm from "../components/AddTodoForm"; 
import TodoList from "../components/TodoList"; 
import TotalCompleteItems from "../components/TotalCompleteItems"; 

const Home = () => {
  const user = useSelector((state) => state.user?.user); 
  console.log("Redux User State:", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Container maxWidth="md">
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Todo App</Typography>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 4, mt: 3, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mt: 2 }}>
          Hello, {user?.name || "Guest"}!
        </Typography>
        <Typography variant="h6" gutterBottom color="primary">
          Let's Work on the tasks!
        </Typography>
        <Typography variant="h8">
          Don't Mess Up
        </Typography>

        
      </Paper>

      {/* Todo Section */}
      <Box
  sx={{
    mt: 4,
    p: 4,
    background: "linear-gradient(135deg, #f9f9f9 30%, #ffffff 90%)", // ✅ Soft gradient background
    borderRadius: "12px", // ✅ More rounded corners
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // ✅ Soft shadow for depth
    border: "1px solid #e0e0e0", // ✅ Light border for subtle separation
  }}
>
  <Typography
    variant="h4"
    gutterBottom
    sx={{
      color: "#1976d2", // ✅ Uses MUI primary color
      fontWeight: "bold",
      textAlign: "center", // ✅ Centers heading
    }}
  >
    My Todo List
  </Typography>
  
  <AddTodoForm />

  <Box sx={{ mt: 2 }}>
    <TodoList />
  </Box>

  <Box sx={{ mt: 3, textAlign: "center" }}> 
    <TotalCompleteItems />
  </Box>
</Box>

    </Container>
  );
};

export default Home;
