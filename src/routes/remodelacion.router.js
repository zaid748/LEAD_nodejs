const express = require('express');
const router = express.Router();
const RemodelacionController = require('../controllers/remodelacion.controller');
const { 
    validarPermisosRemodelacion, 
    validarAccesoProyecto, 
    validarMaterial, 
    validarSolicitudMaterial, 
    validarPresupuesto 
} = require('../middleware/permisos-remodelacion');
const { verificarToken } = require('../helpers/auth');

/**
 * @route   GET /api/captaciones/
 * @desc    Obtener información completa de remodelación de un proyecto
 * @access  Private - Todos los roles autorizados
 */
router.get('/', 
    validarPermisosRemodelacion('ver_remodelacion'),
    validarAccesoProyecto,
    RemodelacionController.obtenerRemodelacion
);

/**
 * @route   POST /api/captaciones/presupuesto
 * @desc    Establecer presupuesto estimado para remodelación
 * @access  Private - Solo administradores
 */
router.post('/presupuesto',
    validarPermisosRemodelacion('gestionar_presupuesto'),
    validarAccesoProyecto,
    validarPresupuesto,
    RemodelacionController.establecerPresupuesto
);

/**
 * @route   POST /api/captaciones/gasto-administrativo
 * @desc    Registrar gasto administrativo
 * @access  Private - Solo administradores
 */
router.post('/gasto-administrativo',
    validarPermisosRemodelacion('registrar_gastos_admin'),
    validarAccesoProyecto,
    validarMaterial,
    RemodelacionController.registrarGastoAdministrativo
);

/**
 * @route   POST /api/captaciones/solicitar-material
 * @desc    Solicitar material (contratista)
 * @access  Private - Contratistas, supervisores, administradores
 */
router.post('/solicitar-material',
    validarPermisosRemodelacion('solicitar_materiales'),
    validarAccesoProyecto,
    validarSolicitudMaterial,
    RemodelacionController.solicitarMaterial
);

/**
 * @route   PUT /api/captaciones/material/:materialId/agregar-costo
 * @desc    Agregar costo a solicitud (supervisor)
 * @access  Private - Supervisores, administradores
 */
router.put('/material/:materialId/agregar-costo',
    validarPermisosRemodelacion('aprobar_costos'),
    validarAccesoProyecto,
    RemodelacionController.agregarCosto
);

/**
 * @route   PUT /api/captaciones/material/:materialId/aprobar
 * @desc    Aprobar solicitud de material (administrador)
 * @access  Private - Solo administradores
 */
router.put('/material/:materialId/aprobar',
    validarPermisosRemodelacion('aprobar_solicitudes'),
    validarAccesoProyecto,
    RemodelacionController.aprobarSolicitud
);

/**
 * @route   PUT /api/captaciones/material/:materialId/registrar-compra
 * @desc    Registrar compra de material (supervisor)
 * @access  Private - Supervisores, administradores
 */
router.put('/material/:materialId/registrar-compra',
    validarPermisosRemodelacion('realizar_compras'),
    validarAccesoProyecto,
    RemodelacionController.registrarCompra
);

/**
 * @route   PUT /api/captaciones/material/:materialId/entregar
 * @desc    Entregar material (supervisor)
 * @access  Private - Supervisores, administradores
 */
router.put('/material/:materialId/entregar',
    validarPermisosRemodelacion('realizar_compras'),
    validarAccesoProyecto,
    RemodelacionController.entregarMaterial
);

/**
 * @route   POST /api/captaciones/firmar-carta
 * @desc    Firmar carta de responsabilidad (contratista)
 * @access  Private - Solo contratistas
 */
router.post('/firmar-carta',
    validarPermisosRemodelacion('firmar_recibo'),
    validarAccesoProyecto,
    RemodelacionController.firmarCartaResponsabilidad
);

/**
 * @route   GET /api/captaciones/reportes
 * @desc    Obtener reportes de gastos
 * @access  Private - Todos los roles autorizados
 */
router.get('/reportes',
    validarPermisosRemodelacion('ver_remodelacion'),
    validarAccesoProyecto,
    RemodelacionController.obtenerReportes
);

/**
 * @route   GET /api/captaciones/materiales
 * @desc    Obtener lista de materiales del proyecto
 * @access  Private - Todos los roles autorizados
 */
