const mongoose = require('mongoose');

const PushSubscriptionSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    endpoint: {
        type: String,
        required: true,
        unique: true
    },
    keys: {
        p256dh: {
            type: String,
            required: true
        },
        auth: {
            type: String,
            required: true
        }
    },
    userAgent: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    lastUsed: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Índices para mejorar rendimiento
PushSubscriptionSchema.index({ usuario_id: 1 });
PushSubscriptionSchema.index({ endpoint: 1 });
PushSubscriptionSchema.index({ active: 1 });
PushSubscriptionSchema.index({ lastUsed: -1 });

// Método para marcar como usado
PushSubscriptionSchema.methods.markAsUsed = function() {
    this.lastUsed = new Date();
    return this.save();
};

// Método estático para limpiar suscripciones inactivas
PushSubscriptionSchema.statics.cleanupInactiveSubscriptions = async function(daysInactive = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysInactive);
    
    const result = await this.updateMany(
        { lastUsed: { $lt: cutoffDate } },
        { active: false }
    );
    
    console.log(`Desactivadas ${result.modifiedCount} suscripciones inactivas`);
    return result;
};

const PushSubscription = mongoose.model('PushSubscription', PushSubscriptionSchema);

module.exports = PushSubscription;
