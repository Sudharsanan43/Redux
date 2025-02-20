import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice"; // Import logout action
import { useNavigate } from "react-router-dom";

const Home = () => {
  var user = useSelector((state) => state.user.user); 
  console.log(user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear user from Redux state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      
    
        <>
          <h2>Hello, {user}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
 
        <p>Please log in.</p>
    
      
    </div>
  );
};

export default Home;
