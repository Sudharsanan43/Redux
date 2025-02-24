import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, // ✅ Load user from localStorage
    token: localStorage.getItem("token") || null, // ✅ Load token from localStorage
    loading: false,
    error: null,
  },
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      console.log("✅ Redux State Updated: ", action.payload);
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // ✅ Store user & token in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateName: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, name: action.payload };
        localStorage.setItem("user", JSON.stringify(state.user)); // ✅ Save updated name
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      // ✅ Clear from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// ✅ Register User
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("🔥 Registration API Response:", response.data);
    dispatch(authSuccess(response.data));
    navigate("/login"); // ✅ Redirect to login after registration
  } catch (error) {
    dispatch(authFailure(error.response?.data?.error || "Registration failed"));
  }
};

// ✅ Login User
export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(authStart());

    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("🔥 Login API Response:", response.data);

    if (response.status === 200 && response.data.token) {
      dispatch(authSuccess(response.data)); // ✅ Save user & token in Redux store
      navigate("/home"); // ✅ Redirect to home page
    } else {
      dispatch(authFailure("Invalid login response"));
    }
  } catch (error) {
    console.error("❌ Login Error:", error);
    dispatch(authFailure(error.response?.data?.error || "Login failed"));
  }
};

// ✅ Logout User
export const logoutUser = (navigate) => (dispatch) => {
  dispatch(logout());
  navigate("/login"); // ✅ Redirect to login after logout
};

export const { authStart, authSuccess, authFailure, updateName, logout } = userSlice.actions;
export default userSlice.reducer;
