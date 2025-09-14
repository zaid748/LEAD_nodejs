const express = require('express');
const router = express.Router();
const multer = require('multer');

const blogCtrl = require('../controllers/blog.controller');
const { isAuthenticated } = require('../helpers/auth');

// Configuración de multer para subida de imágenes a memoria (para S3)
const storage = multer.memoryStorage();

// Filtro para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    // Permitir solo imágenes
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen'), false);
    }
};

// Configuración de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo por archivo
        files: 10 // Máximo 10 archivos por petición
    }
});

// Middleware para manejar errores de multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                mensaje: 'El archivo es demasiado grande. Máximo 5MB por imagen.'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                mensaje: 'Demasiados archivos. Máximo 10 imágenes por petición.'
            });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                mensaje: 'Campo de archivo inesperado.'
            });
        }
    }
    if (error.message === 'Solo se permiten archivos de imagen') {
        return res.status(400).json({
            success: false,
            mensaje: 'Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.)'
        });
    }
    next(error);
};

// Rutas para Blog

// GET /api/blog - Obtener todos los blogs con paginación y filtros (requiere autenticación)
router.get('/', isAuthenticated, blogCtrl.getBlogs);

// GET /api/blog/public - Obtener blogs públicos (sin autenticación)
router.get('/public', blogCtrl.getPublicBlogs);

// GET /api/blog/public/:id - Obtener un blog específico público (sin autenticación)
router.get('/public/:id', blogCtrl.getPublicBlogById);

// GET /api/blog/:id - Obtener un blog específico por ID (requiere autenticación)
router.get('/:id', isAuthenticated, blogCtrl.getBlogById);

// POST /api/blog - Crear nuevo blog
router.post('/', 
    isAuthenticated, 
    upload.array('imagenes', 10), // Campo único para múltiples imágenes
    handleMulterError,
    blogCtrl.createBlog
);

// PUT /api/blog/:id - Actualizar blog existente
router.put('/:id', 
    isAuthenticated, 
    upload.array('imagenes', 10), // Campo único para múltiples imágenes
    handleMulterError,
    blogCtrl.updateBlog
);

// DELETE /api/blog/:id - Eliminar blog
router.delete('/:id', isAuthenticated, blogCtrl.deleteBlog);

// POST /api/blog/:id/imagenes - Subir imágenes adicionales a un blog existente
router.post('/:id/imagenes', 
    isAuthenticated, 
    upload.array('imagenesMarketing', 10),
    handleMulterError,
    blogCtrl.uploadImages
);

// DELETE /api/blog/:id/imagenes - Eliminar imagen específica de un blog
router.delete('/:id/imagenes', isAuthenticated, blogCtrl.deleteImage);

module.exports = router;
