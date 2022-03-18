const express = require('express');
const router = express.Router();
const { agregarEmpleadoView, agregarEmpleado, employedView, ViewInfo, Renuncia, CrearNominaView } = require('../controllers/empleados.contreller');
const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');
const { addNomina, nomina } = require('../controllers/nomina.controller');
const { CrearPdfNomina } = require('../libs/PDF');
const { uploadObject } = require('../libs/multer')

router.get('/empleados/Agregar' , isAuthenticated, isAustheAdministrator , agregarEmpleadoView);

router.post('/empleados/Agregar', isAuthenticated, isAustheAdministrator, agregarEmpleado);

router.get('/empleados', isAuthenticated, isAustheAdministrator, employedView)

router.get('/empleado/:id', isAuthenticated, isAustheAdministrator, ViewInfo);

router.put('/empleado/renuncia/:id', isAuthenticated, isAustheAdministrator, Renuncia);

router.get('/empleados/:token', isAuthenticated, isAustheAdministrator, employedView);

router.get('/empleado/nomina/:id', isAuthenticated, isAustheAdministrator, CrearNominaView);

router.post('/CrearNomina/:token', isAuthenticated, isAustheAdministrator, addNomina, CrearPdfNomina, uploadObject);

router.get('/nomina/view/:id', nomina);

/* router.post('/pdf/:token', isAuthenticated, isAustheAdministrator, uploadObject, (req, res) =>{
    res.redirect('/empleados');
}); */

module.exports = router;