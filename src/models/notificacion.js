const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
    usuario_destino: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    titulo: { 
        type: String, 
        required: true, 
        trim: true 
    },
    mensaje: { 
        type: String, 
        required: true, 
        trim: true 
    },
    tipo: { 
        type: String, 
        enum: ['Solicitud', 'Aprobacion', 'Rechazo', 'Compra', 'Entrega', 'Asignacion', 'General'], 
        required: true 
    },
    proyecto_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CaptacionInmobiliaria' 
    },
    material_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Material' 
    },
    lista_compra_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ListaCompra' 
    },
    leida: { 
        type: Boolean, 
        default: false 
    },
    fecha_creacion: { 
        type: Date, 
        default: Date.now 
    },
    fecha_lectura: Date,
    prioridad: {
        type: String,
        enum: ['Baja', 'Media', 'Alta', 'Urgente'],
        default: 'Media'
    },
    accion_requerida: {
        type: String,
        enum: ['Revisar', 'Aprobar', 'Aprobar compra', 'Autorizar compra', 'Comprar', 'Entregar', 'Firmar', 'Ninguna'],
        default: 'Ninguna'
    }
}, { timestamps: true });

// Índices para mejorar rendimiento
NotificacionSchema.index({ usuario_destino: 1 });
NotificacionSchema.index({ leida: 1 });
NotificacionSchema.index({ tipo: 1 });
NotificacionSchema.index({ proyecto_id: 1 });
NotificacionSchema.index({ lista_compra_id: 1 });
NotificacionSchema.index({ fecha_creacion: -1 });
NotificacionSchema.index({ prioridad: 1 });

const Notificacion = mongoose.model('Notificacion', NotificacionSchema);

module.exports = Notificacion;
