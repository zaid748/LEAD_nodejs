/**
 * Detector de Dispositivos Móviles y Capacidades
 * Detecta si el usuario está en móvil y qué tipo de notificaciones puede recibir
 */

export const detectMobileCapabilities = () => {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    
    // Detectar navegador
    const isChrome = /Chrome/i.test(userAgent) && !/Edge/i.test(userAgent);
    const isSamsungBrowser = /SamsungBrowser/i.test(userAgent);
    const isFirefox = /Firefox/i.test(userAgent);
    const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
    
    return {
        isMobile,
        isAndroid,
        isIOS,
        browser: {
            chrome: isChrome,
            samsung: isSamsungBrowser,
            firefox: isFirefox,
            safari: isSafari
        },
        pushCapabilities: {
            // Chrome en Android soporta push notifications
            chromeAndroid: isMobile && isAndroid && isChrome,
            // Samsung Browser soporta push notifications
            samsungAndroid: isMobile && isAndroid && isSamsungBrowser,
            // Firefox en Android soporta push notifications
            firefoxAndroid: isMobile && isAndroid && isFirefox,
            // Safari en iOS NO soporta push notifications en web
            safariIOS: false // Safari no soporta push notifications en web apps
        }
    };
};

export const getMobileNotificationStrategy = () => {
    const capabilities = detectMobileCapabilities();
    
    if (!capabilities.isMobile) {
        return {
            strategy: 'desktop',
            message: 'Dispositivo de escritorio - usando WebSocket + Sistema',
            methods: ['websocket', 'system']
        };
    }
    
    if (capabilities.pushCapabilities.chromeAndroid || 
        capabilities.pushCapabilities.samsungAndroid || 
        capabilities.pushCapabilities.firefoxAndroid) {
        return {
            strategy: 'mobile_push',
            message: 'Móvil con soporte de Push - como WhatsApp/Facebook',
            methods: ['websocket', 'push', 'system'],
            priority: 'push'
        };
    }
    
    if (capabilities.isIOS) {
        return {
            strategy: 'ios_limited',
            message: 'iOS - solo WebSocket cuando app está abierta',
            methods: ['websocket', 'system'],
            note: 'iOS Safari no soporta push notifications en web apps'
        };
    }
    
    return {
        strategy: 'mobile_basic',
        message: 'Móvil básico - WebSocket + Sistema',
        methods: ['websocket', 'system']
    };
};

export const requestMobilePermissions = async () => {
    const strategy = getMobileNotificationStrategy();
    
    if (strategy.strategy === 'mobile_push') {
        try {
            // Solicitar permisos de notificación
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                console.log('✅ Permisos de notificación concedidos en móvil');
                return {
                    success: true,
                    permission: 'granted',
                    canPush: true,
                    message: '¡Notificaciones activadas! Recibirás notificaciones como WhatsApp/Facebook'
                };
            } else {
                console.log('❌ Permisos de notificación denegados');
                return {
                    success: false,
                    permission: 'denied',
                    canPush: false,
                    message: 'Permisos denegados. Solo notificaciones cuando la app esté abierta.'
                };
            }
        } catch (error) {
            console.error('Error solicitando permisos:', error);
            return {
                success: false,
                error: error.message,
                message: 'Error al solicitar permisos de notificación'
            };
        }
    }
    
    return {
        success: false,
        message: strategy.message,
        methods: strategy.methods
    };
};

export const logMobileInfo = () => {
    const capabilities = detectMobileCapabilities();
    const strategy = getMobileNotificationStrategy();
    
    console.log('📱 Información del Dispositivo Móvil:');
    console.log('🔍 Es móvil:', capabilities.isMobile);
    console.log('🤖 Android:', capabilities.isAndroid);
    console.log('🍎 iOS:', capabilities.isIOS);
    console.log('🌐 Navegador:', Object.keys(capabilities.browser).find(key => capabilities.browser[key]));
    console.log('📨 Estrategia:', strategy.strategy);
    console.log('💬 Mensaje:', strategy.message);
    console.log('🔧 Métodos:', strategy.methods);
    
    return { capabilities, strategy };
};
