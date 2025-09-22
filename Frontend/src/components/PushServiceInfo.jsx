import React from 'react';
import { Card, CardBody, Typography, Chip, Alert } from '@material-tailwind/react';
import { InformationCircleIcon, CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getPushServiceInfo } from '../utils/pushServiceDetector';

const PushServiceInfo = () => {
  const info = getPushServiceInfo();
  const { current, services, recommendation } = info;

  const getServiceInfo = (serviceName) => {
    switch (serviceName) {
      case 'Chrome':
      case 'Edge':
      case 'Opera':
        return services.chrome;
      case 'Firefox':
        return services.firefox;
      case 'Safari':
        return services.safari;
      default:
        return null;
    }
  };

  const currentService = getServiceInfo(current.name);

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex items-center gap-3 mb-4">
          <InformationCircleIcon className="h-6 w-6 text-blue-600" />
          <Typography variant="h6" color="blue-gray">
            Información del Servicio de Push
          </Typography>
        </div>

        {/* Información del navegador actual */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Tu Navegador Actual
          </Typography>
          <div className="flex flex-wrap gap-2 mb-2">
            <Chip value={`${current.name} ${current.version}`} color="blue" />
            <Chip value={current.isMobile ? 'Móvil' : 'Escritorio'} color="green" />
            {current.isIOS && <Chip value="iOS" color="orange" />}
            {current.isAndroid && <Chip value="Android" color="green" />}
          </div>
          <Typography variant="small" color="gray">
            <strong>Servicio de Push:</strong> {current.pushService}
          </Typography>
        </div>

        {/* Información del servicio actual */}
        {currentService && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Configuración para {current.name}
            </Typography>
            <div className="space-y-2">
              <Typography variant="small" color="gray">
                <strong>Endpoint:</strong> {currentService.endpoint}
              </Typography>
              <Typography variant="small" color="gray">
                <strong>Costo:</strong> {currentService.cost}
              </Typography>
              <Typography variant="small" color="gray">
                <strong>Compatibilidad:</strong> {currentService.compatibility}
              </Typography>
              <Typography variant="small" color="gray">
                <strong>Configuración:</strong> {currentService.setup}
              </Typography>
            </div>
          </div>
        )}

        {/* Recomendación */}
        <div className="mb-6">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Recomendación
          </Typography>
          <Alert color={recommendation.priority === 'Alta' ? 'green' : recommendation.priority === 'Media' ? 'yellow' : 'blue'}>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              <div>
                <Typography variant="small" className="font-semibold">
                  {recommendation.action}
                </Typography>
                <Typography variant="small" className="opacity-80">
                  {recommendation.benefit}
                </Typography>
                <Typography variant="small" className="opacity-60">
                  Costo: {recommendation.cost}
                </Typography>
              </div>
            </div>
          </Alert>
        </div>

        {/* Información de costos */}
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
            <Typography variant="h6" color="blue-gray">
              Costos de Push Notifications
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="small" color="gray">
              <strong>FCM (Chrome, Edge, Opera):</strong> GRATIS hasta 10,000 notificaciones por mes
            </Typography>
            <Typography variant="small" color="gray">
              <strong>Firefox Push Service:</strong> COMPLETAMENTE GRATIS
            </Typography>
            <Typography variant="small" color="gray">
              <strong>Apple Push Service:</strong> GRATIS (requiere Apple Developer Account)
            </Typography>
          </div>
        </div>

        {/* Compatibilidad de navegadores */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Compatibilidad por Navegador
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(services).map((service, index) => (
              <div key={index} className="p-3 bg-white rounded border">
                <Typography variant="small" className="font-semibold mb-1">
                  {service.name}
                </Typography>
                <Typography variant="small" color="gray" className="mb-1">
                  {service.service}
                </Typography>
                <Typography variant="small" color="green" className="font-semibold">
                  {service.cost}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Nota importante */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <Typography variant="small" color="blue-gray">
            <strong>💡 Nota:</strong> Para la mayoría de proyectos inmobiliarios, 
            el plan gratuito de FCM (10,000 notificaciones/mes) es más que suficiente. 
            Esto equivale a enviar notificaciones a 100 usuarios con 100 notificaciones cada uno.
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default PushServiceInfo;
