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
            // Aquí se implementaría la verificación del token
            // Por ahora, simulamos la autenticación
            const userId = this.verifyToken(token);
            
            if (userId) {
                // Almacenar conexión por usuario
                this.clients.set(userId, ws);
                ws.userId = userId;
                
                // Enviar confirmación de conexión
                ws.send(JSON.stringify({
                    type: 'connection_established',
                    message: 'Conexión WebSocket establecida exitosamente',
                    userId: userId
                }));

                console.log(`Usuario ${userId} conectado via WebSocket`);
            } else {
                ws.close(1008, 'Token inválido');
            }
        } catch (error) {
            console.error('Error en autenticación WebSocket:', error);
            ws.close(1008, 'Error de autenticación');
        }
    }

    /**
     * Verificar token (implementar según tu sistema de autenticación)
     */
    verifyToken(token) {
        // Aquí implementarías la verificación real del token
        // Por ahora, simulamos que el token es válido
        
        try {
            // Simulación: extraer userId del token
            // En implementación real, verificarías el token con tu secret
            const decoded = this.decodeToken(token);
            return decoded ? decoded.userId : null;
        } catch (error) {
            console.error('Error al verificar token:', error);
            return null;
        }
    }

    /**
     * Decodificar token (implementar según tu sistema)
     */
    decodeToken(token) {
        // Implementar según tu sistema de autenticación
        // Por ahora, simulamos la decodificación
        try {
            // En implementación real, usarías JWT.verify()
            // Por ahora, simulamos que el token contiene userId
            return { userId: token.substring(0, 24) }; // Simular ObjectId
        } catch (error) {
            return null;
        }
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
        const ws = this.clients.get(userId);
        if (ws && ws.readyState === WebSocket.OPEN) {
            try {
                ws.send(JSON.stringify({
                    type: 'notification',
                    data: notification
                }));
                return true;
            } catch (error) {
                console.error('Error al enviar notificación:', error);
                return false;
            }
        }
        return false;
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
