import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Configuración global de axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const ProtectedRoute = ({ redirectTo = "/auth/sign-in", children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const response = await axios.get('/api/check-auth', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        console.log('Auth response:', response.data);
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error('Auth error:', error.response?.data || error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Verificando autenticación...</div>;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting...');
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};