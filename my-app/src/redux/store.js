import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import   todoReducer from "./todoSlice"
import authReducer from "./authSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
    auth:authReducer
  },
});

export default store;
