const express = require('express');
const router = express.Router();
const { logout, signup, signIn, getUsers, getUserById } = require('../controllers/users.controller');
const { isAuthenticated } = require('../helpers/auth');
const multer = require('multer');
const User = require('../models/user');

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
router.get('/users/:id', isAuthenticated, getUserById);

// Reemplazar la configuración de CloudinaryStorage con almacenamiento local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads/profile_photos')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
  }
});

const upload = multer({ storage: storage });

// Ruta para actualizar la foto de perfil de un usuario
router.post('/users/:id/upload-photo', isAuthenticated, upload.single('foto_perfil'), 
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No se proporcionó ninguna imagen'
        });
      }

      const userId = req.params.id;
      const fotoUrl = req.file.path;

      const user = await User.findByIdAndUpdate(
        userId,
        { foto_perfil: fotoUrl },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Foto de perfil actualizada correctamente',
        foto_perfil: fotoUrl
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar la foto de perfil',
        error: error.message
      });
    }
  }
);

module.exports = router;