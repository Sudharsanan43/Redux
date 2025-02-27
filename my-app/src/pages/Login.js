import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice"; // Import action
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
} from "@mui/material";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user); // Track user state
    const error = useSelector((state) => state.user.error);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(loginUser(formData, navigate));
    
            if (loginUser.fulfilled.match(resultAction)) {  // ✅ Correct way to check success
                console.log(user+"no USER YET");
                console.log(user + "no USER YET");
console.log("✅ User logged in, navigating...");
toast.success("You will be redirected to home");

setTimeout(() => {
  navigate("/home");
}, 2000); 

            } else {
                console.error("❌ Login failed:", resultAction.payload);
            }
        } catch (error) {
            console.error("❌ Login Error:", error);
        }
    };
    useEffect(() => {
        if (error) {
            console.log("🚨 Registration Error:", error);
            toast.error(error); // ✅ Show toast notification
        }
    }, [error]);
   


    return (
        <Container maxWidth="sm">
            <ToastContainer position="top-right" autoClose={4000}/>
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                {/* {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )} */}
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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Box>
 <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Typography variant="body2">Not Registered Yet? <Button onClick={() => navigate("/")}>Register</Button></Typography>
          
        </div>
                
                
            </Paper>
        </Container>
    );
};

export default Login;
