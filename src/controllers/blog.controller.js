const blogCtrl = {};

const Blog = require('../models/Blog');
const User = require('../models/user');
const { uploadImageToS3, deleteImageFromS3 } = require('../libs/multerImagenes');
const { resizeImageToSize, validateImage, getImageMetadata } = require('../libs/imageProcessor');

// Obtener blogs públicos (sin autenticación)
blogCtrl.getPublicBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9; // 9 para mostrar en grid 3x3
        const category = req.query.category;
        const search = req.query.search;
        
        // Construir filtro para blogs públicos
        let filtro = {
            estado: 'Publicado' // Solo blogs publicados
        };
        
        // Agregar filtro de categoría si se proporciona
        if (category && category !== 'all') {
            filtro.categoria = category;
        }
        
        // Agregar búsqueda si se proporciona
        if (search) {
            filtro.$or = [
                { titulo: { $regex: search, $options: 'i' } },
                { resumen: { $regex: search, $options: 'i' } },
                { contenido: { $regex: search, $options: 'i' } }
            ];
        }
        
        const skip = (page - 1) * limit;
        
        // Obtener blogs con populate del autor
        const blogs = await Blog.find(filtro)
            .populate('autor', 'prim_nom apell_pa email')
            .sort({ fechaPublicacion: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        
        // Contar total de blogs
        const total = await Blog.countDocuments(filtro);
        
        // Calcular información de paginación
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;
        
        res.json({
            success: true,
            blogs: blogs,
            paginacion: {
                paginaActual: page,
                totalPaginas: totalPages,
                totalBlogs: total,
                blogsPorPagina: limit,
                tieneSiguiente: hasNext,
                tieneAnterior: hasPrev
            }
        });
        
    } catch (error) {
        console.error('Error al obtener blogs públicos:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor'
        });
    }
};

// Obtener un blog público específico por ID
blogCtrl.getPublicBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                mensaje: 'ID de blog no válido'
            });
        }
        
        // Buscar blog por ID (solo blogs publicados)
        const blog = await Blog.findOne({ 
            _id: id, 
            estado: 'Publicado' 
        })
        .populate('autor', 'prim_nom apell_pa email')
        .lean();
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                mensaje: 'Blog no encontrado o no está publicado'
            });
        }
        
        // Incrementar contador de vistas
        await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } });
        
        res.json({
            success: true,
            blog: blog
        });
        
    } catch (error) {
        console.error('Error al obtener blog público:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor'
        });
    }
};

