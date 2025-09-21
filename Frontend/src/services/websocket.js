// Servicio WebSocket para notificaciones en tiempo real
import { getToken, getWebSocketToken } from './auth';

class WebSocketService {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectInterval = 3000; // 3 segundos
        this.isConnecting = false;
        this.messageHandlers = new Map();
        this.pendingNotifications = []; // Cola de notificaciones pendientes
    }

    /**
     * Conectar al WebSocket
     */
    async connect() {
        console.log('🔌 WebSocketService.connect() llamado. Estado actual:', this.ws ? this.ws.readyState : 'No inicializado');
        
        if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
            console.log('⚠️ WebSocket ya está conectado o conectándose');
            return;
        }

        try {
            this.isConnecting = true;
            console.log('🔄 Iniciando conexión WebSocket...');
            
            // Obtener token WebSocket desde el backend
            const token = await getWebSocketToken();
               console.log('🔑 Token WebSocket obtenido:', !!token, token ? 'Longitud: ' + token.length : 'N/A');
            if (!token) {
                console.error('❌ No se pudo obtener token WebSocket');
                this.isConnecting = false;
                return;
            }

            // Determinar la URL del WebSocket con token
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const host = window.location.hostname;
            const port = import.meta.env.VITE_API_PORT || '4000';
            const wsUrl = `${protocol}//${host}:${port}?token=${token}`;

            console.log('🔌 Conectando a WebSocket:', wsUrl);

            this.ws = new WebSocket(wsUrl);

               this.ws.onopen = (event) => {
                   console.log('✅ WebSocket conectado exitosamente. Evento:', event);
                console.log('✅ WebSocket conectado exitosamente');
                this.isConnecting = false;
                this.reconnectAttempts = 0;
                this.dispatchMessage('connection_status', true);
                
                // Suscribirse a notificaciones generales
                setTimeout(() => {
                    this.subscribeToNotifications();
                }, 1000);
            };

            this.ws.onmessage = (event) => {
                try {
                    console.log('📨 WebSocket - Mensaje raw recibido:', event.data);
                    const data = JSON.parse(event.data);
                    console.log('📨 WebSocket - Datos parseados:', data);
                    this.handleMessage(data);
                } catch (error) {
                    console.error('❌ Error al parsear mensaje WebSocket:', error);
                    console.error('❌ Datos raw:', event.data);
                }
            };

               this.ws.onclose = (event) => {
                   console.log('❌ WebSocket cerrado. Código:', event.code, 'Razón:', event.reason, 'Fue limpio:', event.wasClean);
                console.log('❌ WebSocket cerrado:', event.code, event.reason);
                this.isConnecting = false;
                this.dispatchMessage('connection_status', false);
                this.handleReconnect();
            };

               this.ws.onerror = (error) => {
                   console.error('❌ Error en WebSocket:', error);
                console.error('❌ Error en WebSocket:', error);
                this.isConnecting = false;
                this.dispatchMessage('connection_status', false);
            };

        } catch (error) {
            console.error('❌ Error al conectar WebSocket:', error);
            this.isConnecting = false;
            this.dispatchMessage('connection_status', false);
            this.handleReconnect();
        }
    }

    /**
     * Manejar reconexión automática
     */
    handleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log('Max intentos de reconexión alcanzados. Último estado:', this.ws ? this.ws.readyState : 'N/A');
            console.log('⚠️ WebSocket - No se pudo reconectar después de', this.maxReconnectAttempts, 'intentos');
            return;
        }

        this.reconnectAttempts++;
        console.log(`🔄 Intentando reconectar WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})... Estado actual:`, this.ws ? this.ws.readyState : 'N/A');
        
        // Aumentar el intervalo de reconexión progresivamente
        const backoffDelay = this.reconnectInterval * Math.pow(1.5, this.reconnectAttempts - 1);
        console.log(`⏱️ Esperando ${backoffDelay}ms antes de reconectar...`);
        
        setTimeout(() => {
            console.log('🔄 Ejecutando reconexión WebSocket...');
            this.connect();
        }, backoffDelay);
    }

    /**
     * Manejar mensajes recibidos
     */
    handleMessage(data) {
        console.log('📨 Mensaje WebSocket recibido:', data);

        switch (data.type) {
            case 'auth_success':
                console.log('✅ Autenticación WebSocket exitosa');
                // Re-suscribir a proyectos después de reconexión
                this.subscribedProjects.forEach(projectId => {
                    this.subscribeToProject(projectId);
                });
                break;

            case 'auth_error':
                console.error('❌ Error de autenticación WebSocket:', data.message);
                break;

            case 'notification':
            case 'remodelacion_notification':
                this.handleNotification(data);
                break;

            case 'project_notification':
                this.handleProjectNotification(data);
                break;

            case 'pong':
                // Respuesta a ping - mantener conexión viva
                break;

            case 'connection_established':
                console.log('✅ Conexión WebSocket establecida:', data.message);
                this.dispatchMessage('connection_status', true);
                break;

            case 'subscribed':
                console.log('✅ Suscripción confirmada:', data.message);
                break;

            default:
                console.log('Tipo de mensaje no manejado:', data.type);
        }
    }

    /**
     * Manejar notificaciones generales
     */
    handleNotification(data) {
        // El backend envía { type: 'notification', data: notificacion }
        const notification = data.data || data.notification || data;
        
        // Buscar handlers de notificación
        const notificationHandlers = Array.from(this.messageHandlers.entries())
            .filter(([key, handler]) => key === 'notification' || key === 'all');
        
        if (notificationHandlers.length === 0) {
            // Guardar notificación en cola para cuando se registren los handlers
            this.pendingNotifications.push(notification);
            return;
        }
        
        // Ejecutar handlers registrados
        notificationHandlers.forEach(([key, handler]) => {
            try {
                handler(notification);
            } catch (error) {
                console.error('Error en handler de notificación:', key, error);
            }
        });

        // También disparar el handler para la lista de notificaciones (GlobalNotifications)
        const listHandlers = Array.from(this.messageHandlers.entries())
            .filter(([key, handler]) => key === 'notification_list');
        
        listHandlers.forEach(([key, handler]) => {
            try {
                handler(notification);
            } catch (error) {
                console.error('Error en handler de lista de notificaciones:', key, error);
            }
        });

        // Mostrar notificación visual si está disponible
        if (window.showNotification) {
            window.showNotification({
                title: notification.titulo,
                message: notification.mensaje,
                type: notification.tipo
            });
        }
    }

    /**
     * Manejar notificaciones de proyecto
     */
    handleProjectNotification(data) {
        const notification = data.data;
        
        // Notificar a handlers específicos del proyecto
        this.messageHandlers.forEach((handler, key) => {
            if (key === `project_${data.projectId}` || key === 'project_notification') {
                handler(notification);
            }
        });
    }

    /**
     * Suscribirse a notificaciones generales
     */
    subscribeToNotifications() {
        if (!this.isConnected()) {
            console.log('WebSocket no conectado, guardando suscripción para más tarde');
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'subscribe_notifications'
        }));

        console.log('📌 Suscrito a notificaciones generales');
    }

    /**
     * Registrar handler para mensajes
     */
    onMessage(type, handler) {
        this.messageHandlers.set(type, handler);
        
        // Si se registra un handler de notificación y hay notificaciones pendientes, procesarlas
        if ((type === 'notification' || type === 'notification_list' || type === 'all') && this.pendingNotifications.length > 0) {
            const pendingCopy = [...this.pendingNotifications];
            this.pendingNotifications = []; // Limpiar cola
            
            pendingCopy.forEach(notification => {
                try {
                    handler(notification);
                } catch (error) {
                    console.error('Error al procesar notificación pendiente:', error);
                }
            });
        }
    }

    /**
     * Remover handler
     */
    offMessage(type) {
        this.messageHandlers.delete(type);
    }

    /**
     * Enviar mensaje a los handlers registrados
     */
    dispatchMessage(type, data) {
        const handler = this.messageHandlers.get(type);
        if (handler) {
            try {
                handler(data);
            } catch (error) {
                console.error(`Error en handler de ${type}:`, error);
            }
        }
    }

    /**
     * Verificar si está conectado
     */
    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    /**
     * Desconectar WebSocket manualmente
     */
    disconnect() {
        console.log('🔌 Desconectando WebSocket manualmente...');
        if (this.ws) {
            this.ws.close(1000, 'Desconexión intencional');
            this.ws = null;
        }
        this.isConnecting = false;
        this.messageHandlers.clear();
        this.reconnectAttempts = 0;
        this.dispatchMessage('connection_status', false);
    }

    /**
     * Enviar ping para mantener conexión viva
     */
    ping() {
        if (this.isConnected()) {
            this.ws.send(JSON.stringify({
                type: 'ping',
                timestamp: Date.now()
            }));
        }
    }
}

// Crear instancia única del servicio
const webSocketService = new WebSocketService();

// Iniciar ping cada 30 segundos para mantener conexión viva
setInterval(() => {
    webSocketService.ping();
}, 30000);

export default webSocketService;
