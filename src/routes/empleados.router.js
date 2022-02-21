const express = require('express');
const router = express.Router();

const { agregarEmpleadoView, agregarEmpleado, employedView, ViewInfo } = require('../controllers/empleados.contreller');
const {isAuthenticated} = require('../helpers/auth');

router.get('/empleados/Agregar' , isAuthenticated , agregarEmpleadoView);

router.post('/empleados/Agregar', isAuthenticated, agregarEmpleado);

router.get('/empleados', isAuthenticated, employedView)

router.get('/empleado/:id', isAuthenticated, ViewInfo);

module.exports = router;