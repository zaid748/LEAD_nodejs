const express = require('express');
const router = express.Router();

const { viewGetInventario, viewAddInventario, uploadFile, viewGetFichaTecnica, viewEditInventario, updateInventario, deleteInventario} = require('../controllers/Inventario.controller');
const {isAuthenticated, isAustheAdministrator} = require('../helpers/auth');
const { upload } = require('../libs/multerImagenes');

router.get('/Inventario', isAuthenticated, viewGetInventario);

router.get('/Inventario/visit', viewGetInventario);

router.get('/Inventario/add', isAuthenticated, viewAddInventario);

router.get('/Inventario/edit/:id', isAuthenticated, viewEditInventario);

router.put('/Inventario/update/:id', isAuthenticated, upload, updateInventario);

router.get('/Inventario/:id', isAuthenticated, viewGetFichaTecnica);

router.get('/Inventario/visit/:id', viewGetFichaTecnica);

router.post('/Inventario/add', isAuthenticated, upload, uploadFile);

router.delete('/Inventario/Eliminar/:id', isAuthenticated, isAustheAdministrator, deleteInventario);

module.exports = router;