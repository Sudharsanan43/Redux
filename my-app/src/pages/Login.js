import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice"; // Import action
import { useNavigate } from "react-router-dom";
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

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData, navigate)); // Pass navigate here
    };

    // useEffect(() => {
    //     if (user) {
    //         console.log("✅ User logged in, navigating...");
    //         navigate("/home");
    //     }
    // }, [user, navigate]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}
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
    );
};

export default Login;
