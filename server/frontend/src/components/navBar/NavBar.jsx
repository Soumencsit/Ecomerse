import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import './NavBar.css'; 
import { Storecontext } from '../../context/StoreContext';
import { useContext } from 'react';

const NavBar = () => {
  const{userLogin,setUserLogin,userName}=useContext(Storecontext)
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">
          <h1>ECOMMERCE</h1>
        </div>
        <div className="navbar-links">
          <NavLink 
            to="/categories" 
            className="nav-link"
            activeClassName="active-link">
            Categories
          </NavLink>
          <NavLink 
            to="/sale" 
            className="nav-link"
            activeClassName="active-link">
            Sale
          </NavLink>
          <NavLink 
            to="/clearance" 
            className="nav-link"
            activeClassName="active-link">
            Clearance
          </NavLink>
          <NavLink 
            to="/new-stock" 
            className="nav-link"
            activeClassName="active-link">
            New stock
          </NavLink>
          <NavLink 
            to="/trending" 
            className="nav-link"
            activeClassName="active-link">
            Trending
          </NavLink>
        </div>
        <div className="navbar-right">
          <NavLink to="/search" className="nav-link">
            <IoCartOutline />
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            <IoSearch />
          </NavLink>

          {
              !userLogin?<></> : <div className="nav-link"><CgProfile /><p>{userName}</p> </div>
          }
         
          
          


        </div>
      </div>
      
    </div>
  );
};

export default NavBar;
