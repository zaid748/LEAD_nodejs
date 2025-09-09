const mongoose = require('mongoose');

// 📌 Información de cónyuge (con validaciones)
const ConyugeSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true,
        trim: true 
    },
    telefono: { 
        type: String, 
        required: true 
    },
    correo: { 
        type: String, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true
    },
    nss: { type: String, match: /^[0-9]{11}$/, trim: true },
    rfc: { type: String, match: /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/, trim: true },
    curp: { type: String, match: /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/, trim: true }
});

// 📌 Información de propietario (mejorada)
const PropietarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true,
        trim: true 
    },
    telefono: { 
        type: String, 
        required: true 
    },
    correo: { 
        type: String, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true
    },
    // Campos adicionales con validaciones
    direccion: { 
        type: String, 
        trim: true 
    },
    identificacion: { 
        type: String, 
        trim: true 
    },
    nss: { 
        type: String,
        match: /^[0-9]{11}$/,
        trim: true
    },
    rfc: { 
        type: String,
        match: /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/,
        trim: true
    },
    curp: { 
        type: String,
        match: /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/,
        trim: true
    },
    tiene_conyuge: { 
        type: Boolean, 
        default: false 
    },
    conyuge: {
        type: ConyugeSchema,
        required: function() { 
            return this.tiene_conyuge === true; 
        }
    },
    estado_civil: { type: String, trim: true, required: false }
});

// 📌 Información de la dirección de la propiedad (mejorada con trim)
const DireccionSchema = new mongoose.Schema({
    calle: { type: String, trim: true },
    numero: { type: String, trim: true },
    colonia: { type: String, trim: true },
    ciudad: { type: String, trim: true },
    estado: { type: String, trim: true },
    codigo_postal: { type: String, trim: true },
    manzana: { type: String, trim: true },
    lote: { type: String, trim: true },
    referencias: { type: String, trim: true } // Referencias para ubicar la propiedad
});

// 📌 Información física de la propiedad (mejorada)
const CaracteristicasSchema = new mongoose.Schema({
    m2_terreno: { type: Number, min: 0 },
    m2_construccion: { type: Number, min: 0 },
    habitaciones: { type: Number, min: 0 },
    baños: { type: Number, min: 0 },
    cocheras: { type: Number, min: 0 },
    descripcion: { type: String, trim: true },
    año_construccion: Number,
    niveles: { type: Number, min: 1 }
});

// 📌 Adeudos de la propiedad
const AdeudoSchema = new mongoose.Schema({
    tipo: { 
        type: String, 
        enum: ['Predial', 'Agua', 'Hipoteca', 'CFE', 'Mantenimiento', 'Gas', 'Otro'],
        required: true
    },
    monto: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    numero_referencia: { type: String, trim: true },
    estatus: { 
        type: String, 
        enum: ['Pagado', 'Pendiente', 'En proceso'],
        default: 'Pendiente'
    },
    fecha_vencimiento: Date,
    descripcion: { type: String, trim: true },
    detalle: { type: String, trim: true }
});

// 📌 Datos laborales del propietario
const DatosLaboralesSchema = new mongoose.Schema({
    empresa: { type: String, trim: true },
    puesto: { type: String, trim: true },
    antiguedad: { type: Number, min: 0 }, // Antigüedad en años
    trabajo_estable: { type: Boolean, default: false }, // Si tiene contrato fijo
    ingresos_mensuales: { type: Number, min: 0 },
    telefono_trabajo: { type: String, trim: true }
});

// 📌 Referencias personales
const ReferenciaPersonalSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true,
        trim: true 
    },
    relacion: { 
        type: String, 
        required: true,
        trim: true 
    },
    telefono: { 
        type: String, 
        required: true 
    },
    correo: { 
        type: String, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true
    }
});

