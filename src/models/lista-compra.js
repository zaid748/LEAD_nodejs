const mongoose = require('mongoose');

const ListaCompraSchema = new mongoose.Schema({
    proyecto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaptacionInmobiliaria',
        required: true
    },
    contratista_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    supervisor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    titulo: {
        type: String,
        required: true,
        trim: true,
        default: 'Lista de Compra'
    },
    descripcion: {
        type: String,
        trim: true
    },
    materiales: [{
        tipo: {
            type: String,
            required: true,
            trim: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 0
        },
        tipo_unidad: {
            type: String,
            required: true,
            trim: true,
            enum: [
                'Pieza', 'Kilogramo', 'Litro', 'Metro', 'Metro cuadrado', 'Metro cúbico', 
                'Caja', 'Bolsa', 'Rollo', 'Costal', 'Saco', 'Bulto', 'Tubo', 'Varilla',
                'Lámina', 'Placa', 'Tabla', 'Viga', 'Poste', 'Bloque', 'Ladrillo',
                'Barril', 'Galón', 'Quintal', 'Tonelada', 'Gramo', 'Mililitro',
                'Pulgada', 'Pie', 'Yarda', 'Acre', 'Hectárea', 'Otro'
            ]
        },
        urgencia: {
            type: String,
            enum: ['Baja', 'Media', 'Alta', 'Urgente'],
            default: 'Media'
        },
        descripcion: {
            type: String,
            trim: true
        },
        costo_estimado: {
            type: Number,
            min: 0,
            default: 0
        },
        costo_final: {
            type: Number,
            min: 0,
            default: 0
        },
        estatus: {
            type: String,
            enum: ['Pendiente', 'En revisión', 'Aprobado', 'Rechazado', 'En compra', 'Entregado'],
            default: 'Pendiente'
        },
        motivo_rechazo: {
            type: String,
            trim: true
        },
        notas_supervisor: {
            type: String,
            trim: true
        }
    }],
    estatus_general: {
        type: String,
        enum: ['Borrador', 'Enviada', 'En revisión', 'Aprobada', 'Rechazada', 'En compra', 'Completada'],
        default: 'Borrador'
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_envio: Date,
    fecha_aprobacion: Date,
    fecha_rechazo: Date,
    total_estimado: {
        type: Number,
        min: 0,
        default: 0
    },
    total_final: {
        type: Number,
        min: 0,
        default: 0
    },
    notas_generales: {
        type: String,
        trim: true
    },
    // Campos para seguimiento
    supervisor_revision: {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fecha: Date,
        comentarios: String
    },
    administrador_aprobacion: {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fecha: Date,
        comentarios: String
    },
    // Campos de administración
    fecha_aprobacion_admin: Date,
    fecha_rechazo_admin: Date,
    motivo_rechazo_admin: {
        type: String,
        trim: true
    },
    comentarios_admin: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Índices para mejorar rendimiento
ListaCompraSchema.index({ proyecto_id: 1 });
ListaCompraSchema.index({ contratista_id: 1 });
ListaCompraSchema.index({ supervisor_id: 1 });
ListaCompraSchema.index({ estatus_general: 1 });
ListaCompraSchema.index({ fecha_creacion: -1 });

// Middleware para calcular totales automáticamente
ListaCompraSchema.pre('save', function(next) {
    if (this.materiales && this.materiales.length > 0) {
        this.total_estimado = this.materiales.reduce((total, material) => {
            return total + (material.costo_estimado || 0);
        }, 0);
        
        this.total_final = this.materiales.reduce((total, material) => {
            return total + (material.costo_final || 0);
        }, 0);
    }
    next();
});

const ListaCompra = mongoose.model('ListaCompra', ListaCompraSchema);

module.exports = ListaCompra;
