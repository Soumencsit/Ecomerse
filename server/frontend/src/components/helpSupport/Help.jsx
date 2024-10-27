import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Storecontext } from '../../context/StoreContext'
import './Help.css'
import { useNavigate } from 'react-router-dom';

function Help() {
  const{userLogin,setUserLogin,userId,setUserId,userName,setUserName}=useContext(Storecontext)
  const navigate = useNavigate();
  const signOut=()=>{
      setUserLogin(false)
      setUserId('');
      setUserName('')
      localStorage.clear();
      navigate('/signup')
      

  }


  return (
    <div className="helpbar-right">
          <NavLink to="/help" className="help-link"><p>Help</p></NavLink>
          <NavLink to="/orders" className="help-link"><p>Orders & Returns</p></NavLink>

          {
            !userLogin ? 
            <NavLink to="/signup" className="help-link">
              <button>Sign Up</button>
            </NavLink>
            : <div className='sign-out'>
             <p>Hi, {userName}</p>
            <button onClick={()=>signOut()}>Sign out</button>
            </div>

          }

         

         
          
          
          
        </div>
  )
}

export default Help
