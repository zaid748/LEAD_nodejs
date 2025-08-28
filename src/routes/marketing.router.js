const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const marketingController = require('../controllers/marketing.controller');

// Configurar multer para subida de imágenes
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por imagen
        files: 15 // Máximo 15 imágenes
    },
    fileFilter: (req, file, cb) => {
        // Solo permitir imágenes
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false);
        }
    }
});

// -------- Rutas para Marketing Inmobiliario --------
// Obtener todos los proyectos de marketing (captaciones disponibles para venta)
router.get('/marketing', isAuthenticated, marketingController.getProyectosMarketing);

// Obtener un proyecto específico de marketing
router.get('/marketing/:id', isAuthenticated, marketingController.getProyectoMarketing);

// Actualizar información de marketing de un proyecto
router.put('/marketing/:id', isAuthenticated, marketingController.actualizarMarketing);

// -------- Rutas para Imágenes de Marketing --------
// Subir imágenes de marketing
router.post('/marketing/:id/imagenes', 
    isAuthenticated, 
    (req, res, next) => {
        console.log('=== DEBUG: Middleware de autenticación ===');
        console.log('Usuario autenticado:', req.user);
        next();
    },
    upload.array('imagenesMarketing', 15), // Campo 'imagenesMarketing', máximo 15 archivos
    (err, req, res, next) => {
        console.log('=== DEBUG: Middleware de multer ===');
        console.log('Error de multer:', err);
        console.log('Archivos en req.files:', req.files);
        
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: 'Una o más imágenes exceden el tamaño máximo de 5MB'
                });
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({
                    success: false,
                    message: 'Se excedió el límite de 15 imágenes'
                });
            }
        }
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    },
    marketingController.uploadImagenesMarketing
);

// Obtener imágenes de marketing
router.get('/marketing/:id/imagenes', 
    isAuthenticated, 
    marketingController.getImagenesMarketing
);

// Eliminar imagen de marketing
router.delete('/marketing/:id/imagenes', 
    isAuthenticated, 
    marketingController.deleteImagenMarketing
);

// Reordenar imágenes de marketing
router.put('/marketing/:id/imagenes/orden', 
    isAuthenticated, 
    marketingController.reordenarImagenesMarketing
);

// Obtener estadísticas de marketing
router.get('/marketing/estadisticas', isAuthenticated, marketingController.getEstadisticasMarketing);

module.exports = router;
