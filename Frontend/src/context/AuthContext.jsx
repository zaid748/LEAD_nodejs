import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configuración global de axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Verificando autenticación en AuthContext...");
        const response = await axios.get('/api/check-auth', {
          withCredentials: true
        });
        
        console.log("Respuesta de autenticación en AuthContext:", response.data);
        
        if (response.data.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error de autenticación en AuthContext:", err);
        setUser(null);
        setIsAuthenticated(false);
        setError(err.message);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/signin', credentials);
      if (response.data.success) {
        // Explícitamente actualizar el usuario desde la respuesta
        const userData = response.data.user;
        console.log("Usuario autenticado:", userData);
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      }
      return { success: false };
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return { success: false, error: error.response?.data || error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get('/api/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el estado de autenticación desde otros componentes
  const refreshAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/check-auth');
      console.log("Refresh auth response:", response.data);
      
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response.data.user;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (error) {
      console.error('Error refreshing auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
      return null;
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      error,
      authChecked,
      setUser,
      login,
      logout,
      refreshAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 