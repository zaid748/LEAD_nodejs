const express = require('express');
const router = express.Router();

const { 
  ViewNominas, 
  nomina, 
  addNomina, 
  CrearNominaView, 
  updateNomina,
  getNominasByEmpleado,
  deleteNomina,
  getNominaById,
  updateNominaApi
} = require('../controllers/nomina.controller');

const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');
const { CrearPdfNomina } = require('../libs/PDF');
const { uploadObject } = require('../libs/multer');
const Nomina = require('../models/Nomina');

router.get('/nominas/views/:id', isAuthenticated, isAustheAdministrator, ViewNominas);

router.get('/nomina/view/:id', nomina);

router.get('/nomina/update/:id', isAuthenticated, isAustheAdministrator, CrearNominaView);

router.put('/CrearNomina/update/:token/:id', isAuthenticated, isAustheAdministrator, updateNomina, CrearPdfNomina, uploadObject);

router.get('/nominas-api/empleado/:id', isAuthenticated, getNominasByEmpleado);
router.delete('/nominas-api/:id', isAuthenticated, isAustheAdministrator, deleteNomina);
//router.get('/nominas/:id', isAuthenticated, getNominaById);
router.put('/nominas/:id', isAuthenticated, isAustheAdministrator, updateNominaApi);

router.post('/CrearNomina/:token', isAuthenticated, isAustheAdministrator, addNomina, CrearPdfNomina, uploadObject);


module.exports = router;