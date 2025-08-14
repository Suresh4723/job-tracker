// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><span className="loader"></span></div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
