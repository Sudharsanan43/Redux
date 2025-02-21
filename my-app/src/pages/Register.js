import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice"; // Import Redux action
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData, navigate)); 
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />
          <Button type="submit" variant="outlined" color="primary" fullWidth disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
        <div>
          <p>Already have an account?</p>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Register;
