const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');

const { validationResult } = require('express-validator');

const mongoose = require('mongoose');

const https = require('https');

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');



/**

 * Obtener todas las captaciones con filtros y paginación

 * @route GET /api/captaciones

 */

exports.getCaptaciones = async (req, res) => {

    try {
        console.log('🔥 DEBUG getCaptaciones - req.query completo:', JSON.stringify(req.query, null, 2));
        console.log('🔥 DEBUG getCaptaciones - req.user:', req.user ? { _id: req.user._id, role: req.user.role } : 'No user');

        const { 

            estatus, 

            tipo_propiedad, 

            ciudad, 

            estado,

            uso_actual,

            asesor,

            supervisor,

            fecha_desde,

            fecha_hasta,

            estatus_venta,

            search,

            page = 1, 

            limit = 10,

            sort = "-updatedAt",

            nopopulate = false

        } = req.query;

        
        
        // Construir filtros

        let filtro = {};

        
        
        // Filtrar por estatus

        if (estatus) filtro.estatus_actual = estatus;

        
        
        // Filtrar por tipo de propiedad

        if (tipo_propiedad) filtro['propiedad.tipo'] = tipo_propiedad;

        
        
        // Filtrar por ubicación

        if (ciudad) filtro['propiedad.direccion.ciudad'] = ciudad;

        if (estado) filtro['propiedad.direccion.estado'] = estado;

        
        
        // Filtrar por uso de propiedad

        if (uso_actual) filtro['propiedad.uso_actual'] = uso_actual;

        
        
        // Filtrar por asesor específico

        if (asesor) filtro['captacion.asesor'] = asesor;

        
        
        // Filtrar por supervisor específico - SOLO si el usuario actual es supervisor
        if (req.user && (req.user.role === 'supervisor' || req.user.role === 'Supervisor')) {
            console.log('🔍 DEBUG - Usuario es supervisor, filtrando por sus proyectos:', req.user._id);
            filtro['remodelacion.supervisor'] = req.user._id;
            console.log('🔍 DEBUG - Filtro aplicado para supervisor:', filtro);
        } else if (supervisor && req.user && ['administrator', 'administrador', 'admin'].includes(req.user.role)) {
            // Los administradores pueden filtrar por supervisor específico
            console.log('🔍 DEBUG - Admin filtrando por supervisor específico:', supervisor);
            const mongoose = require('mongoose');
            const supervisorId = mongoose.Types.ObjectId.isValid(supervisor) 
                ? new mongoose.Types.ObjectId(supervisor) 
                : supervisor;
            filtro['remodelacion.supervisor'] = supervisorId;
        }

        // Filtrar por contratista específico - SOLO si el usuario actual es contratista
        if (req.user && req.user.role === 'contratista') {
            console.log('🔍 DEBUG - Usuario es contratista, filtrando por sus proyectos asignados:', req.user._id);
            filtro['remodelacion.contratista'] = req.user._id;
            console.log('🔍 DEBUG - Filtro aplicado para contratista:', filtro);
        }

        
        
        // Filtrar por fechas

        if (fecha_desde || fecha_hasta) {

            filtro['captacion.fecha'] = {};

            if (fecha_desde) filtro['captacion.fecha'].$gte = new Date(fecha_desde);

            if (fecha_hasta) filtro['captacion.fecha'].$lte = new Date(fecha_hasta);

        }

        
        
        // Filtrar por estatus de venta

        if (estatus_venta) filtro['venta.estatus'] = estatus_venta;

        
        
        // Búsqueda por término (nombre de propietario o dirección)

        if (search) {

            const searchRegex = new RegExp(search, 'i');

            filtro.$or = [

                { 'propietario.nombre': searchRegex },

                { 'propiedad.direccion.completa': searchRegex },

                { 'propiedad.direccion.ciudad': searchRegex },

                { 'propiedad.direccion.estado': searchRegex }

            ];

        }

        
        
        // Paginación

        const skip = (page - 1) * limit;

        
        
        // Construir la consulta base
        console.log('🔥 DEBUG ANTES DE CONSULTA - filtro final:', JSON.stringify(filtro, null, 2));

        let captacionesQuery = CaptacionInmobiliaria.find(filtro)

            .sort(sort)

            .skip(skip)

            .limit(parseInt(limit))

            .select('-historial_tramites -inversionistas -referencias_personales');
        
        
        
        // Aplicar populate SOLO si no se indica evitarlo

        // y envolver en try/catch para que no rompa la aplicación

        if (nopopulate !== 'true') {

            try {

                // Intentar hacer populate, pero manejar posibles errores

                captacionesQuery = captacionesQuery

                    .populate('captacion.asesor', 'name email')

                    .populate('remodelacion.supervisor', 'prim_nom apell_pa email')
                    .populate('remodelacion.contratista', 'prim_nom apell_pa email')

                    .populate('ultima_actualizacion.usuario', 'name email')

                    .populate('historial_estatus.usuario', 'prim_nom segun_nom apell_pa apell_ma nombre email');

            } catch (populateError) {

                console.error("Error al hacer populate:", populateError);

                // Continuar sin populate

            }

        }

        
        
        // Ejecutar consultas en paralelo

        const [captaciones, total] = await Promise.all([

            captacionesQuery.exec(),

            CaptacionInmobiliaria.countDocuments(filtro)

        ]);

        
        
        // Calcular paginación

        const paginas = Math.ceil(total / limit) || 1;

        
        
        // Devolver resultados

        console.log('RESPUESTA captaciones:', JSON.stringify(captaciones, null, 2));

        res.json({

            captaciones,

            paginacion: {

                total,

                pagina: parseInt(page),

                paginas,

                por_pagina: parseInt(limit)

            }

        });

    } catch (error) {

        console.error('Error al obtener captaciones:', error);

        res.status(500).json({ mensaje: 'Error al obtener las captaciones' });

    }

};



/**

 * Obtener una captación por ID

 * @route GET /api/captaciones/:id

 */

