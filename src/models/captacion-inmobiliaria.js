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
    }
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
    }
});

// 📌 Información de la dirección de la propiedad (mejorada con trim)
const DireccionSchema = new mongoose.Schema({
    calle: { type: String, trim: true },
    numero: { type: String, trim: true },
    colonia: { type: String, trim: true },
    ciudad: { type: String, trim: true },
    estado: { type: String, trim: true },
    codigo_postal: { type: String, trim: true },
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
        enum: ['Predial', 'Agua', 'Hipoteca', 'CFE', 'Mantenimiento', 'Otro'],
        required: true
    },
    monto: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    estatus: { 
        type: String, 
        enum: ['Pagado', 'Pendiente', 'En proceso'],
        default: 'Pendiente'
    },
    fecha_vencimiento: Date,
    descripcion: { type: String, trim: true }
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

// 📌 Propiedad completa (mejorada)
const PropiedadSchema = new mongoose.Schema({
    tipo: { 
        type: String, 
        enum: ['Casa', 'Departamento', 'Terreno', 'Local', 'Bodega', 'Edificio'], 
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
    estatus: { 
        type: String, 
        enum: ['Pendiente', 'En proceso', 'Completado', 'Cancelado'],
        default: 'Pendiente'
    }
});

// 📌 Gastos de remodelación (mejorado)
const GastoSchema = new mongoose.Schema({
    concepto: { type: String, trim: true, required: true },
    monto: { type: Number, required: true, min: 0 },
    moneda: { type: String, default: 'MXN' },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String, trim: true }
});

// 📌 Información de remodelación
const RemodelacionSchema = new mongoose.Schema({
    necesita_remodelacion: Boolean,
    estatus: { type: String, enum: ['No aplica', 'Planeación', 'En proceso', 'Terminada'], default: 'No aplica' },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Quién supervisa la remodelación
    gastos: [GastoSchema], // Detalle de gastos
    presupuesto_total: { type: Number, min: 0 },
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
        required: true, // INE es obligatorio
        validate: {
            validator: function(v) {
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
        required: true, // Escrituras son obligatorias
        validate: {
            validator: function(v) {
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
        enum: ['En proceso', 'Finalizada', 'Cancelada'],
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
    estatus_actual: {
        type: String,
        enum: ['Captación', 'En trámite legal', 'En remodelación', 'En venta', 'Vendida', 'Cancelada'],
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
                    return referencias.length >= 2;
                },
                message: 'Se requieren al menos dos referencias personales'
            }
        ]
    },
    historial_tramites: [TramiteSchema],
    remodelacion: RemodelacionSchema,
    inversionistas: [InversionistaSchema],
    historial_estatus: [HistorialEstatusSchema],
    venta: VentaSchema,
    pdf_url: {
        type: String,
        trim: true
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

// Validación para asegurar que documentos obligatorios estén presentes
CaptacionInmobiliariaSchema.pre('save', function(next) {
    if (!this.documentos_entregados.ine) {
        return next(new Error('El documento INE es obligatorio'));
    }
    if (!this.documentos_entregados.escrituras) {
        return next(new Error('Las escrituras son obligatorias'));
    }
    next();
});

const CaptacionInmobiliaria = mongoose.model('CaptacionInmobiliaria', CaptacionInmobiliariaSchema);

module.exports = CaptacionInmobiliaria; 