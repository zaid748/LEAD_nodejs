const express = require('express');
const router = express.Router();
const pdfServise = require('../helpers/pdf-service');

const { agregarEmpleadoView, agregarEmpleado, employedView, ViewInfo, Renuncia } = require('../controllers/empleados.contreller');
const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');

router.get('/empleados/Agregar' , isAuthenticated, isAustheAdministrator , agregarEmpleadoView);

router.post('/empleados/Agregar', isAuthenticated, isAustheAdministrator, agregarEmpleado);

router.get('/empleados', isAuthenticated, isAustheAdministrator,employedView)

router.get('/empleado/:id', isAuthenticated, isAustheAdministrator, ViewInfo);

router.put('/empleado/renuncia/:id', isAuthenticated, isAustheAdministrator, Renuncia);

router.get('/pdf', (req, res, next) =>{
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'content-Disposition': 'attachment;filename=invoice.pdf'
    });

    pdfServise.buildPDF(
        (chunk)=> stream.write(chunk),
        () => stream.end() 
    );

});

module.exports = router;