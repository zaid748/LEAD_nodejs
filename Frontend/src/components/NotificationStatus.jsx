import React, { useState, useEffect } from 'react';
import { Card, CardBody, Typography, Chip, Button } from '@material-tailwind/react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, WifiIcon, BellIcon } from '@heroicons/react/24/outline';
import hybridNotificationService from '../services/hybridNotifications';

const NotificationStatus = () => {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = () => {
    const capabilities = hybridNotificationService.getCapabilitiesSummary();
    setStatus(capabilities);
  };

  const handleTestNotification = async () => {
    setIsLoading(true);
    try {
      const testNotification = {
        titulo: 'Prueba de Notificaciones',
        mensaje: 'Sistema de notificaciones híbrido funcionando correctamente.',
        tipo: 'General',
        prioridad: 'Media'
      };

      const results = await hybridNotificationService.sendNotification(testNotification);
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      
      alert(`✅ Notificación enviada por ${successful.length} método(s): ${successful.map(s => s.value.method).join(', ')}`);
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!status) {
    return <div>Cargando estado...</div>;
  }

  const { supported, preferences, browser } = status;

  const getStatusIcon = (isSupported, isEnabled) => {
    if (!isSupported) return <XCircleIcon className="h-5 w-5 text-gray-400" />;
    if (isEnabled) return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
  };

  const getStatusText = (isSupported, isEnabled) => {
    if (!isSupported) return 'No soportado';
    if (isEnabled) return 'Activo';
    return 'Disponible';
  };

  const getStatusColor = (isSupported, isEnabled) => {
    if (!isSupported) return 'gray';
    if (isEnabled) return 'green';
    return 'yellow';
  };

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex items-center gap-3 mb-4">
          <BellIcon className="h-6 w-6 text-blue-600" />
          <Typography variant="h6" color="blue-gray">
            Estado de Notificaciones
          </Typography>
        </div>

        {/* Información del navegador */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
            Navegador: {browser.name} {browser.isMobile ? '(Móvil)' : '(Escritorio)'}
          </Typography>
          {browser.isIOS && (
            <Typography variant="small" color="orange" className="mb-1">
              ⚠️ iOS detectado: Push notifications web no disponibles
            </Typography>
          )}
        </div>

        {/* Estado de cada método */}
        <div className="space-y-3">
          {/* WebSocket */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <WifiIcon className="h-5 w-5 text-green-600" />
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  WebSocket (Tiempo Real)
                </Typography>
                <Typography variant="small" color="gray">
                  Notificaciones instantáneas
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip 
                value={getStatusText(supported.webSocket, preferences.webSocket)} 
                color={getStatusColor(supported.webSocket, preferences.webSocket)}
                size="sm"
              />
              {getStatusIcon(supported.webSocket, preferences.webSocket)}
            </div>
          </div>

          {/* Notificaciones del Sistema */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <BellIcon className="h-5 w-5 text-blue-600" />
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  Notificaciones del Sistema
                </Typography>
                <Typography variant="small" color="gray">
                  Notificaciones nativas del navegador
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip 
                value={getStatusText(supported.systemNotifications, preferences.systemNotifications)} 
                color={getStatusColor(supported.systemNotifications, preferences.systemNotifications)}
                size="sm"
              />
              {getStatusIcon(supported.systemNotifications, preferences.systemNotifications)}
            </div>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <BellIcon className="h-5 w-5 text-purple-600" />
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  Push Notifications
                </Typography>
                <Typography variant="small" color="gray">
                  Notificaciones cuando la app está cerrada
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip 
                value={getStatusText(supported.pushNotifications, preferences.pushNotifications)} 
                color={getStatusColor(supported.pushNotifications, preferences.pushNotifications)}
                size="sm"
              />
              {getStatusIcon(supported.pushNotifications, preferences.pushNotifications)}
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <Typography variant="small" color="blue-gray" className="font-semibold mb-2">
            Resumen del Sistema:
          </Typography>
          <Typography variant="small" color="gray">
            {preferences.webSocket ? (
              <>
                ✅ <strong>WebSocket activo</strong> - Notificaciones en tiempo real funcionando
                {preferences.systemNotifications && <><br/>✅ <strong>Notificaciones del sistema</strong> - Notificaciones nativas disponibles</>}
                {preferences.pushNotifications && <><br/>✅ <strong>Push notifications</strong> - Notificaciones cuando la app está cerrada</>}
                {!preferences.systemNotifications && !preferences.pushNotifications && (
                  <><br/>ℹ️ <strong>Solo WebSocket</strong> - Funciona cuando la aplicación está abierta</>
                )}
              </>
            ) : (
              <>❌ Sistema de notificaciones no disponible</>
            )}
          </Typography>
        </div>

        {/* Botón de prueba */}
        <div className="mt-4">
          <Button
            color="blue"
            onClick={handleTestNotification}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Probando...' : 'Probar Notificaciones'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotificationStatus;
