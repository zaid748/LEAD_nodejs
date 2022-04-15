const express = require('express');
const router = express.Router();

const { ViewNominas, nomina, addNomina, CrearNominaView, updateNomina } =  require('../controllers/nomina.controller');
const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');
const { CrearPdfNomina } = require('../libs/PDF');
const { uploadObject } = require('../libs/multer');

router.get('/nominas/views/:id', isAuthenticated, isAustheAdministrator, ViewNominas);

router.get('/nomina/view/:id', nomina);

router.get('/nomina/update/:id', isAuthenticated, isAustheAdministrator, CrearNominaView);

router.put('/CrearNomina/update/:token/:id', isAuthenticated, isAustheAdministrator, updateNomina, CrearPdfNomina, uploadObject);
/* addNomina,  */

module.exports = router;