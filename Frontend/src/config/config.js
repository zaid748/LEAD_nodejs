// Configuración global de la aplicación
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Configuración de la aplicación
export const APP_CONFIG = {
    name: 'LEAD Dashboard Inmobiliario',
    version: '1.0.0',
    api: {
        baseURL: API_BASE_URL,
        timeout: 30000,
        retries: 3
    },
    upload: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
        maxFiles: 5
    },
    pagination: {
        defaultPageSize: 10,
        maxPageSize: 100
    }
};

// Configuración de roles y permisos
export const ROLES = {
    ADMINISTRATOR: 'administrator',
    ADMINISTRADOR: 'administrador',
    SUPERVISOR: 'supervisor',
    CONTRATISTA: 'contratista',
    AYUDANTE_ADMIN: 'ayudante de administrador',
    USER: 'user'
};

// Configuración de estatus de proyectos
export const ESTATUS_PROYECTOS = {
    CAPTACION: 'Captación',
    TRAMITE_LEGAL: 'En trámite legal',
    REMODELACION: 'Remodelacion',
    EN_VENTA: 'En venta',
    VENDIDA: 'Vendida',
    CANCELADA: 'Cancelada'
};

// Configuración de estatus de materiales
export const ESTATUS_MATERIALES = {
    SOLICITANDO: 'Solicitando material',
    APROBACION: 'Aprobacion administrativa',
    APROBADO: 'Aprobado para su compra',
    EN_ENTREGA: 'En proceso de entrega',
    ENTREGADO: 'Entregado'
};

// Configuración de tipos de gasto
export const TIPOS_GASTO = {
    ADMINISTRATIVO: 'Administrativo',
    SOLICITUD_CONTRATISTA: 'Solicitud_Contratista'
};

// Configuración de notificaciones
export const TIPOS_NOTIFICACION = {
    SOLICITUD: 'Solicitud',
    APROBACION: 'Aprobacion',
    COMPRA: 'Compra',
    ENTREGA: 'Entrega',
    GENERAL: 'General'
};

// Configuración de prioridades
export const PRIORIDADES = {
    BAJA: 'Baja',
    MEDIA: 'Media',
    ALTA: 'Alta',
    URGENTE: 'Urgente'
};

// Configuración de acciones requeridas
export const ACCIONES_REQUERIDAS = {
    REVISAR: 'Revisar',
    APROBAR: 'Aprobar',
    COMPRAR: 'Comprar',
    ENTREGAR: 'Entregar',
    FIRMAR: 'Firmar',
    NINGUNA: 'Ninguna'
};

export default APP_CONFIG;