router.get('/materiales',
    (req, res, next) => {
        console.log('📋 DEBUG - LLEGÓ AL ROUTER DE REMODELACIÓN - materiales');
        console.log('📋 DEBUG - req.proyecto_id:', req.proyecto_id);
        console.log('📋 DEBUG - Usuario en router:', req.user?.role, req.user?._id);
        next();
    },
    validarPermisosRemodelacion('ver_remodelacion'),
    validarAccesoProyecto,
    async (req, res) => {
        try {
            const id = req.proyecto_id;
            const { estatus, tipo_gasto } = req.query;
            
            console.log('📋 DEBUG - Obteniendo materiales para proyecto:', id);
            console.log('📋 DEBUG - Usuario:', req.user?.role, req.user?._id);
            console.log('📋 DEBUG - Filtros query:', { estatus, tipo_gasto });

            // Construir filtros
            const filtros = { proyecto_id: id };
            if (estatus) filtros.estatus = estatus;
            if (tipo_gasto) filtros.tipo_gasto = tipo_gasto;

            const materiales = await require('../models/material').find(filtros)
                .populate('usuario_registro', 'prim_nom apell_pa apell_ma')
                .populate('supervisor_aprobacion', 'prim_nom apell_pa apell_ma')
                .populate('administrador_aprobacion', 'prim_nom apell_pa apell_ma')
                .sort({ fecha_registro: -1 });

            console.log('📋 DEBUG - Materiales encontrados:', materiales.length);
            console.log('📋 DEBUG - Filtros usados:', filtros);

            res.json({
                success: true,
                message: 'Materiales obtenidos exitosamente',
                data: materiales
            });

        } catch (error) {
            console.error('Error al obtener materiales:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);


/**
 * @route   GET /api/captaciones/notificaciones
 * @desc    Obtener notificaciones del proyecto
 * @access  Private - Todos los roles autorizados
 */
router.get('/notificaciones',
    validarPermisosRemodelacion('ver_remodelacion'),
    validarAccesoProyecto,
    async (req, res) => {
        try {
            const id = req.proyecto_id;
            const usuario = req.user;
            const { leida, tipo } = req.query;

            // Construir filtros
            const filtros = { proyecto_id: id };
            if (leida !== undefined) filtros.leida = leida === 'true';
            if (tipo) filtros.tipo = tipo;

            const notificaciones = await require('../models/notificacion').find(filtros)
                .populate('usuario_destino', 'prim_nom apell_pa apell_ma')
                .sort({ fecha_creacion: -1 });

            res.json({
                success: true,
                message: 'Notificaciones obtenidas exitosamente',
                data: notificaciones
            });

        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);


/**
 * @route   PUT /api/captaciones/notificacion/:notificacionId/marcar-leida
 * @desc    Marcar notificación como leída
 * @access  Private - Usuario propietario de la notificación
 */
router.put('/notificacion/:notificacionId/marcar-leida',
    validarPermisosRemodelacion('ver_remodelacion'),
    validarAccesoProyecto,
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

            // Verificar que el usuario sea el destinatario
            if (notificacion.usuario_destino.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No puedes marcar esta notificación como leída'
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

/**
 * @route   PUT /api/captaciones/:id/remodelacion/materiales/:materialId/costo
 * @desc    Actualizar costo de material (solo supervisores)
 * @access  Private - Supervisores
 */
router.put('/materiales/:materialId/costo',
    validarPermisosRemodelacion('aprobar_costos'),
    validarAccesoProyecto,
    async (req, res) => {
        try {
            const { materialId } = req.params;
            const { costo, estatus } = req.body;
            const usuario = req.user;

            console.log('💰 DEBUG - Actualizando costo material:', materialId);
            console.log('💰 DEBUG - Nuevo costo:', costo);
            console.log('💰 DEBUG - Nuevo estatus:', estatus);
            console.log('💰 DEBUG - Usuario:', usuario.role, usuario._id);

            if (!costo || costo <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'El costo debe ser mayor a 0'
                });
            }

            const Material = require('../models/material');
            const material = await Material.findById(materialId);

            if (!material) {
                return res.status(404).json({
                    success: false,
                    message: 'Material no encontrado'
                });
            }

            // Actualizar material
            material.costo = parseFloat(costo);
            material.estatus = estatus || 'Pendiente supervisión';
            material.supervisor_aprobacion = usuario._id;
            material.fecha_aprobacion_supervisor = new Date();

            await material.save();

            console.log('✅ DEBUG - Costo actualizado exitosamente');

            res.json({
                success: true,
                message: 'Costo actualizado exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al actualizar costo:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

/**
 * @route   PUT /api/captaciones/:id/remodelacion/materiales/:materialId/aprobar
 * @desc    Aprobar material y enviar a administración
 * @access  Private - Supervisores
 */
router.put('/materiales/:materialId/aprobar',
    validarPermisosRemodelacion('aprobar_costos'),
    validarAccesoProyecto,
    async (req, res) => {
        try {
            const { materialId } = req.params;
            const { mensaje } = req.body;
            const usuario = req.user;
            const proyectoId = req.proyecto_id;

            console.log('✅ DEBUG - Aprobando material:', materialId);
            console.log('✅ DEBUG - Mensaje:', mensaje);

            const Material = require('../models/material');
            const material = await Material.findById(materialId);

            if (!material) {
                return res.status(404).json({
                    success: false,
                    message: 'Material no encontrado'
                });
            }

            // Actualizar material
            material.estatus = 'Pendiente aprobación administrativa';
            material.decision_supervisor = 'aprobado';
            await material.save();

            // Crear notificación para administradores
            const Notificacion = require('../models/notificacion');
            
            // Buscar usuarios administradores
            const User = require('../models/user');
            const administradores = await User.find({ 
                role: { $in: ['administrator', 'administrador'] } 
            });

            console.log('🔍 DEBUG - Administradores encontrados:', administradores.length);
            console.log('🔍 DEBUG - IDs de administradores:', administradores.map(a => a._id));
            console.log('🔍 DEBUG - wsManager disponible:', !!req.app.get('wsManager'));
            console.log('🔍 DEBUG - Usuario actual:', usuario._id, usuario.role);

            // Crear notificación para cada administrador
            for (const admin of administradores) {
                const notificacion = await Notificacion.create({
                    usuario_destino: admin._id,
                    titulo: 'Material Aprobado por Supervisor',
                    mensaje: mensaje || `Supervisor aprobó: ${material.tipo} - Costo: $${material.costo?.toLocaleString('es-MX')}`,
                    tipo: 'Aprobacion',
                    proyecto_id: proyectoId,
                    material_id: materialId,
                    leida: false,
                    prioridad: 'Alta',
                    accion_requerida: 'Aprobar compra'
                });

                // Enviar notificación por WebSocket
                const wsManager = req.app.get('wsManager');
                console.log('🔍 DEBUG - wsManager disponible:', !!wsManager);
                if (wsManager) {
                    try {
                        wsManager.sendNotification(admin._id.toString(), notificacion);
                        console.log('📡 Notificación WebSocket enviada al administrador:', admin._id);
                    } catch (wsError) {
                        console.error('❌ Error enviando WebSocket:', wsError);
                    }
                } else {
                    console.log('⚠️ wsManager no disponible');
                }
            }

            // Crear notificación para el supervisor (él mismo) para proceder con la compra
            console.log('🔔 DEBUG - Creando notificación para supervisor...');
            const notificacionSupervisor = await Notificacion.create({
                usuario_destino: usuario._id, // Notificación para el supervisor mismo
                titulo: 'Material Aprobado - Proceder con Compra',
                mensaje: `Has aprobado el material "${material.tipo}". Ahora debes proceder a comprarlo o ingresar la cantidad final gastada para el proyecto.`,
                tipo: 'Compra',
                proyecto_id: proyectoId,
                material_id: materialId,
                leida: false,
                prioridad: 'Alta',
                accion_requerida: 'Comprar'
            });

            // Enviar notificación al supervisor por WebSocket
            if (wsManager) {
                try {
                    wsManager.sendNotification(usuario._id.toString(), notificacionSupervisor);
                    console.log('📡 Notificación WebSocket enviada al supervisor:', usuario._id);
                } catch (wsError) {
                    console.error('❌ Error enviando WebSocket al supervisor:', wsError);
                }
            }

            console.log('✅ DEBUG - Material aprobado y enviado a administración');
            console.log('✅ DEBUG - Notificación para supervisor creada exitosamente');

            res.json({
                success: true,
                message: 'Material aprobado y enviado a administración',
                data: material
            });

        } catch (error) {
            console.error('Error al aprobar material:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

/**
 * @route   PUT /api/captaciones/:id/remodelacion/materiales/:materialId/rechazar
 * @desc    Rechazar material y notificar al contratista
 * @access  Private - Supervisores
 */
router.put('/materiales/:materialId/rechazar',
    validarPermisosRemodelacion('aprobar_costos'),
    validarAccesoProyecto,
    async (req, res) => {
        try {
            const { materialId } = req.params;
            const { motivo, mensaje } = req.body;
            const usuario = req.user;
            const proyectoId = req.proyecto_id;

            console.log('❌ DEBUG - Rechazando material:', materialId);
            console.log('❌ DEBUG - Motivo:', motivo);

            const Material = require('../models/material');
            const material = await Material.findById(materialId);

            if (!material) {
                return res.status(404).json({
                    success: false,
                    message: 'Material no encontrado'
                });
            }

            // Actualizar material
            material.estatus = 'Rechazado por supervisor';
            material.decision_supervisor = 'rechazado';
            material.motivo_rechazo = motivo;
            await material.save();

            // Crear notificación para el contratista que solicitó
            const Notificacion = require('../models/notificacion');
            
            await Notificacion.create({
                usuario_destino: material.usuario_registro,
                titulo: 'Material Rechazado por Supervisor',
                mensaje: mensaje || `Tu solicitud de ${material.tipo} fue rechazada. Motivo: ${motivo}`,
                tipo: 'Rechazo',
                proyecto_id: proyectoId,
                material_id: materialId,
                leida: false,
                prioridad: 'Media',
                accion_requerida: 'Revisar'
            });

            console.log('✅ DEBUG - Material rechazado y notificación enviada');

            res.json({
                success: true,
                message: 'Material rechazado exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al rechazar material:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
);

module.exports = router;