// 📌 Sección específica para Marketing Inmobiliario
const MarketingSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        trim: true,
        default: '' 
    },
    descripcion: { 
        type: String, 
        trim: true,
        default: '' 
    },
    precioOferta: { 
        type: String, 
        trim: true,
        default: '' 
    },
    estatus_publicacion: {
        type: String,
        enum: ['No publicada', 'Publicada'],
        default: 'No publicada'
    },
    imagenes: [{
        url: { type: String, required: true },
        nombre: { type: String, required: true },
        fecha_subida: { type: Date, default: Date.now },
        orden: { type: Number, default: 0 },
        key: { type: String, required: true }, // Key único para identificación
        s3Key: { type: String, required: true }, // Ruta completa en S3 para eliminación
        metadatos: {
            original: {
                width: { type: Number },
                height: { type: Number },
                size: { type: Number }, // Tamaño en bytes
                format: { type: String }
            },
            procesada: {
                width: { type: Number, default: 800 },
                height: { type: Number, default: 600 },
                size: { type: Number }, // Tamaño en bytes
                format: { type: String, default: 'jpeg' }
            }
        }
    }],
    // estatus eliminado - se usa estatus_actual del documento principal
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now
    },
    usuario_creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    usuario_ultima_modificacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// 📌 Propiedad completa (mejorada)
const PropiedadSchema = new mongoose.Schema({
    tipo: { 
        type: String, 
        enum: ['Casa', 'Departamento', 'Condominio', 'Terreno', 'Local', 'Bodega', 'Edificio'], 
        required: true 
    },
    direccion: DireccionSchema,
    caracteristicas: CaracteristicasSchema,
    uso_actual: { 
        type: String, 
        enum: ['Vivienda', 'Comercial', 'Mixto', 'Industrial', 'Sin uso'],
        default: 'Vivienda'
    },
    descripcion_adicional: { type: String, trim: true }, // Descripción adicional
    adeudos: [AdeudoSchema] // Lista de adeudos de la propiedad
});

// 📌 Información inicial de la captación
const CaptacionSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    tipo_captacion: { type: String, enum: ['Exclusiva', 'Abierta'], default: 'Abierta' },
    asesor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Quien captó la propiedad
    observaciones: { type: String, trim: true }
});

// 📌 Seguimiento de estatus (historial de cambios de estatus)
const HistorialEstatusSchema = new mongoose.Schema({
    estatus: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    notas: { type: String, trim: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Quién realizó el cambio
});

// 📌 Registro de trámites realizados (mejorado)
const TramiteSchema = new mongoose.Schema({
    tipo: { 
        type: String, 
        required: true,
        enum: ['Legal', 'Financiero', 'Administrativo', 'Fiscal', 'Remodelación', 'Otro']
    },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String, trim: true, required: true },
    monto: { type: Number, min: 0 },
    moneda: { type: String, default: 'MXN' },
    // estatus eliminado - se usa estatus_actual del documento principal
});

// 📌 Gastos de remodelación (mejorado)
const GastoSchema = new mongoose.Schema({
    concepto: { type: String, trim: true, required: true },
    monto: { type: Number, required: true, min: 0 },
    moneda: { type: String, default: 'MXN' },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String, trim: true },
    tipo: { type: String, enum: ['Materiales', 'Mano de obra', 'Herramientas', 'Otro'], default: 'Materiales' },
    lista_compra_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ListaCompra' },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notas: { type: String, trim: true }
});

// 📌 Información de remodelación (extendida)
const RemodelacionSchema = new mongoose.Schema({
    necesita_remodelacion: Boolean,
    // estatus eliminado - se usa estatus_actual del documento principal
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Quién supervisa la remodelación
    contratista: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Contratista asignado al proyecto
    gastos: [GastoSchema], // Detalle de gastos (mantener para compatibilidad)
    presupuesto_total: { type: Number, min: 0 },
    presupuesto_estimado: { type: Number, min: 0 }, // Nuevo campo para presupuesto inicial
    presupuesto_restante: { type: Number, min: 0 }, // Presupuesto restante después de gastos
    materiales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }], // Referencias a materiales
    solicitudes_pendientes: [{
        material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
        fecha_solicitud: Date,
        estatus: String
    }],
    carta_responsabilidad: { type: mongoose.Schema.Types.ObjectId, ref: 'CartaResponsabilidad' },
    notificaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notificacion' }],
    fecha_inicio: Date,
    fecha_fin: Date,
    notas: { type: String, trim: true }
});

