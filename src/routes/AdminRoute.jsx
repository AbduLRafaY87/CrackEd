import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// This is a placeholder. You should implement actual admin role logic in AuthContext.
const AdminRoute = () => {
  const { currentUser, isAdmin } = useContext(AuthContext);

  // If not logged in, redirect to admin login
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // If not admin, redirect to home or show unauthorized
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If admin, render the nested routes
  return <Outlet />;
};

export default AdminRoute; 