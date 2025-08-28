// ===== CONFIGURACIÓN DE PROCESAMIENTO DE IMÁGENES - LEAD INMOBILIARIA =====

module.exports = {
    // ===== TAMAÑOS ESTÁNDAR PARA DIFERENTES USOS =====
    SIZES: {
        // Tamaño principal para tarjetas de propiedades (index.html)
        CARD: {
            width: 800,
            height: 600,
            quality: 85,
            format: 'jpeg',
            fit: 'cover', // Cubrir completamente el área
            position: 'center' // Centrar la imagen
        },
        
        // Tamaño para miniaturas (galerías, listas)
        THUMBNAIL: {
            width: 400,
            height: 300,
            quality: 80,
            format: 'jpeg',
            fit: 'cover',
            position: 'center'
        },
        
        // Tamaño para vista detallada (property-details.html)
        DETAIL: {
            width: 1200,
            height: 900,
            quality: 90,
            format: 'jpeg',
            fit: 'cover',
            position: 'center'
        },
        
        // Tamaño para hero/banner principal
        HERO: {
            width: 1920,
            height: 1080,
            quality: 90,
            format: 'jpeg',
            fit: 'cover',
            position: 'center'
        }
    },

    // ===== CONFIGURACIÓN DE CALIDAD Y FORMATO =====
    QUALITY: {
        JPEG: {
            quality: 85,
            progressive: true,
            mozjpeg: true // Mejor compresión
        },
        PNG: {
            quality: 85,
            progressive: true,
            compressionLevel: 9 // Máxima compresión
        },
        WEBP: {
            quality: 85,
            effort: 6 // Máximo esfuerzo de compresión
        }
    },

    // ===== VALIDACIONES =====
    VALIDATION: {
        // Formatos permitidos
        ALLOWED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        
        // Tamaño máximo del archivo (10MB)
        MAX_FILE_SIZE: 10 * 1024 * 1024,
        
        // Dimensiones mínimas
        MIN_DIMENSIONS: {
            width: 400,
            height: 300
        },
        
        // Dimensiones máximas
        MAX_DIMENSIONS: {
            width: 8000,
            height: 6000
        }
    },

    // ===== CONFIGURACIÓN DE OPTIMIZACIÓN =====
    OPTIMIZATION: {
        // Redimensionar automáticamente si excede dimensiones máximas
        AUTO_RESIZE: true,
        
        // Convertir a JPEG si es PNG con transparencia
        CONVERT_TRANSPARENT: true,
        
        // Aplicar sharpening sutil
        SHARPEN: {
            sigma: 0.5,
            flat: 1,
            jagged: 2
        },
        
        // Aplicar blur sutil para reducir ruido
        BLUR: {
            sigma: 0.3
        }
    },

    // ===== CONFIGURACIÓN DE CACHE =====
    CACHE: {
        // Tiempo de vida del cache en segundos
        TTL: 30 * 24 * 60 * 60, // 30 días
        
        // Headers de cache para navegadores
        HEADERS: {
            'Cache-Control': 'public, max-age=2592000, immutable',
            'ETag': true,
            'Last-Modified': true
        }
    },

    // ===== CONFIGURACIÓN DE WATERMARK (OPCIONAL) =====
    WATERMARK: {
        ENABLED: false,
        TEXT: 'LEAD Inmobiliaria',
        FONT_SIZE: 24,
        COLOR: '#ffffff',
        OPACITY: 0.7,
        POSITION: 'bottom-right'
    },

    // ===== CONFIGURACIÓN DE COMPRESIÓN =====
    COMPRESSION: {
        // Nivel de compresión (0-100)
        LEVEL: 85,
        
        // Usar compresión progresiva
        PROGRESSIVE: true,
        
        // Optimizar para web
        WEB_OPTIMIZED: true
    }
};