// 📌 Información de cada inversionista (mejorado)
const InversionistaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    porcentaje_participacion: { type: Number, required: true, min: 0, max: 100 },
    monto_invertido: { type: Number, required: true, min: 0 },
    moneda: { type: String, default: 'MXN' },
    datos_contacto: {
        telefono: String,
        correo: { 
            type: String, 
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            trim: true
        }
    }
}, { _id: false }); // Sin _id para que sea solo un array simple

// 📌 Estructura de documentos entregados
const DocumentosEntregadosSchema = new mongoose.Schema({
    ine: { 
        type: Boolean, 
        default: false,
        required: true, // INE es obligatorio para internas
        validate: {
            validator: function(v) {
                // Permitir false cuando es_externa === true
                const doc = typeof this.ownerDocument === 'function' ? this.ownerDocument() : this;
                if (doc && doc.es_externa === true) return true;
                return v === true;
            },
            message: 'El documento INE es obligatorio'
        }
    },
    curp: { type: Boolean, default: false },
    rfc: { type: Boolean, default: false },
    escrituras: { 
        type: Boolean, 
        default: false,
        required: true, // Escrituras obligatorias para internas
        validate: {
            validator: function(v) {
                // Permitir false cuando es_externa === true
                const doc = typeof this.ownerDocument === 'function' ? this.ownerDocument() : this;
                if (doc && doc.es_externa === true) return true;
                return v === true;
            },
            message: 'Las escrituras son obligatorias'
        }
    },
    comprobante_domicilio: { type: Boolean, default: false },
    predial_pagado: { type: Boolean, default: false },
    libre_gravamen: { type: Boolean, default: false },
    observaciones: { type: String, trim: true }
});

// 📌 Estructura de documentos de venta
const DocumentosVentaSchema = new mongoose.Schema({
    contrato: { type: Boolean, default: false },
    identificacion: { type: Boolean, default: false },
    constancia_credito: { type: Boolean, default: false },
    avaluo: { type: Boolean, default: false },
    escritura_publica: { type: Boolean, default: false },
    observaciones: { type: String, trim: true }
});

// 📌 Información de la venta final (mejorada)
const VentaSchema = new mongoose.Schema({
    comprador: {
        nombre: { type: String, trim: true},
        telefono: { type: String},
        correo: { 
            type: String, 
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            trim: true
        },
        identificacion: { type: String, trim: true }
    },
    fecha_venta: { type: Date },
    monto_venta: { type: Number, min: 0 },
    estatus_venta: { 
        type: String, 
        enum: ['En proceso', 'Disponible para venta', 'Finalizada', 'Cancelada'],
        default: 'En proceso'
    },
    tipo_de_pago: { 
        type: String, 
        enum: ['Contado', 'Crédito Bancario', 'INFONAVIT', 'FOVISSSTE', 'Mixto', 'Otro'],
    },
    documentos_entregados: DocumentosVentaSchema, // Reemplazamos documentos_venta con booleanos
    comision_total: { type: Number, min: 0 },
    notas_adicionales: { type: String, trim: true }
});

