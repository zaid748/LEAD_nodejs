const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
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
    costo: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    numero_factura: { 
        type: String, 
        trim: true 
    },
    numero_folio: { 
        type: String, 
        trim: true 
    },
    foto_comprobante: { 
        type: String, 
        trim: true 
    },
    tipo_gasto: { 
        type: String, 
        enum: ['Administrativo', 'Solicitud_Contratista'], 
        required: true 
    },
    estatus: { 
        type: String, 
        enum: ['Solicitando material', 'Pendiente supervisión', 'Rechazado por supervisor', 'Pendiente aprobación administrativa', 'Aprobado para su compra', 'En proceso de entrega', 'Entregado'], 
        default: 'Solicitando material' 
    },
    usuario_registro: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    fecha_registro: { 
        type: Date, 
        default: Date.now 
    },
    supervisor_aprobacion: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    fecha_aprobacion_supervisor: Date,
    administrador_aprobacion: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    fecha_aprobacion_admin: Date,
    fecha_compra: Date,
    fecha_entrega: Date,
    proyecto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaptacionInmobiliaria',
        required: true
    },
    notas: { type: String, trim: true },
    motivo_rechazo: { type: String, trim: true },
    decision_supervisor: { 
        type: String, 
        enum: ['aprobado', 'rechazado']
    }
}, { timestamps: true });

// Índices para mejorar rendimiento
MaterialSchema.index({ proyecto_id: 1 });
MaterialSchema.index({ estatus: 1 });
MaterialSchema.index({ tipo_gasto: 1 });
MaterialSchema.index({ usuario_registro: 1 });
MaterialSchema.index({ supervisor_aprobacion: 1 });
MaterialSchema.index({ administrador_aprobacion: 1 });
MaterialSchema.index({ fecha_registro: -1 });

const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
