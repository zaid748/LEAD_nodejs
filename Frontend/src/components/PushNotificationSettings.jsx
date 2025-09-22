import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Typography, Switch, Alert } from '@material-tailwind/react';
import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import pushNotificationService from '../services/pushNotifications';

const PushNotificationSettings = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    initializePushSettings();
  }, []);

  const initializePushSettings = async () => {
    try {
      setIsSupported(pushNotificationService.isPushSupported());
      
      if (pushNotificationService.isPushSupported()) {
        const permission = await pushNotificationService.getPermissionStatus();
        setPermissionStatus(permission);
        
        const subscribed = await pushNotificationService.isSubscribed();
        setIsSubscribed(subscribed);
      }
    } catch (error) {
      console.error('Error inicializando configuración push:', error);
      setError('Error al inicializar configuración de notificaciones');
    }
  };

  const handleToggleNotifications = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSubscribed) {
        // Desuscribir
        await pushNotificationService.unsubscribe();
        setIsSubscribed(false);
        setSuccess('Notificaciones push deshabilitadas exitosamente');
      } else {
        // Suscribir
        await pushNotificationService.subscribe();
        setIsSubscribed(true);
        setSuccess('Notificaciones push habilitadas exitosamente');
      }
      
      // Actualizar estado de permisos
      const permission = await pushNotificationService.getPermissionStatus();
      setPermissionStatus(permission);
      
    } catch (error) {
      console.error('Error cambiando estado de notificaciones:', error);
      setError(error.message || 'Error al cambiar configuración de notificaciones');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPermission = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const permission = await pushNotificationService.requestPermission();
      setPermissionStatus(permission);
      
      if (permission === 'granted') {
        setSuccess('Permisos otorgados. Puedes habilitar las notificaciones push.');
      } else {
        setError('Permisos denegados. No se pueden enviar notificaciones push.');
      }
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      setError('Error al solicitar permisos de notificación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await pushNotificationService.sendTestNotification();
      setSuccess('Notificación de prueba enviada. Revisa tu dispositivo.');
    } catch (error) {
      console.error('Error enviando notificación de prueba:', error);
      setError('Error al enviar notificación de prueba');
    } finally {
      setIsLoading(false);
    }
  };

  const getPermissionStatusMessage = () => {
    switch (permissionStatus) {
      case 'granted':
        return { message: 'Permisos otorgados', color: 'green', icon: CheckCircleIcon };
      case 'denied':
        return { message: 'Permisos denegados', color: 'red', icon: ExclamationTriangleIcon };
      case 'default':
        return { message: 'Permisos no solicitados', color: 'yellow', icon: ExclamationTriangleIcon };
      default:
        return { message: 'Estado desconocido', color: 'gray', icon: ExclamationTriangleIcon };
    }
  };

  const permissionInfo = getPermissionStatusMessage();
  const PermissionIcon = permissionInfo.icon;

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex items-center gap-3 mb-6">
          <BellIcon className="h-6 w-6 text-blue-600" />
          <Typography variant="h5" color="blue-gray">
            Notificaciones Push
          </Typography>
        </div>

        {!isSupported && (
          <Alert color="red" className="mb-4">
            Tu navegador no soporta notificaciones push. Actualiza tu navegador para usar esta funcionalidad.
          </Alert>
        )}

        {error && (
          <Alert color="red" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" className="mb-4">
            {success}
          </Alert>
        )}

        {isSupported && (
          <div className="space-y-6">
            {/* Estado de permisos */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <PermissionIcon className={`h-5 w-5 text-${permissionInfo.color}-600`} />
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Estado de Permisos
                  </Typography>
                  <Typography color="gray" className="text-sm">
                    {permissionInfo.message}
                  </Typography>
                </div>
              </div>
              {permissionStatus !== 'granted' && (
                <Button
                  size="sm"
                  color="blue"
                  onClick={handleRequestPermission}
                  disabled={isLoading}
                >
                  Solicitar Permisos
                </Button>
              )}
            </div>

            {/* Toggle de notificaciones */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Typography variant="h6" color="blue-gray">
                  Notificaciones Push
                </Typography>
                <Typography color="gray" className="text-sm">
                  Recibe notificaciones incluso cuando la aplicación está cerrada
                </Typography>
              </div>
              <Switch
                checked={isSubscribed}
                onChange={handleToggleNotifications}
                disabled={isLoading || permissionStatus !== 'granted'}
                color="blue"
              />
            </div>

            {/* Botón de prueba */}
            {isSubscribed && (
              <div className="flex justify-center">
                <Button
                  color="green"
                  variant="outlined"
                  onClick={handleTestNotification}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <BellIcon className="h-4 w-4" />
                  Enviar Notificación de Prueba
                </Button>
              </div>
            )}

            {/* Información adicional */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <Typography variant="small" color="blue-gray">
                <strong>¿Qué son las notificaciones push?</strong><br />
                Las notificaciones push te permiten recibir alertas importantes sobre listas de compra, 
                aprobaciones y otros eventos críticos, incluso cuando no tienes la aplicación abierta.
              </Typography>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default PushNotificationSettings;
