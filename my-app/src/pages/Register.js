import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice"; 
import { ToastContainer, toast } from 'react-toastify';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  // 🔹 Handle Form Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const resultAction = await dispatch(registerUser(formData)).unwrap(); // ✅ Wait for completion

      if (resultAction) { // ✅ If registration was successful
        toast.success("🎉 Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // ✅ Redirect after a short delay
      }
    } catch (error) {
      console.error("❌ Registration failed:", error);
      toast.error(`❌ ${error}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ padding: 4, marginTop: 5, borderRadius: 3 }}>
        
        {/* 🔹 Title and Subtitle */}
        <Typography variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          Please fill in the details to create your account.
        </Typography>

        {/* 🔹 Error Message */}
        {error && (
          <Typography color="error" sx={{ backgroundColor: "#ffdddd", padding: "8px", borderRadius: "5px", marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {/* 🔹 Registration Form */}
        <Box component="form" onSubmit={handleSubmit}>
          
          {/* Grid layout for text fields */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Full Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                variant="outlined" 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Email Address" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                variant="outlined" 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Password" 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                variant="outlined" 
              />
            </Grid>
          </Grid>

          {/* 🔹 Submit Button */}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={loading} 
            sx={{ marginTop: 3, fontSize: "16px", fontWeight: "bold" }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>

          {/* 🔹 Already have an account */}
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <Button onClick={() => navigate("/login")} color="primary" sx={{ textTransform: "none" }}>
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>

      {/* 🔹 Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Register;

