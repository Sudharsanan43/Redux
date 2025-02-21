import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      console.log("✅ Redux State Updated: ", action.payload);
      state.loading = false;
      state.user = action.payload;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateName: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, name: action.payload }; // Ensure a new object is created
      }
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});
export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await axios.post("http://localhost:5000/api/auth/register", userData);

    dispatch(authSuccess(response.data));

    console.log("🔥 Registration API Response:", response.data);
    
    navigate("/login");
  } catch (error) {
    dispatch(authFailure(error.response?.data?.error || "Registration failed"));
  }
};
export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
      dispatch(authStart());
      const response = await axios.post("http://localhost:5000/api/auth/login", userData);

      dispatch(authSuccess(response.data));

      console.log("🔥 Login API Response:", response.data);

      if (response.data) {
          navigate("/home"); // Navigate after successful login
      }
  } catch (error) {
      dispatch(authFailure(error.response?.data?.error || "Login failed"));
  }
};



export const { authStart, authSuccess, authFailure, updateName, logout } = userSlice.actions;
export default userSlice.reducer;
