/**
 * Servicio de Push Notifications
 * Maneja el registro y suscripción a push notifications
 */

import { logPushServiceInfo } from '../utils/pushServiceDetector';

class PushNotificationService {
    constructor() {
        this.registration = null;
        this.subscription = null;
        this.isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
        this.vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY || null;
        
        console.log('🔑 PushNotificationService - VAPID Key:', this.vapidPublicKey ? 'Configurada' : 'No configurada');
        console.log('🔑 PushNotificationService - Soporte:', this.isSupported ? 'Soportado' : 'No soportado');
        
        // Detectar y mostrar información del servicio de push
        if (this.isSupported) {
            logPushServiceInfo();
        }
    }

    /**
     * Verificar si push notifications están soportadas
     */
    isPushSupported() {
        return this.isSupported;
    }

    /**
     * Verificar si el usuario ya tiene permisos
     */
    async getPermissionStatus() {
        if (!this.isSupported) return 'unsupported';
        return await Notification.permission;
    }

    /**
     * Solicitar permisos para push notifications
     */
    async requestPermission() {
        if (!this.isSupported) {
            throw new Error('Push notifications no soportadas en este navegador');
        }

        try {
            const permission = await Notification.requestPermission();
            console.log('Permiso de notificación:', permission);
            return permission;
        } catch (error) {
            console.error('Error solicitando permisos:', error);
            throw error;
        }
    }

    /**
     * Registrar Service Worker
     */
    async registerServiceWorker() {
        if (!this.isSupported) {
            throw new Error('Service Workers no soportados');
        }

        try {
            this.registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registrado:', this.registration);
            
            // Esperar a que esté listo
            await navigator.serviceWorker.ready;
            return this.registration;
        } catch (error) {
            console.error('Error registrando Service Worker:', error);
            throw error;
        }
    }

    /**
     * Suscribirse a push notifications
     */
    async subscribe() {
        if (!this.isSupported) {
            throw new Error('Push notifications no soportadas');
        }

        try {
            // Verificar permisos
            const permission = await this.getPermissionStatus();
            if (permission !== 'granted') {
                const newPermission = await this.requestPermission();
                if (newPermission !== 'granted') {
                    throw new Error('Permisos de notificación denegados');
                }
            }

            // Verificar VAPID key
            if (!this.vapidPublicKey) {
                throw new Error('VAPID public key no configurada. Push notifications no disponibles.');
            }

            // Registrar Service Worker si no está registrado
            if (!this.registration) {
                await this.registerServiceWorker();
            }

            // Crear suscripción
            let applicationServerKey;
            try {
                applicationServerKey = this.urlBase64ToUint8Array(this.vapidPublicKey);
            } catch (keyError) {
                console.error('Error procesando VAPID key:', keyError);
                throw new Error('VAPID key inválida. Push notifications no disponibles.');
            }
            
            this.subscription = await this.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            });

            console.log('Suscripción push creada:', this.subscription);

            // Enviar suscripción al servidor
            await this.sendSubscriptionToServer(this.subscription);

            return this.subscription;
        } catch (error) {
            console.error('Error suscribiéndose a push notifications:', error);
            throw error;
        }
    }

    /**
     * Desuscribirse de push notifications
     */
    async unsubscribe() {
        if (!this.subscription) {
            return;
        }

        try {
            const unsubscribed = await this.subscription.unsubscribe();
            if (unsubscribed) {
                console.log('Desuscrito de push notifications');
                
                // Notificar al servidor
                await this.removeSubscriptionFromServer(this.subscription);
                
                this.subscription = null;
            }
            return unsubscribed;
        } catch (error) {
            console.error('Error desuscribiéndose:', error);
            throw error;
        }
    }

    /**
     * Enviar suscripción al servidor
     */
    async sendSubscriptionToServer(subscription) {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/push/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    subscription: subscription,
                    userAgent: navigator.userAgent
                })
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const result = await response.json();
            console.log('Suscripción enviada al servidor:', result);
            return result;
        } catch (error) {
            console.error('Error enviando suscripción al servidor:', error);
            throw error;
        }
    }

    /**
     * Remover suscripción del servidor
     */
    async removeSubscriptionFromServer(subscription) {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/push/unsubscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    endpoint: subscription.endpoint
                })
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const result = await response.json();
            console.log('Suscripción removida del servidor:', result);
            return result;
        } catch (error) {
            console.error('Error removiendo suscripción del servidor:', error);
            throw error;
        }
    }

    /**
     * Verificar si ya está suscrito
     */
    async isSubscribed() {
        if (!this.registration) {
            return false;
        }

        try {
            const subscription = await this.registration.pushManager.getSubscription();
            return !!subscription;
        } catch (error) {
            console.error('Error verificando suscripción:', error);
            return false;
        }
    }

    /**
     * Obtener suscripción actual
     */
    async getCurrentSubscription() {
        if (!this.registration) {
            return null;
        }

        try {
            return await this.registration.pushManager.getSubscription();
        } catch (error) {
            console.error('Error obteniendo suscripción actual:', error);
            return null;
        }
    }

    /**
     * Convertir VAPID key de base64 a Uint8Array
     */
    urlBase64ToUint8Array(base64String) {
        if (!base64String) {
            throw new Error('VAPID public key no configurada');
        }

        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Enviar notificación de prueba
     */
    async sendTestNotification() {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/push/test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const result = await response.json();
            console.log('Notificación de prueba enviada:', result);
            return result;
        } catch (error) {
            console.error('Error enviando notificación de prueba:', error);
            throw error;
        }
    }

    /**
     * Inicializar el servicio de push notifications
     */
    async initialize() {
        if (!this.isSupported) {
            console.warn('Push notifications no soportadas en este navegador');
            return false;
        }

        try {
            // Registrar Service Worker
            await this.registerServiceWorker();
            
            // Verificar si ya está suscrito
            const isSubscribed = await this.isSubscribed();
            if (isSubscribed) {
                this.subscription = await this.getCurrentSubscription();
                console.log('Ya suscrito a push notifications');
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error inicializando push notifications:', error);
            return false;
        }
    }
}

// Crear instancia singleton
const pushNotificationService = new PushNotificationService();

export default pushNotificationService;
