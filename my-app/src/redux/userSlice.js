import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    authStart: (state) => { state.loading = true; state.error = null; },
    authSuccess: (state, action) => { 
      console.log("Redux State Updated: ", action.payload); 
      state.loading = false; state.user = action.payload; 
      console.log(state);
    },
    authFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    updateName:(state,action)=>{
      if(state.user){
        state.user=action.payload;
      }
    }
  }, 
});



export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await axios.post("http://localhost:5000/register", userData);
    dispatch(authSuccess(response.data));
    const navigate = useNavigate();
    navigate('/login');
    
  } catch (error) {
    dispatch(authFailure(error.response?.data?.error || "Registration failed"));
  }
};


export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(authStart());
    const response = await axios.post("http://localhost:5000/login", userData);

    dispatch(updateName(
  
       response.data.name, 
    )); 
    console.log("🔥 Login API Response:", response.data);} catch (error) {
    dispatch(authFailure(error.response?.data?.error || "Login failed"));
  }
};



export const logout = () => (dispatch) => {
  dispatch({ type: "user/logout" });
  localStorage.removeItem("token"); 
};

export const { authStart, authSuccess, authFailure,updateName } = userSlice.actions;

export default userSlice.reducer;