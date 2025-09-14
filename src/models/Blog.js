const { Schema, model } = require('mongoose');

const BlogSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    resumen: {
        type: String,
        required: false,
        trim: true
    },
    contenido: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['eventos', 'cursos', 'noticias', 'proyectos', 'testimonios', 'otros'],
        default: 'otros'
    },
    estado: {
        type: String,
        required: true,
        enum: ['Borrador', 'Publicado', 'Programado'],
        default: 'Borrador'
    },
    fechaPublicacion: {
        type: Date,
        required: function() {
            return this.estado === 'Publicado' || this.estado === 'Programado';
        }
    },
    tags: {
        type: String,
        required: false,
        trim: true
    },
    imagenPrincipal: {
        url: {
            type: String,
            required: false
        },
        key: {
            type: String,
            required: false
        },
        originalName: {
            type: String,
            required: false
        }
    },
    imagenes: [{
        url: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        },
        originalName: {
            type: String,
            required: true
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vistas: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comentarios: [{
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        contenido: {
            type: String,
            required: true,
            trim: true
        },
        fecha: {
            type: Date,
            default: Date.now
        },
        aprobado: {
            type: Boolean,
            default: false
        }
    }]
}, {
    timestamps: true
});

// Índices para mejorar el rendimiento de las consultas
BlogSchema.index({ categoria: 1, estado: 1 });
BlogSchema.index({ fechaPublicacion: -1 });
BlogSchema.index({ autor: 1 });
BlogSchema.index({ titulo: 'text', contenido: 'text', resumen: 'text' });

// Middleware para validar fecha de publicación
BlogSchema.pre('save', function(next) {
    if (this.estado === 'Publicado' && !this.fechaPublicacion) {
        this.fechaPublicacion = new Date();
    }
    next();
});

// Método virtual para obtener el nombre completo del autor
BlogSchema.virtual('autorNombre').get(function() {
    if (this.populated('autor')) {
        return `${this.autor.prim_nom} ${this.autor.apell_pa}`;
    }
    return null;
});

// Método para incrementar vistas
BlogSchema.methods.incrementarVistas = function() {
    this.vistas += 1;
    return this.save();
};

// Método para agregar like
BlogSchema.methods.agregarLike = function() {
    this.likes += 1;
    return this.save();
};

// Método para agregar comentario
BlogSchema.methods.agregarComentario = function(usuarioId, contenido) {
    this.comentarios.push({
        usuario: usuarioId,
        contenido: contenido
    });
    return this.save();
};

module.exports = model('Blog', BlogSchema);