exports.getCaptacionById = async (req, res) => {

    try {

        const captacionId = req.params.id;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        const captacion = await CaptacionInmobiliaria.findById(captacionId)

            .populate('captacion.asesor', 'name email role')

            .populate('remodelacion.supervisor', 'prim_nom apell_pa email')
            .populate('remodelacion.contratista', 'prim_nom apell_pa email')

            .populate('historial_estatus.usuario', 'name email');
        
        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos según rol del usuario
        const tieneAcceso = () => {
            // Administradores y ayudantes tienen acceso completo
            if (['administrator', 'administrador', 'ayudante de administrador'].includes(req.user.role)) {
                return true;
            }
            
            // Supervisores pueden ver proyectos donde están asignados como supervisores
            if (req.user.role === 'supervisor' || req.user.role === 'Supervisor') {
                return captacion.remodelacion?.supervisor?.toString() === req.user._id.toString();
            }
            
            // Contratistas pueden ver solo proyectos donde están asignados como contratistas
            if (req.user.role === 'contratista') {
                return captacion.remodelacion?.contratista?.toString() === req.user._id.toString();
            }
            
            // Usuarios normales pueden ver sus propias captaciones
            if (captacion.captacion.asesor && captacion.captacion.asesor._id) {
                return captacion.captacion.asesor._id.toString() === req.user._id.toString();
            }
            
            return false;
        };

        if (!tieneAcceso()) {
            return res.status(403).json({ 
                mensaje: 'No tienes permiso para ver esta captación',
                detalle: req.user.role === 'contratista' 
                    ? 'Solo puedes ver proyectos donde estás asignado como contratista'
                    : req.user.role === 'supervisor' 
                    ? 'Solo puedes ver proyectos donde estás asignado como supervisor'
                    : 'Solo puedes ver tus propias captaciones'
            });
        }   

        res.json(captacion);

    } catch (error) {

        console.error('Error al obtener captación:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Crear una nueva captación

 * @route POST /api/captaciones

 */

exports.createCaptacion = async (req, res, next) => {

    try {

        // Validar entrada

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ 

                mensaje: 'Errores de validación', 

                errores: errors.array() 

            });

        }

        
        
        // Verificar que los documentos obligatorios estén marcados como entregados

        if (!req.body.documentos_entregados || 

            !req.body.documentos_entregados.ine || 

            !req.body.documentos_entregados.escrituras) {

            
            
            return res.status(400).json({ 

                mensaje: 'Los documentos INE y Escrituras son obligatorios',

                errores: [

                    { param: 'documentos_entregados.ine', msg: 'El documento INE es obligatorio' },

                    { param: 'documentos_entregados.escrituras', msg: 'Las escrituras son obligatorias' }

                ]

            });

        }

        
        
        // Construir objeto de captación

        const captacionData = {

            ...req.body,

            captacion: {

                ...req.body.captacion,

                asesor: req.user._id,

                fecha: new Date()

            },

            estatus_actual: 'Captación',

            historial_estatus: [{

                estatus: 'Captación',

                fecha: new Date(),

                notas: 'Creación inicial de la captación',

                usuario: req.user._id

            }]

        };

        
        
        // Asignar supervisor si el usuario es supervisor

        if (req.user.role === 'supervisor') {

            if (req.body.remodelacion && req.body.remodelacion.necesita_remodelacion) {

                captacionData.remodelacion = {

                    ...req.body.remodelacion,

                    supervisor: req.user._id

                };

            }

        }

        
        
        // Crear nueva captación

        const nuevaCaptacion = new CaptacionInmobiliaria(captacionData);

        
        
        // Validar el modelo antes de guardar

        await nuevaCaptacion.validate();

        
        
        const captacionGuardada = await nuevaCaptacion.save();

        
        
        // Preparar datos para la generación del PDF

        req.id = captacionGuardada._id;

        req.captacion = await CaptacionInmobiliaria.findById(captacionGuardada._id)

            .populate('captacion.asesor', 'name email role')

            .populate('remodelacion.supervisor', 'name email')

            .lean();



        // Si la respuesta es exitosa, continuar con la generación del PDF

        next();

    } catch (error) {

        console.error('Error al crear captación:', error);

        
        
        // Manejar errores de validación de Mongoose

        if (error.name === 'ValidationError') {

            const errores = Object.values(error.errors).map(err => ({

                campo: err.path,

                mensaje: err.message

            }));

            
            
            return res.status(400).json({ 

                mensaje: 'Error de validación', 

                errores 

            });

        }

        
        
        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Actualizar una captación existente (REDISEÑADA para estatus unificado)

 * @route PUT /api/captaciones/:id

 */

exports.updateCaptacion = async (req, res) => {

    try {

        const captacionId = req.params.id;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos

        const esAdmin = req.user.role === 'administrator';

        const esSupervisor = req.user.role === 'supervisor';

        const esCreador = captacion.captacion.asesor && 

                         captacion.captacion.asesor.toString() === req.user._id.toString();
        
        
        
        if (!esAdmin && !esSupervisor && !esCreador) {

            return res.status(403).json({ 

                mensaje: 'No tienes permiso para editar esta captación' 

            });

        }

        
        
        // Si se están actualizando documentos, verificar los documentos obligatorios

        if (req.body.documentos_entregados) {

            if (req.body.documentos_entregados.ine === false || 

                req.body.documentos_entregados.escrituras === false) {

                
                
                return res.status(400).json({

                    mensaje: 'No se pueden deshabilitar los documentos obligatorios (INE y Escrituras)',

                    errores: []

                });

            }

            
            
            // Si no están presentes, preservar los valores anteriores

            if (req.body.documentos_entregados.ine === undefined) {

                req.body.documentos_entregados.ine = captacion.documentos_entregados.ine;

            }

            
            
            if (req.body.documentos_entregados.escrituras === undefined) {

                req.body.documentos_entregados.escrituras = captacion.documentos_entregados.escrituras;

            }

        }

        
        
        // Si no es admin, limitar los campos que puede modificar

        let datosActualizados = req.body;

        
        
        if (!esAdmin) {

            // Si no es admin, no puede cambiar algunos campos cruciales

            const { estatus_actual, venta, inversionistas, ...camposPermitidos } = req.body;

            datosActualizados = camposPermitidos;

            
            
            // Los supervisores pueden actualizar la remodelación

            if (esSupervisor && req.body.remodelacion) {

                datosActualizados.remodelacion = {

                    ...req.body.remodelacion,

                    supervisor: req.user._id  // Asignar al supervisor actual

                };

            }

        }

        
        
        // Actualizar datos

        const captacionActualizada = await CaptacionInmobiliaria.findByIdAndUpdate(

            captacionId,

            { $set: datosActualizados },

            { new: true, runValidators: true }

        )

        .populate('captacion.asesor', 'name email')

        .populate('remodelacion.supervisor', 'name email')

        .populate('ultima_actualizacion.usuario', 'name email');

        
        
        res.json(captacionActualizada);

    } catch (error) {

        console.error('Error al actualizar captación:', error);

        
        
        // Manejar errores de validación de Mongoose

        if (error.name === 'ValidationError') {

            const errores = Object.values(error.errors).map(err => ({

                campo: err.path,

                mensaje: err.message

            }));

            
            
            return res.status(400).json({ 

                mensaje: 'Error de validación', 

                errores 

            });

        }

        
        
        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};

/**
 * Actualizar una captación existente (REDISEÑADA para estatus unificado)
 * @route PUT /api/captaciones/:id/unified
 */
exports.updateCaptacionUnificada = async (req, res) => {
    try {
        console.log('=== ACTUALIZANDO CAPTACIÓN (ESTATUS UNIFICADO) ===');
        console.log('ID:', req.params.id);
        console.log('Datos recibidos:', JSON.stringify(req.body, null, 2));
        
        const captacionId = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {
            return res.status(400).json({ 
                success: false,
                mensaje: 'ID de captación inválido' 
            });
        }
        
        // Buscar la captación
        const captacion = await CaptacionInmobiliaria.findById(captacionId);
        
        if (!captacion) {
            return res.status(404).json({ 
                success: false,
                mensaje: 'Captación no encontrada' 
            });
        }
        
        // Verificar permisos
        const esAdmin = ['administrator', 'administrador', 'Superadministrator'].includes(req.user.role);
        const esSupervisor = req.user.role === 'supervisor';
        const esAyudanteAdmin = req.user.role === 'ayudante de administrador';
        const esCreador = captacion.captacion.asesor && 
                         captacion.captacion.asesor.toString() === req.user._id.toString();
        
        if (!esAdmin && !esSupervisor && !esAyudanteAdmin && !esCreador) {
            return res.status(403).json({ 
                success: false,
                mensaje: 'No tienes permiso para editar esta captación' 
            });
        }
        
        // Validar documentos obligatorios
        if (req.body.documentos_entregados) {
            if (req.body.documentos_entregados.ine === false || 
                req.body.documentos_entregados.escrituras === false) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'No se pueden deshabilitar los documentos obligatorios (INE y Escrituras)'
                });
            }
            
            // Preservar valores anteriores si no están presentes
            if (req.body.documentos_entregados.ine === undefined) {
                req.body.documentos_entregados.ine = captacion.documentos_entregados.ine;
            }
            if (req.body.documentos_entregados.escrituras === undefined) {
                req.body.documentos_entregados.escrituras = captacion.documentos_entregados.escrituras;
            }
        }
        
        // === PROCESAMIENTO DE ESTATUS UNIFICADO ===
        let datosActualizados = { ...req.body };
        let cambioEstatus = false;
        
        // Manejar el estatus unificado
        if (datosActualizados.captacion && datosActualizados.captacion.estatus_actual) {
            const nuevoEstatus = datosActualizados.captacion.estatus_actual;
            const estatusAnterior = captacion.estatus_actual;
            
            console.log(`Cambiando estatus: ${estatusAnterior} → ${nuevoEstatus}`);
            
            // Validar estatus
            const estatusValidos = ['Captación', 'En trámite legal', 'Remodelacion', 'Disponible para venta', 'Vendida', 'Cancelada'];
            if (!estatusValidos.includes(nuevoEstatus)) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'Estatus inválido',
                    estatusValidos
                });
            }
            
            // Mover estatus del nivel captacion al nivel principal
            datosActualizados.estatus_actual = nuevoEstatus;
            cambioEstatus = nuevoEstatus !== estatusAnterior;
            
            // === LÓGICA ESPECÍFICA POR ESTATUS ===
            
            // 1. Disponible para venta
            if (nuevoEstatus === 'Disponible para venta') {
                if (!datosActualizados.venta) datosActualizados.venta = {};
                datosActualizados.venta.en_venta = true;
                console.log('Activando en_venta por estatus Disponible para venta');
            }
            
            // 2. Remodelacion - Validar presupuesto
            if (nuevoEstatus === 'Remodelacion') {
                const presupuesto = datosActualizados.captacion.presupuesto_estimado || 
                                  datosActualizados.remodelacion?.presupuesto_estimado;
                
                if (!presupuesto || presupuesto <= 0) {
                    return res.status(400).json({
                        success: false,
                        mensaje: 'El presupuesto estimado es requerido cuando el estatus es Remodelacion',
                        campo: 'presupuesto_estimado'
                    });
                }
                
                // Inicializar/actualizar remodelación
                if (!datosActualizados.remodelacion) {
                    datosActualizados.remodelacion = {};
                }
                datosActualizados.remodelacion.presupuesto_estimado = presupuesto;
                datosActualizados.remodelacion.necesita_remodelacion = true;
                
                // Asignar supervisor:
                // 1. Si el usuario es supervisor, se asigna a sí mismo
                // 2. Si es admin y viene supervisor_id en el formulario, usar ese
                console.log('🔍 DEBUG - Asignación de supervisor:');
                console.log('  - esSupervisor:', esSupervisor);
                console.log('  - esAdmin:', esAdmin);
                console.log('  - req.body.captacion:', req.body.captacion);
                console.log('  - supervisor_id:', req.body.captacion?.supervisor_id);
                
                if (esSupervisor) {
                    datosActualizados.remodelacion.supervisor = req.user._id;
                    console.log('✅ Supervisor auto-asignado:', req.user._id);
                } else if (esAdmin && req.body.captacion?.supervisor_id) {
                    datosActualizados.remodelacion.supervisor = req.body.captacion.supervisor_id;
                    console.log('✅ Supervisor asignado por admin:', req.body.captacion.supervisor_id);
                } else {
                    console.log('❌ No se asignó supervisor');
                }
                
                // Lógica de contratistas movida fuera de este bloque
                
                console.log(`Configurando remodelación con presupuesto: $${presupuesto}`);
            }
            
            // 3. Vendida - No permitir cambio desde Vendida
            if (estatusAnterior === 'Vendida' && nuevoEstatus !== 'Vendida') {
                return res.status(400).json({
                    success: false,
                    mensaje: 'No se puede cambiar el estatus de una captación ya vendida'
                });
            }
        }
        
        // === CONTROL DE PERMISOS POR CAMPO ===
        
        // Solo admins pueden cambiar ciertos campos críticos
        if (!esAdmin && !esAyudanteAdmin) {
            // Eliminar campos que solo admins pueden modificar
            const { inversionistas, ...camposPermitidos } = datosActualizados;
            datosActualizados = camposPermitidos;
            
            // Los supervisores pueden modificar remodelación
            if (esSupervisor && req.body.remodelacion) {
                datosActualizados.remodelacion = {
                    ...datosActualizados.remodelacion,
                    supervisor: req.user._id
                };
            }
        }
        
        // === ASIGNACIÓN DE CONTRATISTA ===
        
        // Supervisores pueden asignar/desasignar contratistas en proyectos de remodelación
        console.log('🔍 DEBUG - Verificando asignación de contratista:');
        console.log('  - esSupervisor:', esSupervisor);
        console.log('  - req.body.captacion existe:', !!req.body.captacion);
        console.log('  - contratista_id está en body:', req.body.captacion ? 'contratista_id' in req.body.captacion : false);
        console.log('  - contratista_id valor:', req.body.captacion?.contratista_id);
        console.log('  - estatus actual:', captacion.estatus_actual);
        
        if (esSupervisor && req.body.captacion && 'contratista_id' in req.body.captacion) {
            // Solo permitir asignar contratistas en proyectos que están en Remodelacion
            if (captacion.estatus_actual === 'Remodelacion' || datosActualizados.estatus_actual === 'Remodelacion') {
                // Asegurar que existe el objeto remodelacion
                if (!datosActualizados.remodelacion) {
                    datosActualizados.remodelacion = captacion.remodelacion || {};
                }
                
                const contratistaAnterior = captacion.remodelacion?.contratista;
                const nuevoContratista = req.body.captacion.contratista_id || null;
                
                datosActualizados.remodelacion.contratista = nuevoContratista;
                console.log('✅ Contratista actualizado por supervisor:', nuevoContratista || 'Desasignado');
                
                // Guardar información para notificaciones (se enviará después de la actualización)
                datosActualizados._notificacionContratista = {
                    anterior: contratistaAnterior,
                    nuevo: nuevoContratista,
                    supervisor: req.user._id
                };
            } else {
                console.log('❌ No se puede asignar contratista: el proyecto no está en Remodelacion');
            }
        } else {
            console.log('❌ No se actualiza contratista - condiciones no cumplidas');
        }
        
        // === HISTORIAL DE ESTATUS ===
        
        if (cambioEstatus) {
            if (!datosActualizados.historial_estatus) {
                datosActualizados.historial_estatus = [...(captacion.historial_estatus || [])];
            }
            datosActualizados.historial_estatus.push({
                estatus: datosActualizados.estatus_actual,
                fecha: new Date(),
                notas: `Cambio desde formulario: ${captacion.estatus_actual} → ${datosActualizados.estatus_actual}`,
                usuario: req.user._id
            });
            
            console.log('Registrando cambio de estatus en historial');
        }
        
        // === ACTUALIZACIÓN EN BASE DE DATOS ===
        
        // Extraer información de notificaciones antes de la actualización
        const notificacionContratista = datosActualizados._notificacionContratista;
        delete datosActualizados._notificacionContratista; // No enviar a MongoDB
        
        // Agregar metadatos de actualización
        datosActualizados.ultima_actualizacion = {
            usuario: req.user._id,
            fecha: new Date()
        };
        
        console.log('Datos finales para actualización:', JSON.stringify(datosActualizados, null, 2));
        
        const captacionActualizada = await CaptacionInmobiliaria.findByIdAndUpdate(
            captacionId,
            { $set: datosActualizados },
            { new: true, runValidators: true }
        )
        .populate('captacion.asesor', 'name email prim_nom segun_nom apell_pa apell_ma')
        .populate('remodelacion.supervisor', 'name email prim_nom segun_nom apell_pa apell_ma')
        .populate('ultima_actualizacion.usuario', 'name email prim_nom segun_nom apell_pa apell_ma');
        
        console.log('Captación actualizada exitosamente');
        
        // === NOTIFICACIONES DE ASIGNACIÓN DE CONTRATISTA ===
        
        if (notificacionContratista) {
            try {
                const { anterior, nuevo, supervisor } = notificacionContratista;
                
                // Obtener información del supervisor para las notificaciones
                const User = require('../models/user.js');
                const supervisorInfo = await User.findById(supervisor, 'prim_nom apell_pa email');
                const supervisorNombre = supervisorInfo ? 
                    `${supervisorInfo.prim_nom} ${supervisorInfo.apell_pa}` : 'Supervisor';
                
                // Obtener información de la propiedad para el mensaje
                const direccionPropiedad = `${captacionActualizada.propiedad.direccion.calle} ${captacionActualizada.propiedad.direccion.numero}, ${captacionActualizada.propiedad.direccion.colonia}`;
                
                console.log('📨 Enviando notificaciones de contratista...');
                
                // Importar modelo de notificación y controlador de remodelación
                const Notificacion = require('../models/notificacion.js');
                const RemodelacionController = require('./remodelacion.controller.js');
                
                // Si hay un nuevo contratista asignado
                if (nuevo) {
                    console.log('📤 Notificando asignación al contratista:', nuevo);
                    
                    await RemodelacionController.crearNotificacion({
                        usuario_destino: nuevo,
                        titulo: '🏗️ Nuevo Proyecto Asignado',
                        mensaje: `Se te ha asignado el proyecto de remodelación en ${direccionPropiedad}. Supervisor: ${supervisorNombre}`,
                        tipo: 'Asignacion',
                        proyecto_id: captacionActualizada._id,
                        prioridad: 'Alta',
                        accion_requerida: 'Revisar'
                    });
                }
                
                // Si había un contratista anterior y se desasignó
                if (anterior && !nuevo) {
                    console.log('📤 Notificando desasignación al contratista anterior:', anterior);
                    
                    await RemodelacionController.crearNotificacion({
                        usuario_destino: anterior,
                        titulo: '📋 Proyecto Desasignado',
                        mensaje: `Has sido desasignado del proyecto de remodelación en ${direccionPropiedad}.`,
                        tipo: 'Asignacion',
                        proyecto_id: captacionActualizada._id,
                        prioridad: 'Media',
                        accion_requerida: 'Ninguna'
                    });
                }
                
                // Si se cambió de un contratista a otro
                if (anterior && nuevo && anterior.toString() !== nuevo.toString()) {
                    console.log('📤 Notificando cambio de contratista...');
                    
                    // Notificar al contratista anterior
                    await RemodelacionController.crearNotificacion({
                        usuario_destino: anterior,
                        titulo: '📋 Proyecto Reasignado',
                        mensaje: `El proyecto de remodelación en ${direccionPropiedad} ha sido reasignado a otro contratista.`,
                        tipo: 'Asignacion',
                        proyecto_id: captacionActualizada._id,
                        prioridad: 'Media',
                        accion_requerida: 'Ninguna'
                    });
                    
                    // Notificar al nuevo contratista
                    await RemodelacionController.crearNotificacion({
                        usuario_destino: nuevo,
                        titulo: '🏗️ Nuevo Proyecto Asignado',
                        mensaje: `Se te ha asignado el proyecto de remodelación en ${direccionPropiedad}. Supervisor: ${supervisorNombre}`,
                        tipo: 'Asignacion',
                        proyecto_id: captacionActualizada._id,
                        prioridad: 'Alta',
                        accion_requerida: 'Revisar'
                    });
                }
                
                console.log('✅ Notificaciones de contratista enviadas correctamente');
                
            } catch (notificationError) {
                console.error('❌ Error al enviar notificaciones de contratista:', notificationError);
                // No detener el flujo si falla la notificación
            }
        }
        
        res.json({
            success: true,
            message: 'Captación actualizada exitosamente',
            data: captacionActualizada
        });
        
    } catch (error) {
        console.error('Error al actualizar captación:', error);
        
        // Manejar errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => ({
                campo: err.path,
                mensaje: err.message
            }));
            
            return res.status(400).json({ 
                success: false,
                mensaje: 'Error de validación', 
                errores 
            });
        }
        
        res.status(500).json({ 
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**

 * Eliminar una captación

 * @route DELETE /api/captaciones/:id

 */

exports.deleteCaptacion = async (req, res) => {

    try {

        const captacionId = req.params.id;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos (solo admin puede eliminar)

        if (req.user.role !== 'administrator') {

            return res.status(403).json({ 

                mensaje: 'Solo administradores pueden eliminar captaciones' 

            });

        }

        
        
        // No permitir eliminar captaciones vendidas

        if (captacion.estatus_actual === 'Vendida') {

            return res.status(400).json({ 

                mensaje: 'No se puede eliminar una captación con estatus "Vendida"' 

            });

        }

        
        
        // Eliminar la captación

        await CaptacionInmobiliaria.findByIdAndDelete(captacionId);

        
        
        res.json({ mensaje: 'Captación eliminada correctamente' });

    } catch (error) {

        console.error('Error al eliminar captación:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Actualizar el estatus de una captación

 * @route PATCH /api/captaciones/:id/estatus

 */

exports.updateEstatus = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const { estatus, notas } = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        if (!estatus) {

            return res.status(400).json({ mensaje: 'El estatus es requerido' });

        }

        
        
        // Validar que sea un estatus válido

        const estatusValidos = ['Captación', 'En trámite legal', 'Remodelacion', 'Disponible para venta', 'Vendida', 'Cancelada'];

        if (!estatusValidos.includes(estatus)) {

            return res.status(400).json({ 

                mensaje: 'Estatus inválido',

                estatusValidos

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos (solo admin o supervisor puede cambiar estatus)

        if (req.user.role !== 'administrator' && req.user.role !== 'supervisor') {

            return res.status(403).json({ 

                mensaje: 'No tienes permisos para cambiar el estatus' 

            });

        }

        
        
        // No permitir cambiar de Vendida a otro estatus

        if (captacion.estatus_actual === 'Vendida' && estatus !== 'Vendida') {

            return res.status(400).json({ 

                mensaje: 'No se puede cambiar el estatus de una captación ya vendida' 

            });

        }

        
        
        // Actualizar estatus y agregar al historial

        captacion.estatus_actual = estatus;

        captacion.historial_estatus.push({

            estatus,

            fecha: new Date(),

            notas: notas || `Cambio de estatus a ${estatus}`,

            usuario: req.user._id

        });

        
        
        await captacion.save();

        
        
        res.json(captacion);

    } catch (error) {

        console.error('Error al actualizar estatus:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar un trámite a una captación

 * @route POST /api/captaciones/:id/tramites

 */

exports.addTramite = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const tramiteData = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar datos del trámite

        if (!tramiteData.tipo || !tramiteData.descripcion) {

            return res.status(400).json({ 

                mensaje: 'El tipo y descripción del trámite son requeridos' 

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos (solo admin o supervisor puede agregar trámites)

        if (req.user.role !== 'administrator' && req.user.role !== 'supervisor') {

            return res.status(403).json({ 

                mensaje: 'No tienes permisos para agregar trámites' 

            });

        }

        
        
        // Agregar el trámite

        captacion.historial_tramites.push({

            ...tramiteData,

            fecha: new Date(),

            supervisor: req.user._id

        });

        
        
        // Si el estatus actual es Captación, actualizarlo a En trámite legal

        if (captacion.estatus_actual === 'Captación' && tramiteData.tipo === 'Legal') {

            captacion.estatus_actual = 'En trámite legal';

            
            
            // Registrar cambio en historial de estatus

            captacion.historial_estatus.push({

                estatus: 'En trámite legal',

                fecha: new Date(),

                notas: `Cambio automático por registro de trámite legal: ${tramiteData.descripcion}`,

                usuario: req.user._id

            });

        }

        
        
        await captacion.save();

        
        
        // Retornar captación actualizada

        const captacionActualizada = await CaptacionInmobiliaria.findById(captacionId)

            .populate('captacion.asesor', 'name email')

            .populate('historial_tramites.supervisor', 'name email');
        
        
        
        res.status(201).json(captacionActualizada);

    } catch (error) {

        console.error('Error al agregar trámite:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar un gasto de remodelación a una captación

 * @route POST /api/captaciones/:id/gastos

 */

exports.addGasto = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const gastoData = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar datos del gasto

        if (!gastoData.concepto || !gastoData.monto) {

            return res.status(400).json({ 

                mensaje: 'El concepto y monto del gasto son requeridos' 

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos (admin, supervisor o asesor asignado)

        const puedeAgregarGasto = 

            req.user.role === 'administrator' || 

            req.user.role === 'supervisor' || 

            (captacion.remodelacion.supervisor && 

             captacion.remodelacion.supervisor.toString() === req.user._id.toString());
        
        
        
        if (!puedeAgregarGasto) {

            return res.status(403).json({ 

                mensaje: 'No tienes permisos para agregar gastos' 

            });

        }

        
        
        // Inicializar remodelación si no existe

        if (!captacion.remodelacion) {

            captacion.remodelacion = {

                necesita_remodelacion: true,

                estatus: 'En proceso',

                supervisor: req.user._id,

                gastos: []

            };

        }

        
        
        // Agregar el gasto

        captacion.remodelacion.gastos.push({

            ...gastoData,

            fecha: new Date()

        });

        
        
        // Si el estatus actual es Captación o En trámite legal, actualizarlo a Remodelacion

        if (['Captación', 'En trámite legal'].includes(captacion.estatus_actual)) {

            captacion.estatus_actual = 'Remodelacion';

            
            
            // Registrar cambio en historial de estatus

            captacion.historial_estatus.push({

                estatus: 'Remodelacion',

                fecha: new Date(),

                notas: `Cambio automático por registro de gasto de remodelación: ${gastoData.concepto}`,

                usuario: req.user._id

            });

        }

        
        
        await captacion.save();

        
        
        res.status(201).json(captacion);

    } catch (error) {

        console.error('Error al agregar gasto:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar un inversionista a una captación

 * @route POST /api/captaciones/:id/inversionistas

 */

exports.addInversionista = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const inversionistaData = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar datos del inversionista

        if (!inversionistaData.nombre || !inversionistaData.porcentaje_participacion || !inversionistaData.monto_invertido) {

            return res.status(400).json({ 

                mensaje: 'El nombre, porcentaje de participación y monto invertido son requeridos' 

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos

        if (req.user.role !== 'administrator') {

            return res.status(403).json({ 

                mensaje: 'Solo administradores pueden registrar inversionistas' 

            });

        }

        
        
        // Validar que el porcentaje total no exceda 100%

        const porcentajeTotal = captacion.inversionistas.reduce(

            (total, inv) => total + inv.porcentaje_participacion, 

            0

        ) + inversionistaData.porcentaje_participacion;

        
        
        if (porcentajeTotal > 100) {

            return res.status(400).json({ 

                mensaje: 'El porcentaje total de participación no puede exceder el 100%' 

            });

        }

        
        
        // Agregar el inversionista

        captacion.inversionistas.push(inversionistaData);

        
        
        await captacion.save();

        
        
        res.status(201).json(captacion);

    } catch (error) {

        console.error('Error al agregar inversionista:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Registrar la venta de una captación

 * @route POST /api/captaciones/:id/venta

 */

exports.registrarVenta = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const ventaData = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar datos de la venta

        if (!ventaData.comprador || !ventaData.comprador.nombre || !ventaData.monto_venta || !ventaData.tipo_de_pago) {

            return res.status(400).json({ 

                mensaje: 'La información del comprador, monto de venta y tipo de pago son requeridos' 

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos

        if (req.user.role !== 'administrator') {

            return res.status(403).json({ 

                mensaje: 'Solo administradores pueden registrar ventas' 

            });

        }

        
        
        // Verificar que no esté vendida ya

        if (captacion.estatus_actual === 'Vendida') {

            return res.status(400).json({ 

                mensaje: 'Esta propiedad ya ha sido vendida' 

            });

        }

        
        
        // Actualizar información de venta

        captacion.venta = {

            ...ventaData,

            fecha_venta: new Date(),

            estatus_venta: 'Finalizada'

        };

        
        
        // Actualizar estatus

        captacion.estatus_actual = 'Vendida';

        
        
        // Agregar al historial de estatus

        captacion.historial_estatus.push({

            estatus: 'Vendida',

            fecha: new Date(),

            notas: `Propiedad vendida a ${ventaData.comprador.nombre} por ${ventaData.monto_venta}`,

            usuario: req.user._id

        });

        
        
        await captacion.save();

        
        
        res.json(captacion);

    } catch (error) {

        console.error('Error al registrar venta:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar adeudo a una captación

 * @route POST /api/captaciones/:id/adeudos

 */

exports.addAdeudo = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const adeudoData = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar errores de express-validator

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ 

                mensaje: 'Errores de validación', 

                errores: errors.array() 

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos

        if (req.user.role !== 'administrator' && req.user.role !== 'supervisor' && 

            captacion.captacion.asesor?.toString() !== req.user._id.toString()) {

            return res.status(403).json({ mensaje: 'No tienes permisos para agregar adeudos' });

        }

        
        
        // Inicializar el array si no existe

        if (!captacion.propiedad.adeudos) {

            captacion.propiedad.adeudos = [];

        }

        
        
        // Agregar el adeudo

        captacion.propiedad.adeudos.push({

            tipo: adeudoData.tipo,

            monto: adeudoData.monto,

            estatus: adeudoData.estatus || 'Pendiente',

            fecha_vencimiento: adeudoData.fecha_vencimiento,

            descripcion: adeudoData.descripcion

        });

        
        
        await captacion.save();

        
        
        res.status(201).json(captacion);

    } catch (error) {

        console.error('Error al agregar adeudo:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar referencia personal

 * @route POST /api/captaciones/:id/referencias

 */

exports.addReferencia = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const referenciaData = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar errores de express-validator

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ 

                mensaje: 'Errores de validación', 

                errores: errors.array() 

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos

        if (req.user.role !== 'administrator' && 

            captacion.captacion.asesor?.toString() !== req.user._id.toString()) {

            return res.status(403).json({ mensaje: 'No tienes permisos para agregar referencias' });

        }

        
        
        // Inicializar el array si no existe

        if (!captacion.referencias_personales) {

            captacion.referencias_personales = [];

        }

        
        
        // Agregar la referencia personal

        captacion.referencias_personales.push(referenciaData);

        
        
        await captacion.save();

        
        
        res.status(201).json(captacion);

    } catch (error) {

        console.error('Error al agregar referencia:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Actualizar estatus de venta

 * @route PATCH /api/captaciones/:id/venta/estatus

 */

exports.updateEstatusVenta = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const { estatus_venta } = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar errores de express-validator

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ 

                mensaje: 'Errores de validación', 

                errores: errors.array() 

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar que exista una venta

        if (!captacion.venta || !captacion.venta.comprador) {

            return res.status(400).json({ 

                mensaje: 'No se puede actualizar el estatus porque no existe una venta registrada' 

            });

        }

        
        
        // Actualizar el estatus de la venta

        captacion.venta.estatus_venta = estatus_venta;

        
        
        // Si el estatus es "Finalizada", actualizar el estatus general

        if (estatus_venta === 'Finalizada' && captacion.estatus_actual !== 'Vendida') {

            captacion.estatus_actual = 'Vendida';

            
            
            // Agregar al historial de estatus

            captacion.historial_estatus.push({

                estatus: 'Vendida',

                fecha: new Date(),

                usuario: req.user._id,

                notas: `Venta finalizada. Comprador: ${captacion.venta.comprador.nombre}`

            });

        }

        
        
        // Si el estatus es "Cancelada", actualizar el estatus general

        if (estatus_venta === 'Cancelada' && captacion.estatus_actual === 'Vendida') {

            captacion.estatus_actual = 'En venta';

            
            
            // Agregar al historial de estatus

            captacion.historial_estatus.push({

                estatus: 'En venta',

                fecha: new Date(),

                usuario: req.user._id,

                notas: 'Venta cancelada, propiedad disponible nuevamente'

            });

        }

        
        
        await captacion.save();

        
        
        res.json(captacion);

    } catch (error) {

        console.error('Error al actualizar estatus de venta:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar documento de venta

 * @route POST /api/captaciones/:id/venta/documentos

 */

exports.addDocumentoVenta = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const { tipo, estado } = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar que se proporcione el tipo de documento y su estado

        if (!tipo || estado === undefined) {

            return res.status(400).json({ 

                mensaje: 'El tipo de documento y su estado (true/false) son requeridos' 

            });

        }

        
        
        // Verificar que el tipo de documento sea válido

        const tiposValidos = ['contrato', 'identificacion', 'constancia_credito', 'avaluo', 'escritura_publica'];

        if (!tiposValidos.includes(tipo)) {

            return res.status(400).json({

                mensaje: 'Tipo de documento inválido',

                tiposValidos

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar que exista una venta

        if (!captacion.venta || !captacion.venta.comprador) {

            return res.status(400).json({ 

                mensaje: 'No se pueden agregar documentos porque no existe una venta registrada' 

            });

        }

        
        
        // Verificar permisos (solo administradores pueden modificar documentos de venta)

        if (req.user.role !== 'administrator') {

            return res.status(403).json({ 

                mensaje: 'Solo administradores pueden modificar documentos de venta' 

            });

        }

        
        
        // Actualizar el estado del documento

        if (!captacion.venta.documentos_entregados) {

            captacion.venta.documentos_entregados = {};

        }

        
        
        captacion.venta.documentos_entregados[tipo] = estado;

        
        
        // Guardar la captación actualizada

        await captacion.save();

        
        
        res.json({

            mensaje: `Documento de venta ${tipo} actualizado correctamente`,

            estado_actual: estado,

            captacion

        });

    } catch (error) {

        console.error('Error al actualizar documento de venta:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar datos laborales

 * @route POST /api/captaciones/:id/datos-laborales

 */

exports.updateDatosLaborales = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const datosLaborales = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos

        const puedeActualizar = 

            req.user.role === 'administrator' || 

            (captacion.captacion.asesor && 

             captacion.captacion.asesor.toString() === req.user._id.toString());
        
        
        
        if (!puedeActualizar) {

            return res.status(403).json({ 

                mensaje: 'No tienes permisos para actualizar datos laborales' 

            });

        }

        
        
        // Actualizar datos laborales

        captacion.datos_laborales = {

            ...(captacion.datos_laborales || {}),

            ...datosLaborales

        };

        
        
        await captacion.save();

        
        
        res.json(captacion);

    } catch (error) {

        console.error('Error al actualizar datos laborales:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Agregar documento

 * @route POST /api/captaciones/:id/documentos

 */

exports.addDocumento = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const { tipo, estado } = req.body;

        
        
        if (!mongoose.Types.ObjectId.isValid(captacionId)) {

            return res.status(400).json({ mensaje: 'ID de captación inválido' });

        }

        
        
        // Validar que se proporcione el tipo de documento y su estado

        if (!tipo || estado === undefined) {

            return res.status(400).json({ 

                mensaje: 'El tipo de documento y su estado (true/false) son requeridos' 

            });

        }

        
        
        // Verificar que el tipo de documento sea válido

        const tiposValidos = ['ine', 'curp', 'rfc', 'escrituras', 'comprobante_domicilio', 'predial_pagado', 'libre_gravamen'];

        if (!tiposValidos.includes(tipo)) {

            return res.status(400).json({

                mensaje: 'Tipo de documento inválido',

                tiposValidos

            });

        }

        
        
        // Buscar la captación

        const captacion = await CaptacionInmobiliaria.findById(captacionId);

        
        
        if (!captacion) {

            return res.status(404).json({ mensaje: 'Captación no encontrada' });

        }

        
        
        // Verificar permisos

        const puedeAgregarDocumento = 

            req.user.role === 'administrator' || 

            req.user.role === 'supervisor' ||

            (captacion.captacion.asesor && 

             captacion.captacion.asesor.toString() === req.user._id.toString());
        
        
        
        if (!puedeAgregarDocumento) {

            return res.status(403).json({ 

                mensaje: 'No tienes permisos para agregar documentos' 

            });

        }

        
        
        // Si intentan marcar como falso documentos obligatorios, no permitirlo

        if ((tipo === 'ine' || tipo === 'escrituras') && estado === false) {

            return res.status(400).json({

                mensaje: `El documento ${tipo === 'ine' ? 'INE' : 'Escrituras'} es obligatorio y no puede ser desmarcado`

            });

        }

        
        
        // Actualizar el estado del documento

        captacion.documentos_entregados[tipo] = estado;

        
        
        // Guardar la captación actualizada

        await captacion.save();

        
        
        res.json({

            mensaje: `Documento ${tipo} actualizado correctamente`,

            estado_actual: estado,

            captacion

        });

    } catch (error) {

        console.error('Error al actualizar documento:', error);

        res.status(500).json({ mensaje: 'Error interno del servidor' });

    }

};



/**

 * Descargar PDF de una captación

 * @route GET /api/captaciones/download/:id

 */

exports.descargarPDF = async (req, res) => {

    try {

        const captacionId = req.params.id;

        const captacion = await CaptacionInmobiliaria.findOne({_id: captacionId});

        console.log('captacioninmobiliarias.findOne', {_id: captacionId}, captacion);

        
        
        if (!captacion) {

            return res.status(404).json({

                success: false,

                message: 'Captación no encontrada'

            });

        }



        // Si ya existe una URL del PDF, intentar descargar de S3

        if (captacion.pdf_url) {

            let name = `captacion_${captacionId}`;

            const key = `Captaciones/${name}.pdf`;



            console.log('Intentando descargar archivo:', {

                bucket: process.env.BUCKET_NAME,

                key: key,

                endpoint: process.env.S3_ENDPOINT

            });



            // Configurar el agente HTTPS con keepAlive y timeout

            const agent = new https.Agent({

                keepAlive: true,

                keepAliveMsecs: 3000,

                timeout: 10000,

                rejectUnauthorized: false

            });



            // Configurar el cliente S3

            const s3Client = new S3Client({

                forcePathStyle: false,

                endpoint: process.env.S3_ENDPOINT,

                region: "us-east-1",

                credentials: {

                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

                },

                requestHandler: {

                    httpOptions: {

                        agent,

                        timeout: 10000

                    }

                }

            });



            try {

                // Obtener el objeto de S3

                const command = new GetObjectCommand({

                    Bucket: process.env.BUCKET_NAME,

                    Key: key

                });



                const response = await s3Client.send(command);

                
                
                // Configurar headers para la descarga

                res.setHeader('Content-Type', 'application/pdf');

                res.setHeader('Content-Disposition', `attachment; filename=${name}.pdf`);

                res.setHeader('Cache-Control', 'no-cache');

                res.setHeader('Pragma', 'no-cache');



                // Transmitir el contenido del PDF al cliente

                response.Body.pipe(res);

            } catch (s3Error) {

                console.error('Error al descargar de S3:', s3Error);

                // Si falla S3, intentar generar nuevo PDF

                await generarYEnviarPDF();

            }

        } else {

            await generarYEnviarPDF();

        }



        async function generarYEnviarPDF() {

            // Preparar datos para generar PDF

            req.captacion = captacion;

            req.id = captacion._id;

            
            
            req.user = {

                name: req.user.name || req.user.prim_nom || 'Usuario',

                ...req.user

            };



            const { CrearPdfCaptacion } = require('../libs/PDF');

            const fs = require('fs');

            const path = require('path');



            // Generar el PDF

            await new Promise((resolve, reject) => {

                CrearPdfCaptacion(req, {}, async (err) => {

                    if (err) {

                        console.error('Error en CrearPdfCaptacion:', err);

                        reject(err);

                        return;

                    }



                    try {

                        // Leer el archivo temporal

                        const tempPdfPath = `/tmp/debug_captacion_${captacionId}.pdf`;

                        console.log('Intentando leer archivo temporal:', tempPdfPath);

                        
                        
                        if (fs.existsSync(tempPdfPath)) {

                            const pdfContent = fs.readFileSync(tempPdfPath);

                            
                            
                            // Enviar el PDF

                            res.setHeader('Content-Type', 'application/pdf');

                            res.setHeader('Content-Disposition', `attachment; filename=captacion_${captacionId}.pdf`);

                            res.send(pdfContent);



                            // Limpiar archivo temporal

                            fs.unlinkSync(tempPdfPath);

                            resolve();

                        } else {

                            reject(new Error('Archivo temporal no encontrado'));

                        }

                    } catch (fsError) {

                        console.error('Error al leer/enviar archivo temporal:', fsError);

                        reject(fsError);

                    }

                });

            });

        }

    } catch (error) {

        console.error('Error al descargar PDF:', error);

        res.status(500).json({ 

            success: false,

            message: 'Error al generar/descargar el PDF',

            error: error.message 

        });

    }

}; 

/**
 * Obtener proyecto específico para marketing
 * @route GET /api/captaciones/marketing/:id
 */
exports.getProyectoMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('=== DEBUG: getProyectoMarketing ===');
        console.log('ID solicitado:', id);
        
        const captacion = await CaptacionInmobiliaria.findById(id)
            .populate('captacion.asesor', 'prim_nom segun_nom apell_pa apell_ma');

        if (!captacion) {
            console.log('Proyecto no encontrado');
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        console.log('Proyecto encontrado:', {
            _id: captacion._id,
            estatus_actual: captacion.estatus_actual,
            'venta.estatus_venta': captacion.venta?.estatus_venta,
            'venta': captacion.venta
        });

        // Verificar que esté disponible para marketing (validación más flexible)
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';
            
        console.log('Estatus válido:', estatusValido);
        console.log('Validación:', {
            'venta.estatus_venta === Disponible para venta': captacion.venta?.estatus_venta === 'Disponible para venta',
            'estatus_actual === En venta': captacion.estatus_actual === 'En venta'
        });
            
        if (!estatusValido) {
            console.log('Proyecto no disponible para marketing');
            return res.status(400).json({
                success: false,
                message: `Este proyecto no está disponible para marketing. Estatus actual: ${captacion.venta?.estatus_venta || captacion.estatus_actual || 'No definido'}`
            });
        }

        res.json({
            success: true,
            message: 'Proyecto obtenido correctamente',
            captacion
        });
    } catch (error) {
        console.error('Error al obtener proyecto de marketing:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Actualizar marketing de un proyecto
 * @route PUT /api/captaciones/marketing/:id
 */
exports.actualizarMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, precioOferta, descripcionMarketing } = req.body;

        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Verificar que esté disponible para marketing (validación más flexible)
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';
            
        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: `Este proyecto no está disponible para marketing. Estatus actual: ${captacion.venta?.estatus_venta || captacion.estatus_actual || 'No definido'}`
            });
        }

        // Actualizar campos de marketing
        if (titulo) {
            captacion.propiedad.descripcion_adicional = titulo;
        }
        if (precioOferta) {
            captacion.venta.monto_venta = precioOferta;
        }
        if (descripcionMarketing) {
            captacion.propiedad.descripcionMarketing = descripcionMarketing;
        }

        // Actualizar historial
        captacion.historial_estatus.push({
            estatus: 'Marketing actualizado',
            fecha: new Date(),
            notas: 'Información de marketing actualizada',
            usuario: req.user?._id
        });

        await captacion.save();

        res.json({
            success: true,
            message: 'Marketing actualizado correctamente',
            captacion
        });
    } catch (error) {
        console.error('Error al actualizar marketing:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}; 

/**
 * Subir imágenes de marketing para una captación
 * @route POST /api/captaciones/:id/marketing/imagenes
 */
exports.uploadImagenesMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        const { uploadMultipleImages } = require('../libs/multerImagenes');
        
        // Usar el middleware de multer para procesar las imágenes
        await uploadMultipleImages(req, res, async () => {
            try {
                const { uploadedImages, captacionId } = req;
                
                res.status(201).json({
                    success: true,
                    message: `${uploadedImages.length} imagen(es) subida(s) correctamente`,
                    imagenes: uploadedImages,
                    captacionId: captacionId
                });
            } catch (error) {
                console.error('Error en callback de uploadMultipleImages:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al procesar las imágenes',
                    error: error.message
                });
            }
        });
        
    } catch (error) {
        console.error('Error al subir imágenes de marketing:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Eliminar imagen de marketing
 * @route DELETE /api/captaciones/:id/marketing/imagenes/:imageKey
 */
exports.deleteImagenMarketing = async (req, res) => {
    try {
        const { id, imageKey } = req.params;
        
        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Captación no encontrada'
            });
        }

        // Verificar que esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';
            
        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: `Este proyecto no está disponible para marketing. Estatus actual: ${captacion.venta?.estatus_venta || captacion.estatus_actual || 'No definido'}`
            });
        }

        // Buscar la imagen en el array
        const imagenIndex = captacion.propiedad.imagenesMarketing.findIndex(
            img => img.key === imageKey
        );

        if (imagenIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Imagen no encontrada'
            });
        }

        const imagen = captacion.propiedad.imagenesMarketing[imagenIndex];

        // Eliminar de S3
        const { deleteImageFromS3 } = require('../libs/multerImagenes');
        await deleteImageFromS3(imagen.key);

        // Eliminar de la base de datos
        captacion.propiedad.imagenesMarketing.splice(imagenIndex, 1);

        // Actualizar historial
        captacion.historial_estatus.push({
            estatus: 'Imagen de marketing eliminada',
            fecha: new Date(),
            notas: `Se eliminó la imagen: ${imagen.nombre}`,
            usuario: req.user?._id
        });

        await captacion.save();

        res.json({
            success: true,
            message: 'Imagen eliminada correctamente',
            imagenEliminada: imagen
        });

    } catch (error) {
        console.error('Error al eliminar imagen de marketing:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Obtener imágenes de marketing de una captación
 * @route GET /api/captaciones/:id/marketing/imagenes
 */
exports.getImagenesMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        
        const captacion = await CaptacionInmobiliaria.findById(id)
            .select('propiedad.imagenesMarketing venta.estatus_venta estatus_actual');

        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Captación no encontrada'
            });
        }

        // Verificar que esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';
            
        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: `Este proyecto no está disponible para marketing. Estatus actual: ${captacion.venta?.estatus_venta || captacion.estatus_actual || 'No definido'}`
            });
        }

        const imagenes = captacion.propiedad?.imagenesMarketing || [];

        res.json({
            success: true,
            message: 'Imágenes obtenidas correctamente',
            imagenes: imagenes,
            total: imagenes.length
        });

    } catch (error) {
        console.error('Error al obtener imágenes de marketing:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Reordenar imágenes de marketing
 * @route PUT /api/captaciones/:id/marketing/imagenes/orden
 */
exports.reordenarImagenesMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        const { ordenImagenes } = req.body; // Array de objetos con {imageKey, orden}
        
        if (!Array.isArray(ordenImagenes)) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere un array de orden de imágenes'
            });
        }

        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Captación no encontrada'
            });
        }

        // Verificar que esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';
            
        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: `Este proyecto no está disponible para marketing. Estatus actual: ${captacion.venta?.estatus_venta || captacion.estatus_actual || 'No definido'}`
            });
        }

        // Actualizar el orden de las imágenes
        ordenImagenes.forEach(({ imageKey, orden }) => {
            const imagen = captacion.propiedad.imagenesMarketing.find(
                img => img.key === imageKey
            );
            if (imagen) {
                imagen.orden = orden;
            }
        });

        // Ordenar el array por el campo orden
        captacion.propiedad.imagenesMarketing.sort((a, b) => a.orden - b.orden);

        // Actualizar historial
        captacion.historial_estatus.push({
            estatus: 'Orden de imágenes de marketing actualizado',
            fecha: new Date(),
            notas: 'Se reordenaron las imágenes de marketing',
            usuario: req.user?._id
        });

        await captacion.save();

        res.json({
            success: true,
            message: 'Orden de imágenes actualizado correctamente',
            imagenes: captacion.propiedad.imagenesMarketing
        });

    } catch (error) {
        console.error('Error al reordenar imágenes de marketing:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}; 