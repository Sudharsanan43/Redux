import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,  // ✅ Ensures token persists
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
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

            // ✅ Store user & token in localStorage
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
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

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;
