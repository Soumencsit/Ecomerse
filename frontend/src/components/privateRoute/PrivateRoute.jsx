import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Storecontext } from '../../context/StoreContext';

function PrivateRoute() {
  const { userLogin } = useContext(Storecontext);
  return userLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
