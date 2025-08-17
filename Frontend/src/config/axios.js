import axios from 'axios';

// Crear una instancia de axios con la URL base y configuración
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
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
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
      console.error('Status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

// Interceptor para requests
axiosInstance.interceptors.request.use(
  config => {
    console.log('Request config:', {
      method: config.method,
      url: config.url,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('Error en request:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance; 