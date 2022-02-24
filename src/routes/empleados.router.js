const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

const { agregarEmpleadoView, agregarEmpleado, employedView, ViewInfo, Renuncia } = require('../controllers/empleados.contreller');
const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');

router.get('/empleados/Agregar' , isAuthenticated, isAustheAdministrator , agregarEmpleadoView);

router.post('/empleados/Agregar', isAuthenticated, isAustheAdministrator, agregarEmpleado);

router.get('/empleados', isAuthenticated, isAustheAdministrator,employedView)

router.get('/empleado/:id', isAuthenticated, isAustheAdministrator, ViewInfo);

router.put('/empleado/renuncia/:id', isAuthenticated, isAustheAdministrator, Renuncia);

router.get('/pdf', (req, res, next) =>{
    const doc = new PDFDocument();
    doc.text('Hola Mundo con PDF kit', 30, 30);
    doc.pipe(fs.createWriteStream('invoce.pdf'));
    doc.end();
});

module.exports = router;