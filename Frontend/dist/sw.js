/**
 * Service Worker para Push Notifications
 * Maneja notificaciones push cuando la aplicación está cerrada o en segundo plano
 */

// Configuración de notificaciones
const NOTIFICATION_OPTIONS = {
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    requireInteraction: false,
    silent: false
};

// Tipos de notificaciones y sus configuraciones
const NOTIFICATION_TYPES = {
    'Solicitud': {
        icon: '/icons/solicitud.png',
        color: '#3B82F6', // Azul
        priority: 'high'
    },
    'Aprobacion': {
        icon: '/icons/aprobacion.png', 
        color: '#10B981', // Verde
        priority: 'high'
    },
    'Rechazo': {
        icon: '/icons/rechazo.png',
        color: '#EF4444', // Rojo
        priority: 'high'
    },
    'Compra': {
        icon: '/icons/compra.png',
        color: '#F59E0B', // Amarillo
        priority: 'normal'
    },
    'Entrega': {
        icon: '/icons/entrega.png',
        color: '#8B5CF6', // Púrpura
        priority: 'normal'
    },
    'Asignacion': {
        icon: '/icons/asignacion.png',
        color: '#06B6D4', // Cian
        priority: 'normal'
    },
    'General': {
        icon: '/favicon.ico',
        color: '#6B7280', // Gris
        priority: 'low'
    }
};

/**
 * Evento: Instalación del Service Worker
 */
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    // Forzar activación inmediata
    self.skipWaiting();
});

/**
 * Evento: Activación del Service Worker
 */
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    // Tomar control inmediato de todas las páginas
    event.waitUntil(self.clients.claim());
});

/**
 * Evento: Recibir push notification
 */
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push recibido');
    
    let notificationData = {};
    
    try {
        // Intentar parsear los datos del push
        if (event.data) {
            notificationData = event.data.json();
        }
    } catch (error) {
        console.error('Error parseando datos de push:', error);
        // Datos por defecto si hay error
        notificationData = {
            titulo: 'Nueva Notificación',
            mensaje: 'Tienes una nueva notificación',
            tipo: 'General',
            proyecto_id: null,
            lista_compra_id: null
        };
    }
    
    // Preparar opciones de notificación
    const options = prepareNotificationOptions(notificationData);
    
    // Mostrar notificación
    event.waitUntil(
        self.registration.showNotification(notificationData.titulo, options)
    );
});

/**
 * Evento: Click en notificación
 */
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Click en notificación');
    
    event.notification.close();
    
    // Obtener datos de la notificación
    const notificationData = event.notification.data || {};
    
    // Determinar URL a abrir basada en el tipo de notificación
    let targetUrl = '/dashboard';
    
    if (notificationData.proyecto_id) {
        targetUrl = `/dashboard/remodelacion/${notificationData.proyecto_id}`;
    }
    
    if (notificationData.lista_compra_id) {
        targetUrl += `?lista=${notificationData.lista_compra_id}`;
    }
    
    // Abrir o enfocar la aplicación
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Buscar si ya hay una ventana abierta
                for (const client of clientList) {
                    if (client.url.includes('/dashboard') && 'focus' in client) {
                        client.navigate(targetUrl);
                        return client.focus();
                    }
                }
                
                // Si no hay ventana abierta, abrir una nueva
                if (clients.openWindow) {
                    return clients.openWindow(targetUrl);
                }
            })
    );
});

/**
 * Evento: Cerrar notificación
 */
self.addEventListener('notificationclose', (event) => {
    console.log('Service Worker: Notificación cerrada');
    
    // Aquí podrías enviar analytics o marcar como vista
    // Por ahora solo logueamos
    const notificationData = event.notification.data || {};
    console.log('Notificación cerrada:', notificationData.titulo);
});

/**
 * Preparar opciones de notificación basadas en el tipo
 */
function prepareNotificationOptions(data) {
    const typeConfig = NOTIFICATION_TYPES[data.tipo] || NOTIFICATION_TYPES['General'];
    
    return {
        body: data.mensaje,
        icon: typeConfig.icon,
        badge: '/favicon.ico',
        color: typeConfig.color,
        tag: `notification-${data.proyecto_id || 'general'}-${Date.now()}`,
        data: {
            titulo: data.titulo,
            mensaje: data.mensaje,
            tipo: data.tipo,
            proyecto_id: data.proyecto_id,
            lista_compra_id: data.lista_compra_id,
            prioridad: data.prioridad,
            accion_requerida: data.accion_requerida,
            timestamp: Date.now()
        },
        actions: [
            {
                action: 'view',
                title: 'Ver',
                icon: '/icons/eye.png'
            },
            {
                action: 'dismiss',
                title: 'Cerrar',
                icon: '/icons/close.png'
            }
        ],
        requireInteraction: data.prioridad === 'Urgente',
        silent: data.prioridad === 'Baja',
        vibrate: data.prioridad === 'Alta' ? [200, 100, 200] : [100]
    };
}

/**
 * Evento: Acción en notificación (botones)
 */
self.addEventListener('notificationclick', (event) => {
    if (event.action === 'dismiss') {
        event.notification.close();
        return;
    }
    
    if (event.action === 'view') {
        // Ya manejado en el evento principal de notificationclick
        return;
    }
});

/**
 * Función para limpiar notificaciones antiguas
 */
function cleanupOldNotifications() {
    // Esta función se puede llamar periódicamente para limpiar notificaciones antiguas
    // Por ahora no la implementamos, pero es útil para el futuro
}

console.log('Service Worker: Cargado y listo para push notifications');
