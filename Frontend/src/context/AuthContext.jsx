import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Configuración global de axios
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/signin', credentials);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
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
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/check-auth');
      if (response.data.success) {
        const userData = response.data.user;
        setUser({
          _id: userData._id,
          email: userData.email,
          name: userData.prim_nom ? `${userData.prim_nom} ${userData.apell_pa || ''}` : userData.email,
          role: userData.role,
          empleado_id: userData.empleado_id
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 