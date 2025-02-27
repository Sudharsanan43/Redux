import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// ✅ Register User

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("🔥 Registration API Response:", response.data);

      // ✅ Remove `response.status === 200` check to allow `201 Created`
      if (response.data.token && response.data.user) {
        return {
          user: response.data.user,
          token: response.data.token,
          message: response.data.message || "User registered successfully",
        }; 
      } else {
        return rejectWithValue("Invalid registration response");
      }
    } catch (error) {
      console.error("❌ Registration API Error:", error.response?.data);

      // ✅ Handle MongoDB Duplicate Email Error (`E11000`)
      if (error.response?.data?.error && typeof error.response.data.error === "string") {
        if (error.response.data.error.includes("E11000 duplicate key error")) {
          return rejectWithValue("This email is already registered. Please log in.");
        }
        return rejectWithValue(error.response.data.error);
      }

      // ✅ Generic Error Handling
      return rejectWithValue(error.response?.data || "Registration failed. Please try again.");
    }
  }
);


// ✅ Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("🔥 Login API Response:", response.data);

      if (response.status === 200 && response.data.token) {
        return response.data; // ✅ Return user & token to Redux
      } else {
        return rejectWithValue("Invalid login response");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

// ✅ Logout User (No Need for Navigation Here)
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("✅ Redux State Updated (Register):", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null; // ✅ Reset error on success
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
    })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("✅ Redux State Updated (Login):", action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

