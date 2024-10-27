


import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Storecontext } from '../../context/StoreContext'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const{userLogin,setUserLogin,userId,setUserId,setUserName,email,setEmail}=useContext(Storecontext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Show loading toast
    const loadingToast = toast.loading("Creating your account...");
  
    try {
      const response = await axios.post(`https://ecomersebackend-r961.onrender.com/api/user/signup`, formData);
      
     
      toast.dismiss(loadingToast);
      
      if (response.data.Success) {
        toast.success("Signup successful! Please check your email for the verification code.");
        
        
        setUserId(response.data.data.data.userId);
        setUserName(formData.name); // Use formData.name to get the name from the state
        setEmail(formData.email)
  
        navigate("/verify"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
     
      toast.dismiss(loadingToast);
      toast.error("Failed to create an account. Please try again.");
    }
  };
  

  return (
    <div className="signup-container">
      <ToastContainer/>
      <div className="form-box">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="create-account-btn">
            Create Account
          </button>
        </form>
        <p>
          Have an account? <NavLink to={'/login'}>Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
