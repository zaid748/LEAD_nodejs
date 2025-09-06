const ListaCompra = require('../models/lista-compra');
const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');
const Notificacion = require('../models/notificacion');
const User = require('../models/user');

/**
 * Controlador para gestión de listas de compra
 */
class ListaCompraController {
    
    /**
     * Crear una nueva lista de compra (contratista)
     */
    static async crearListaCompra(req, res) {
        try {
            const { proyecto_id, titulo, descripcion, materiales, notas_generales } = req.body;
            const usuario = req.user;

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(proyecto_id);
            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Verificar que el usuario es contratista asignado al proyecto
            if (proyecto.remodelacion?.contratista?.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para crear listas de compra en este proyecto'
                });
            }

            // Validar que hay al menos un material
            if (!materiales || materiales.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Debe incluir al menos un material en la lista'
                });
            }

            // Crear la lista de compra
            const listaCompra = new ListaCompra({
                proyecto_id,
                contratista_id: usuario._id,
                supervisor_id: proyecto.remodelacion?.supervisor,
                titulo: titulo || 'Lista de Compra',
                descripcion,
                materiales,
                notas_generales,
                estatus_general: 'Borrador'
            });

            await listaCompra.save();

            res.status(201).json({
                success: true,
                message: 'Lista de compra creada exitosamente',
                data: listaCompra
            });

        } catch (error) {
            console.error('Error al crear lista de compra:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Enviar lista de compra al supervisor
     */
    static async enviarListaCompra(req, res) {
        try {
            const { listaId } = req.params;
            const usuario = req.user;

            const listaCompra = await ListaCompra.findById(listaId)
                .populate('proyecto_id', 'propiedad')
                .populate('supervisor_id', 'prim_nom apell_pa email');

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar permisos
            if (listaCompra.contratista_id.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para enviar esta lista'
                });
            }

            // Actualizar estatus
            listaCompra.estatus_general = 'Enviada';
            listaCompra.fecha_envio = new Date();
            await listaCompra.save();

            // Crear notificación para el supervisor
            if (listaCompra.supervisor_id) {
                await this.crearNotificacion({
                    usuario_destino: listaCompra.supervisor_id._id,
                    titulo: 'Nueva Lista de Compra Recibida',
                    mensaje: `El contratista ha enviado una lista de compra con ${listaCompra.materiales.length} materiales para el proyecto ${listaCompra.proyecto_id.propiedad?.tipo || 'Sin título'}`,
                    tipo: 'Lista_Compra',
                    proyecto_id: listaCompra.proyecto_id._id,
                    lista_compra_id: listaCompra._id,
                    prioridad: 'Alta',
                    accion_requerida: 'Revisar'
                });
            }

            res.json({
                success: true,
                message: 'Lista de compra enviada exitosamente',
                data: listaCompra
            });

        } catch (error) {
            console.error('Error al enviar lista de compra:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener listas de compra del proyecto
     */
    static async obtenerListasCompra(req, res) {
        try {
            const { proyecto_id } = req.params;
            const usuario = req.user;

            // Verificar que el proyecto existe
            const proyecto = await CaptacionInmobiliaria.findById(proyecto_id);
            if (!proyecto) {
                return res.status(404).json({
                    success: false,
                    message: 'Proyecto no encontrado'
                });
            }

            // Verificar permisos según rol
            let filtro = { proyecto_id };
            
            if (usuario.role === 'contratista') {
                // Contratistas solo ven sus propias listas
                filtro.contratista_id = usuario._id;
            } else if (usuario.role === 'supervisor') {
                // Supervisores ven listas de sus proyectos
                if (proyecto.remodelacion?.supervisor?.toString() !== usuario._id.toString()) {
                    return res.status(403).json({
                        success: false,
                        message: 'No tienes acceso a este proyecto'
                    });
                }
            }
            // Administradores ven todas las listas

            const listasCompra = await ListaCompra.find(filtro)
                .populate('contratista_id', 'prim_nom apell_pa email')
                .populate('supervisor_id', 'prim_nom apell_pa email')
                .sort({ fecha_creacion: -1 });

            res.json({
                success: true,
                message: 'Listas de compra obtenidas exitosamente',
                data: listasCompra
            });

        } catch (error) {
            console.error('Error al obtener listas de compra:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener detalles de una lista de compra específica
     */
    static async obtenerListaCompra(req, res) {
        try {
            const { listaId } = req.params;
            const usuario = req.user;

            const listaCompra = await ListaCompra.findById(listaId)
                .populate('proyecto_id', 'propiedad propietario')
                .populate('contratista_id', 'prim_nom apell_pa email')
                .populate('supervisor_id', 'prim_nom apell_pa email')
                .populate('supervisor_revision.usuario', 'prim_nom apell_pa')
                .populate('administrador_aprobacion.usuario', 'prim_nom apell_pa');

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar permisos
            const puedeVer = this.verificarAccesoLista(usuario, listaCompra);
            if (!puedeVer) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para ver esta lista'
                });
            }

            res.json({
                success: true,
                message: 'Lista de compra obtenida exitosamente',
                data: listaCompra
            });

        } catch (error) {
            console.error('Error al obtener lista de compra:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Actualizar lista de compra (solo si está en borrador)
     */
    static async actualizarListaCompra(req, res) {
        try {
            const { listaId } = req.params;
            const { titulo, descripcion, materiales, notas_generales } = req.body;
            const usuario = req.user;

            const listaCompra = await ListaCompra.findById(listaId);

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar permisos
            if (listaCompra.contratista_id.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para editar esta lista'
                });
            }

            // Solo se puede editar si está en borrador
            if (listaCompra.estatus_general !== 'Borrador') {
                return res.status(400).json({
                    success: false,
                    message: 'Solo se pueden editar listas en estado borrador'
                });
            }

            // Actualizar campos
            if (titulo) listaCompra.titulo = titulo;
            if (descripcion !== undefined) listaCompra.descripcion = descripcion;
            if (materiales) listaCompra.materiales = materiales;
            if (notas_generales !== undefined) listaCompra.notas_generales = notas_generales;

            await listaCompra.save();

            res.json({
                success: true,
                message: 'Lista de compra actualizada exitosamente',
                data: listaCompra
            });

        } catch (error) {
            console.error('Error al actualizar lista de compra:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Ingresar costos de materiales (supervisor)
     */
    static async ingresarCostosMateriales(req, res) {
        try {
            const { listaId } = req.params;
            const { materiales_costos } = req.body;
            const usuario = req.user;

            const listaCompra = await ListaCompra.findById(listaId)
                .populate('proyecto_id', 'propiedad')
                .populate('contratista_id', 'prim_nom apell_pa email');

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar que el usuario es supervisor del proyecto
            if (listaCompra.supervisor_id?.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para ingresar costos en esta lista'
                });
            }

            // Verificar que la lista esté en estado "Enviada" o "En revisión"
            if (!['Enviada', 'En revisión'].includes(listaCompra.estatus_general)) {
                return res.status(400).json({
                    success: false,
                    message: 'Solo se pueden ingresar costos en listas enviadas o en revisión'
                });
            }

            // Validar que se proporcionen costos para todos los materiales
            if (!materiales_costos || materiales_costos.length !== listaCompra.materiales.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Debe proporcionar costos para todos los materiales de la lista'
                });
            }

            // Actualizar costos de materiales
            let totalFinal = 0;
            listaCompra.materiales = listaCompra.materiales.map((material, index) => {
                const costoInfo = materiales_costos[index];
                if (costoInfo && typeof costoInfo.costo_final === 'number' && costoInfo.costo_final >= 0) {
                    material.costo_final = costoInfo.costo_final;
                    material.notas_supervisor = costoInfo.notas || '';
                    totalFinal += costoInfo.costo_final;
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Costo inválido para el material ${index + 1}: ${material.tipo}`
                    });
                }
                return material;
            });

            // Actualizar total final y estatus
            listaCompra.total_final = totalFinal;
            listaCompra.estatus_general = 'En revisión';
            listaCompra.supervisor_revision = {
                usuario: usuario._id,
                fecha: new Date(),
                comentarios: 'Costos ingresados por supervisor'
            };

            await listaCompra.save();

            res.json({
                success: true,
                message: 'Costos ingresados exitosamente',
                data: {
                    lista: listaCompra,
                    total_final: totalFinal,
                    materiales_actualizados: listaCompra.materiales.length
                }
            });

        } catch (error) {
            console.error('Error al ingresar costos de materiales:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Revisar lista de compra (supervisor)
     */
    static async revisarListaCompra(req, res) {
        try {
            const { listaId } = req.params;
            const { accion, comentarios, materiales_revision } = req.body;
            const usuario = req.user;

            const listaCompra = await ListaCompra.findById(listaId)
                .populate('proyecto_id', 'propiedad')
                .populate('contratista_id', 'prim_nom apell_pa email');

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar que el usuario es supervisor del proyecto
            if (listaCompra.supervisor_id?.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para revisar esta lista'
                });
            }

            // Actualizar estatus según la acción
            if (accion === 'aprobar') {
                listaCompra.estatus_general = 'Aprobada';
                listaCompra.fecha_aprobacion = new Date();
                
                // Actualizar materiales individuales si se proporcionan
                if (materiales_revision) {
                    listaCompra.materiales = listaCompra.materiales.map(material => {
                        const revision = materiales_revision.find(r => r.index === listaCompra.materiales.indexOf(material));
                        if (revision) {
                            material.costo_final = revision.costo_final || material.costo_estimado;
                            material.estatus = 'Aprobado';
                            material.notas_supervisor = revision.notas;
                        }
                        return material;
                    });
                }

                // Crear notificación para administradores
                await this.crearNotificacion({
                    usuario_destino: null, // Se enviará a todos los administradores
                    titulo: 'Lista de Compra Aprobada por Supervisor',
                    mensaje: `El supervisor ha aprobado una lista de compra con ${listaCompra.materiales.length} materiales para el proyecto ${listaCompra.proyecto_id.propiedad?.tipo || 'Sin título'}`,
                    tipo: 'Aprobacion',
                    proyecto_id: listaCompra.proyecto_id._id,
                    lista_compra_id: listaCompra._id,
                    prioridad: 'Alta',
                    accion_requerida: 'Autorizar compra'
                });

            } else if (accion === 'rechazar') {
                listaCompra.estatus_general = 'Rechazada';
                listaCompra.fecha_rechazo = new Date();

                // Crear notificación para el contratista
                await this.crearNotificacion({
                    usuario_destino: listaCompra.contratista_id._id,
                    titulo: 'Lista de Compra Rechazada',
                    mensaje: `Tu lista de compra ha sido rechazada por el supervisor. Comentarios: ${comentarios || 'Sin comentarios'}`,
                    tipo: 'Rechazo',
                    proyecto_id: listaCompra.proyecto_id._id,
                    lista_compra_id: listaCompra._id,
                    prioridad: 'Media',
                    accion_requerida: 'Revisar'
                });
            }

            // Actualizar información de revisión
            listaCompra.supervisor_revision = {
                usuario: usuario._id,
                fecha: new Date(),
                comentarios
            };

            await listaCompra.save();

            res.json({
                success: true,
                message: `Lista de compra ${accion === 'aprobar' ? 'aprobada' : 'rechazada'} exitosamente`,
                data: listaCompra
            });

        } catch (error) {
            console.error('Error al revisar lista de compra:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Eliminar lista de compra (solo si está en borrador)
     */
    static async eliminarListaCompra(req, res) {
        try {
            const { listaId } = req.params;
            const usuario = req.user;

            const listaCompra = await ListaCompra.findById(listaId);

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar permisos
            if (listaCompra.contratista_id.toString() !== usuario._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'No tienes permisos para eliminar esta lista'
                });
            }

            // Solo se puede eliminar si está en borrador
            if (listaCompra.estatus_general !== 'Borrador') {
                return res.status(400).json({
                    success: false,
                    message: 'Solo se pueden eliminar listas en estado borrador'
                });
            }

            await ListaCompra.findByIdAndDelete(listaId);

            res.json({
                success: true,
                message: 'Lista de compra eliminada exitosamente'
            });

        } catch (error) {
            console.error('Error al eliminar lista de compra:', error);
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
     * Verificar acceso a la lista según rol del usuario
     */
    static verificarAccesoLista(usuario, listaCompra) {
        // Administradores tienen acceso total
        if (['administrator', 'administrador', 'ayudante de administrador'].includes(usuario.role)) {
            return true;
        }

        // Supervisores tienen acceso si son supervisores del proyecto
        if (usuario.role === 'supervisor') {
            return listaCompra.supervisor_id?.toString() === usuario._id.toString();
        }

        // Contratistas solo pueden ver sus propias listas
        if (usuario.role === 'contratista') {
            return listaCompra.contratista_id.toString() === usuario._id.toString();
        }

        return false;
    }

    /**
     * Crear notificación
     */
    static async crearNotificacion(datos) {
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
                }
            } else {
                const notificacion = new Notificacion(datos);
                await notificacion.save();
            }
        } catch (error) {
            console.error('Error al crear notificación:', error);
        }
    }

    /**
     * ADMINISTRACIÓN - Obtener listas de compra pendientes de aprobación administrativa
     */
    static async obtenerListasPendientesAdmin(req, res) {
        try {
            const usuario = req.user;

            // Verificar que el usuario es administrador
            if (!['administrator', 'administrador', 'ayudante de administrador'].includes(usuario.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Acceso denegado. Solo administradores pueden acceder a esta función'
                });
            }

            // Obtener listas aprobadas por supervisores que están pendientes de aprobación administrativa
            const listasCompra = await ListaCompra.find({
                estatus_general: 'Aprobada'
            })
            .populate('proyecto_id', 'propiedad')
            .populate('contratista_id', 'prim_nom apell_pa email')
            .populate('supervisor_id', 'prim_nom apell_pa email')
            .sort({ fecha_creacion: -1 });

            res.json({
                success: true,
                message: 'Listas de compra pendientes obtenidas exitosamente',
                data: listasCompra
            });

        } catch (error) {
            console.error('Error al obtener listas pendientes de administración:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * ADMINISTRACIÓN - Obtener listas de compra para aprobación administrativa y ya procesadas
     */
    static async obtenerTodasListasAdmin(req, res) {
        try {
            const usuario = req.user;

            // Verificar que el usuario es administrador
            if (!['administrator', 'administrador', 'ayudante de administrador'].includes(usuario.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Acceso denegado. Solo administradores pueden acceder a esta función'
                });
            }

            // Obtener solo listas que están pendientes de aprobación administrativa o ya han pasado por administración
            const listasCompra = await ListaCompra.find({
                estatus_general: { $in: ['Aprobada', 'En compra', 'Completada', 'Rechazada'] }
            })
            .populate('proyecto_id', 'propiedad')
            .populate('contratista_id', 'prim_nom apell_pa email')
            .populate('supervisor_id', 'prim_nom apell_pa email')
            .sort({ fecha_creacion: -1 });

            res.json({
                success: true,
                message: 'Listas de compra para administración obtenidas exitosamente',
                data: listasCompra
            });

        } catch (error) {
            console.error('Error al obtener listas de compra para administración:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * ADMINISTRACIÓN - Aprobar lista de compra
     */
    static async aprobarListaCompraAdmin(req, res) {
        try {
            const { listaId } = req.params;
            const { comentarios } = req.body;
            const usuario = req.user;

            // Verificar que el usuario es administrador
            if (!['administrator', 'administrador', 'ayudante de administrador'].includes(usuario.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Acceso denegado. Solo administradores pueden aprobar listas de compra'
                });
            }

            const listaCompra = await ListaCompra.findById(listaId)
                .populate('proyecto_id', 'propiedad')
                .populate('contratista_id', 'prim_nom apell_pa email')
                .populate('supervisor_id', 'prim_nom apell_pa email');

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar que la lista está aprobada por supervisor
            if (listaCompra.estatus_general !== 'Aprobada') {
                return res.status(400).json({
                    success: false,
                    message: 'Solo se pueden aprobar listas que hayan sido aprobadas por supervisores'
                });
            }

            // Actualizar estatus a "En compra"
            listaCompra.estatus_general = 'En compra';
            listaCompra.fecha_aprobacion_admin = new Date();
            listaCompra.comentarios_admin = comentarios || 'Lista de compra aprobada por administración';
            await listaCompra.save();

            // Crear notificación para el contratista
            await ListaCompraController.crearNotificacion({
                titulo: 'Lista de Compra Aprobada',
                mensaje: `Tu lista de compra "${listaCompra.titulo}" ha sido aprobada por administración y está lista para compra.`,
                tipo: 'lista_compra_aprobada',
                usuario_destino: listaCompra.contratista_id,
                datos_adicionales: {
                    lista_compra_id: listaCompra._id,
                    proyecto_id: listaCompra.proyecto_id._id
                }
            });

            res.json({
                success: true,
                message: 'Lista de compra aprobada exitosamente por administración',
                data: listaCompra
            });

        } catch (error) {
            console.error('Error al aprobar lista de compra por administración:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * ADMINISTRACIÓN - Rechazar lista de compra
     */
    static async rechazarListaCompraAdmin(req, res) {
        try {
            const { listaId } = req.params;
            const { motivo_rechazo, comentarios } = req.body;
            const usuario = req.user;

            // Verificar que el usuario es administrador
            if (!['administrator', 'administrador', 'ayudante de administrador'].includes(usuario.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Acceso denegado. Solo administradores pueden rechazar listas de compra'
                });
            }

            const listaCompra = await ListaCompra.findById(listaId)
                .populate('proyecto_id', 'propiedad')
                .populate('contratista_id', 'prim_nom apell_pa email')
                .populate('supervisor_id', 'prim_nom apell_pa email');

            if (!listaCompra) {
                return res.status(404).json({
                    success: false,
                    message: 'Lista de compra no encontrada'
                });
            }

            // Verificar que la lista está aprobada por supervisor
            if (listaCompra.estatus_general !== 'Aprobada') {
                return res.status(400).json({
                    success: false,
                    message: 'Solo se pueden rechazar listas que hayan sido aprobadas por supervisores'
                });
            }

            // Actualizar estatus a "Rechazada"
            listaCompra.estatus_general = 'Rechazada';
            listaCompra.fecha_rechazo_admin = new Date();
            listaCompra.motivo_rechazo_admin = motivo_rechazo;
            listaCompra.comentarios_admin = comentarios || `Lista de compra rechazada por administración - Motivo: ${motivo_rechazo}`;
            await listaCompra.save();

            // Crear notificación para el contratista
            await ListaCompraController.crearNotificacion({
                titulo: 'Lista de Compra Rechazada',
                mensaje: `Tu lista de compra "${listaCompra.titulo}" ha sido rechazada por administración. Motivo: ${motivo_rechazo}`,
                tipo: 'lista_compra_rechazada',
                usuario_destino: listaCompra.contratista_id,
                datos_adicionales: {
                    lista_compra_id: listaCompra._id,
                    proyecto_id: listaCompra.proyecto_id._id,
                    motivo_rechazo: motivo_rechazo
                }
            });

            // Crear notificación para el supervisor
            await ListaCompraController.crearNotificacion({
                titulo: 'Lista de Compra Rechazada por Administración',
                mensaje: `La lista de compra "${listaCompra.titulo}" ha sido rechazada por administración. Motivo: ${motivo_rechazo}`,
                tipo: 'lista_compra_rechazada_admin',
                usuario_destino: listaCompra.supervisor_id,
                datos_adicionales: {
                    lista_compra_id: listaCompra._id,
                    proyecto_id: listaCompra.proyecto_id._id,
                    motivo_rechazo: motivo_rechazo
                }
            });

            res.json({
                success: true,
                message: 'Lista de compra rechazada exitosamente por administración',
                data: listaCompra
            });

        } catch (error) {
            console.error('Error al rechazar lista de compra por administración:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}

module.exports = ListaCompraController;
