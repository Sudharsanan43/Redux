// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/userSlice"; // Import Redux action
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Paper,
// } from "@mui/material";

// const Register = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.user); 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(formData, navigate)); 
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
//         <Typography variant="h5" align="center" gutterBottom>
//           Register
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
//           <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
//           <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />
//           <Button type="submit" variant="outlined" color="primary" fullWidth disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </Box>
//         <div>
//           <p>Already have an account?</p>
//           <Button onClick={() => navigate("/login")}>Login</Button>
//         </div>
//       </Paper>
//     </Container>
//   );
// };

// export default Register;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice"; 
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (user) {
      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        
        {error && (
          <Typography color="error" style={{ backgroundColor: "#ffdddd", padding: "8px", borderRadius: "5px" }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField 
            fullWidth label="Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            margin="normal" 
            required 
          />
          <TextField 
            fullWidth label="Email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            margin="normal" 
            required 
          />
          <TextField 
            fullWidth label="Password" 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange} 
            margin="normal" 
            required 
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={loading} 
            style={{ marginTop: "10px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Typography variant="body2">Already have an account?</Typography>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Register;
