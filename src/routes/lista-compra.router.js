const express = require('express');
const router = express.Router();
const ListaCompraController = require('../controllers/lista-compra.controller');
const { isAuthenticated } = require('../helpers/auth');

// Middleware de autenticación para todas las rutas
router.use(isAuthenticated);

/**
 * @route   POST /api/lista-compra
 * @desc    Crear una nueva lista de compra (contratista)
 * @access  Private - Contratistas
 */
router.post('/', async (req, res) => {
    // Verificar que el usuario es contratista
    if (req.user.role !== 'contratista') {
        return res.status(403).json({
            success: false,
            message: 'Solo los contratistas pueden crear listas de compra'
        });
    }
    
    await ListaCompraController.crearListaCompra(req, res);
});

/**
 * @route   GET /api/lista-compra/proyecto/:proyecto_id
 * @desc    Obtener listas de compra de un proyecto
 * @access  Private - Contratistas, Supervisores, Administradores
 */
router.get('/proyecto/:proyecto_id', async (req, res) => {
    await ListaCompraController.obtenerListasCompra(req, res);
});

/**
 * @route   GET /api/lista-compra/:listaId
 * @desc    Obtener detalles de una lista de compra específica
 * @access  Private - Contratistas, Supervisores, Administradores
 */
router.get('/:listaId', async (req, res) => {
    await ListaCompraController.obtenerListaCompra(req, res);
});

/**
 * @route   PUT /api/lista-compra/:listaId
 * @desc    Actualizar lista de compra (solo si está en borrador)
 * @access  Private - Contratistas (solo sus propias listas)
 */
router.put('/:listaId', async (req, res) => {
    // Verificar que el usuario es contratista
    if (req.user.role !== 'contratista') {
        return res.status(403).json({
            success: false,
            message: 'Solo los contratistas pueden editar listas de compra'
        });
    }
    
    await ListaCompraController.actualizarListaCompra(req, res);
});

/**
 * @route   POST /api/lista-compra/:listaId/enviar
 * @desc    Enviar lista de compra al supervisor
 * @access  Private - Contratistas (solo sus propias listas)
 */
router.post('/:listaId/enviar', async (req, res) => {
    // Verificar que el usuario es contratista
    if (req.user.role !== 'contratista') {
        return res.status(403).json({
            success: false,
            message: 'Solo los contratistas pueden enviar listas de compra'
        });
    }
    
    await ListaCompraController.enviarListaCompra(req, res);
});

/**
 * @route   POST /api/lista-compra/:listaId/ingresar-costos
 * @desc    Ingresar costos de materiales (supervisor)
 * @access  Private - Supervisores
 */
router.post('/:listaId/ingresar-costos', async (req, res) => {
    // Verificar que el usuario es supervisor
    if (req.user.role !== 'supervisor') {
        return res.status(403).json({
            success: false,
            message: 'Solo los supervisores pueden ingresar costos de materiales'
        });
    }
    
    await ListaCompraController.ingresarCostosMateriales(req, res);
});

/**
 * @route   POST /api/lista-compra/:listaId/revisar
 * @desc    Revisar lista de compra (aprobar/rechazar)
 * @access  Private - Supervisores
 */
router.post('/:listaId/revisar', async (req, res) => {
    // Verificar que el usuario es supervisor
    if (req.user.role !== 'supervisor') {
        return res.status(403).json({
            success: false,
            message: 'Solo los supervisores pueden revisar listas de compra'
        });
    }
    
    await ListaCompraController.revisarListaCompra(req, res);
});

/**
 * @route   DELETE /api/lista-compra/:listaId
 * @desc    Eliminar lista de compra (solo si está en borrador)
 * @access  Private - Contratistas (solo sus propias listas)
 */
router.delete('/:listaId', async (req, res) => {
    // Verificar que el usuario es contratista
    if (req.user.role !== 'contratista') {
        return res.status(403).json({
            success: false,
            message: 'Solo los contratistas pueden eliminar listas de compra'
        });
    }
    
    await ListaCompraController.eliminarListaCompra(req, res);
});

// ==================== RUTAS DE ADMINISTRACIÓN ====================

/**
 * @route   GET /api/lista-compra/admin/pendientes
 * @desc    Obtener listas de compra pendientes de aprobación administrativa
 * @access  Private - Administradores
 */
router.get('/admin/pendientes', async (req, res) => {
    await ListaCompraController.obtenerListasPendientesAdmin(req, res);
});

/**
 * @route   GET /api/lista-compra/admin/todas
 * @desc    Obtener todas las listas de compra para administración
 * @access  Private - Administradores
 */
router.get('/admin/todas', async (req, res) => {
    await ListaCompraController.obtenerTodasListasAdmin(req, res);
});

/**
 * @route   POST /api/lista-compra/:listaId/admin/aprobar
 * @desc    Aprobar lista de compra por administración
 * @access  Private - Administradores
 */
router.post('/:listaId/admin/aprobar', async (req, res) => {
    await ListaCompraController.aprobarListaCompraAdmin(req, res);
});

/**
 * @route   POST /api/lista-compra/:listaId/admin/rechazar
 * @desc    Rechazar lista de compra por administración
 * @access  Private - Administradores
 */
router.post('/:listaId/admin/rechazar', async (req, res) => {
    await ListaCompraController.rechazarListaCompraAdmin(req, res);
});

module.exports = router;
