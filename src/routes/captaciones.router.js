const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const captacionesController = require('../controllers/captaciones.controller');
const { verificarToken, esAdmin, esAdminOSupervisor, sanitizarEntradas } = require('../helpers/auth');
const { CrearPdfCaptacion } = require('../libs/PDF');
const { uploadObject } = require('../libs/multer');

// Endpoint de prueba simple para WebSocket (SIN autenticación)
router.get('/test-websocket-simple',
    async (req, res) => {
        try {
            const wsManager = req.app.get('wsManager');
            
            if (!wsManager) {
                return res.status(500).json({
                    success: false,
                    message: 'WebSocket Manager no disponible'
                });
            }

            res.json({
                success: true,
                message: 'WebSocket Manager disponible',
                data: { 
                    connectedClients: wsManager.clients.size,
                    clients: Array.from(wsManager.clients.keys())
                }
            });
        } catch (error) {
            console.error('Error en test simple:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

// Middleware de autenticación para todas las rutas
router.use(verificarToken);
// Sanitizar entradas en todas las rutas POST y PUT
router.use(['POST', 'PUT'], sanitizarEntradas);

// Obtener todas las captaciones (con filtros)
router.get('/', captacionesController.getCaptaciones);

// -------- Rutas para Notificaciones del Usuario (ANTES de remodelación) --------

/**
 * @route   GET /api/captaciones/websocket-token
 * @desc    Obtener token para conexión WebSocket
 * @access  Private - Todos los usuarios autenticados
 */
router.get('/websocket-token',
    async (req, res) => {
        try {
            console.log('🔑 DEBUG - Generando token WebSocket para usuario:', req.user?._id);
            const usuario = req.user;
            
            if (!usuario) {
                console.log('❌ DEBUG - No hay usuario autenticado');
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }
            
            // Generar un token temporal para WebSocket (válido por 1 hora)
            const jwt = require('jsonwebtoken');
            const JWT_SECRET = process.env.JWT_SECRET || process.env.SECRET || process.env.SESSION_SECRET;
            
            if (!JWT_SECRET) {
                console.log('❌ DEBUG - JWT_SECRET no configurado');
                return res.status(500).json({
                    success: false,
                    message: 'Error de configuración del servidor'
                });
            }
            
            const wsToken = jwt.sign(
                { _id: usuario._id, role: usuario.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            console.log('✅ DEBUG - Token WebSocket generado exitosamente para:', usuario._id);
            res.json({
                success: true,
                message: 'Token WebSocket generado exitosamente',
                data: { token: wsToken }
            });

        } catch (error) {
            console.error('❌ Error al generar token WebSocket:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
);

// Endpoint de prueba para enviar notificación WebSocket
router.post('/test-websocket',
    async (req, res) => {
        try {
            console.log('🧪 ENDPOINT DE PRUEBA LLAMADO');
            console.log('🧪 req.user:', req.user);
            console.log('🧪 req.app:', !!req.app);
            
            const usuario = req.user;
            const wsManager = req.app.get('wsManager');
            
            console.log('🧪 wsManager:', !!wsManager);
            console.log('🧪 Clientes conectados:', wsManager ? wsManager.clients.size : 'No disponible');
            
            if (!wsManager) {
                console.log('❌ WebSocket Manager no disponible');
                return res.status(500).json({
                    success: false,
                    message: 'WebSocket Manager no disponible'
                });
            }

            const testNotification = {
                _id: 'test-' + Date.now(),
                titulo: 'Notificación de Prueba',
                mensaje: `Esta es una notificación de prueba enviada a ${usuario.prim_nom} ${usuario.apell_pa}`,
                tipo: 'General',
                leida: false,
                fecha_creacion: new Date(),
                prioridad: 'Media',
                accion_requerida: 'Ninguna'
            };

            console.log('🧪 ENVIANDO NOTIFICACIÓN DE PRUEBA');
            console.log('🧪 Usuario destino:', usuario._id);
            console.log('🧪 Notificación:', testNotification);

            const result = wsManager.sendNotification(usuario._id.toString(), testNotification);
            
            res.json({
                success: true,
                message: 'Notificación de prueba enviada',
                data: { 
                    sent: result,
                    userId: usuario._id.toString(),
                    notification: testNotification,
                    connectedClients: wsManager.clients.size
                }
            });
        } catch (error) {
            console.error('Error al enviar notificación de prueba:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

// Endpoint para verificar estado de conexiones WebSocket
router.get('/websocket-status',
    async (req, res) => {
        try {
            const wsManager = req.app.get('wsManager');
            
            if (!wsManager) {
                return res.status(500).json({
                    success: false,
                    message: 'WebSocket Manager no disponible'
                });
            }

            const stats = wsManager.getStats();
            const clientDetails = [];
            
            // Obtener detalles de cada cliente conectado
            wsManager.clients.forEach((ws, userId) => {
                clientDetails.push({
                    userId: userId,
                    readyState: ws.readyState,
                    subscribedToNotifications: ws.subscribedToNotifications || false,
                    subscribedProjects: ws.subscribedProjects ? Array.from(ws.subscribedProjects) : []
                });
            });

            res.json({
                success: true,
                message: 'Estado WebSocket obtenido exitosamente',
                data: {
                    stats: stats,
                    clients: clientDetails,
                    currentUser: req.user ? {
                        _id: req.user._id.toString(),
                        role: req.user.role,
                        nombre: `${req.user.prim_nom} ${req.user.apell_pa}`
                    } : null
                }
            });
        } catch (error) {
            console.error('Error al obtener estado WebSocket:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

/**
 * @route   GET /api/captaciones/notificaciones-usuario
 * @desc    Obtener notificaciones del usuario actual (sin proyecto específico)
 * @access  Private - Todos los usuarios autenticados
 */
router.get('/notificaciones-usuario',
    async (req, res) => {
        try {
            const usuario = req.user;
            const { leida, tipo } = req.query;

            console.log('🔍 DEBUG - Usuario solicitando notificaciones:', usuario._id, usuario.role);

            // Construir filtros para el usuario actual
            const filtros = { usuario_destino: usuario._id };
            if (leida !== undefined) filtros.leida = leida === 'true';
            if (tipo) filtros.tipo = tipo;

            console.log('🔍 DEBUG - Filtros de búsqueda:', filtros);

            const notificaciones = await require('../models/notificacion').find(filtros)
                .populate('proyecto_id', 'captacion.direccion')
                .sort({ fecha_creacion: -1 });

            console.log('🔍 DEBUG - Notificaciones encontradas:', notificaciones.length);

            res.json({
                success: true,
                message: 'Notificaciones del usuario obtenidas exitosamente',
                data: notificaciones
            });

        } catch (error) {
            console.error('Error al obtener notificaciones del usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

/**
 * @route   PUT /api/captaciones/notificacion/:notificacionId/marcar-leida-usuario
 * @desc    Marcar notificación como leída (para usuario actual)
 * @access  Private - Usuario propietario de la notificación
 */
router.put('/notificacion/:notificacionId/marcar-leida-usuario',
    async (req, res) => {
        try {
            const { notificacionId } = req.params;
            const usuario = req.user;

            const notificacion = await require('../models/notificacion').findById(notificacionId);
            
            if (!notificacion) {
                return res.status(404).json({
                    success: false,
                    message: 'Notificación no encontrada'
                });
            }

            // Verificar que la notificación pertenece al usuario actual
            if (notificacion.usuario_destino.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permiso para marcar esta notificación'
                });
            }

            notificacion.leida = true;
            notificacion.fecha_lectura = new Date();
            await notificacion.save();

            res.json({
                success: true,
                message: 'Notificación marcada como leída',
                data: notificacion
            });

        } catch (error) {
            console.error('Error al marcar notificación como leída:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

// -------- Rutas para Remodelación (ANTES de /:id para evitar conflictos) --------

// Importar y usar las rutas de remodelación
const remodelacionRouter = require('./remodelacion.router');
// Pasar el parámetro id a las rutas de remodelación
router.use('/:id/remodelacion', (req, res, next) => {
    console.log('🔗 DEBUG - LLEGÓ AL MIDDLEWARE DE CAPTACIONES para remodelación');
    console.log('🔗 DEBUG - req.params.id:', req.params.id);
    console.log('🔗 DEBUG - req.originalUrl:', req.originalUrl);
    console.log('🔗 DEBUG - Usuario presente:', !!req.user, req.user?.role);
    req.proyecto_id = req.params.id;
    next();
}, remodelacionRouter);

// Obtener una captación por ID
router.get('/:id', captacionesController.getCaptacionById);

// Crear nueva captación
router.post('/',
    [
        check('propiedad.tipo', 'El tipo de propiedad es requerido').not().isEmpty(),
        check('propietario.nombre', 'El nombre del propietario es requerido').not().isEmpty(),
        check('propietario.telefono', 'El teléfono del propietario es requerido').not().isEmpty(),
    ],
    captacionesController.createCaptacion,
    CrearPdfCaptacion,
    uploadObject
);

// Crear propiedad externa (Mercado Libre / Renta) - sin documentos/adeudos/referencias obligatorios
router.post('/externas',
    [
        check('propiedad.tipo', 'El tipo de propiedad es requerido').not().isEmpty(),
        check('propietario.nombre', 'El nombre del propietario o inmobiliaria es requerido').not().isEmpty(),
        check('tipo_operacion').optional().isIn(['Venta', 'Renta'])
    ],
    captacionesController.createPropiedadExterna
);

// Actualizar captación (función original) - DEPRECATED
// router.put('/:id', captacionesController.updateCaptacion);

// Actualizar captación (nueva función con estatus unificado) - AHORA ES LA PRINCIPAL
router.put('/:id', captacionesController.updateCaptacionUnificada);
router.put('/:id/unified', captacionesController.updateCaptacionUnificada);

// Eliminar captación (solo admin)
router.delete('/:id', esAdmin, captacionesController.deleteCaptacion);

// -------- Operaciones específicas --------

// Actualizar estatus
router.patch('/:id/estatus', 
    esAdminOSupervisor,
    captacionesController.updateEstatus
);

// Agregar trámite
router.post('/:id/tramites', 
    esAdminOSupervisor,
    [
        check('tipo', 'El tipo de trámite es requerido').not().isEmpty(),
        check('descripcion', 'La descripción del trámite es requerida').not().isEmpty(),
    ],
    captacionesController.addTramite
);

// Agregar gasto de remodelación
router.post('/:id/gastos', 
    esAdminOSupervisor,
    [
        check('concepto', 'El concepto del gasto es requerido').not().isEmpty(),
        check('monto', 'El monto del gasto es requerido').isNumeric(),
    ],
    captacionesController.addGasto
);

// Agregar inversionista
router.post('/:id/inversionistas', 
    esAdmin,
    [
        check('nombre', 'El nombre del inversionista es requerido').not().isEmpty(),
        check('porcentaje_participacion', 'El porcentaje de participación es requerido').isNumeric(),
        check('monto_invertido', 'El monto invertido es requerido').isNumeric(),
    ],
    captacionesController.addInversionista
);

// Registrar venta
router.post('/:id/venta', 
    esAdmin,
    [
        check('comprador.nombre', 'El nombre del comprador es requerido').not().isEmpty(),
        check('comprador.telefono', 'El teléfono del comprador es requerido').not().isEmpty(),
        check('monto_venta', 'El monto de venta es requerido').isNumeric(),
        check('tipo_de_pago', 'El tipo de pago es requerido').not().isEmpty(),
    ],
    captacionesController.registrarVenta
);

// -------- Nuevas Rutas para Características Adicionales --------

// Agregar/Actualizar datos laborales
router.post('/:id/datos-laborales',
    [
        check('empresa', 'La empresa es requerida').optional(),
        check('antiguedad', 'La antigüedad debe ser un número').optional().isNumeric(),
    ],
    captacionesController.updateDatosLaborales
);

// Agregar referencia personal
router.post('/:id/referencias',
    [
        check('nombre', 'El nombre de la referencia es requerido').not().isEmpty(),
        check('relacion', 'La relación con la referencia es requerida').not().isEmpty(),
        check('telefono', 'El teléfono de la referencia es requerido').not().isEmpty(),
    ],
    captacionesController.addReferencia
);

// Agregar documento
router.post('/:id/documentos',
    [
        check('nombre', 'El nombre del documento es requerido').not().isEmpty(),
        check('url', 'La URL del documento es requerida').not().isEmpty(),
        check('tipo', 'El tipo de documento es requerido').not().isEmpty(),
    ],
    captacionesController.addDocumento
);

// Agregar adeudo
router.post('/:id/adeudos',
    [
        check('tipo', 'El tipo de adeudo es requerido').not().isEmpty(),
        check('monto', 'El monto del adeudo es requerido').isNumeric(),
        check('estatus', 'El estatus del adeudo es requerido').optional().isIn(['Pagado', 'Pendiente', 'En proceso']),
    ],
    captacionesController.addAdeudo
);

// Actualizar estatus de venta
router.patch('/:id/venta/estatus',
    esAdmin,
    [
        check('estatus_venta', 'El estatus de venta es requerido').isIn(['En proceso', 'Finalizada', 'Cancelada']),
    ],
    captacionesController.updateEstatusVenta
);

// Agregar documento de venta
router.post('/:id/venta/documentos',
    esAdmin,
    [
        check('tipo', 'El tipo de documento es requerido').not().isEmpty(),
        check('url', 'La URL del documento es requerida').not().isEmpty(),
    ],
    captacionesController.addDocumentoVenta
);

// Ruta para descargar PDF
router.get('/download/:id', verificarToken, captacionesController.descargarPDF);

// -------- Rutas para Marketing Inmobiliario --------

// Obtener proyecto específico para marketing
router.get('/marketing/:id', verificarToken, captacionesController.getProyectoMarketing);

// Actualizar marketing de un proyecto
router.put('/marketing/:id', verificarToken, captacionesController.actualizarMarketing);

// -------- Rutas para Imágenes de Marketing --------

// Subir imágenes de marketing
router.post('/:id/marketing/imagenes', 
    verificarToken, 
    captacionesController.uploadImagenesMarketing
);

// Obtener imágenes de marketing
router.get('/:id/marketing/imagenes', 
    verificarToken, 
    captacionesController.getImagenesMarketing
);

// Eliminar imagen de marketing
router.delete('/:id/marketing/imagenes/:imageKey', 
    verificarToken, 
    captacionesController.deleteImagenMarketing
);

// Reordenar imágenes de marketing
router.put('/:id/marketing/imagenes/orden', 
    verificarToken, 
    captacionesController.reordenarImagenesMarketing
);

module.exports = router;