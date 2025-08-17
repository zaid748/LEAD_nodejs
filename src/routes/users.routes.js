const express = require('express');
const router = express.Router();
const { logout, signup, signIn, getUsers, getUserById } = require('../controllers/users.controller');
const { isAuthenticated, isAustheAdministrator } = require('../helpers/auth');
const { profilePhotoUpload } = require('../libs/upload-config');
const fs = require('fs');
const User = require('../models/user');
const userCtrl = require('../controllers/users.controller');

// Middleware para manejar errores de multer
const handleMulterError = (error, req, res, next) => {
  console.log('=== ERROR DE MULTER CAPTURADO ===');
  console.log('Error:', error.message);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'El archivo es demasiado grande. Máximo 5MB permitido.'
    });
  }
  
  if (error.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Demasiados archivos. Solo se permite 1 archivo por vez.'
    });
  }
  
  if (error.message.includes('Solo se permiten imágenes')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  if (error.message.includes('caracteres no permitidos')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  if (error.message.includes('demasiado largo')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  // Error genérico de multer
  return res.status(400).json({
    success: false,
    message: `Error en el archivo: ${error.message}`
  });
};

// Rutas de API
router.get('/check-auth', isAuthenticated, (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            user: {
                id: req.user,
                role: req.role
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'No autorizado'
        });
    }
});

router.post('/signin', signIn);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/users', isAuthenticated, getUsers);

router.get('/users/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
 
    const user = await User.findOne({ _id: id });
    
    if (!user) {
      return res.status(200).json({
        success: false,
        message: 'No se encontró un empleado asociado a este usuario'
      });
    }
    
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error al buscar empleado por userId:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar empleado',
      error: error.message
    });
  }
});

// Ruta para actualizar la foto de perfil de un usuario
router.post('/users/:id/upload-photo', 
  isAuthenticated, 
  profilePhotoUpload.single('foto_perfil'),
  handleMulterError, // Agregar el middleware de manejo de errores
  userCtrl.uploadProfilePhoto
);

// Ruta para eliminar usuarios usando el middleware correcto
router.delete('/users/:id', isAuthenticated, isAustheAdministrator, userCtrl.deleteUser);

// Ruta para actualizar usuario
router.put('/users/:id', 
  isAuthenticated, 
  userCtrl.updateUser
);

// Ruta para actualizar contraseña (opcional)
router.put('/users/:id/password', 
  isAuthenticated, 
  userCtrl.updatePassword
);

module.exports = router;