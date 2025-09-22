const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BmH_rH_5.js","assets/vendor-Dz0BfvKj.js","assets/index-BVSaZdKH.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-BmH_rH_5.js";
import "./vendor-Dz0BfvKj.js";
class HybridNotificationService {
  constructor() {
    this.supportedFeatures = this.detectSupportedFeatures();
    this.preferences = this.loadUserPreferences();
  }
  /**
   * Detectar qué características están soportadas
   */
  detectSupportedFeatures() {
    const features = {
      webSocket: true,
      // Siempre soportado en navegadores modernos
      pushNotifications: false,
      systemNotifications: false,
      serviceWorker: false,
      vibration: false,
      sound: false
    };
    if ("serviceWorker" in navigator && "PushManager" in window) {
      features.pushNotifications = true;
      features.serviceWorker = true;
    }
    if ("Notification" in window) {
      features.systemNotifications = true;
    }
    if ("vibrate" in navigator) {
      features.vibration = true;
    }
    if ("Audio" in window) {
      features.sound = true;
    }
    console.log("🔍 Características detectadas:", features);
    return features;
  }
  /**
   * Cargar preferencias del usuario
   */
  loadUserPreferences() {
    const defaultPrefs = {
      webSocket: true,
      pushNotifications: false,
      systemNotifications: false,
      sound: false,
      vibration: false,
      email: false
    };
    try {
      const saved = localStorage.getItem("notificationPreferences");
      return saved ? { ...defaultPrefs, ...JSON.parse(saved) } : defaultPrefs;
    } catch (error) {
      console.error("Error cargando preferencias:", error);
      return defaultPrefs;
    }
  }
  /**
   * Guardar preferencias del usuario
   */
  saveUserPreferences(preferences) {
    try {
      localStorage.setItem("notificationPreferences", JSON.stringify(preferences));
      this.preferences = { ...this.preferences, ...preferences };
      console.log("✅ Preferencias guardadas:", this.preferences);
    } catch (error) {
      console.error("Error guardando preferencias:", error);
    }
  }
  /**
   * Solicitar permisos para todas las características soportadas
   */
  async requestAllPermissions() {
    const results = {
      webSocket: true,
      // Siempre disponible
      pushNotifications: false,
      systemNotifications: false
    };
    if (this.supportedFeatures.systemNotifications) {
      try {
        if (Notification.permission === "granted") {
          results.systemNotifications = true;
        } else if (Notification.permission === "default") {
          const permission = await Notification.requestPermission();
          results.systemNotifications = permission === "granted";
          console.log("🔔 Permisos de notificación:", permission);
        } else {
          console.log("🔔 Permisos de notificación ya denegados");
        }
      } catch (error) {
        console.error("Error solicitando permisos de notificación:", error);
      }
    }
    if (this.supportedFeatures.pushNotifications && results.systemNotifications) {
      try {
        results.pushNotifications = await this.setupPushNotifications();
      } catch (error) {
        console.error("Error configurando push notifications:", error);
      }
    }
    return results;
  }
  /**
   * Configurar push notifications (si están disponibles)
   */
  async setupPushNotifications() {
    if (!this.supportedFeatures.pushNotifications) {
      console.log("Push notifications no soportadas en este navegador");
      return false;
    }
    try {
      const { default: pushService } = await __vitePreload(async () => {
        const { default: pushService2 } = await import("./pushNotifications-CZsYhpa-.js");
        return { default: pushService2 };
      }, true ? [] : void 0);
      if (!pushService.vapidPublicKey) {
        console.log("VAPID key no configurada. Push notifications no disponibles.");
        return false;
      }
      const permission = await pushService.requestPermission();
      if (permission === "granted") {
        await pushService.subscribe();
        console.log("✅ Push notifications configuradas exitosamente");
        return true;
      } else {
        console.log("Permisos de notificación no concedidos");
        return false;
      }
    } catch (error) {
      console.error("Error configurando push notifications:", error);
      console.log("Push notifications no disponibles. Continuando con otros métodos.");
      return false;
    }
  }
  /**
   * Enviar notificación usando todos los métodos disponibles
   */
  async sendNotification(notificationData) {
    const methods = [];
    if (this.preferences.webSocket) {
      methods.push(this.sendWebSocketNotification(notificationData));
    }
    if (this.preferences.systemNotifications && this.supportedFeatures.systemNotifications) {
      methods.push(this.sendSystemNotification(notificationData));
    }
    if (this.preferences.pushNotifications && this.supportedFeatures.pushNotifications) {
      methods.push(this.sendPushNotification(notificationData));
    }
    if (this.preferences.sound && this.supportedFeatures.sound) {
      this.playNotificationSound();
    }
    if (this.preferences.vibration && this.supportedFeatures.vibration) {
      this.vibrateDevice();
    }
    const results = await Promise.allSettled(methods);
    console.log("📱 Métodos de notificación ejecutados:", results);
    return results;
  }
  /**
   * Enviar notificación por WebSocket
   */
  async sendWebSocketNotification(notificationData) {
    try {
      const { default: webSocketService } = await __vitePreload(async () => {
        const { default: webSocketService2 } = await import("./index-BmH_rH_5.js").then((n) => n.w);
        return { default: webSocketService2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      console.log("📡 Notificación WebSocket enviada");
      return { method: "websocket", success: true };
    } catch (error) {
      console.error("Error enviando WebSocket notification:", error);
      return { method: "websocket", success: false, error };
    }
  }
  /**
   * Enviar notificación del sistema
   */
  async sendSystemNotification(notificationData) {
    try {
      if (Notification.permission === "granted") {
        const notification = new Notification(notificationData.titulo, {
          body: notificationData.mensaje,
          icon: "/favicon.ico",
          tag: `notification-${Date.now()}`,
          data: notificationData
        });
        setTimeout(() => {
          notification.close();
        }, 5e3);
        console.log("🔔 Notificación del sistema enviada");
        return { method: "system", success: true };
      }
      return { method: "system", success: false, reason: "No permission" };
    } catch (error) {
      console.error("Error enviando notificación del sistema:", error);
      return { method: "system", success: false, error };
    }
  }
  /**
   * Enviar push notification
   */
  async sendPushNotification(notificationData) {
    try {
      const { default: pushService } = await __vitePreload(async () => {
        const { default: pushService2 } = await import("./pushNotifications-CZsYhpa-.js");
        return { default: pushService2 };
      }, true ? [] : void 0);
      const response = await fetch("/api/push/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(notificationData)
      });
      if (response.ok) {
        console.log("📱 Push notification enviada");
        return { method: "push", success: true };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Error enviando push notification:", error);
      return { method: "push", success: false, error };
    }
  }
  /**
   * Reproducir sonido de notificación
   */
  playNotificationSound() {
    try {
      const audio = new Audio("/sounds/notification.mp3");
      audio.volume = 0.3;
      audio.play().catch((error) => {
        console.log("No se pudo reproducir sonido:", error);
      });
      console.log("🔊 Sonido de notificación reproducido");
    } catch (error) {
      console.error("Error reproduciendo sonido:", error);
    }
  }
  /**
   * Vibrar dispositivo (móviles)
   */
  vibrateDevice() {
    try {
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
        console.log("📳 Dispositivo vibrado");
      }
    } catch (error) {
      console.error("Error vibrando dispositivo:", error);
    }
  }
  /**
   * Obtener resumen de capacidades
   */
  getCapabilitiesSummary() {
    return {
      supported: this.supportedFeatures,
      preferences: this.preferences,
      browser: this.getBrowserInfo(),
      recommendations: this.getRecommendations()
    };
  }
  /**
   * Obtener información del navegador
   */
  getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser = "Unknown";
    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
    return {
      name: browser,
      userAgent,
      isMobile: /Mobile|Android|iPhone|iPad/.test(userAgent),
      isIOS: /iPhone|iPad|iPod/.test(userAgent)
    };
  }
  /**
   * Obtener recomendaciones basadas en el navegador
   */
  getRecommendations() {
    const browser = this.getBrowserInfo();
    const recommendations = [];
    if (browser.isIOS) {
      recommendations.push("Para iOS: Las notificaciones push web no están disponibles. Usa notificaciones del sistema y WebSocket.");
    }
    if (browser.isMobile) {
      recommendations.push("Para móviles: Habilita vibración y sonido para mejor experiencia.");
    }
    if (!this.supportedFeatures.pushNotifications) {
      recommendations.push("Push notifications no disponibles. El sistema usará WebSocket y notificaciones del sistema.");
    }
    return recommendations;
  }
}
const hybridNotificationService = new HybridNotificationService();
export {
  hybridNotificationService as default
};
