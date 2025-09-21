/**
 * Detector de Servicios de Push Notifications
 * Identifica qué servicio de push usa cada navegador
 */

export const detectPushService = () => {
    const userAgent = navigator.userAgent;
    const browserInfo = {
        name: 'Unknown',
        version: 'Unknown',
        pushService: 'Unknown',
        isMobile: false,
        isIOS: false,
        isAndroid: false
    };

    // Detectar navegador
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
        browserInfo.name = 'Chrome';
        browserInfo.pushService = 'FCM (Firebase Cloud Messaging)';
    } else if (userAgent.includes('Edg')) {
        browserInfo.name = 'Edge';
        browserInfo.pushService = 'FCM (Firebase Cloud Messaging)';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
        browserInfo.name = 'Opera';
        browserInfo.pushService = 'FCM (Firebase Cloud Messaging)';
    } else if (userAgent.includes('Firefox')) {
        browserInfo.name = 'Firefox';
        browserInfo.pushService = 'Firefox Push Service';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browserInfo.name = 'Safari';
        browserInfo.pushService = 'Apple Push Notification Service (APNS)';
    }

    // Detectar dispositivo
    browserInfo.isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    browserInfo.isIOS = /iPhone|iPad|iPod/.test(userAgent);
    browserInfo.isAndroid = /Android/.test(userAgent);

    // Detectar versión
    const versionMatch = userAgent.match(/(Chrome|Firefox|Safari|Edg|Opera|OPR)\/(\d+)/);
    if (versionMatch) {
        browserInfo.version = versionMatch[2];
    }

    return browserInfo;
};

export const getPushServiceInfo = () => {
    const browserInfo = detectPushService();
    
    const serviceInfo = {
        chrome: {
            name: 'Chrome',
            service: 'FCM (Firebase Cloud Messaging)',
            cost: 'GRATIS hasta 10,000 notificaciones/mes',
            setup: 'Requiere FCM Server Key',
            compatibility: 'Windows, macOS, Linux, Android',
            endpoint: 'fcm.googleapis.com'
        },
        edge: {
            name: 'Edge',
            service: 'FCM (Firebase Cloud Messaging)',
            cost: 'GRATIS hasta 10,000 notificaciones/mes',
            setup: 'Requiere FCM Server Key',
            compatibility: 'Windows',
            endpoint: 'fcm.googleapis.com'
        },
        opera: {
            name: 'Opera',
            service: 'FCM (Firebase Cloud Messaging)',
            cost: 'GRATIS hasta 10,000 notificaciones/mes',
            setup: 'Requiere FCM Server Key',
            compatibility: 'Windows, macOS, Linux, Android',
            endpoint: 'fcm.googleapis.com'
        },
        firefox: {
            name: 'Firefox',
            service: 'Firefox Push Service',
            cost: 'GRATIS',
            setup: 'Usa VAPID keys (ya configurado)',
            compatibility: 'Windows, macOS, Linux, Android',
            endpoint: 'updates.push.services.mozilla.com'
        },
        safari: {
            name: 'Safari',
            service: 'Apple Push Notification Service (APNS)',
            cost: 'GRATIS',
            setup: 'Requiere certificados Apple Developer',
            compatibility: 'macOS, iOS',
            endpoint: 'push.apple.com'
        }
    };

    return {
        current: browserInfo,
        services: serviceInfo,
        recommendation: getRecommendation(browserInfo)
    };
};

const getRecommendation = (browserInfo) => {
    if (browserInfo.pushService.includes('FCM')) {
        return {
            action: 'Configurar FCM Server Key',
            cost: 'GRATIS',
            benefit: 'Notificaciones cuando la página está cerrada',
            priority: 'Alta'
        };
    } else if (browserInfo.pushService.includes('Firefox')) {
        return {
            action: 'Ya configurado con VAPID',
            cost: 'GRATIS',
            benefit: 'Funciona con VAPID keys actuales',
            priority: 'Media'
        };
    } else if (browserInfo.pushService.includes('Safari')) {
        return {
            action: 'Configurar APNS (complejo)',
            cost: 'GRATIS (requiere Apple Developer Account)',
            benefit: 'Notificaciones nativas en macOS/iOS',
            priority: 'Baja'
        };
    }
    
    return {
        action: 'No soportado',
        cost: 'N/A',
        benefit: 'Usar WebSocket y notificaciones del sistema',
        priority: 'N/A'
    };
};

export const logPushServiceInfo = () => {
    const info = getPushServiceInfo();
    
    console.log('🔍 Información del Servicio de Push:');
    console.log('📱 Navegador:', info.current.name, info.current.version);
    console.log('🔔 Servicio:', info.current.pushService);
    console.log('📱 Dispositivo:', info.current.isMobile ? 'Móvil' : 'Escritorio');
    console.log('🍎 iOS:', info.current.isIOS ? 'Sí' : 'No');
    console.log('🤖 Android:', info.current.isAndroid ? 'Sí' : 'No');
    console.log('💰 Recomendación:', info.recommendation);
    
    return info;
};
