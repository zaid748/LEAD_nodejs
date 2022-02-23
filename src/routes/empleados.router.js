const express = require('express');
const router = express.Router();

const { agregarEmpleadoView, agregarEmpleado, employedView, ViewInfo } = require('../controllers/empleados.contreller');
const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');

router.get('/empleados/Agregar' , isAuthenticated, isAustheAdministrator , agregarEmpleadoView);

router.post('/empleados/Agregar', isAuthenticated, isAustheAdministrator, agregarEmpleado);

router.get('/empleados', isAuthenticated, isAustheAdministrator,employedView)

router.get('/empleado/:id', isAuthenticated, isAustheAdministrator, ViewInfo);

module.exports = router;