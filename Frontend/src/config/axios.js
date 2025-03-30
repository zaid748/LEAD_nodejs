import axios from 'axios';

// Crear una instancia de axios con la URL base y configuración
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptores para manejar errores
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error de Axios:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance; 