/**
 * Servicio de Notificaciones Móviles
 * Maneja notificaciones específicas para dispositivos móviles
 */

import { detectMobileCapabilities, getMobileNotificationStrategy, requestMobilePermissions } from '../utils/mobileDetection';

class MobileNotificationService {
    constructor() {
        this.capabilities = detectMobileCapabilities();
        this.strategy = getMobileNotificationStrategy();
        this.isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
        this.vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY || null;
        this.registration = null;
        this.subscription = null;
    }

    /**
     * Inicializar notificaciones móviles
     */
    async initialize() {
        console.log('📱 Inicializando notificaciones móviles...');
        console.log('📱 Estrategia:', this.strategy.strategy);
        
        if (this.strategy.strategy === 'mobile_push') {
            return await this.setupMobilePush();
        } else {
            console.log('📱 Usando estrategia básica para móvil');
            return await this.setupBasicMobile();
        }
    }

    /**
     * Configurar push notifications para móvil (como WhatsApp/Facebook)
     */
    async setupMobilePush() {
        try {
            console.log('📱 Configurando push notifications móviles...');
            
            // 1. Registrar Service Worker
            await this.registerServiceWorker();
            
            // 2. Solicitar permisos
            const permissionResult = await requestMobilePermissions();
            
            if (!permissionResult.success || !permissionResult.canPush) {
                console.log('📱 Push notifications no disponibles, usando modo básico');
                return await this.setupBasicMobile();
            }
            
            // 3. Suscribirse a push notifications
            await this.subscribeToPush();
            
            console.log('✅ Push notifications móviles configuradas - ¡Como WhatsApp/Facebook!');
            return {
                success: true,
                type: 'mobile_push',
                message: '¡Notificaciones móviles activadas! Recibirás notificaciones aunque la app esté cerrada.',
                methods: ['push', 'websocket', 'system']
            };
            
        } catch (error) {
            console.error('❌ Error configurando push móvil:', error);
            return await this.setupBasicMobile();
        }
    }

    /**
     * Configurar modo básico para móvil
     */
    async setupBasicMobile() {
        console.log('📱 Configurando modo básico móvil...');
        
        // Solicitar permisos básicos de notificación
        try {
            const permission = await Notification.requestPermission();
            console.log('📱 Permisos básicos:', permission);
        } catch (error) {
            console.log('📱 No se pudieron solicitar permisos básicos:', error);
        }
        
        return {
            success: true,
            type: 'mobile_basic',
            message: 'Modo básico móvil activado. Notificaciones cuando la app esté abierta.',
            methods: ['websocket', 'system']
        };
    }

    /**
     * Registrar Service Worker
     */
    async registerServiceWorker() {
        if (!this.isSupported) {
            throw new Error('Service Worker no soportado');
        }

        try {
            this.registration = await navigator.serviceWorker.register('/sw.js');
            console.log('📱 Service Worker registrado:', this.registration);
            return this.registration;
        } catch (error) {
            console.error('❌ Error registrando Service Worker:', error);
            throw error;
        }
    }

    /**
     * Suscribirse a push notifications
     */
    async subscribeToPush() {
        if (!this.registration) {
            throw new Error('Service Worker no registrado');
        }

        if (!this.vapidPublicKey) {
            throw new Error('VAPID key no configurada');
        }

        try {
            // Convertir VAPID key
            const applicationServerKey = this.urlBase64ToUint8Array(this.vapidPublicKey);
            
            // Suscribirse
            this.subscription = await this.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            });

            console.log('📱 Suscripción push creada:', this.subscription);

            // Enviar al servidor
            await this.sendSubscriptionToServer(this.subscription);
            
            return this.subscription;
        } catch (error) {
            console.error('❌ Error suscribiéndose a push:', error);
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
                    userAgent: navigator.userAgent,
                    isMobile: this.capabilities.isMobile
                })
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const data = await response.json();
            console.log('📱 Suscripción enviada al servidor:', data);
            return data;
        } catch (error) {
            console.error('❌ Error enviando suscripción:', error);
            throw error;
        }
    }

    /**
     * Convertir VAPID key
     */
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Mostrar notificación móvil
     */
    showMobileNotification(title, message, options = {}) {
        if (!this.registration) {
            console.log('📱 Service Worker no registrado, usando notificación básica');
            this.showBasicNotification(title, message, options);
            return;
        }

        const notificationOptions = {
            body: message,
            icon: '/img/lead-logo.svg',
            badge: '/img/lead-logo.svg',
            vibrate: [100, 50, 100],
            data: {
                url: options.url || '/dashboard/remodelacion',
                timestamp: Date.now()
            },
            actions: [
                { action: 'open', title: 'Abrir App' },
                { action: 'close', title: 'Cerrar' }
            ],
            ...options
        };

        this.registration.showNotification(title, notificationOptions);
    }

    /**
     * Mostrar notificación básica
     */
    showBasicNotification(title, message, options = {}) {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '/img/lead-logo.svg',
                ...options
            });
        }
    }

    /**
     * Verificar estado de las notificaciones móviles
     */
    getStatus() {
        return {
            isMobile: this.capabilities.isMobile,
            strategy: this.strategy.strategy,
            methods: this.strategy.methods,
            hasServiceWorker: !!this.registration,
            hasPushSubscription: !!this.subscription,
            notificationPermission: Notification.permission,
            canPush: this.strategy.strategy === 'mobile_push' && Notification.permission === 'granted'
        };
    }
}

const mobileNotificationService = new MobileNotificationService();
export default mobileNotificationService;
