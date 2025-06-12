const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

/**
 * Obtener todas las captaciones con filtros y paginación
 * @route GET /api/captaciones
 */
exports.getCaptaciones = async (req, res) => {
    try {
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
        
        // Filtrar por supervisor específico
        if (supervisor) filtro['captacion.supervisor'] = supervisor;
        
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
                    .populate('remodelacion.supervisor', 'name email')
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
            .populate('remodelacion.supervisor', 'name email')
            .populate('historial_estatus.usuario', 'name email');
        
        if (!captacion) {
            return res.status(404).json({ mensaje: 'Captación no encontrada' });
        }
        
        // Verificar permisos (si no es admin, solo puede ver sus captaciones)
        if (req.user.role !== 'administrator' && req.user.role !== 'supervisor' && 
            captacion.captacion.asesor && captacion.captacion.asesor._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ mensaje: 'No tienes permiso para ver esta captación' });
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
 * Actualizar una captación existente
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
        const estatusValidos = ['Captación', 'En trámite legal', 'En remodelación', 'En venta', 'Vendida', 'Cancelada'];
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
        
        // Si el estatus actual es Captación o En trámite legal, actualizarlo a En remodelación
        if (['Captación', 'En trámite legal'].includes(captacion.estatus_actual)) {
            captacion.estatus_actual = 'En remodelación';
            
            // Registrar cambio en historial de estatus
            captacion.historial_estatus.push({
                estatus: 'En remodelación',
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
 * @route GET /api/captaciones/:id/pdf
 */
exports.descargarPDF = async (req, res) => {
    let browser = null;
    try {
        const captacion = await CaptacionInmobiliaria.findById(req.params.id);

        if (!captacion) {
            return res.status(404).json({ mensaje: 'Captación no encontrada' });
        }

        // Si ya existe una URL del PDF, redirigir a ella
        if (captacion.pdf_url) {
            return res.redirect(captacion.pdf_url);
        }

        req.captacion = captacion;
        req.id = captacion._id;
        
        req.user = {
            name: req.user.name || req.user.prim_nom || 'Usuario',
            ...req.user
        };

        const { CrearPdfCaptacion } = require('../libs/PDF');

        // Generar el PDF con manejo de timeout
        await Promise.race([
            CrearPdfCaptacion(req, res, (err) => {
                if (err) {
                    console.error('Error en CrearPdfCaptacion:', err);
                    return res.status(500).json({ mensaje: 'Error al generar el PDF' });
                }

                if (!req.pdf) {
                    return res.status(500).json({ mensaje: 'Error al generar el PDF' });
                }

                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=captacion_${captacion._id}.pdf`);
                res.send(req.pdf);
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout al generar PDF')), 55000)
            )
        ]);

    } catch (error) {
        console.error('Error al descargar PDF:', error);
        res.status(500).json({ 
            mensaje: 'Error al generar el PDF',
            error: error.message 
        });
    }
}; 