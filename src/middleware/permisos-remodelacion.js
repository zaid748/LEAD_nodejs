const { body, validationResult } = require('express-validator');

/**
 * Middleware para validar permisos de remodelación
 */
const validarPermisosRemodelacion = (accion) => {
    return (req, res, next) => {
        try {
            console.log('🔒 DEBUG validarPermisosRemodelacion - Acción:', accion);
            
            const usuario = req.user;
            console.log('🔒 DEBUG validarPermisosRemodelacion - Usuario:', usuario?.role, usuario?._id);
            
            if (!usuario) {
                console.log('❌ DEBUG validarPermisosRemodelacion - Usuario no autenticado');
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado'
                });
            }

            // Permisos por acción
            const permisos = {
                // Solo administradores pueden gestionar presupuestos y aprobar solicitudes
                'gestionar_presupuesto': ['administrator', 'administrador'],
                'aprobar_solicitudes': ['administrator', 'administrador'],
                'registrar_gastos_admin': ['administrator', 'administrador'],
                
                // Supervisores pueden gestionar materiales y compras
                'gestionar_materiales': ['supervisor', 'administrator', 'administrador'],
                'aprobar_costos': ['supervisor', 'administrator', 'administrador'],
                'realizar_compras': ['supervisor', 'administrator', 'administrador'],
                
                // Contratistas solo pueden solicitar materiales y firmar recibos
                'solicitar_materiales': ['contratista', 'supervisor', 'administrator', 'administrador'],
                'firmar_recibo': ['contratista'],
                
                // Lectura general para todos los roles autorizados
                'ver_remodelacion': ['contratista', 'supervisor', 'administrator', 'administrador', 'ayudante de administrador']
            };

            const rolesPermitidos = permisos[accion];
            
            if (!rolesPermitidos) {
                return res.status(500).json({
                    success: false,
                    message: 'Acción no configurada en permisos'
                });
            }

            if (!rolesPermitidos.includes(usuario.role)) {
                return res.status(403).json({
                    success: false,
                    message: `Acceso denegado. Rol requerido: ${rolesPermitidos.join(' o ')}`
                });
            }

            // Validación adicional para contratistas
            // Los contratistas pueden: ver_remodelacion, solicitar_materiales, firmar_recibo
            const accionesPermitidas = ['ver_remodelacion', 'solicitar_materiales', 'firmar_recibo'];
            if (usuario.role === 'contratista' && !accionesPermitidas.includes(accion)) {
                console.log('❌ DEBUG - Contratista intentando acción no permitida:', accion);
                return res.status(403).json({
                    success: false,
                    message: `Contratistas solo pueden: ${accionesPermitidas.join(', ')}`
                });
            }

            console.log('✅ DEBUG validarPermisosRemodelacion - Permisos validados correctamente');
            next();
        } catch (error) {
            console.error('Error en validación de permisos:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    };
};

/**
 * Middleware para validar que el usuario tenga acceso al proyecto específico
 */
const validarAccesoProyecto = async (req, res, next) => {
    try {
        const id = req.params.id || req.proyecto_id;
        const usuario = req.user;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID de proyecto requerido'
            });
        }

        // Administradores tienen acceso a todos los proyectos
        if (['administrator', 'administrador', 'ayudante de administrador'].includes(usuario.role)) {
            return next();
        }

        // Importar modelo para validación de acceso
        const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');

        // Buscar el proyecto para validar acceso
        const proyecto = await CaptacionInmobiliaria.findById(id)
            .populate('remodelacion.supervisor', '_id')
            .populate('remodelacion.contratista', '_id');

        if (!proyecto) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Supervisores tienen acceso solo a proyectos donde están asignados como supervisores
        if (usuario.role === 'supervisor') {
            const supervisorId = proyecto.remodelacion?.supervisor?._id || proyecto.remodelacion?.supervisor;
            if (!supervisorId || supervisorId.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'Acceso denegado. No eres el supervisor asignado a este proyecto'
                });
            }
            return next();
        }

        // Contratistas solo pueden acceder a proyectos donde están asignados
        if (usuario.role === 'contratista') {
            const contratistaId = proyecto.remodelacion?.contratista?._id || proyecto.remodelacion?.contratista;
            console.log('🔍 DEBUG validarAccesoProyecto - CONTRATISTA:');
            console.log('  - Usuario ID:', usuario._id.toString());
            console.log('  - Contratista asignado ID:', contratistaId?.toString());
            console.log('  - ¿Coinciden?:', contratistaId?.toString() === usuario._id.toString());
            
            if (!contratistaId || contratistaId.toString() !== usuario._id.toString()) {
                console.log('❌ Acceso denegado para contratista');
                return res.status(403).json({
                    success: false,
                    message: 'Acceso denegado. No estás asignado como contratista a este proyecto'
                });
            }
            console.log('✅ Acceso permitido para contratista');
            return next();
        }

        // Para otros roles, permitir acceso
        next();
    } catch (error) {
        console.error('Error en validación de acceso al proyecto:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

/**
 * Validaciones para datos de entrada
 */
const validarMaterial = [
    body('tipo').trim().notEmpty().withMessage('Tipo de material es requerido'),
    body('cantidad').isNumeric().withMessage('Cantidad debe ser numérica'),
    body('costo').isNumeric().withMessage('Costo debe ser numérico'),
    body('tipo_gasto').isIn(['Administrativo', 'Solicitud_Contratista']).withMessage('Tipo de gasto inválido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Datos de entrada inválidos',
                errors: errors.array()
            });
        }
        next();
    }
];

const validarSolicitudMaterial = [
    body('tipo').trim().notEmpty().withMessage('Tipo de material es requerido'),
    body('cantidad').isNumeric().withMessage('Cantidad debe ser numérica'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Datos de entrada inválidos',
                errors: errors.array()
            });
        }
        next();
    }
];

const validarPresupuesto = [
    body('presupuesto_estimado').isNumeric().withMessage('Presupuesto debe ser numérico'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Datos de entrada inválidos',
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = {
    validarPermisosRemodelacion,
    validarAccesoProyecto,
    validarMaterial,
    validarSolicitudMaterial,
    validarPresupuesto
};