// Obtener todos los blogs con paginación y filtros
blogCtrl.getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || '-createdAt';
        const search = req.query.search || '';
        const category = req.query.category || '';
        const estado = req.query.estado || '';

        // Construir filtros
        const filtros = {};
        
        if (search) {
            filtros.$or = [
                { titulo: { $regex: search, $options: 'i' } },
                { contenido: { $regex: search, $options: 'i' } },
                { resumen: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category) {
            filtros.categoria = category;
        }
        
        if (estado) {
            filtros.estado = estado;
        }

        // Calcular skip para paginación
        const skip = (page - 1) * limit;

        // Ejecutar consulta con populate
        const blogs = await Blog.find(filtros)
            .populate('autor', 'prim_nom apell_pa email')
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        // Contar total de documentos
        const total = await Blog.countDocuments(filtros);
        const paginas = Math.ceil(total / limit);

        res.json({
            success: true,
            blogs,
            paginacion: {
                pagina: page,
                paginas,
                total,
                limite: limit
            }
        });

    } catch (error) {
        console.error('Error al obtener blogs:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener un blog específico por ID
blogCtrl.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('autor', 'prim_nom apell_pa email foto_perfil')
            .populate('comentarios.usuario', 'prim_nom apell_pa foto_perfil')
            .lean();

        if (!blog) {
            return res.status(404).json({
                success: false,
                mensaje: 'Blog no encontrado'
            });
        }

        // Incrementar vistas
        await Blog.findByIdAndUpdate(req.params.id, { $inc: { vistas: 1 } });

        res.json({
            success: true,
            blog
        });

    } catch (error) {
        console.error('Error al obtener blog:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Crear nuevo blog
blogCtrl.createBlog = async (req, res) => {
    try {
        const {
            titulo,
            resumen,
            contenido,
            categoria,
            estado,
            fechaPublicacion,
            tags
        } = req.body;

        // Validar campos obligatorios
        if (!titulo || !contenido || !categoria) {
            return res.status(400).json({
                success: false,
                mensaje: 'Título, contenido y categoría son obligatorios'
            });
        }

        // Crear objeto del blog
        const blogData = {
            titulo,
            resumen: resumen || '',
            contenido,
            categoria,
            estado: estado || 'Borrador',
            tags: tags || '',
            autor: req.user._id
        };

        // Agregar fecha de publicación si está presente
        if (fechaPublicacion) {
            blogData.fechaPublicacion = new Date(fechaPublicacion);
        }

        // Crear el blog primero para obtener el ID
        const nuevoBlog = new Blog(blogData);
        await nuevoBlog.save();

        // Procesar imágenes si existen
        if (req.files && req.files.length > 0) {
            const imagenesProcesadas = [];
            
            for (let i = 0; i < req.files.length; i++) {
                const imagen = req.files[i];
                
                // Validar imagen
                const validationResult = validateImage(imagen);
                if (!validationResult.isValid) {
                    console.warn(`Imagen ${i + 1} inválida: ${validationResult.errors.join(', ')}`);
                    continue; // Saltar imagen inválida
                }

                // La primera imagen será la principal (1200x630), las demás adicionales (800x600)
                const isMainImage = i === 0;
                const resizedBuffer = await resizeImageToSize(
                    imagen.buffer, 
                    isMainImage ? 1200 : 800, 
                    isMainImage ? 630 : 600
                );
                
                // Subir a S3
                const s3Result = await uploadImageToS3(resizedBuffer, imagen.originalname, 'Blog', nuevoBlog._id.toString());
                
                if (isMainImage) {
                    // Actualizar imagen principal
                    await Blog.findByIdAndUpdate(nuevoBlog._id, {
                        imagenPrincipal: {
                            url: s3Result.url,
                            key: s3Result.key,
                            originalName: imagen.originalname
                        }
                    });
                } else {
                    // Agregar a imágenes adicionales
                    imagenesProcesadas.push({
                        url: s3Result.url,
                        key: s3Result.key,
                        originalName: imagen.originalname
                    });
                }
            }
            
            // Actualizar imágenes adicionales si hay alguna
            if (imagenesProcesadas.length > 0) {
                await Blog.findByIdAndUpdate(nuevoBlog._id, {
                    imagenes: imagenesProcesadas
                });
            }
        }

        // Populate para devolver datos completos
        const blogCompleto = await Blog.findById(nuevoBlog._id)
            .populate('autor', 'prim_nom apell_pa email')
            .lean();

        res.status(201).json({
            success: true,
            mensaje: 'Blog creado exitosamente',
            blog: blogCompleto
        });

    } catch (error) {
        console.error('Error al crear blog:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Actualizar blog existente
blogCtrl.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const {
            titulo,
            resumen,
            contenido,
            categoria,
            estado,
            fechaPublicacion,
            tags
        } = req.body;

        // Buscar el blog existente
        const blogExistente = await Blog.findById(blogId);
        if (!blogExistente) {
            return res.status(404).json({
                success: false,
                mensaje: 'Blog no encontrado'
            });
        }

        // Verificar permisos (solo el autor puede editar)
        if (blogExistente.autor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                mensaje: 'No tienes permisos para editar este blog'
            });
        }

        // Actualizar datos básicos
        const datosActualizados = {
            titulo: titulo || blogExistente.titulo,
            resumen: resumen || blogExistente.resumen,
            contenido: contenido || blogExistente.contenido,
            categoria: categoria || blogExistente.categoria,
            estado: estado || blogExistente.estado,
            tags: tags || blogExistente.tags
        };

        // Actualizar fecha de publicación si está presente
        if (fechaPublicacion) {
            datosActualizados.fechaPublicacion = new Date(fechaPublicacion);
        }

        // Procesar nuevas imágenes si existen
        if (req.files && req.files.length > 0) {
            const imagenesProcesadas = [];
            
            for (let i = 0; i < req.files.length; i++) {
                const imagen = req.files[i];
                
                // Validar imagen
                const validationResult = validateImage(imagen);
                if (!validationResult.isValid) {
                    console.warn(`Imagen ${i + 1} inválida: ${validationResult.errors.join(', ')}`);
                    continue; // Saltar imagen inválida
                }

                // La primera imagen será la principal (1200x630), las demás adicionales (800x600)
                const isMainImage = i === 0;
                const resizedBuffer = await resizeImageToSize(
                    imagen.buffer, 
                    isMainImage ? 1200 : 800, 
                    isMainImage ? 630 : 600
                );
                
                // Subir a S3
                const s3Result = await uploadImageToS3(resizedBuffer, imagen.originalname, 'Blog', blogId);
                
                if (isMainImage) {
                    // Actualizar imagen principal
                    datosActualizados.imagenPrincipal = {
                        url: s3Result.url,
                        key: s3Result.key,
                        originalName: imagen.originalname
                    };

                    // Eliminar imagen principal anterior de S3 si existe
                    if (blogExistente.imagenPrincipal && blogExistente.imagenPrincipal.key) {
                        await deleteImageFromS3(blogExistente.imagenPrincipal.key);
                    }
                } else {
                    // Agregar a imágenes adicionales
                    imagenesProcesadas.push({
                        url: s3Result.url,
                        key: s3Result.key,
                        originalName: imagen.originalname
                    });
                }
            }
            
            // Agregar imágenes adicionales si hay alguna
            if (imagenesProcesadas.length > 0) {
                datosActualizados.$push = { imagenes: { $each: imagenesProcesadas } };
            }
        }

        // Procesar imágenes a eliminar si existen
        if (req.body.imagenesAEliminar) {
            const imagenesAEliminar = JSON.parse(req.body.imagenesAEliminar);
            
            // Eliminar archivos de S3
            for (const imageKey of imagenesAEliminar) {
                await deleteImageFromS3(imageKey);
            }

            // Eliminar de la base de datos
            datosActualizados.$pull = { 
                imagenes: { key: { $in: imagenesAEliminar } } 
            };
        }

        // Actualizar el blog
        await Blog.findByIdAndUpdate(blogId, datosActualizados);

        // Obtener el blog actualizado
        const blogActualizado = await Blog.findById(blogId)
            .populate('autor', 'prim_nom apell_pa email')
            .lean();

        res.json({
            success: true,
            mensaje: 'Blog actualizado exitosamente',
            blog: blogActualizado
        });

    } catch (error) {
        console.error('Error al actualizar blog:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar blog
blogCtrl.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Buscar el blog
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                mensaje: 'Blog no encontrado'
            });
        }

        // Verificar permisos (solo el autor puede eliminar)
        if (blog.autor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                mensaje: 'No tienes permisos para eliminar este blog'
            });
        }

        // Eliminar imágenes de S3
        if (blog.imagenPrincipal && blog.imagenPrincipal.key) {
            await deleteImageFromS3(blog.imagenPrincipal.key);
        }

        for (const imagen of blog.imagenes) {
            await deleteImageFromS3(imagen.key);
        }

        // Eliminar el blog de la base de datos
        await Blog.findByIdAndDelete(blogId);

        res.json({
            success: true,
            mensaje: 'Blog eliminado exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar blog:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Subir imágenes adicionales a un blog existente
blogCtrl.uploadImages = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Verificar que el blog existe
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                mensaje: 'Blog no encontrado'
            });
        }

        // Verificar permisos
        if (blog.autor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                mensaje: 'No tienes permisos para editar este blog'
            });
        }

        // Verificar que hay imágenes para subir
        if (!req.files || !req.files.imagenesMarketing) {
            return res.status(400).json({
                success: false,
                mensaje: 'No se proporcionaron imágenes'
            });
        }

        // Verificar límite de imágenes (máximo 10 total)
        const imagenesActuales = blog.imagenes.length;
        const nuevasImagenes = req.files.imagenesMarketing.length;
        
        if (imagenesActuales + nuevasImagenes > 10) {
            return res.status(400).json({
                success: false,
                mensaje: `No se pueden subir más de 10 imágenes por blog. Actualmente tienes ${imagenesActuales} imágenes.`
            });
        }

        // Procesar nuevas imágenes
        const imagenesParaAgregar = [];
        
        for (const imagen of req.files.imagenesMarketing) {
            // Validar imagen
            const validationResult = validateImage(imagen);
            if (!validationResult.isValid) {
                console.warn(`Imagen inválida: ${validationResult.errors.join(', ')}`);
                continue; // Saltar imagen inválida
            }

            // Redimensionar imagen si es necesario
            const resizedBuffer = await resizeImageToSize(imagen.buffer, 800, 600);
            
            // Subir a S3
            const s3Result = await uploadImageToS3(resizedBuffer, imagen.originalname, 'Blog', blogId);
            
            imagenesParaAgregar.push({
                url: s3Result.url,
                key: s3Result.key,
                originalName: imagen.originalname
            });
        }

        // Agregar imágenes al blog
        await Blog.findByIdAndUpdate(blogId, {
            $push: { imagenes: { $each: imagenesParaAgregar } }
        });

        res.json({
            success: true,
            mensaje: `${nuevasImagenes} imagen(es) subida(s) exitosamente`,
            imagenes: imagenesParaAgregar
        });

    } catch (error) {
        console.error('Error al subir imágenes:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Eliminar imagen específica de un blog
blogCtrl.deleteImage = async (req, res) => {
    try {
        const blogId = req.params.id;
        const imageKey = req.query.imageKey;

        if (!imageKey) {
            return res.status(400).json({
                success: false,
                mensaje: 'Se requiere el parámetro imageKey'
            });
        }

        // Buscar el blog
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                mensaje: 'Blog no encontrado'
            });
        }

        // Verificar permisos
        if (blog.autor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                mensaje: 'No tienes permisos para editar este blog'
            });
        }

        // Buscar la imagen en el blog
        const imagenEncontrada = blog.imagenes.find(img => img.key === imageKey);
        if (!imagenEncontrada) {
            return res.status(404).json({
                success: false,
                mensaje: 'Imagen no encontrada en el blog'
            });
        }

        // Eliminar archivo de S3
        await deleteImageFromS3(imageKey);

        // Eliminar de la base de datos
        await Blog.findByIdAndUpdate(blogId, {
            $pull: { imagenes: { key: imageKey } }
        });

        res.json({
            success: true,
            mensaje: 'Imagen eliminada exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = blogCtrl;
