import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Configuración global de axios
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/signin', credentials);
      if (response.data.success) {
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/check-auth');
      if (response.data.success) {
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 