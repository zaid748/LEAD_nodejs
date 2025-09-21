const detectPushService = () => {
  const userAgent = navigator.userAgent;
  const browserInfo = {
    name: "Unknown",
    version: "Unknown",
    pushService: "Unknown",
    isMobile: false,
    isIOS: false,
    isAndroid: false
  };
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browserInfo.name = "Chrome";
    browserInfo.pushService = "FCM (Firebase Cloud Messaging)";
  } else if (userAgent.includes("Edg")) {
    browserInfo.name = "Edge";
    browserInfo.pushService = "FCM (Firebase Cloud Messaging)";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    browserInfo.name = "Opera";
    browserInfo.pushService = "FCM (Firebase Cloud Messaging)";
  } else if (userAgent.includes("Firefox")) {
    browserInfo.name = "Firefox";
    browserInfo.pushService = "Firefox Push Service";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browserInfo.name = "Safari";
    browserInfo.pushService = "Apple Push Notification Service (APNS)";
  }
  browserInfo.isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  browserInfo.isIOS = /iPhone|iPad|iPod/.test(userAgent);
  browserInfo.isAndroid = /Android/.test(userAgent);
  const versionMatch = userAgent.match(/(Chrome|Firefox|Safari|Edg|Opera|OPR)\/(\d+)/);
  if (versionMatch) {
    browserInfo.version = versionMatch[2];
  }
  return browserInfo;
};
const getPushServiceInfo = () => {
  const browserInfo = detectPushService();
  const serviceInfo = {
    chrome: {
      name: "Chrome",
      service: "FCM (Firebase Cloud Messaging)",
      cost: "GRATIS hasta 10,000 notificaciones/mes",
      setup: "Requiere FCM Server Key",
      compatibility: "Windows, macOS, Linux, Android",
      endpoint: "fcm.googleapis.com"
    },
    edge: {
      name: "Edge",
      service: "FCM (Firebase Cloud Messaging)",
      cost: "GRATIS hasta 10,000 notificaciones/mes",
      setup: "Requiere FCM Server Key",
      compatibility: "Windows",
      endpoint: "fcm.googleapis.com"
    },
    opera: {
      name: "Opera",
      service: "FCM (Firebase Cloud Messaging)",
      cost: "GRATIS hasta 10,000 notificaciones/mes",
      setup: "Requiere FCM Server Key",
      compatibility: "Windows, macOS, Linux, Android",
      endpoint: "fcm.googleapis.com"
    },
    firefox: {
      name: "Firefox",
      service: "Firefox Push Service",
      cost: "GRATIS",
      setup: "Usa VAPID keys (ya configurado)",
      compatibility: "Windows, macOS, Linux, Android",
      endpoint: "updates.push.services.mozilla.com"
    },
    safari: {
      name: "Safari",
      service: "Apple Push Notification Service (APNS)",
      cost: "GRATIS",
      setup: "Requiere certificados Apple Developer",
      compatibility: "macOS, iOS",
      endpoint: "push.apple.com"
    }
  };
  return {
    current: browserInfo,
    services: serviceInfo,
    recommendation: getRecommendation(browserInfo)
  };
};
const getRecommendation = (browserInfo) => {
  if (browserInfo.pushService.includes("FCM")) {
    return {
      action: "Configurar FCM Server Key",
      cost: "GRATIS",
      benefit: "Notificaciones cuando la página está cerrada",
      priority: "Alta"
    };
  } else if (browserInfo.pushService.includes("Firefox")) {
    return {
      action: "Ya configurado con VAPID",
      cost: "GRATIS",
      benefit: "Funciona con VAPID keys actuales",
      priority: "Media"
    };
  } else if (browserInfo.pushService.includes("Safari")) {
    return {
      action: "Configurar APNS (complejo)",
      cost: "GRATIS (requiere Apple Developer Account)",
      benefit: "Notificaciones nativas en macOS/iOS",
      priority: "Baja"
    };
  }
  return {
    action: "No soportado",
    cost: "N/A",
    benefit: "Usar WebSocket y notificaciones del sistema",
    priority: "N/A"
  };
};
const logPushServiceInfo = () => {
  const info = getPushServiceInfo();
  console.log("🔍 Información del Servicio de Push:");
  console.log("📱 Navegador:", info.current.name, info.current.version);
  console.log("🔔 Servicio:", info.current.pushService);
  console.log("📱 Dispositivo:", info.current.isMobile ? "Móvil" : "Escritorio");
  console.log("🍎 iOS:", info.current.isIOS ? "Sí" : "No");
  console.log("🤖 Android:", info.current.isAndroid ? "Sí" : "No");
  console.log("💰 Recomendación:", info.recommendation);
  return info;
};
class PushNotificationService {
  constructor() {
    this.registration = null;
    this.subscription = null;
    this.isSupported = "serviceWorker" in navigator && "PushManager" in window;
    this.vapidPublicKey = null;
    console.log("🔑 PushNotificationService - VAPID Key:", this.vapidPublicKey ? "Configurada" : "No configurada");
    console.log("🔑 PushNotificationService - Soporte:", this.isSupported ? "Soportado" : "No soportado");
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
    if (!this.isSupported) return "unsupported";
    return await Notification.permission;
  }
  /**
   * Solicitar permisos para push notifications
   */
  async requestPermission() {
    if (!this.isSupported) {
      throw new Error("Push notifications no soportadas en este navegador");
    }
    try {
      const permission = await Notification.requestPermission();
      console.log("Permiso de notificación:", permission);
      return permission;
    } catch (error) {
      console.error("Error solicitando permisos:", error);
      throw error;
    }
  }
  /**
   * Registrar Service Worker
   */
  async registerServiceWorker() {
    if (!this.isSupported) {
      throw new Error("Service Workers no soportados");
    }
    try {
      this.registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registrado:", this.registration);
      await navigator.serviceWorker.ready;
      return this.registration;
    } catch (error) {
      console.error("Error registrando Service Worker:", error);
      throw error;
    }
  }
  /**
   * Suscribirse a push notifications
   */
  async subscribe() {
    if (!this.isSupported) {
      throw new Error("Push notifications no soportadas");
    }
    try {
      const permission = await this.getPermissionStatus();
      if (permission !== "granted") {
        const newPermission = await this.requestPermission();
        if (newPermission !== "granted") {
          throw new Error("Permisos de notificación denegados");
        }
      }
      if (!this.vapidPublicKey) {
        throw new Error("VAPID public key no configurada. Push notifications no disponibles.");
      }
      if (!this.registration) {
        await this.registerServiceWorker();
      }
      let applicationServerKey;
      try {
        applicationServerKey = this.urlBase64ToUint8Array(this.vapidPublicKey);
      } catch (keyError) {
        console.error("Error procesando VAPID key:", keyError);
        throw new Error("VAPID key inválida. Push notifications no disponibles.");
      }
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      });
      console.log("Suscripción push creada:", this.subscription);
      await this.sendSubscriptionToServer(this.subscription);
      return this.subscription;
    } catch (error) {
      console.error("Error suscribiéndose a push notifications:", error);
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
        console.log("Desuscrito de push notifications");
        await this.removeSubscriptionFromServer(this.subscription);
        this.subscription = null;
      }
      return unsubscribed;
    } catch (error) {
      console.error("Error desuscribiéndose:", error);
      throw error;
    }
  }
  /**
   * Enviar suscripción al servidor
   */
  async sendSubscriptionToServer(subscription) {
    try {
      const apiUrl = "https://lead-inmobiliaria.com";
      const response = await fetch(`${apiUrl}/api/push/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          subscription,
          userAgent: navigator.userAgent
        })
      });
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      const result = await response.json();
      console.log("Suscripción enviada al servidor:", result);
      return result;
    } catch (error) {
      console.error("Error enviando suscripción al servidor:", error);
      throw error;
    }
  }
  /**
   * Remover suscripción del servidor
   */
  async removeSubscriptionFromServer(subscription) {
    try {
      const apiUrl = "https://lead-inmobiliaria.com";
      const response = await fetch(`${apiUrl}/api/push/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      });
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      const result = await response.json();
      console.log("Suscripción removida del servidor:", result);
      return result;
    } catch (error) {
      console.error("Error removiendo suscripción del servidor:", error);
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
      console.error("Error verificando suscripción:", error);
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
      console.error("Error obteniendo suscripción actual:", error);
      return null;
    }
  }
  /**
   * Convertir VAPID key de base64 a Uint8Array
   */
  urlBase64ToUint8Array(base64String) {
    if (!base64String) {
      throw new Error("VAPID public key no configurada");
    }
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
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
      const apiUrl = "https://lead-inmobiliaria.com";
      const response = await fetch(`${apiUrl}/api/push/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      const result = await response.json();
      console.log("Notificación de prueba enviada:", result);
      return result;
    } catch (error) {
      console.error("Error enviando notificación de prueba:", error);
      throw error;
    }
  }
  /**
   * Inicializar el servicio de push notifications
   */
  async initialize() {
    if (!this.isSupported) {
      console.warn("Push notifications no soportadas en este navegador");
      return false;
    }
    try {
      await this.registerServiceWorker();
      const isSubscribed = await this.isSubscribed();
      if (isSubscribed) {
        this.subscription = await this.getCurrentSubscription();
        console.log("Ya suscrito a push notifications");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error inicializando push notifications:", error);
      return false;
    }
  }
}
const pushNotificationService = new PushNotificationService();
export {
  pushNotificationService as default
};