// 📌 Documento Principal (Captación Inmobiliaria) (mejorado)
const CaptacionInmobiliariaSchema = new mongoose.Schema({
    propietario: PropietarioSchema,
    propiedad: PropiedadSchema,
    // Propiedades externas (Mercado Libre/Renta)
    es_externa: { type: Boolean, default: false },
    origen: { 
        type: String, 
        enum: ['Interna', 'Mercado Libre', 'Renta Externa', 'Otro'],
        default: 'Interna'
    },
    fuente_externa: { type: String, trim: true },
    tipo_operacion: {
        type: String,
        enum: ['Venta', 'Renta'],
        default: 'Venta'
    },
    estatus_actual: {
        type: String,
        enum: ['Captación', 'En trámite legal', 'Remodelacion', 'Disponible para venta', 'Vendida', 'Cancelada'],
        default: 'Captación'
    },
    captacion: CaptacionSchema,
    documentos_entregados: DocumentosEntregadosSchema,
    datos_laborales: DatosLaboralesSchema,
    referencias_personales: {
        type: [ReferenciaPersonalSchema],
        validate: [
            {
                validator: function(referencias) {
                    // Si es externa, permitir 0 referencias
                    if (this && this.es_externa === true) return true;
                    return referencias.length >= 1;
                },
                message: 'Se requiere al menos una referencia personal'
            }
        ]
    },
    historial_tramites: [TramiteSchema],
    remodelacion: RemodelacionSchema,
    inversionistas: [InversionistaSchema],
    historial_estatus: [HistorialEstatusSchema],
    venta: VentaSchema,
    marketing: MarketingSchema, // Sección específica para marketing inmobiliario
    pdf_url: {
        type: String,
        trim: true
    },
    ultima_actualizacion: {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fecha: {
            type: Date,
            default: Date.now
        }
    }
}, { timestamps: true });

// Añadir índices para mejorar rendimiento en consultas frecuentes
CaptacionInmobiliariaSchema.index({ estatus_actual: 1 });
CaptacionInmobiliariaSchema.index({ 'captacion.asesor': 1 });
CaptacionInmobiliariaSchema.index({ 'captacion.fecha': 1 });
CaptacionInmobiliariaSchema.index({ 'propiedad.tipo': 1 });
CaptacionInmobiliariaSchema.index({ 'propiedad.direccion.ciudad': 1 });
CaptacionInmobiliariaSchema.index({ 'propiedad.direccion.estado': 1 });
CaptacionInmobiliariaSchema.index({ 'propietario.nombre': 'text' }); // Índice de texto para búsquedas
CaptacionInmobiliariaSchema.index({ 'venta.estatus_venta': 1 }); // Índice para consultas por estatus de venta
CaptacionInmobiliariaSchema.index({ createdAt: -1 }); // Índice para ordenar por fecha de creación

// Índices específicos para marketing
CaptacionInmobiliariaSchema.index({ 'marketing.fecha_creacion': -1 });
CaptacionInmobiliariaSchema.index({ 'marketing.usuario_creador': 1 });

// Índices específicos para remodelación
CaptacionInmobiliariaSchema.index({ 'remodelacion.supervisor': 1 });
CaptacionInmobiliariaSchema.index({ 'remodelacion.presupuesto_estimado': 1 });
CaptacionInmobiliariaSchema.index({ 'remodelacion.materiales': 1 });
CaptacionInmobiliariaSchema.index({ 'remodelacion.carta_responsabilidad': 1 });
CaptacionInmobiliariaSchema.index({ 'remodelacion.notificaciones': 1 });

// Validación para asegurar que documentos obligatorios estén presentes
CaptacionInmobiliariaSchema.pre('save', function(next) {
    // Para propiedades externas, no exigir documentos obligatorios
    if (this.es_externa === true) {
        return next();
    }
    if (!this.documentos_entregados || this.documentos_entregados.ine !== true) {
        return next(new Error('El documento INE es obligatorio'));
    }
    if (!this.documentos_entregados || this.documentos_entregados.escrituras !== true) {
        return next(new Error('Las escrituras son obligatorias'));
    }
    next();
});

const CaptacionInmobiliaria = mongoose.model('CaptacionInmobiliaria', CaptacionInmobiliariaSchema);

module.exports = CaptacionInmobiliaria; 
