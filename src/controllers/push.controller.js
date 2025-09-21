const webpush = require('web-push');
const PushSubscription = require('../models/pushSubscription');
const User = require('../models/user');
// const axios = require('axios'); // Comentado para evitar dependencias

class PushController {
    constructor() {
        // Configurar web-push con VAPID keys
        this.setupWebPush();
    }

    /**
     * Configurar web-push con VAPID keys
     */
    setupWebPush() {
        const vapidKeys = {
            publicKey: process.env.VAPID_PUBLIC_KEY,
            privateKey: process.env.VAPID_PRIVATE_KEY,
            subject: process.env.VAPID_SUBJECT || 'mailto:admin@lead-inmobiliaria.com'
        };

        if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
            console.warn('⚠️ VAPID keys no configuradas. Push notifications no funcionarán.');
            return;
        }

        try {
            webpush.setVapidDetails(
                vapidKeys.subject,
                vapidKeys.publicKey,
                vapidKeys.privateKey
            );
            console.log('✅ Web-push configurado correctamente con VAPID keys');
        } catch (error) {
            console.error('❌ Error configurando web-push:', error);
        }

        console.log('✅ Web-push configurado correctamente');
    }

    /**
     * Enviar notificación FCM - DESHABILITADO para evitar límites
     * Usando solo WebSocket + Notificaciones del Sistema
     */
    async sendFCMNotification(subscription, notificationData) {
        console.log('🚫 FCM deshabilitado - usando solo WebSocket + Sistema');
        return { success: false, error: 'FCM deshabilitado para evitar límites' };
        
        /* CÓDIGO FCM COMENTADO
        try {
            const fcmServerKey = process.env.FCM_SERVER_KEY;
            
            if (!fcmServerKey) {
                return { success: false, error: 'FCM_SERVER_KEY no configurada' };
            }

            // Extraer el token FCM del endpoint
            const fcmToken = subscription.endpoint.split('/').pop();
            
            const payload = {
                to: fcmToken,
                notification: {
                    title: notificationData.titulo,
                    body: notificationData.mensaje,
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    data: {
                        url: '/dashboard/remodelacion',
                        notificationId: notificationData._id || Date.now().toString()
                    }
                },
                data: {
                    title: notificationData.titulo,
                    body: notificationData.mensaje,
                    url: '/dashboard/remodelacion',
                    notificationId: notificationData._id || Date.now().toString()
                }
            };

            const response = await axios.post('https://fcm.googleapis.com/fcm/send', payload, {
                headers: {
                    'Authorization': `key=${fcmServerKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success === 1) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.data };
            }

        } catch (error) {
            console.error('Error enviando notificación FCM:', error.response?.data || error.message);
            return { success: false, error: error.response?.data || error.message };
        }
        */
    }

    /**
     * Suscribir usuario a push notifications
     */
    static async subscribe(req, res) {
        try {
            const { subscription, userAgent } = req.body;
            const userId = req.user._id;

            if (!subscription || !subscription.endpoint) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de suscripción inválidos'
                });
            }

            // Verificar si ya existe una suscripción para este endpoint
            let pushSubscription = await PushSubscription.findOne({
                endpoint: subscription.endpoint
            });

            if (pushSubscription) {
                // Actualizar suscripción existente
                pushSubscription.usuario_id = userId;
                pushSubscription.keys = subscription.keys;
                pushSubscription.userAgent = userAgent;
                pushSubscription.active = true;
                pushSubscription.lastUsed = new Date();
                await pushSubscription.save();
            } else {
                // Crear nueva suscripción
                pushSubscription = new PushSubscription({
                    usuario_id: userId,
                    endpoint: subscription.endpoint,
                    keys: subscription.keys,
                    userAgent: userAgent
                });
                await pushSubscription.save();
            }

            res.json({
                success: true,
                message: 'Suscripción a push notifications exitosa',
                data: {
                    subscriptionId: pushSubscription._id,
                    endpoint: pushSubscription.endpoint
                }
            });

        } catch (error) {
            console.error('Error suscribiendo a push notifications:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Desuscribir usuario de push notifications
     */
    static async unsubscribe(req, res) {
        try {
            const { endpoint } = req.body;
            const userId = req.user._id;

            if (!endpoint) {
                return res.status(400).json({
                    success: false,
                    message: 'Endpoint requerido'
                });
            }

            const result = await PushSubscription.updateOne(
                { endpoint: endpoint, usuario_id: userId },
                { active: false }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Suscripción no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Desuscripción exitosa'
            });

        } catch (error) {
            console.error('Error desuscribiendo de push notifications:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Enviar notificación de prueba
     */
    static async sendTestNotification(req, res) {
        try {
            const userId = req.user._id;

            // Obtener suscripciones activas del usuario
            const subscriptions = await PushSubscription.find({
                usuario_id: userId,
                active: true
            });

            if (subscriptions.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No hay suscripciones activas para este usuario'
                });
            }

            // Preparar notificación de prueba
            const notificationPayload = JSON.stringify({
                titulo: 'Notificación de Prueba',
                mensaje: `Hola ${req.user.prim_nom}! Esta es una notificación de prueba del sistema LEAD.`,
                tipo: 'General',
                proyecto_id: null,
                lista_compra_id: null,
                prioridad: 'Media',
                accion_requerida: 'Ninguna'
            });

            // Enviar a todas las suscripciones del usuario
            const results = [];
            for (const subscription of subscriptions) {
                try {
                    await webpush.sendNotification(
                        {
                            endpoint: subscription.endpoint,
                            keys: subscription.keys
                        },
                        notificationPayload
                    );
                    
                    // Marcar como usada
                    subscription.markAsUsed();
                    
                    results.push({
                        endpoint: subscription.endpoint,
                        success: true
                    });
                } catch (error) {
                    console.error('Error enviando notificación a suscripción:', error);
                    
                    // Si el endpoint es inválido, desactivar la suscripción
                    if (error.statusCode === 410 || error.statusCode === 404) {
                        subscription.active = false;
                        await subscription.save();
                    }
                    
                    results.push({
                        endpoint: subscription.endpoint,
                        success: false,
                        error: error.message
                    });
                }
            }

            res.json({
                success: true,
                message: 'Notificación de prueba enviada',
                data: {
                    totalSubscriptions: subscriptions.length,
                    results: results
                }
            });

        } catch (error) {
            console.error('Error enviando notificación de prueba:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Obtener suscripciones del usuario
     */
    static async getUserSubscriptions(req, res) {
        try {
            const userId = req.user._id;

            const subscriptions = await PushSubscription.find({
                usuario_id: userId,
                active: true
            }).select('endpoint userAgent lastUsed createdAt');

            res.json({
                success: true,
                message: 'Suscripciones obtenidas exitosamente',
                data: subscriptions
            });

        } catch (error) {
            console.error('Error obteniendo suscripciones:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    /**
     * Enviar notificación push a un usuario específico
     */
    static async sendNotificationToUser(userId, notificationData) {
        try {
            // Obtener suscripciones activas del usuario
            const subscriptions = await PushSubscription.find({
                usuario_id: userId,
                active: true
            });

            if (subscriptions.length === 0) {
                console.log(`Usuario ${userId} no tiene suscripciones activas`);
                return { sent: 0, total: 0 };
            }

            const payload = JSON.stringify(notificationData);
            let sentCount = 0;

            for (const subscription of subscriptions) {
                try {
                    // Verificar si es un endpoint de FCM
                    const isFCM = subscription.endpoint.includes('fcm.googleapis.com');
                    
                    if (isFCM) {
                        console.log('🔔 Endpoint FCM detectado. Intentando enviar notificación FCM...');
                        
                        // Intentar enviar notificación FCM
                        const fcmResult = await this.sendFCMNotification(subscription, notificationData);
                        if (fcmResult.success) {
                            console.log('✅ Notificación FCM enviada exitosamente');
                            subscription.markAsUsed();
                            sentCount++;
                        } else {
                            console.log('⚠️ Error enviando FCM:', fcmResult.error);
                            console.log('💡 Para FCM, necesitas configurar FCM_SERVER_KEY en las variables de entorno.');
                            subscription.markAsUsed();
                        }
                        continue;
                    }

                    await webpush.sendNotification(
                        {
                            endpoint: subscription.endpoint,
                            keys: subscription.keys
                        },
                        payload
                    );
                    
                    // Marcar como usada
                    subscription.markAsUsed();
                    sentCount++;
                    console.log(`✅ Push notification enviada exitosamente a: ${subscription.endpoint.substring(0, 50)}...`);
                    
                } catch (error) {
                    console.error('❌ Error enviando push notification:', error);
                    
                    // Si el endpoint es inválido, desactivar la suscripción
                    if (error.statusCode === 410 || error.statusCode === 404) {
                        console.log(`🔧 Endpoint inválido detectado, desactivando suscripción: ${subscription.endpoint.substring(0, 50)}...`);
                        subscription.active = false;
                        await subscription.save();
                    } else if (error.statusCode === 401) {
                        console.log('🔐 Error de autenticación. Verificar VAPID keys o configuración FCM.');
                    }
                }
            }

            console.log(`Push notification enviada a ${sentCount}/${subscriptions.length} dispositivos del usuario ${userId}`);
            return { sent: sentCount, total: subscriptions.length };

        } catch (error) {
            console.error('Error enviando notificación push:', error);
            return { sent: 0, total: 0, error: error.message };
        }
    }

    /**
     * Limpiar suscripciones inactivas
     */
    static async cleanupInactiveSubscriptions(req, res) {
        try {
            const { daysInactive = 30 } = req.body;
            
            const result = await PushSubscription.cleanupInactiveSubscriptions(daysInactive);
            
            res.json({
                success: true,
                message: 'Limpieza de suscripciones inactivas completada',
                data: result
            });

        } catch (error) {
            console.error('Error limpiando suscripciones inactivas:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}

module.exports = PushController;
