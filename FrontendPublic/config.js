// ===== CONFIGURACIÓN DEL FRONTEND PÚBLICO - LEAD INMOBILIARIA =====

const CONFIG = {
    // ===== CONFIGURACIÓN DE LA API =====
    API: {
        BASE_URL: window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'https://lead-inmobiliaria.com',
        ENDPOINTS: {
            MARKETING_PUBLICO: '/api/publico/marketing',
            PROYECTO_PUBLICO: '/api/publico/marketing'
        }
    },
    
    // ===== CONFIGURACIÓN DE LA APLICACIÓN =====
    APP: {
        NOMBRE: 'LEAD Inmobiliaria',
        VERSION: '1.0.0',
        DESCRIPCION: 'Portal público de propiedades en venta',
        BRAND_COLORS: {
            PRIMARY: '#007bff',
            SUCCESS: '#28a745',
            DANGER: '#dc3545',
            WARNING: '#ffc107',
            INFO: '#17a2b8'
        }
    },
    
    // ===== CONFIGURACIÓN DE IMÁGENES =====
    IMAGENES: {
        PLACEHOLDER: 'images/placeholder.jpg',
        MAX_SIZE: 5 * 1024 * 1024, // 5MB
        FORMATOS_PERMITIDOS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        CALIDAD: 0.8
    },
    
    // ===== CONFIGURACIÓN DE PAGINACIÓN =====
    PAGINACION: {
        ELEMENTOS_POR_PAGINA: 9,
        PAGINAS_VISIBLES: 5
    },
    
    // ===== CONFIGURACIÓN DE CACHE =====
    CACHE: {
        DURACION: 5 * 60 * 1000, // 5 minutos
        CLAVE_PREFIX: 'lead_propiedades_'
    },
    
    // ===== CONFIGURACIÓN DE ANIMACIONES =====
    ANIMACIONES: {
        DURACION: 300,
        DELAY_ENTRE_ELEMENTOS: 100,
        EASING: 'ease-in-out'
    }
};

// ===== FUNCIONES UTILITARIAS =====

/**
 * Realizar petición a la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones de la petición
 * @returns {Promise} - Respuesta de la API
 */
async function apiRequest(endpoint, options = {}) {
    const url = CONFIG.API.BASE_URL + endpoint;
    
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include'
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, finalOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en petición API:', error);
        throw error;
    }
}

/**
 * Formatear precio en formato de moneda
 * @param {number|string} precio - Precio a formatear
 * @param {string} moneda - Moneda (por defecto USD)
 * @returns {string} - Precio formateado
 */
function formatPrice(precio, moneda = 'USD') {
    if (!precio || precio === 'N/A') return 'Precio a consultar';
    
    const numero = parseFloat(precio);
    if (isNaN(numero)) return 'Precio a consultar';
    
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: moneda,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numero);
}

/**
 * Formatear fecha en formato legible
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
function formatDate(fecha) {
    if (!fecha) return 'Fecha no disponible';
    
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return 'Fecha no válida';
    
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Validar si una imagen existe
 * @param {string} url - URL de la imagen
 * @returns {Promise<boolean>} - True si la imagen existe
 */
function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

/**
 * Obtener imagen placeholder si la imagen principal falla
 * @param {string} url - URL de la imagen principal
 * @param {string} placeholder - URL de la imagen placeholder
 * @returns {string} - URL de la imagen a usar
 */
function getImageUrl(url, placeholder = CONFIG.IMAGENES.PLACEHOLDER) {
    if (!url || url === 'N/A') return placeholder;
    return url;
}

/**
 * Debounce para optimizar funciones que se ejecutan frecuentemente
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle para limitar la frecuencia de ejecución de funciones
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} - Función con throttle
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== EXPORTAR CONFIGURACIÓN Y FUNCIONES =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, apiRequest, formatPrice, formatDate, imageExists, getImageUrl, debounce, throttle };
} else {
    // Para uso en navegador
    window.CONFIG = CONFIG;
    window.apiRequest = apiRequest;
    window.formatPrice = formatPrice;
    window.formatDate = formatDate;
    window.imageExists = imageExists;
    window.getImageUrl = getImageUrl;
    window.debounce = debounce;
    window.throttle = throttle;
}
