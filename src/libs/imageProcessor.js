const sharp = require('sharp');

/**
 * Configuración de tamaños de imagen para marketing
 */
const IMAGE_SIZES = {
    // Tamaño principal para tarjetas de propiedades
    CARD: {
        width: 800,
        height: 400,
        quality: 85,
        format: 'jpeg'
    },
    // Tamaño para miniaturas
    THUMBNAIL: {
        width: 400,
        height: 300,
        quality: 80,
        format: 'jpeg'
    },
    // Tamaño para vista detallada
    DETAIL: {
        width: 1200,
        height: 900,
        quality: 90,
        format: 'jpeg'
    }
};

/**
 * Redimensionar imagen manteniendo proporción
 * @param {Buffer} imageBuffer - Buffer de la imagen original
 * @param {string} size - Tamaño a generar ('CARD', 'THUMBNAIL', 'DETAIL')
 * @returns {Promise<Buffer>} - Buffer de la imagen redimensionada
 */
async function resizeImage(imageBuffer, size = 'CARD') {
    try {
        const config = IMAGE_SIZES[size];
        
        if (!config) {
            throw new Error(`Tamaño de imagen no válido: ${size}`);
        }

        console.log(`🖼️ Redimensionando imagen a ${size}:`, {
            width: config.width,
            height: config.height,
            quality: config.quality,
            format: config.format
        });

        // Redimensionar imagen manteniendo proporción
        const resizedImage = await sharp(imageBuffer)
            .resize(config.width, config.height, {
                fit: 'cover', // Cubrir completamente el área especificada
                position: 'center' // Centrar la imagen
            })
            .jpeg({ 
                quality: config.quality,
                progressive: true // JPEG progresivo para mejor carga
            })
            .toBuffer();

        console.log(`✅ Imagen redimensionada exitosamente a ${size}`);
        
        return resizedImage;
    } catch (error) {
        console.error(`❌ Error redimensionando imagen a ${size}:`, error);
        throw error;
    }
}

/**
 * Generar múltiples tamaños de una imagen
 * @param {Buffer} imageBuffer - Buffer de la imagen original
 * @returns {Promise<Object>} - Objeto con diferentes tamaños
 */
async function generateMultipleSizes(imageBuffer) {
    try {
        console.log('🔄 Generando múltiples tamaños de imagen...');
        
        const [cardImage, thumbnailImage, detailImage] = await Promise.all([
            resizeImage(imageBuffer, 'CARD'),
            resizeImage(imageBuffer, 'THUMBNAIL'),
            resizeImage(imageBuffer, 'DETAIL')
        ]);

        console.log('✅ Múltiples tamaños generados exitosamente');
        
        return {
            card: cardImage,
            thumbnail: thumbnailImage,
            detail: detailImage
        };
    } catch (error) {
        console.error('❌ Error generando múltiples tamaños:', error);
        throw error;
    }
}

/**
 * Optimizar imagen para web
 * @param {Buffer} imageBuffer - Buffer de la imagen
 * @param {Object} options - Opciones de optimización
 * @returns {Promise<Buffer>} - Buffer de la imagen optimizada
 */
async function optimizeImage(imageBuffer, options = {}) {
    try {
        const {
            quality = 85,
            format = 'jpeg',
            progressive = true
        } = options;

        console.log('🔧 Optimizando imagen para web:', { quality, format, progressive });

        let optimizedImage = sharp(imageBuffer);

        // Aplicar optimizaciones según el formato
        if (format === 'jpeg') {
            optimizedImage = optimizedImage.jpeg({ 
                quality, 
                progressive,
                mozjpeg: true // Usar mozjpeg para mejor compresión
            });
        } else if (format === 'png') {
            optimizedImage = optimizedImage.png({ 
                quality,
                progressive,
                compressionLevel: 9 // Máxima compresión PNG
            });
        } else if (format === 'webp') {
            optimizedImage = optimizedImage.webp({ 
                quality,
                effort: 6 // Máximo esfuerzo de compresión
            });
        }

        const result = await optimizedImage.toBuffer();
        
        console.log('✅ Imagen optimizada exitosamente');
        return result;
    } catch (error) {
        console.error('❌ Error optimizando imagen:', error);
        throw error;
    }
}

/**
 * Validar formato y tamaño de imagen
 * @param {Object} file - Archivo de imagen
 * @returns {Object} - Resultado de validación
 */
function validateImage(file) {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const validation = {
        isValid: true,
        errors: []
    };

    // Validar tipo MIME
    if (!allowedMimeTypes.includes(file.mimetype)) {
        validation.isValid = false;
        validation.errors.push(`Formato no permitido: ${file.mimetype}. Solo se permiten: JPEG, PNG, WEBP`);
    }

    // Validar tamaño
    if (file.size > maxSize) {
        validation.isValid = false;
        validation.errors.push(`Archivo demasiado grande: ${(file.size / 1024 / 1024).toFixed(2)}MB. Máximo: 10MB`);
    }

    // Validar dimensiones mínimas
    if (file.width && file.width < 400) {
        validation.isValid = false;
        validation.errors.push(`Ancho insuficiente: ${file.width}px. Mínimo: 400px`);
    }

    if (file.height && file.height < 300) {
        validation.isValid = false;
        validation.errors.push(`Alto insuficiente: ${file.height}px. Mínimo: 300px`);
    }

    return validation;
}

/**
 * Obtener metadatos de la imagen
 * @param {Buffer} imageBuffer - Buffer de la imagen
 * @returns {Promise<Object>} - Metadatos de la imagen
 */
async function getImageMetadata(imageBuffer) {
    try {
        const metadata = await sharp(imageBuffer).metadata();
        
        return {
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,
            size: imageBuffer.length,
            hasAlpha: metadata.hasAlpha,
            isOpaque: metadata.isOpaque
        };
    } catch (error) {
        console.error('❌ Error obteniendo metadatos de imagen:', error);
        throw error;
    }
}

module.exports = {
    resizeImage,
    generateMultipleSizes,
    optimizeImage,
    validateImage,
    getImageMetadata,
    IMAGE_SIZES
};

