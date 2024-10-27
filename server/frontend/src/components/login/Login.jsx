

import React, { useState,useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Storecontext } from '../../context/StoreContext';

function Login() {
  const{userLogin,setUserLogin,userId,setUserId,setUserName}=useContext(Storecontext)
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${window.location.origin}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
     
      // localStorage.clear()
      setUserId(data._id);

      setUserName(data.name);
      
      

      if (!data.success) {
        setError(data.message || "Login failed");
      } else {
       
        
        setUserLogin(true)
        navigate("/product");
        setSuccess(true);

        
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
      
    }
  };

  return (
    <div className="login-container">
    <ToastContainer />
      <div className="login-box">
        <h1>Login</h1>
        <h2>Welcome back to ECOMMERCE</h2>
        <p>The next-gen business marketplace</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="show-btn" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Login successful!</p>}
          <button type="submit" className="login-btn">LOGIN</button>
        </form>
        <p className="signup-link">
          Don’t have an Account? <a href="/signup">SIGN UP</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
