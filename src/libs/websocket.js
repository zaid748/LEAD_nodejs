const WebSocket = require('ws');

/**
 * Sistema de WebSocket para notificaciones en tiempo real
 */
class WebSocketManager {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Map(); // Map para almacenar conexiones por usuario
        this.setupWebSocket();
    }

    /**
     * Configurar WebSocket
     */
    setupWebSocket() {
        this.wss.on('connection', (ws, req) => {
            console.log('Nueva conexión WebSocket establecida');

            // Extraer token de la URL o headers
            const token = this.extractToken(req);
            if (!token) {
                ws.close(1008, 'Token no proporcionado');
                return;
            }

            // Verificar token y obtener usuario
            this.authenticateConnection(ws, token);

            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message);
                    this.handleMessage(ws, data);
                } catch (error) {
                    console.error('Error al procesar mensaje WebSocket:', error);
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Mensaje inválido'
                    }));
                }
            });

            ws.on('close', () => {
                this.removeClient(ws);
                console.log('Conexión WebSocket cerrada');
            });

            ws.on('error', (error) => {
                console.error('Error en WebSocket:', error);
                this.removeClient(ws);
            });
        });
    }

    /**
     * Extraer token de la conexión
     */
    extractToken(req) {
        // Intentar extraer token de query string
        const url = new URL(req.url, `http://${req.headers.host}`);
        let token = url.searchParams.get('token');

        // Si no hay token en query, intentar en headers
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        return token;
    }

    /**
     * Autenticar conexión WebSocket
     */
    async authenticateConnection(ws, token) {
        try {
            console.log('🔐 WebSocket - Autenticando conexión con token:', token.substring(0, 20) + '...');
            const userId = this.verifyToken(token);
            
            if (userId) {
                // Almacenar conexión por usuario (siempre como string)
                const userIdStr = userId.toString();
                this.clients.set(userIdStr, ws);
                ws.userId = userIdStr;
                
                console.log(`✅ WebSocket - Usuario ${userIdStr} conectado exitosamente`);
                console.log(`📊 WebSocket - Total clientes conectados: ${this.clients.size}`);
                
                // Enviar confirmación de conexión
                ws.send(JSON.stringify({
                    type: 'connection_established',
                    message: 'Conexión WebSocket establecida exitosamente',
                    userId: userIdStr
                }));

                console.log(`🔔 WebSocket - Usuario ${userIdStr} conectado via WebSocket`);
            } else {
                console.log('❌ WebSocket - Token inválido, cerrando conexión');
                ws.close(1008, 'Token inválido');
            }
        } catch (error) {
            console.error('❌ Error en autenticación WebSocket:', error);
            ws.close(1008, 'Error de autenticación');
        }
    }

    /**
     * Verificar token usando JWT real
     */
    verifyToken(token) {
        try {
            const jwt = require('jsonwebtoken');
            const JWT_SECRET = process.env.JWT_SECRET || process.env.SECRET || process.env.SESSION_SECRET;
            
            if (!JWT_SECRET) {
                console.error('❌ JWT_SECRET no configurado');
                return null;
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            console.log('🔐 WebSocket - Token verificado para usuario:', decoded._id);
            return decoded._id;
        } catch (error) {
            console.error('❌ Error al verificar token WebSocket:', error.message);
            return null;
        }
    }

    /**
     * Decodificar token (ya no se usa, pero mantenemos para compatibilidad)
     */
    decodeToken(token) {
        return this.verifyToken(token);
    }

    /**
     * Manejar mensajes recibidos
     */
    handleMessage(ws, data) {
        switch (data.type) {
            case 'ping':
                ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
                break;
            
            case 'subscribe_project':
                // Suscribir a notificaciones de un proyecto específico
                if (data.projectId) {
                    ws.subscribedProjects = ws.subscribedProjects || new Set();
                    ws.subscribedProjects.add(data.projectId);
                    ws.send(JSON.stringify({
                        type: 'subscribed',
                        projectId: data.projectId,
                        message: 'Suscrito a notificaciones del proyecto'
                    }));
                }
                break;
            
            case 'subscribe_notifications':
                // Suscribir a notificaciones generales
                ws.subscribedToNotifications = true;
                ws.send(JSON.stringify({
                    type: 'subscribed',
                    message: 'Suscrito a notificaciones generales'
                }));
                break;
            
            case 'unsubscribe_project':
                // Desuscribir de un proyecto
                if (data.projectId && ws.subscribedProjects) {
                    ws.subscribedProjects.delete(data.projectId);
                    ws.send(JSON.stringify({
                        type: 'unsubscribed',
                        projectId: data.projectId,
                        message: 'Desuscrito de notificaciones del proyecto'
                    }));
                }
                break;
            
            default:
                ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Tipo de mensaje no reconocido'
                }));
        }
    }

    /**
     * Enviar notificación a un usuario específico
     */
    sendNotification(userId, notification) {
        console.log('📡 WebSocket - Intentando enviar notificación a usuario:', userId);
        console.log('📡 WebSocket - Total clientes conectados:', this.clients.size);
        console.log('📡 WebSocket - Clientes conectados:', Array.from(this.clients.keys()));
        
        // Convertir userId a string para asegurar consistencia
        const userIdStr = userId.toString();
        const ws = this.clients.get(userIdStr);
        
        console.log('📡 WebSocket - Usuario encontrado en clients:', !!ws);
        console.log('📡 WebSocket - Estado de conexión:', ws ? ws.readyState : 'No encontrado');
        
        if (ws && ws.readyState === WebSocket.OPEN) {
            try {
                const message = {
                    type: 'notification',
                    data: notification
                };
                console.log('📡 WebSocket - Enviando mensaje:', message);
                ws.send(JSON.stringify(message));
                console.log('✅ WebSocket - Notificación enviada exitosamente a usuario:', userIdStr);
                return true;
            } catch (error) {
                console.error('❌ Error al enviar notificación:', error);
                return false;
            }
        } else {
            console.log('⚠️ WebSocket - Usuario no conectado o conexión cerrada:', userIdStr);
            if (ws) {
                console.log('⚠️ WebSocket - Estado de conexión:', ws.readyState);
            } else {
                console.log('⚠️ WebSocket - No se encontró conexión para usuario:', userIdStr);
                // Mostrar todos los clientes para debugging
                console.log('📋 WebSocket - Todos los clientes conectados:');
                this.clients.forEach((clientWs, clientId) => {
                    console.log(`  - Cliente: ${clientId}, Estado: ${clientWs.readyState}`);
                });
            }
        }
        return false;
    }

    /**
     * Enviar notificación a todos los usuarios suscritos a notificaciones generales
     */
    broadcastToAllUsers(notification) {
        let sentCount = 0;
        
        this.clients.forEach((ws, userId) => {
            if (ws.readyState === WebSocket.OPEN && ws.subscribedToNotifications) {
                try {
                    ws.send(JSON.stringify({
                        type: 'notification',
                        data: notification
                    }));
                    sentCount++;
                } catch (error) {
                    console.error(`Error al enviar notificación general a usuario ${userId}:`, error);
                }
            }
        });

        return sentCount;
    }

    /**
     * Enviar notificación a todos los usuarios suscritos a un proyecto
     */
    broadcastToProject(projectId, notification) {
        let sentCount = 0;
        
        this.clients.forEach((ws, userId) => {
            if (ws.readyState === WebSocket.OPEN && 
                ws.subscribedProjects && 
                ws.subscribedProjects.has(projectId)) {
                
                try {
                    ws.send(JSON.stringify({
                        type: 'project_notification',
                        projectId: projectId,
                        data: notification
                    }));
                    sentCount++;
                } catch (error) {
                    console.error(`Error al enviar notificación a usuario ${userId}:`, error);
                }
            }
        });

        return sentCount;
    }

    /**
     * Enviar notificación a todos los usuarios con un rol específico
     */
    async broadcastToRole(role, notification) {
        try {
            // Aquí implementarías la lógica para obtener usuarios por rol
            // Por ahora, simulamos el envío
            let sentCount = 0;
            
            this.clients.forEach((ws, userId) => {
                if (ws.readyState === WebSocket.OPEN) {
                    try {
                        ws.send(JSON.stringify({
                            type: 'role_notification',
                            role: role,
                            data: notification
                        }));
                        sentCount++;
                    } catch (error) {
                        console.error(`Error al enviar notificación por rol a usuario ${userId}:`, error);
                    }
                }
            });

            return sentCount;
        } catch (error) {
            console.error('Error al enviar notificación por rol:', error);
            return 0;
        }
    }

    /**
     * Remover cliente de la lista
     */
    removeClient(ws) {
        if (ws.userId) {
            this.clients.delete(ws.userId);
            console.log(`Usuario ${ws.userId} desconectado de WebSocket`);
        }
    }

    /**
     * Obtener estadísticas de conexiones
     */
    getStats() {
        return {
            totalConnections: this.clients.size,
            activeConnections: Array.from(this.clients.values())
                .filter(ws => ws.readyState === WebSocket.OPEN).length,
            subscribedProjects: Array.from(this.clients.values())
                .reduce((total, ws) => total + (ws.subscribedProjects ? ws.subscribedProjects.size : 0), 0)
        };
    }

    /**
     * Cerrar todas las conexiones
     */
    closeAll() {
        this.clients.forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close(1000, 'Servidor cerrando');
            }
        });
        this.clients.clear();
    }
}

module.exports = WebSocketManager;
