import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CiLinkedin } from "react-icons/ci";
import {NavBar, PromoBar,Help,VerifyEmail,Login,SignUpForm,ProductPage,PrivateRoute} from './components';

function App() {
  return (
    <Router>
      <Help/>
      <NavBar />
      <PromoBar/>
      <Routes>
        <Route path="/" element={<h2>Home Page......</h2>} />
        <Route path="/categories" element={<h2>Categories Page.......</h2>} />
        <Route path="/sale" element={<h2>Sale Page.........</h2>} />
        <Route path="/clearance" element={<h2>Clearance Page.....</h2>} />
        <Route path="/new-stock" element={<h2>New Stock Page...</h2>} />
        <Route path="/trending" element={<h2>Trending Page.....</h2>} />
        <Route path="/signup" element={<SignUpForm/>} /> 
        <Route path="/verify" element={<VerifyEmail/>}/>
        <Route path="/login" element={<Login/>}/>



        <Route path="/product" element={<PrivateRoute />}>
          <Route path="" element={<ProductPage />} />
        </Route> 
        
        
      </Routes>

      
      <p className="app-p">
        Developed by Soumen_Pal
        <a href="https://www.linkedin.com/in/soumen-pal-csit" target="_blank" rel="noopener noreferrer">
          <CiLinkedin />
        </a>
      </p>


    </Router>
  );
}

export default App;
