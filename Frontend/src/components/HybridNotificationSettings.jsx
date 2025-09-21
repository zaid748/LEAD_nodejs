import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Typography, Switch, Alert, Chip } from '@material-tailwind/react';
import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, WifiIcon } from '@heroicons/react/24/outline';
import hybridNotificationService from '../services/hybridNotifications';

const HybridNotificationSettings = () => {
  const [capabilities, setCapabilities] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCapabilities();
  }, []);

  const loadCapabilities = () => {
    const caps = hybridNotificationService.getCapabilitiesSummary();
    setCapabilities(caps);
    console.log('🔍 Capacidades del navegador:', caps);
  };

  const handleTogglePreference = (key, value) => {
    const newPreferences = { ...hybridNotificationService.preferences, [key]: value };
    hybridNotificationService.saveUserPreferences(newPreferences);
    loadCapabilities();
    setSuccess(`Configuración de ${key} actualizada`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleRequestPermissions = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const results = await hybridNotificationService.requestAllPermissions();
      console.log('🔐 Resultados de permisos:', results);
      
      let message = 'Permisos configurados: ';
      const granted = Object.entries(results)
        .filter(([_, granted]) => granted)
        .map(([key, _]) => key);
      
      message += granted.join(', ');
      setSuccess(message);
      
      loadCapabilities();
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      setError('Error al configurar permisos: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const testNotification = {
        titulo: 'Notificación de Prueba',
        mensaje: 'Esta es una notificación de prueba del sistema híbrido LEAD.',
        tipo: 'General',
        prioridad: 'Media'
      };

      const results = await hybridNotificationService.sendNotification(testNotification);
      console.log('🧪 Resultados de prueba:', results);
      
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      setSuccess(`Notificación enviada por ${successful.length} método(s): ${successful.map(s => s.value.method).join(', ')}`);
    } catch (error) {
      console.error('Error enviando notificación de prueba:', error);
      setError('Error al enviar notificación de prueba: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!capabilities) {
    return <div>Cargando capacidades del navegador...</div>;
  }

  const { supported, preferences, browser, recommendations } = capabilities;

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex items-center gap-3 mb-6">
          <BellIcon className="h-6 w-6 text-blue-600" />
          <Typography variant="h5" color="blue-gray">
            Configuración de Notificaciones
          </Typography>
        </div>

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

        {/* Información del navegador */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Información del Navegador
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Chip value={browser.name} color="blue" />
            <Chip value={browser.isMobile ? 'Móvil' : 'Escritorio'} color="green" />
            {browser.isIOS && <Chip value="iOS" color="orange" />}
          </div>
          {recommendations.length > 0 && (
            <div className="mt-3">
              <Typography variant="small" color="blue-gray" className="font-semibold mb-1">
                Recomendaciones:
              </Typography>
              {recommendations.map((rec, index) => (
                <Typography key={index} variant="small" color="gray" className="mb-1">
                  • {rec}
                </Typography>
              ))}
            </div>
          )}
        </div>

        {/* Capacidades soportadas */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Características Soportadas
          </Typography>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <WifiIcon className="h-5 w-5" />
              <Typography variant="small">WebSocket</Typography>
              <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
            </div>
            <div className="flex items-center gap-2">
              <BellIcon className="h-5 w-5" />
              <Typography variant="small">Notificaciones del Sistema</Typography>
              {supported.systemNotifications ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
              ) : (
                <ExclamationTriangleIcon className="h-4 w-4 text-red-500 ml-auto" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <BellIcon className="h-5 w-5" />
              <Typography variant="small">Push Notifications</Typography>
              {supported.pushNotifications ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
              ) : (
                <ExclamationTriangleIcon className="h-4 w-4 text-red-500 ml-auto" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <BellIcon className="h-5 w-5" />
              <Typography variant="small">Vibración</Typography>
              {supported.vibration ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
              ) : (
                <ExclamationTriangleIcon className="h-4 w-4 text-red-500 ml-auto" />
              )}
            </div>
          </div>
        </div>

        {/* Configuración de preferencias */}
        <div className="space-y-4">
          <Typography variant="h6" color="blue-gray">
            Configuración de Notificaciones
          </Typography>

          {/* WebSocket - Siempre habilitado */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <Typography variant="h6" color="blue-gray">
                WebSocket (Tiempo Real)
              </Typography>
              <Typography variant="small" color="gray">
                Notificaciones instantáneas cuando la aplicación está abierta
              </Typography>
            </div>
            <Switch
              checked={preferences.webSocket}
              disabled={true} // Siempre habilitado
              color="green"
            />
          </div>

          {/* Notificaciones del sistema */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <Typography variant="h6" color="blue-gray">
                Notificaciones del Sistema
              </Typography>
              <Typography variant="small" color="gray">
                Notificaciones nativas del navegador
              </Typography>
            </div>
            <Switch
              checked={preferences.systemNotifications}
              onChange={(e) => handleTogglePreference('systemNotifications', e.target.checked)}
              disabled={!supported.systemNotifications || isLoading}
              color="blue"
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <Typography variant="h6" color="blue-gray">
                Push Notifications
              </Typography>
              <Typography variant="small" color="gray">
                Notificaciones cuando la aplicación está cerrada
              </Typography>
              {!supported.pushNotifications && (
                <Typography variant="small" color="red" className="mt-1">
                  No disponible en este navegador
                </Typography>
              )}
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onChange={(e) => handleTogglePreference('pushNotifications', e.target.checked)}
              disabled={!supported.pushNotifications || isLoading}
              color="purple"
            />
          </div>

          {/* Vibración */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <Typography variant="h6" color="blue-gray">
                Vibración
              </Typography>
              <Typography variant="small" color="gray">
                Vibrar dispositivo al recibir notificaciones
              </Typography>
              {!supported.vibration && (
                <Typography variant="small" color="gray" className="mt-1">
                  No disponible en este dispositivo
                </Typography>
              )}
            </div>
            <Switch
              checked={preferences.vibration}
              onChange={(e) => handleTogglePreference('vibration', e.target.checked)}
              disabled={!supported.vibration || isLoading}
              color="orange"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button
            color="blue"
            onClick={handleRequestPermissions}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <BellIcon className="h-4 w-4" />
            Solicitar Permisos
          </Button>

          <Button
            color="green"
            variant="outlined"
            onClick={handleTestNotification}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <BellIcon className="h-4 w-4" />
            Probar Notificaciones
          </Button>
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <Typography variant="small" color="blue-gray">
            <strong>Sistema Híbrido de Notificaciones:</strong><br />
            Este sistema combina múltiples métodos para asegurar que recibas notificaciones 
            independientemente del navegador o dispositivo que uses. Las notificaciones WebSocket 
            funcionan siempre, mientras que las notificaciones push y del sistema dependen del 
            soporte del navegador.
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default HybridNotificationSettings;
