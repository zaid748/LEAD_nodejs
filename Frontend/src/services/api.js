// API Service para comunicación con el backend

// Configuración base
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Función para mostrar las cookies disponibles (para depuración)
 */
function logCookies() {
  console.log('Cookies disponibles:', document.cookie);
}

/**
 * Función base para realizar peticiones HTTP
 * @param {string} endpoint - Endpoint a consultar
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE)
 * @param {object} data - Datos para enviar en la petición
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
const fetchAPI = async (endpoint, method = 'GET', data = null) => {
  try {
    const url = `${API_URL}${endpoint}`;
    
    // Para depuración
    logCookies();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    // Como estamos usando credenciales: 'include', la cookie Authorization 
    // se enviará automáticamente. Sin embargo, el backend espera el token 
    const authCookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('Authorization='));
      
    if (authCookie) {
      const token = authCookie.split('=')[1];
      console.log('Token de autenticación encontrado en cookie');
      headers['Authorization'] = token;
    } else {
      console.warn('No se encontró cookie de autenticación');
    }
    
    const options = {
      method,
      headers,
      credentials: 'include', // Para enviar cookies de sesión
    };
    
    // Agregar body si hay datos y no es GET
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    console.log(`Realizando petición ${method} a ${url}`, options);
    
    const response = await fetch(url, options);
    
    // Verificar si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('La respuesta del servidor no es JSON');
    }
    
    const responseData = await response.json();
    
    if (!response.ok) {
      // Manejar errores del servidor
      console.error('Error en respuesta API:', response.status, responseData);
      throw new Error(responseData.mensaje || 'Error en la petición');
    }
    
    return responseData;
  } catch (error) {
    console.error('Error en API:', error);
    throw error;
  }
};

/**
 * API para operaciones con captaciones
 */
const captacionesAPI = {
  /**
   * Obtener todas las captaciones
   * @returns {Promise} Lista de captaciones
   */
  getAll: async () => {
    return fetchAPI('/api/captaciones');
  },
  
  /**
   * Obtener una captación por ID
   * @param {string} id - ID de la captación
   * @returns {Promise} Datos de la captación
   */
  getById: async (id) => {
    return fetchAPI(`/api/captaciones/${id}`);
  },
  
  /**
   * Crear una nueva captación
   * @param {object} data - Datos de la captación
   * @returns {Promise} Respuesta del servidor
   */
  create: async (data) => {
    return fetchAPI('/api/captaciones', 'POST', data);
  },
  
  /**
   * Actualizar una captación existente
   * @param {string} id - ID de la captación
   * @param {object} data - Datos actualizados
   * @returns {Promise} Respuesta del servidor
   */
  update: async (id, data) => {
    return fetchAPI(`/api/captaciones/${id}`, 'PUT', data);
  },
  
  /**
   * Eliminar una captación
   * @param {string} id - ID de la captación
   * @returns {Promise} Respuesta del servidor
   */
  delete: async (id) => {
    return fetchAPI(`/api/captaciones/${id}`, 'DELETE');
  }
};

// Exportar servicios (eliminar la duplicación)
export {
  captacionesAPI,
  fetchAPI
};

export default {
  captaciones: captacionesAPI
}; 