const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');
const Material = require('../models/material');
const CartaResponsabilidad = require('../models/carta-responsabilidad');
const Notificacion = require('../models/notificacion');
const User = require('../models/user');

/**
 * Controlador para gestión de remodelación
 */
class RemodelacionController {
    
    /**
     * Obtener información completa de remodelación de un proyecto
     */
    static async obtenerRemodelacion(req, res) {
        try {
            const id = req.proyecto_id;
            const usuario = req.user;

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(id)
                .populate('remodelacion.supervisor', 'prim_nom apell_pa apell_ma email')
                .populate('remodelacion.materiales')
                .populate('remodelacion.carta_responsabilidad')
                .populate('remodelacion.notificaciones');

            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Verificar acceso según rol
            if (!RemodelacionController.verificarAccesoProyecto(usuario, proyecto)) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes acceso a este proyecto'
                });
            }

            // Obtener materiales del proyecto
            const materiales = await Material.find({ proyecto_id: id })
                .populate('usuario_registro', 'prim_nom apell_pa apell_ma')
                .populate('supervisor_aprobacion', 'prim_nom apell_pa apell_ma')
                .populate('administrador_aprobacion', 'prim_nom apell_pa apell_ma');

            // Obtener notificaciones no leídas del usuario
            const notificaciones = await Notificacion.find({
                usuario_destino: usuario._id,
                proyecto_id: id,
                leida: false
            }).sort({ fecha_creacion: -1 });

            const respuesta = {
                success: true,
                message: 'Información de remodelación obtenida exitosamente',
                data: {
                    proyecto: {
                        id: proyecto._id,
                        titulo: proyecto.propiedad?.titulo || 'Sin título',
                        estatus_actual: proyecto.estatus_actual,
                        remodelacion: proyecto.remodelacion
                    },
                    materiales,
                    notificaciones,
                    estadisticas: await this.calcularEstadisticas(id)
                }
            };

            res.json(respuesta);

        } catch (error) {
            console.error('Error al obtener remodelación:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Establecer presupuesto estimado para remodelación
     */
    static async establecerPresupuesto(req, res) {
        try {
            const id = req.proyecto_id;
            const { presupuesto_estimado } = req.body;
            const usuario = req.user;

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(id);
            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Verificar que el proyecto esté en estatus de Remodelacion
            if (proyecto.estatus_actual !== 'Remodelacion') {
                return res.status(400).json({
                    success: false,
                    message: 'El proyecto debe estar en estatus de Remodelacion para establecer presupuesto'
                });
            }

            // Actualizar presupuesto
            const proyectoActualizado = await CaptacionInmobiliaria.findByIdAndUpdate(
                id,
                {
                    'remodelacion.presupuesto_estimado': presupuesto_estimado,
                    'remodelacion.fecha_inicio': new Date()
                },
                { new: true }
            );

            // Crear notificación para supervisores
            const wsManager = req.app.get('wsManager');
            await RemodelacionController.crearNotificacion({
                usuario_destino: proyecto.remodelacion?.supervisor,
                titulo: 'Presupuesto de Remodelación Establecido',
                mensaje: `Se ha establecido un presupuesto de $${presupuesto_estimado} para el proyecto ${proyecto.propiedad?.titulo || 'Sin título'}`,
                tipo: 'General',
                proyecto_id: id,
                prioridad: 'Alta'
            }, wsManager);

            res.json({
                success: true,
                message: 'Presupuesto establecido exitosamente',
                data: {
                    presupuesto_estimado,
                    fecha_establecimiento: new Date()
                }
            });

        } catch (error) {
            console.error('Error al establecer presupuesto:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Registrar gasto administrativo
     */
    static async registrarGastoAdministrativo(req, res) {
        try {
            const id = req.proyecto_id;
            const { tipo, cantidad, costo, numero_factura, notas } = req.body;
            const usuario = req.user;
            const wsManager = req.app.get('wsManager');

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(id);
            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Crear material administrativo
            const material = new Material({
                tipo,
                cantidad,
                costo,
                numero_factura,
                tipo_gasto: 'Administrativo',
                estatus: 'Entregado', // Los gastos administrativos van directo a entregado
                usuario_registro: usuario._id,
                proyecto_id: id,
                notas,
                fecha_entrega: new Date()
            });

            await material.save();

            // Actualizar proyecto con el material
            await CaptacionInmobiliaria.findByIdAndUpdate(
                id,
                {
                    $push: { 'remodelacion.materiales': material._id },
                    $inc: { 'remodelacion.presupuesto_total': costo }
                }
            );

            // Crear notificación para supervisores
            if (proyecto.remodelacion?.supervisor) {
                await RemodelacionController.crearNotificacion({
                    usuario_destino: proyecto.remodelacion.supervisor,
                    titulo: 'Nuevo Gasto Administrativo Registrado',
                    mensaje: `Se ha registrado un gasto administrativo de $${costo} para ${tipo} en el proyecto ${proyecto.propiedad?.titulo || 'Sin título'}`,
                    tipo: 'General',
                    proyecto_id: id,
                    material_id: material._id,
                    prioridad: 'Media'
                }, wsManager);
            }

            res.status(201).json({
                success: true,
                message: 'Gasto administrativo registrado exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al registrar gasto administrativo:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Solicitar material (contratista)
     */
    static async solicitarMaterial(req, res) {
        try {
            const id = req.proyecto_id;
            const { tipo, cantidad, notas } = req.body;
            const usuario = req.user;

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(id);
            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Crear solicitud de material
            const material = new Material({
                tipo,
                cantidad,
                costo: 0, // Se establecerá cuando el supervisor agregue el costo
                tipo_gasto: 'Solicitud_Contratista',
                estatus: 'Solicitando material',
                usuario_registro: usuario._id,
                proyecto_id: id,
                notas
            });

            await material.save();

            // Actualizar proyecto con la solicitud
            await CaptacionInmobiliaria.findByIdAndUpdate(
                id,
                {
                    $push: { 
                        'remodelacion.materiales': material._id,
                        'remodelacion.solicitudes_pendientes': {
                            material: material._id,
                            fecha_solicitud: new Date(),
                            estatus: 'Solicitando material'
                        }
                    }
                }
            );

            // Crear notificación para supervisores
            if (proyecto.remodelacion?.supervisor) {
                await RemodelacionController.crearNotificacion({
                    usuario_destino: proyecto.remodelacion.supervisor,
                    titulo: 'Nueva Solicitud de Material',
                    mensaje: `El contratista ha solicitado ${cantidad} de ${tipo} para el proyecto ${proyecto.propiedad?.titulo || 'Sin título'}`,
                    tipo: 'Solicitud',
                    proyecto_id: id,
                    material_id: material._id,
                    prioridad: 'Alta',
                    accion_requerida: 'Revisar'
                });
            }

            res.status(201).json({
                success: true,
                message: 'Solicitud de material enviada exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al solicitar material:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Agregar costo a solicitud (supervisor)
     */
    static async agregarCosto(req, res) {
        try {
            const { id, materialId } = req.params;
            const { costo } = req.body;
            const usuario = req.user;

            // Verificar que el material existe
            const material = await Material.findById(materialId);
            if (!material) {
                return res.status(404).json({
                    success: false,
                    message: 'Material no encontrado'
                });
            }

            // Verificar que el material pertenece al proyecto
            if (material.proyecto_id.toString() !== id) {
                return res.status(400).json({
                    success: false,
                    message: 'El material no pertenece a este proyecto'
                });
            }

            // Actualizar material con costo y cambiar estatus
            material.costo = costo;
            material.estatus = 'Aprobacion administrativa';
            material.supervisor_aprobacion = usuario._id;
            material.fecha_aprobacion_supervisor = new Date();

            await material.save();

            // Crear notificación para administradores
            await RemodelacionController.crearNotificacion({
                usuario_destino: null, // Se enviará a todos los administradores
                titulo: 'Solicitud de Material Pendiente de Aprobación',
                mensaje: `El supervisor ha agregado un costo de $${costo} para ${material.tipo} en el proyecto ${id}`,
                tipo: 'Aprobacion',
                proyecto_id: id,
                material_id: material._id,
                prioridad: 'Alta',
                accion_requerida: 'Aprobar'
            });

            res.json({
                success: true,
                message: 'Costo agregado exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al agregar costo:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Aprobar solicitud de material (administrador)
     */
    static async aprobarSolicitud(req, res) {
        try {
            const { id, materialId } = req.params;
            const usuario = req.user;

            // Verificar que el material existe
            const material = await Material.findById(materialId);
            if (!material) {
                return res.status(404).json({
                    success: false,
                    message: 'Material no encontrado'
                });
            }

            // Actualizar estatus del material
            material.estatus = 'Aprobado para su compra';
            material.administrador_aprobacion = usuario._id;
            material.fecha_aprobacion_admin = new Date();

            await material.save();

            // Crear notificación para supervisores
            if (material.supervisor_aprobacion) {
                await RemodelacionController.crearNotificacion({
                    usuario_destino: material.supervisor_aprobacion,
                    titulo: 'Solicitud de Material Aprobada',
                    mensaje: `La solicitud de ${material.tipo} ha sido aprobada para su compra`,
                    tipo: 'Aprobacion',
                    proyecto_id: id,
                    material_id: material._id,
                    prioridad: 'Media',
                    accion_requerida: 'Comprar'
                });
            }

            res.json({
                success: true,
                message: 'Solicitud aprobada exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al aprobar solicitud:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Registrar compra de material (supervisor)
     */
    static async registrarCompra(req, res) {
        try {
            const { id, materialId } = req.params;
            const { numero_folio, foto_comprobante, notas } = req.body;
            const usuario = req.user;

            // Verificar que el material existe
            const material = await Material.findById(materialId);
            if (!material) {
                return res.status(404).json({
                    success: false,
                    message: 'Material no encontrado'
                });
            }

            // Actualizar material con información de compra
            material.numero_folio = numero_folio;
            material.foto_comprobante = foto_comprobante;
            material.estatus = 'En proceso de entrega';
            material.fecha_compra = new Date();
            material.notas = notas;

            await material.save();

            // Crear notificación para contratista
            await RemodelacionController.crearNotificacion({
                usuario_destino: material.usuario_registro,
                titulo: 'Material Comprado y Listo para Entrega',
                mensaje: `El material ${material.tipo} ha sido comprado y está listo para entrega`,
                tipo: 'Entrega',
                proyecto_id: id,
                material_id: material._id,
                prioridad: 'Media',
                accion_requerida: 'Entregar'
            });

            res.json({
                success: true,
                message: 'Compra registrada exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al registrar compra:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Entregar material (supervisor)
     */
    static async entregarMaterial(req, res) {
        try {
            const { id, materialId } = req.params;
            const { cantidad_entregada, notas } = req.body;
            const usuario = req.user;

            // Verificar que el material existe
            const material = await Material.findById(materialId);
            if (!material) {
                return res.status(404).json({
                    success: false,
                    message: 'Material no encontrado'
                });
            }

            // Actualizar estatus del material
            material.estatus = 'Entregado';
            material.fecha_entrega = new Date();
            material.notas = notas;

            await material.save();

            // Crear notificación para contratista
            await RemodelacionController.crearNotificacion({
                usuario_destino: material.usuario_registro,
                titulo: 'Material Entregado',
                mensaje: `El material ${material.tipo} ha sido entregado. Por favor firma la carta de responsabilidad.`,
                tipo: 'Entrega',
                proyecto_id: id,
                material_id: material._id,
                prioridad: 'Alta',
                accion_requerida: 'Firmar'
            });

            res.json({
                success: true,
                message: 'Material entregado exitosamente',
                data: material
            });

        } catch (error) {
            console.error('Error al entregar material:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Firmar carta de responsabilidad (contratista)
     */
    static async firmarCartaResponsabilidad(req, res) {
        try {
            const id = req.proyecto_id;
            const { firma_url, pdf_url, materiales_ids } = req.body;
            const usuario = req.user;

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(id);
            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Crear o actualizar carta de responsabilidad
            let carta = await CartaResponsabilidad.findOne({
                proyecto_id: id,
                contratista: usuario._id
            });

            if (!carta) {
                carta = new CartaResponsabilidad({
                    proyecto_id: id,
                    contratista: usuario._id,
                    firma_url,
                    pdf_url,
                    estatus: 'Firmada',
                    terminos_condiciones: {
                        aceptados: true,
                        fecha_aceptacion: new Date(),
                        ip_aceptacion: req.ip
                    }
                });
            } else {
                carta.firma_url = firma_url;
                carta.pdf_url = pdf_url;
                carta.estatus = 'Firmada';
                carta.terminos_condiciones = {
                    aceptados: true,
                    fecha_aceptacion: new Date(),
                    ip_aceptacion: req.ip
                };
            }

            // Agregar materiales entregados
            if (materiales_ids && materiales_ids.length > 0) {
                const materiales = await Material.find({
                    _id: { $in: materiales_ids },
                    proyecto_id: id,
                    estatus: 'Entregado'
                });

                carta.materiales_entregados = materiales.map(material => ({
                    material: material._id,
                    fecha_entrega: material.fecha_entrega,
                    cantidad_recibida: material.cantidad,
                    estatus: 'Recibido'
                }));
            }

            await carta.save();

            // Actualizar proyecto con la carta
            await CaptacionInmobiliaria.findByIdAndUpdate(
                id,
                { 'remodelacion.carta_responsabilidad': carta._id }
            );

            // Crear notificación para supervisores
            if (proyecto.remodelacion?.supervisor) {
                await RemodelacionController.crearNotificacion({
                    usuario_destino: proyecto.remodelacion.supervisor,
                    titulo: 'Carta de Responsabilidad Firmada',
                    mensaje: `El contratista ha firmado la carta de responsabilidad para el proyecto ${proyecto.propiedad?.titulo || 'Sin título'}`,
                    tipo: 'General',
                    proyecto_id: id,
                    prioridad: 'Media'
                });
            }

            res.json({
                success: true,
                message: 'Carta de responsabilidad firmada exitosamente',
                data: carta
            });

        } catch (error) {
            console.error('Error al firmar carta de responsabilidad:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener reportes de gastos
     */
    static async obtenerReportes(req, res) {
        try {
            const id = req.proyecto_id;
            const { fecha_inicio, fecha_fin } = req.query;

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(id);
            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Construir filtros de fecha
            const filtros = { proyecto_id: id };
            if (fecha_inicio && fecha_fin) {
                filtros.fecha_registro = {
                    $gte: new Date(fecha_inicio),
                    $lte: new Date(fecha_fin)
                };
            }

            // Obtener materiales del proyecto
            const materiales = await Material.find(filtros);

            // Calcular estadísticas
            const estadisticas = await this.calcularEstadisticas(id, fecha_inicio, fecha_fin);

            res.json({
                success: true,
                message: 'Reporte generado exitosamente',
                data: {
                    proyecto: {
                        id: proyecto._id,
                        titulo: proyecto.propiedad?.titulo || 'Sin título',
                        presupuesto_estimado: proyecto.remodelacion?.presupuesto_estimado || 0
                    },
                    materiales,
                    estadisticas
                }
            });

        } catch (error) {
            console.error('Error al generar reporte:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Métodos auxiliares privados
     */

    /**
     * Verificar acceso al proyecto según rol del usuario
     */
    static verificarAccesoProyecto(usuario, proyecto) {
        // Administradores tienen acceso total
        if (['administrator', 'administrador', 'ayudante de administrador'].includes(usuario.role)) {
            return true;
        }

        // Supervisores tienen acceso si son supervisores del proyecto
        if (usuario.role === 'supervisor') {
            return proyecto.remodelacion?.supervisor?.toString() === usuario._id.toString();
        }

        // Contratistas solo pueden ver proyectos donde están asignados
        if (usuario.role === 'contratista') {
            return proyecto.remodelacion?.contratista?.toString() === usuario._id.toString();
        }

        return false;
    }

    /**
     * Crear notificación
     */
    static async crearNotificacion(datos, wsManager = null) {
        try {
            // Si no hay usuario destino específico, enviar a todos los administradores
            if (!datos.usuario_destino) {
                const administradores = await User.find({
                    role: { $in: ['administrator', 'administrador'] }
                });

                for (const admin of administradores) {
                    const notificacion = new Notificacion({
                        ...datos,
                        usuario_destino: admin._id
                    });
                    await notificacion.save();
                    
                    // Enviar notificación por WebSocket
                    if (wsManager) {
                        wsManager.sendNotificationToUser(admin._id.toString(), {
                            type: 'remodelacion_notification',
                            notification: notificacion.toObject(),
                            timestamp: new Date().toISOString()
                        });
                    }
                }
            } else {
                const notificacion = new Notificacion(datos);
                await notificacion.save();
                
                // Enviar notificación por WebSocket
                if (wsManager) {
                    wsManager.sendNotificationToUser(datos.usuario_destino.toString(), {
                        type: 'remodelacion_notification',
                        notification: notificacion.toObject(),
                        timestamp: new Date().toISOString()
                    });
                }
            }
        } catch (error) {
            console.error('Error al crear notificación:', error);
        }
    }

    /**
     * Calcular estadísticas del proyecto
     */
    static async calcularEstadisticas(proyectoId, fechaInicio = null, fechaFin = null) {
        try {
            const filtros = { proyecto_id: proyectoId };
            if (fechaInicio && fechaFin) {
                filtros.fecha_registro = {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin)
                };
            }

            const materiales = await Material.find(filtros);

            const gastosAdministrativos = materiales
                .filter(m => m.tipo_gasto === 'Administrativo')
                .reduce((total, m) => total + (m.costo || 0), 0);

            const gastosMateriales = materiales
                .filter(m => m.tipo_gasto === 'Solicitud_Contratista')
                .reduce((total, m) => total + (m.costo || 0), 0);

            const totalGastos = gastosAdministrativos + gastosMateriales;

            return {
                total_materiales: materiales.length,
                gastos_administrativos: gastosAdministrativos,
                gastos_materiales: gastosMateriales,
                total_gastos: totalGastos,
                materiales_por_estatus: {
                    solicitando: materiales.filter(m => m.estatus === 'Solicitando material').length,
                    aprobacion: materiales.filter(m => m.estatus === 'Aprobacion administrativa').length,
                    aprobado: materiales.filter(m => m.estatus === 'Aprobado para su compra').length,
                    proceso: materiales.filter(m => m.estatus === 'En proceso de entrega').length,
                    entregado: materiales.filter(m => m.estatus === 'Entregado').length
                }
            };
        } catch (error) {
            console.error('Error al calcular estadísticas:', error);
            return {};
        }
    }
}

module.exports = RemodelacionController;
