const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');
const { uploadImageToS3, deleteImageFromS3 } = require('../libs/multerImagenes');
const { resizeImage, validateImage, getImageMetadata } = require('../libs/imageProcessor');

// ===== CONTROLADOR DE MARKETING INMOBILIARIO =====

/**
 * Obtener todos los proyectos de marketing (captaciones disponibles para venta)
 */
exports.getProyectosMarketing = async (req, res) => {
    try {
        
        const { page = 1, limit = 10, sort = '-createdAt', search = '', supervisor } = req.query;
        
        // Construir filtro base - incluir proyectos en Remodelacion y Disponible para venta
        let filtro = {
            $or: [
                { 'venta.estatus_venta': 'Disponible para venta' },
                { estatus_actual: 'En venta' },
                { estatus_actual: 'Disponible para venta' },
                { estatus_actual: 'Remodelacion' }
            ]
        };

        // Agregar filtro de supervisor si es necesario
        if (supervisor) {
            filtro['captacion.asesor'] = supervisor;
        }

        // Agregar búsqueda si se proporciona
        if (search) {
            filtro.$or.push(
                { 'propiedad.direccion.completa': { $regex: search, $options: 'i' } },
                { 'propietario.nombre': { $regex: search, $options: 'i' } },
                { 'propiedad.tipo': { $regex: search, $options: 'i' } }
            );
        }


        // Calcular skip para paginación
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Ejecutar consulta con populate
        const captaciones = await CaptacionInmobiliaria.find(filtro)
            .populate('captacion.asesor', 'prim_nom segun_nom apell_pa apell_ma')
            .populate('propietario', 'nombre telefono email')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();


        // Contar total de documentos
        const total = await CaptacionInmobiliaria.countDocuments(filtro);

        // Calcular paginación
        const paginas = Math.ceil(total / parseInt(limit));

        // Procesar datos para el frontend
        const proyectosMarketing = captaciones.map(captacion => ({
            id: captacion._id,
            direccion: captacion.propiedad?.direccion?.completa || 'Sin dirección',
            tipo: captacion.propiedad?.tipo || 'Sin especificar',
            precio: captacion.venta?.monto_venta || captacion.propiedad?.precio || 'Consultar',
            estatus: captacion.venta?.estatus_venta || captacion.estatus_actual || 'Sin estatus',
            asesor: captacion.captacion?.asesor ? 
                `${captacion.captacion.asesor.prim_nom} ${captacion.captacion.asesor.apell_pa}` : 
                'Sin asesor',
            propietario: captacion.propietario?.nombre || 'Sin especificar',
            telefono: captacion.propietario?.telefono || 'Sin teléfono',
            // Datos de marketing desde la nueva sección
            imagenesMarketing: captacion.marketing?.imagenes || [],
            tituloMarketing: captacion.marketing?.titulo || '',
            descripcionMarketing: captacion.marketing?.descripcion || '',
            precioOferta: captacion.marketing?.precioOferta || '',
            estatusMarketing: captacion.estatus_actual || 'Inactivo',
            estatusPublicacion: captacion.marketing?.estatus_publicacion || 'No publicada',
            fechaCreacion: captacion.createdAt,
            fechaActualizacion: captacion.updatedAt,
            fechaMarketing: captacion.marketing?.fecha_creacion || null
        }));


        res.json({
            success: true,
            message: 'Proyectos de marketing obtenidos correctamente',
            proyectos: proyectosMarketing,
            paginacion: {
                pagina: parseInt(page),
                limite: parseInt(limit),
                total,
                paginas
            }
        });

    } catch (error) {
        console.error('Error al obtener proyectos de marketing:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Obtener un proyecto específico de marketing
 */
exports.getProyectoMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        
        const captacion = await CaptacionInmobiliaria.findById(id)
            .populate('captacion.asesor', 'prim_nom segun_nom apell_pa apell_ma')
            .populate('propietario', 'nombre telefono email');

        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Verificar que el proyecto esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';

        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: 'Este proyecto no está disponible para marketing'
            });
        }

        res.json({
            success: true,
            message: 'Proyecto de marketing obtenido correctamente',
            proyecto: captacion
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
 * Actualizar información de marketing de un proyecto
 */
exports.actualizarMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        const { tituloMarketing, descripcionMarketing, precioOferta, estatusPublicacion } = req.body;

        // Validar datos de entrada
        if (!tituloMarketing || !descripcionMarketing) {
            return res.status(400).json({
                success: false,
                message: 'Título y descripción son obligatorios'
            });
        }

        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Verificar que el proyecto esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';

        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: 'Este proyecto no está disponible para marketing'
            });
        }

        // Actualizar la sección de marketing usando findByIdAndUpdate
        const captacionActualizada = await CaptacionInmobiliaria.findByIdAndUpdate(
            id,
            {
                $set: {
                    'marketing.titulo': tituloMarketing,
                    'marketing.descripcion': descripcionMarketing,
                    'marketing.precioOferta': precioOferta || '',
                    'marketing.estatus_publicacion': estatusPublicacion || 'No publicada',
                    'marketing.fecha_actualizacion': new Date(),
                    'marketing.usuario_ultima_modificacion': req.user?._id
                },
                $setOnInsert: {
                    'marketing.fecha_creacion': new Date(),
                    'marketing.usuario_creador': req.user?._id
                    // Removido estatus_publicacion de aquí para evitar conflicto
                },
                $push: {
                    historial_estatus: {
                        estatus: 'Marketing actualizado',
                        fecha: new Date(),
                        notas: `Se actualizó la información de marketing: ${tituloMarketing}. Estatus de publicación: ${estatusPublicacion || 'No publicada'}`,
                        usuario: req.user?._id
                    }
                }
            },
            { 
                new: true, 
                runValidators: false, // No ejecutar validaciones para campos no modificados
                upsert: false // No crear si no existe
            }
        );

        res.json({
            success: true,
            message: 'Marketing actualizado correctamente',
            proyecto: captacionActualizada
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
 * Subir imágenes de marketing
 */
exports.uploadImagenesMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('=== DEBUG: uploadImagenesMarketing ===');
        console.log('ID de captación:', id);
        
        // Verificar que la captación existe
        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Verificar que el proyecto esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';

        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: 'Este proyecto no está disponible para marketing'
            });
        }

        // Verificar que hay archivos en la request
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No se han enviado archivos'
            });
        }

        

        // Procesar cada imagen y subir a S3
        const imagenesProcesadas = [];
        
        for (let index = 0; index < req.files.length; index++) {
            const file = req.files[index];
            

            try {
                // Validar imagen antes de procesar
                const validation = validateImage(file);
                if (!validation.isValid) {
                    throw new Error(`Imagen no válida: ${validation.errors.join(', ')}`);
                }

                // Obtener metadatos de la imagen original
                const metadata = await getImageMetadata(file.buffer);
                

                // Redimensionar imagen al tamaño estándar para tarjetas (800x600)
                
                const resizedImageBuffer = await resizeImage(file.buffer, 'CARD');
                
                

                // Subir imagen redimensionada a S3
                const imageData = await uploadImageToS3(
                    resizedImageBuffer,
                    file.originalname,
                    id
                );

                // Agregar información adicional incluyendo metadatos
                const imagenProcesada = {
                    ...imageData,
                    orden: (captacion.marketing?.imagenes?.length || 0) + index,
                    s3Key: imageData.key, // Guardar la ruta completa de S3 para eliminación
                    metadatos: {
                        original: {
                            width: metadata.width,
                            height: metadata.height,
                            size: metadata.size,
                            format: metadata.format
                        },
                        procesada: {
                            width: 800,
                            height: 600,
                            size: resizedImageBuffer.length,
                            format: 'jpeg'
                        }
                    }
                };

                imagenesProcesadas.push(imagenProcesada);
                

            } catch (error) {
                console.error(`❌ Error al procesar imagen ${index + 1}:`, error);
                throw new Error(`Error al procesar imagen ${file.originalname}: ${error.message}`);
            }
        }

        console.log('Imágenes procesadas:', imagenesProcesadas);

        console.log('=== DEBUG: Actualizando captación ===');
        console.log('ID de captación:', id);
        console.log('Imágenes a agregar:', imagenesProcesadas);
        console.log('Usuario:', req.user?._id);

        // Actualizar la captación con las nuevas imágenes
        const captacionActualizada = await CaptacionInmobiliaria.findByIdAndUpdate(
            id,
            {
                $push: {
                    'marketing.imagenes': { $each: imagenesProcesadas }
                },
                $set: {
                    'marketing.fecha_actualizacion': new Date(),
                    'marketing.usuario_ultima_modificacion': req.user?._id
                },
                $setOnInsert: {
                    'marketing.fecha_creacion': new Date(),
                    'marketing.usuario_creador': req.user?._id,
                    'marketing.estatus_publicacion': 'No publicada'
                    // estatus eliminado - se usa estatus_actual del documento principal
                }
            },
            { 
                new: true, 
                runValidators: false,
                upsert: false
            }
        );

        console.log('=== DEBUG: Captación actualizada ===');
        console.log('Captación actualizada:', captacionActualizada);
        console.log('Imágenes en marketing:', captacionActualizada?.marketing?.imagenes);

        res.status(201).json({
            success: true,
            message: `${imagenesProcesadas.length} imagen(es) subida(s) correctamente`,
            imagenes: imagenesProcesadas,
            captacionId: id
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
 * Obtener imágenes de marketing
 */
exports.getImagenesMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        
        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        const imagenes = captacion.propiedad?.imagenesMarketing || [];

        res.json({
            success: true,
            message: 'Imágenes obtenidas correctamente',
            imagenes,
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
 * Eliminar imagen de marketing
 */
exports.deleteImagenMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageKey } = req.query;
        
        console.log('=== DEBUG: deleteImagenMarketing ===');
        console.log('ID de captación:', id);
        console.log('ImageKey recibido:', imageKey);
        console.log('Tipo de imageKey:', typeof imageKey);
        
        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Verificar que el proyecto esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';

        if (!estatusValido) {
            return res.status(400).json({
                success: false,
                message: 'Este proyecto no está disponible para marketing'
            });
        }

        // Buscar la imagen en el array de marketing
        const imagenIndex = captacion.marketing?.imagenes?.findIndex(
            img => img.key === imageKey
        );

        if (imagenIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Imagen no encontrada'
            });
        }

        const imagen = captacion.marketing.imagenes[imagenIndex];

        // Eliminar la imagen de S3 usando el s3Key
        try {
            const s3Key = imagen.s3Key || imagen.key;
            console.log('Eliminando imagen de S3 con key:', s3Key);
            await deleteImageFromS3(s3Key);
            console.log('Imagen eliminada de S3:', s3Key);
        } catch (s3Error) {
            console.error('Error al eliminar imagen de S3:', s3Error);
            // Continuar con la eliminación de la base de datos aunque falle S3
        }

        // Eliminar imagen y agregar al historial usando findByIdAndUpdate
        const captacionActualizada = await CaptacionInmobiliaria.findByIdAndUpdate(
            id,
            {
                $pull: {
                    'marketing.imagenes': { key: imageKey }
                },
                $set: {
                    'marketing.fecha_actualizacion': new Date(),
                    'marketing.usuario_ultima_modificacion': req.user?._id
                },
                $push: {
                    historial_estatus: {
                        estatus: 'Imagen de marketing eliminada',
                        fecha: new Date(),
                        notas: `Se eliminó la imagen: ${imagen.nombre}`,
                        usuario: req.user?._id
                    }
                }
            },
            { 
                new: true, 
                runValidators: false, // No ejecutar validaciones para campos no modificados
                upsert: false
            }
        );

        res.json({
            success: true,
            message: 'Imagen eliminada correctamente',
            imagenEliminada: imagen,
            proyecto: captacionActualizada
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
 * Reordenar imágenes de marketing
 */
exports.reordenarImagenesMarketing = async (req, res) => {
    try {
        const { id } = req.params;
        const { orden } = req.body; // Array de keys en el nuevo orden

        if (!Array.isArray(orden)) {
            return res.status(400).json({
                success: false,
                message: 'El orden debe ser un array'
            });
        }

        const captacion = await CaptacionInmobiliaria.findById(id);
        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Reordenar las imágenes usando findByIdAndUpdate
        const captacionActualizada = await CaptacionInmobiliaria.findByIdAndUpdate(
            id,
            {
                $set: {
                    'marketing.imagenes': orden.map((key, index) => {
                        const imagen = captacion.marketing?.imagenes?.find(img => img.key === key);
                        if (imagen) {
                            return { ...imagen.toObject(), orden: index };
                        }
                        return imagen;
                    }).filter(Boolean),
                    'marketing.fecha_actualizacion': new Date(),
                    'marketing.usuario_ultima_modificacion': req.user?._id
                }
            },
            { 
                new: true, 
                runValidators: false, // No ejecutar validaciones para campos no modificados
                upsert: false
            }
        );

        res.json({
            success: true,
            message: 'Orden de imágenes actualizado correctamente',
            imagenes: captacionActualizada.propiedad.imagenesMarketing
        });

    } catch (error) {
        console.error('Error al reordenar imágenes:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Obtener estadísticas de marketing
 */
exports.getEstadisticasMarketing = async (req, res) => {
    try {
        // Contar proyectos disponibles para marketing
        const totalDisponibles = await CaptacionInmobiliaria.countDocuments({
            $or: [
                { 'venta.estatus_venta': 'Disponible para venta' },
                { estatus_actual: 'En venta' },
                { estatus_actual: 'Disponible para venta' },
                { estatus_actual: 'Remodelacion' }
            ]
        });

        // Contar proyectos con imágenes de marketing
        const conImagenes = await CaptacionInmobiliaria.countDocuments({
            $or: [
                { 'venta.estatus_venta': 'Disponible para venta' },
                { estatus_actual: 'En venta' },
                { estatus_actual: 'Disponible para venta' },
                { estatus_actual: 'Remodelacion' }
            ],
            'marketing.imagenes.0': { $exists: true }
        });

        // Contar proyectos sin imágenes
        const sinImagenes = totalDisponibles - conImagenes;

        res.json({
            success: true,
            message: 'Estadísticas obtenidas correctamente',
            estadisticas: {
                totalDisponibles,
                conImagenes,
                sinImagenes,
                porcentajeConImagenes: totalDisponibles > 0 ? Math.round((conImagenes / totalDisponibles) * 100) : 0
            }
        });

    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Obtener un proyecto específico de marketing para vista pública (sin autenticación)
 */
exports.getProyectoMarketingPublico = async (req, res) => {
    try {
        const { id } = req.params;
        

        // Buscar la captación por ID
        const captacion = await CaptacionInmobiliaria.findById(id)
            .populate('captacion.asesor', 'prim_nom segun_nom apell_pa apell_ma email')
            .populate('propietario', 'nombre telefono correo');

        if (!captacion) {
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado'
            });
        }

        // Verificar que el proyecto esté disponible para marketing
        const estatusValido = 
            captacion.venta?.estatus_venta === 'Disponible para venta' ||
            captacion.estatus_actual === 'En venta' ||
            captacion.estatus_actual === 'Disponible para venta' ||
            captacion.estatus_actual === 'Remodelacion';

        if (!estatusValido) {
            return res.status(404).json({
                success: false,
                message: 'Este proyecto no está disponible para marketing'
            });
        }

        // Verificar que el proyecto esté publicado
        if (captacion.marketing?.estatus_publicacion !== 'Publicada') {
            return res.status(404).json({
                success: false,
                message: 'Este proyecto no está publicado'
            });
        }

        // Preparar datos para vista pública (sin información sensible)
        const proyectoPublico = {
            _id: captacion._id,
            tipo: captacion.propiedad?.tipo,
            direccion: captacion.propiedad?.direccion,
            caracteristicas: captacion.propiedad?.caracteristicas,
            marketing: {
                titulo: captacion.marketing?.titulo,
                descripcion: captacion.marketing?.descripcion,
                precioOferta: captacion.marketing?.precioOferta,
                imagenes: captacion.marketing?.imagenes || []
            },
            venta: {
                estatus_venta: captacion.venta?.estatus_venta,
                monto_venta: captacion.venta?.monto_venta
            },
            asesor: captacion.captacion?.asesor ? {
                nombre: `${captacion.captacion.asesor.prim_nom || ''} ${captacion.captacion.asesor.apell_pa || ''}`.trim(),
                email: captacion.captacion.asesor.email
            } : null,
            createdAt: captacion.createdAt
        };

        res.json({
            success: true,
            message: 'Proyecto obtenido correctamente',
            proyecto: proyectoPublico
        });

    } catch (error) {
        console.error('Error al obtener proyecto público:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

/**
 * Obtener todos los proyectos de marketing para vista pública (sin autenticación)
 */
exports.getProyectosMarketingPublico = async (req, res) => {
    try {
        
        // Filtro para proyectos disponibles para marketing Y publicados
        const filtro = {
            $and: [
                {
                    $or: [
                        { 'venta.estatus_venta': 'Disponible para venta' },
                        { estatus_actual: 'En venta' },
                        { estatus_actual: 'Disponible para venta' },
                        { estatus_actual: 'Remodelacion' }
                    ]
                },
                {
                    'marketing.estatus_publicacion': 'Publicada'
                }
            ]
        };
        

        // Obtener captaciones con paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const captaciones = await CaptacionInmobiliaria.find(filtro)
            .populate('captacion.asesor', 'prim_nom segun_nom apell_pa apell_ma email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);


        // Contar total de documentos
        const total = await CaptacionInmobiliaria.countDocuments(filtro);

        // Procesar proyectos para vista pública
        const proyectos = captaciones.map(captacion => ({
            _id: captacion._id,
            tipo: captacion.propiedad?.tipo,
            direccion: captacion.propiedad?.direccion,
            caracteristicas: captacion.propiedad?.caracteristicas,
            marketing: {
                titulo: captacion.marketing?.titulo,
                descripcion: captacion.marketing?.descripcion,
                precioOferta: captacion.marketing?.precioOferta,
                imagenes: captacion.marketing?.imagenes || []
            },
            venta: {
                estatus_venta: captacion.venta?.estatus_venta,
                monto_venta: captacion.venta?.monto_venta
            },
            asesor: captacion.captacion?.asesor ? {
                nombre: `${captacion.captacion.asesor.prim_nom || ''} ${captacion.captacion.asesor.apell_pa || ''}`.trim(),
                email: captacion.captacion.asesor.email
            } : null,
            createdAt: captacion.createdAt
        }));


        res.json({
            success: true,
            message: 'Proyectos obtenidos correctamente',
            proyectos,
            paginacion: {
                pagina: page,
                limite: limit,
                total,
                paginas: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Error al obtener proyectos públicos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};
