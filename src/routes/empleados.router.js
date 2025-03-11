const express = require('express');
const router = express.Router();
const { agregarEmpleadoView, agregarEmpleado, employedView, ViewInfo, Renuncia, CrearNominaView, editViewEmployed, editarEmpleado, getRenucias } = require('../controllers/empleados.contreller');
const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');
const { addNomina } = require('../controllers/nomina.controller');
const { CrearPdfNomina } = require('../libs/PDF');
const { uploadObject } = require('../libs/multer')
const employedCtrl = require('../controllers/empleados.contreller');
const multer = require('multer');
const Empleado = require('../models/Empleados');

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

router.get('/empleados/Agregar' , isAuthenticated, isAustheAdministrator , agregarEmpleadoView);

router.post('/empleados/Agregar', isAuthenticated, isAustheAdministrator, agregarEmpleado);

router.get('/empleados/Renuncias' , isAuthenticated, isAustheAdministrator , getRenucias);

router.get('/empleados', isAuthenticated, isAustheAdministrator, employedView)

router.get('/empleado/:id', isAuthenticated, isAustheAdministrator, ViewInfo);

router.put('/empleado/renuncia/:id', isAuthenticated, isAustheAdministrator, Renuncia);

router.get('/empleados/:token', isAuthenticated, isAustheAdministrator, employedView);

router.get('/empleado/nomina/:id', isAuthenticated, isAustheAdministrator, CrearNominaView);

router.get('/empleado/edit/:id', isAuthenticated, isAustheAdministrator, editViewEmployed);

router.put('/empleado/edit/:id', isAuthenticated, isAustheAdministrator, editarEmpleado);

router.post('/CrearNomina/:token', isAuthenticated, isAustheAdministrator, addNomina, CrearPdfNomina, uploadObject);

/* router.post('/pdf/:token', isAuthenticated, isAustheAdministrator, uploadObject, (req, res) =>{
    res.redirect('/empleados');
}); */

// Rutas API para la aplicación React
router.get('/empleados-api', isAuthenticated, employedCtrl.getEmpleados);
router.get('/empleados-api/:id', isAuthenticated, employedCtrl.getEmpleadoById);
router.delete('/empleados-api/:id', isAuthenticated, isAustheAdministrator, employedCtrl.deleteEmpleado);
router.put('/empleados-api/:id', isAuthenticated, isAustheAdministrator, employedCtrl.updateEmpleado);

// Ruta para actualizar la foto de perfil de un empleado
router.post('/empleados-api/:id/upload-photo', isAuthenticated, upload.single('foto_perfil'), 
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No se proporcionó ninguna imagen'
        });
      }

      const empleadoId = req.params.id;
      const fotoUrl = req.file.path;

      const empleado = await Empleado.findByIdAndUpdate(
        empleadoId,
        { foto_perfil: fotoUrl },
        { new: true }
      );

      if (!empleado) {
        return res.status(404).json({
          success: false,
          message: 'Empleado no encontrado'
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

// Añadir esta ruta para obtener todos los empleados (si no existe)
router.get('/empleados/all', isAuthenticated, async (req, res) => {
  try {
    console.log("Buscando empleados...");
    // No limitar los campos a retornar para depuración
    const empleados = await Empleado.find({});
    
    console.log("Empleados encontrados:", empleados.length);
    
    return res.status(200).json({
      success: true,
      count: empleados.length,
      empleados
    });
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener empleados',
      error: error.message
    });
  }
});

// Ruta para obtener empleado por ID de usuario
router.get('/empleados-api/by-user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const empleado = await Empleado.findOne({ userId });
    
    if (!empleado) {
      return res.status(200).json({
        success: false,
        message: 'No se encontró un empleado asociado a este usuario'
      });
    }
    
    return res.status(200).json({
      success: true,
      empleado
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

// Agregar la nueva ruta
router.get('/empleados-api/activos', isAuthenticated, employedCtrl.getEmpleadosActivos);

module.exports = router;