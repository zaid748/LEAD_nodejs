const mongoose = require('mongoose');

const CartaResponsabilidadSchema = new mongoose.Schema({
    contratista: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    proyecto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaptacionInmobiliaria',
        required: true
    },
    fecha_firma: { 
        type: Date, 
        default: Date.now 
    },
    firma_url: { 
        type: String, 
        required: true 
    },
    pdf_url: { 
        type: String, 
        required: true 
    },
    estatus: { 
        type: String, 
        enum: ['Pendiente', 'Firmada'], 
        default: 'Pendiente' 
    },
    materiales_entregados: [{
        material: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Material' 
        },
        fecha_entrega: Date,
        cantidad_recibida: Number,
        estatus: {
            type: String,
            enum: ['Pendiente', 'Entregado', 'Recibido'],
            default: 'Pendiente'
        }
    }],
    terminos_condiciones: {
        aceptados: { type: Boolean, default: false },
        fecha_aceptacion: Date,
        ip_aceptacion: String
    },
    notas: { type: String, trim: true }
}, { timestamps: true });

// Índices para mejorar rendimiento
CartaResponsabilidadSchema.index({ proyecto_id: 1 });
CartaResponsabilidadSchema.index({ contratista: 1 });
CartaResponsabilidadSchema.index({ estatus: 1 });
CartaResponsabilidadSchema.index({ fecha_firma: -1 });

const CartaResponsabilidad = mongoose.model('CartaResponsabilidad', CartaResponsabilidadSchema);

module.exports = CartaResponsabilidad;
