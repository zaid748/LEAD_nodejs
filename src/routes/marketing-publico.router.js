const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/marketing.controller');

// -------- Rutas PÚBLICAS para Marketing (sin autenticación) --------

// Obtener un proyecto específico de marketing para vista pública
router.get('/publico/marketing/:id', marketingController.getProyectoMarketingPublico);

// Obtener todos los proyectos de marketing disponibles para vista pública
router.get('/publico/marketing', marketingController.getProyectosMarketingPublico);

module.exports = router;
