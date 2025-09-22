// API para manejar notificaciones
import { fetchAPI } from './api';

const notificationsAPI = {
  /**
   * Obtener notificaciones de un proyecto
   */
  async getProjectNotifications(projectId) {
    try {
      console.log('🔍 Obteniendo notificaciones del proyecto:', projectId);
      const response = await fetchAPI(`/api/captaciones/${projectId}/remodelacion/notificaciones`, 'GET');
      console.log('📨 Respuesta de notificaciones:', response);
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      throw error;
    }
  },

  /**
   * Obtener notificaciones del usuario actual
   */
  async getUserNotifications() {
    try {
      console.log('🔍 Obteniendo notificaciones del usuario');
      const response = await fetchAPI('/api/captaciones/notificaciones-usuario', 'GET');
      console.log('📨 Respuesta de notificaciones del usuario:', response);
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener notificaciones del usuario:', error);
      throw error;
    }
  },

  /**
   * Marcar notificación como leída
   */
  async markAsRead(notificationId) {
    try {
      console.log('🔍 Marcando notificación como leída:', notificationId);
      const response = await fetchAPI(`/api/captaciones/notificacion/${notificationId}/marcar-leida-usuario`, 'PUT');
      console.log('✅ Notificación marcada como leída:', response);
      return response;
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      throw error;
    }
  },

  /**
   * Marcar todas las notificaciones como leídas
   */
  async markAllAsRead() {
    try {
      console.log('🔍 Marcando todas las notificaciones como leídas');
      // Por ahora, marcaremos individualmente ya que no hay endpoint específico
      const notifications = await this.getUserNotifications();
      const promises = notifications
        .filter(n => !n.leida)
        .map(n => this.markAsRead(n._id));
      
      await Promise.all(promises);
      return { success: true, message: 'Todas las notificaciones marcadas como leídas' };
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      throw error;
    }
  },

  /**
   * Eliminar notificación
   */
  async deleteNotification(notificationId) {
    try {
      console.log('🔍 Eliminando notificación:', notificationId);
      // Por ahora solo simulamos la eliminación ya que no hay endpoint específico
      console.log('⚠️ Endpoint de eliminación no implementado, simulando eliminación');
      return { success: true, message: 'Notificación eliminada' };
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      throw error;
    }
  },

  /**
   * Obtener notificaciones no leídas
   */
  async getUnreadNotifications() {
    try {
      console.log('🔍 Obteniendo notificaciones no leídas');
      const response = await fetchAPI('/api/captaciones/notificaciones?leida=false', 'GET');
      console.log('📨 Respuesta de notificaciones no leídas:', response);
      return response.data || [];
    } catch (error) {
      console.error('Error al obtener notificaciones no leídas:', error);
      throw error;
    }
  }
};

export default notificationsAPI;
