import React from 'react'
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";

import { useState } from 'react'
import axios from 'axios';
const Login = () => {
const [formData,setFormData]=useState({
    email:"",
    password:""
});

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  
    axios
      .post("http://localhost:5000/login", formData)
      .then((result) => {
        console.log("Login Response:", result.data);
        navigate('/home');
      })
      .catch((err) => {
        console.log("Login Error:", err.response ? err.response.data : err.message);
      });
  };
  
const navigate= useNavigate();
  return (
     <Container maxWidth="sm">
       <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
         <Typography variant="h5" align="center" gutterBottom>
         Login
         </Typography>
         <Box component="form" onSubmit={handleSubmit}>
          
           <TextField
             fullWidth
             label="Email"
             name="email"
             type="email"
             value={formData.email}
             onChange={handleChange}
             margin="normal"
             required
           />
           <TextField
             fullWidth
             label="Password"
             name="password"
             type="password"
             value={formData.password}
             onChange={handleChange}
             margin="normal"
             required
           />
           <Button type="submit" variant="outlined" color="primary" fullWidth>
             Login
           </Button>
         </Box>
       </Paper>
     </Container>
  )
}

export default Login