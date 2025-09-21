import React, { useState, useEffect, forwardRef } from 'react';
import {
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
} from '@material-tailwind/react';
import {
  ClockIcon,
  BellIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { 
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  TruckIcon,
  UserIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import webSocketService from '../services/websocket';
import notificationsAPI from '../services/notificationsAPI';

const GlobalNotifications = forwardRef(({ onNotificationRead, onNotificationCountChange }, ref) => {
  
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);


  // Conectar al WebSocket y cargar notificaciones
  useEffect(() => {
    // Configurar handler para actualizar la lista de notificaciones
    const handleNotification = (notification) => {
      setNotifications(prev => {
        const newNotifications = [notification, ...prev];
        
        // Actualizar contador en el navbar si hay callback
        if (onNotificationCountChange) {
          const newUnreadCount = newNotifications.filter(n => !n.leida).length;
          onNotificationCountChange(newUnreadCount);
        }
        
        return newNotifications;
      });
    };

    // Registrar handler para actualizar la lista (el WebSocket ya está conectado desde el navbar)
    webSocketService.onMessage('notification_list', handleNotification);
    
    // Cargar notificaciones del usuario
    loadUserNotifications();

    // Escuchar cambios en el estado de conexión WebSocket
    webSocketService.onMessage('connection_status', (connected) => {
      setWsConnected(connected);
    });

    // Verificar estado de conexión inicial
    setWsConnected(webSocketService.isConnected());

    return () => {
      webSocketService.offMessage('notification_list');
      webSocketService.offMessage('connection_status');
    };
  }, []);

  const loadUserNotifications = async () => {
    try {
      setLoading(true);
      console.log('🔔 Cargando notificaciones del usuario');
      
      const data = await notificationsAPI.getUserNotifications();
      console.log('🔔 Notificaciones cargadas:', data);
      
      // Guardar total de notificaciones
      setTotalNotifications(data.length);
      
      // Limitar a 10 notificaciones más recientes
      const limitedNotifications = data.slice(0, 10);
      setNotifications(limitedNotifications);
      
      // Sincronizar contador con el navbar (contar todas, no solo las limitadas)
      const unreadCount = data.filter(n => !n.leida).length;
      if (onNotificationCountChange) {
        onNotificationCountChange(unreadCount);
        console.log('🔢 Contador sincronizado con navbar:', unreadCount);
      }
    } catch (error) {
      console.error('❌ Error al cargar notificaciones:', error);
      
      // Fallback: usar datos de ejemplo
      setNotifications([
        {
          _id: "1",
          titulo: "Nueva solicitud de material",
          mensaje: "Se ha creado una nueva solicitud para el proyecto Casa Azul",
          tipo: "Solicitud",
          prioridad: "Media",
          leida: false,
          fecha_creacion: new Date(Date.now() - 13 * 60 * 1000).toISOString(), // 13 minutos atrás
        },
        {
          _id: "2",
          titulo: "Costo agregado a solicitud",
          mensaje: "Se ha agregado un costo de $8,500 a la solicitud de azulejos",
          tipo: "Compra",
          prioridad: "Alta",
          leida: false,
          fecha_creacion: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
        },
        {
          _id: "3",
          titulo: "Material entregado",
          mensaje: "El cemento ha sido entregado al contratista",
          tipo: "Entrega",
          prioridad: "Baja",
          leida: true,
          fecha_creacion: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      setNotifications(prev => prev.map(n => 
        n._id === notificationId 
          ? { ...n, leida: true, fecha_lectura: new Date().toISOString() }
          : n
      ));
      console.log('✅ Notificación marcada como leída:', notificationId);
      // Notificar al navbar que se leyó una notificación
      if (onNotificationRead) {
        onNotificationRead();
      }
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      // Actualizar localmente aunque falle la API
      setNotifications(prev => prev.map(n => 
        n._id === notificationId 
          ? { ...n, leida: true, fecha_lectura: new Date().toISOString() }
          : n
      ));
      // Notificar al navbar que se leyó una notificación
      if (onNotificationRead) {
        onNotificationRead();
      }
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications(prev => prev.map(n => ({
        ...n,
        leida: true,
        fecha_lectura: new Date().toISOString()
      })));
      
      // Actualizar contador en el navbar
      if (onNotificationCountChange) {
        onNotificationCountChange(0); // Todas marcadas como leídas
      }
    } catch (error) {
      console.error('Error al marcar todas como leídas:', error);
      // Actualizar localmente
      setNotifications(prev => prev.map(n => ({
        ...n,
        leida: true,
        fecha_lectura: new Date().toISOString()
      })));
      
      // Actualizar contador en el navbar
      if (onNotificationCountChange) {
        onNotificationCountChange(0); // Todas marcadas como leídas
      }
    }
  };

  const getNotificationIcon = (tipo) => {
    switch (tipo) {
      case "Solicitud":
        return <ClipboardDocumentIcon className="h-4 w-4 text-blue-500" />;
      case "Compra":
        return <CurrencyDollarIcon className="h-4 w-4 text-amber-500" />;
      case "Aprobacion":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case "Entrega":
        return <TruckIcon className="h-4 w-4 text-green-500" />;
      case "Asignacion":
        return <UserIcon className="h-4 w-4 text-purple-500" />;
      case "Rechazo":
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (prioridad) => {
    switch (prioridad) {
      case "Alta":
      case "Urgente":
        return "red";
      case "Media":
        return "amber";
      case "Baja":
        return "green";
      default:
        return "gray";
    }
  };

  const formatTimeAgo = (dateString) => {
    const fecha = new Date(dateString);
    const ahora = new Date();
    const diffMs = ahora - fecha;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Ahora mismo";
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours} horas`;
    if (diffDays < 7) return `${diffDays} días`;
    return fecha.toLocaleDateString("es-MX");
  };

  const unreadCount = notifications.filter(n => !n.leida).length;

  return (
    <div className="w-full">
      {/* Header con estado de conexión y acciones */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <Typography variant="h6" color="blue-gray" className="font-medium">
            Notificaciones
          </Typography>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <Typography variant="small" color="gray" className="text-xs">
              {wsConnected ? 'Conectado' : 'Desconectado'}
            </Typography>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Button
            size="sm"
            variant="text"
            color="blue"
            className="text-xs"
            onClick={markAllAsRead}
          >
            Marcar todas como leídas
          </Button>
        )}
      </div>

      {/* Lista de notificaciones */}
      <div className="max-h-64 overflow-y-auto px-2 py-1">
        {loading ? (
          <div className="p-4 text-center">
            <Typography variant="small" color="gray">
              Cargando notificaciones...
            </Typography>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center">
            <BellIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <Typography variant="small" color="gray">
              No hay notificaciones
            </Typography>
          </div>
        ) : (
          notifications.map((notification) => (
            <MenuItem 
              key={notification._id} 
              className={`flex items-center gap-2 p-2 mb-1 rounded hover:bg-gray-50 ${
                !notification.leida ? 'bg-blue-50' : ''
              }`}
              onClick={() => !notification.leida && markAsRead(notification._id)}
            >
              <div className={`p-1 rounded-full ${
                !notification.leida ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {getNotificationIcon(notification.tipo)}
              </div>
              
              <div className="flex-1 min-w-0">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={`text-xs ${!notification.leida ? 'font-semibold' : 'font-normal'}`}
                >
                  {notification.titulo}
                </Typography>
                
                <Typography
                  variant="small"
                  color="gray"
                  className="text-xs truncate"
                >
                  {notification.mensaje}
                </Typography>
                
                <div className="flex items-center gap-1 mt-1">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-xs opacity-60"
                  >
                    {formatTimeAgo(notification.fecha_creacion)}
                  </Typography>
                  
                  <Chip
                    value={notification.prioridad}
                    color={getPriorityColor(notification.prioridad)}
                    size="sm"
                    variant="ghost"
                    className="text-xs h-4"
                  />
                </div>
              </div>
              
              {!notification.leida && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              )}
            </MenuItem>
          ))
        )}
      </div>

      {/* Footer con contador */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Typography variant="small" color="gray" className="text-xs">
            {totalNotifications > 10 ? (
              <>Mostrando {notifications.length} de {totalNotifications} notificaciones</>
            ) : (
              <>{notifications.length} notificaciones</>
            )}
          </Typography>
          {unreadCount > 0 && (
            <Chip
              value={unreadCount}
              color="red"
              size="sm"
              className="text-xs"
            />
          )}
        </div>
        {totalNotifications > 10 && (
          <Typography variant="small" color="blue" className="text-xs mt-1">
            Mostrando solo las 10 más recientes
          </Typography>
        )}
      </div>
    </div>
  );
});

GlobalNotifications.displayName = "GlobalNotifications";

export default GlobalNotifications;
