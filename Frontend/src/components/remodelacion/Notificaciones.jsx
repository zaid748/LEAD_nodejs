import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Spinner,
  Alert,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import {
  BellIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon,
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function Notificaciones({ proyectoId, userRole }) {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todas"); // todas, no_leidas, leidas

  useEffect(() => {
    cargarNotificaciones();
    // TODO: Implementar WebSocket para notificaciones en tiempo real
    // const ws = new WebSocket('ws://localhost:4000');
    // ws.onmessage = (event) => {
    //   const notificacion = JSON.parse(event.data);
    //   if (notificacion.proyecto_id === proyectoId) {
    //     setNotificaciones(prev => [notificacion, ...prev]);
    //   }
    // };
    // return () => ws.close();
  }, [proyectoId]);

  const cargarNotificaciones = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // const data = await remodelacionAPI.obtenerNotificaciones(proyectoId);
      // setNotificaciones(data);
      
      // Datos de ejemplo
      setNotificaciones([
        {
          _id: "1",
          titulo: "Nueva solicitud de material",
          mensaje: "Se ha creado una nueva solicitud para el proyecto Casa Azul",
          tipo: "solicitud_material",
          prioridad: "media",
          leida: false,
          fecha_creacion: "2024-01-15T10:30:00Z",
          usuario_origen: "Carlos López",
          accion_requerida: "revisar_solicitud",
        },
        {
          _id: "2",
          titulo: "Costo agregado a solicitud",
          mensaje: "Se ha agregado un costo de $8,500 a la solicitud de azulejos",
          tipo: "costo_agregado",
          prioridad: "alta",
          leida: false,
          fecha_creacion: "2024-01-15T14:20:00Z",
          usuario_origen: "Juan Pérez",
          accion_requerida: "aprobar_solicitud",
        },
        {
          _id: "3",
          titulo: "Solicitud aprobada",
          mensaje: "La solicitud de cemento ha sido aprobada por administración",
          tipo: "solicitud_aprobada",
          prioridad: "baja",
          leida: true,
          fecha_creacion: "2024-01-15T16:45:00Z",
          usuario_origen: "Admin User",
          accion_requerida: "comprar_material",
        },
        {
          _id: "4",
          titulo: "Material comprado",
          mensaje: "El cemento ha sido comprado y está en proceso de entrega",
          tipo: "material_comprado",
          prioridad: "media",
          leida: true,
          fecha_creacion: "2024-01-16T09:15:00Z",
          usuario_origen: "Juan Pérez",
          accion_requerida: "entregar_material",
        },
        {
          _id: "5",
          titulo: "Material entregado",
          mensaje: "El cemento ha sido entregado al contratista",
          tipo: "material_entregado",
          prioridad: "baja",
          leida: false,
          fecha_creacion: "2024-01-16T11:30:00Z",
          usuario_origen: "Juan Pérez",
          accion_requerida: "firmar_carta",
        },
      ]);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
      setError("Error al cargar las notificaciones");
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLeida = async (notificacionId) => {
    try {
      // TODO: Implementar llamada a API
      // await remodelacionAPI.marcarNotificacionLeida(proyectoId, notificacionId);
      
      setNotificaciones(prev => prev.map(n => 
        n._id === notificacionId 
          ? { ...n, leida: true, fecha_lectura: new Date().toISOString() }
          : n
      ));
    } catch (err) {
      console.error("Error al marcar notificación como leída:", err);
    }
  };

  const marcarTodasComoLeidas = async () => {
    try {
      // TODO: Implementar llamada a API
      // await remodelacionAPI.marcarTodasNotificacionesLeidas(proyectoId);
      
      setNotificaciones(prev => prev.map(n => ({
        ...n,
        leida: true,
        fecha_lectura: new Date().toISOString()
      })));
    } catch (err) {
      console.error("Error al marcar todas las notificaciones como leídas:", err);
    }
  };

  const eliminarNotificacion = async (notificacionId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta notificación?")) {
      return;
    }

    try {
      // TODO: Implementar llamada a API
      // await remodelacionAPI.eliminarNotificacion(proyectoId, notificacionId);
      
      setNotificaciones(prev => prev.filter(n => n._id !== notificacionId));
    } catch (err) {
      console.error("Error al eliminar notificación:", err);
    }
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case "solicitud_material":
        return <ClipboardDocumentIcon className="h-5 w-5" />;
      case "costo_agregado":
        return <CurrencyDollarIcon className="h-5 w-5" />;
      case "solicitud_aprobada":
        return <CheckCircleIcon className="h-5 w-5" />;
      case "material_comprado":
        return <ShoppingCartIcon className="h-5 w-5" />;
      case "material_entregado":
        return <TruckIcon className="h-5 w-5" />;
      default:
        return <InformationCircleIcon className="h-5 w-5" />;
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "solicitud_material":
        return "blue";
      case "costo_agregado":
        return "amber";
      case "solicitud_aprobada":
        return "green";
      case "material_comprado":
        return "purple";
      case "material_entregado":
        return "green";
      default:
        return "gray";
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "red";
      case "media":
        return "amber";
      case "baja":
        return "green";
      default:
        return "gray";
    }
  };

  const getAccionRequerida = (accion) => {
    switch (accion) {
      case "revisar_solicitud":
        return "Revisar solicitud";
      case "aprobar_solicitud":
        return "Aprobar solicitud";
      case "comprar_material":
        return "Comprar material";
      case "entregar_material":
        return "Entregar material";
      case "firmar_carta":
        return "Firmar carta de responsabilidad";
      default:
        return "Sin acción requerida";
    }
  };

  const formatDate = (dateString) => {
    const fecha = new Date(dateString);
    const ahora = new Date();
    const diffMs = ahora - fecha;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Ahora mismo";
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return fecha.toLocaleDateString("es-MX");
  };

  const notificacionesFiltradas = notificaciones.filter(notif => {
    if (filtro === "no_leidas") return !notif.leida;
    if (filtro === "leidas") return notif.leida;
    return true;
  });

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BellIcon className="h-8 w-8 text-blue-500" />
          <div>
            <Typography variant="h5" color="blue-gray">
              Notificaciones
            </Typography>
            <Typography variant="small" color="gray">
              Sistema de notificaciones en tiempo real
            </Typography>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <BellIcon className="h-6 w-6 text-blue-gray-500" />
            {notificacionesNoLeidas > 0 && (
              <Chip
                value={notificacionesNoLeidas}
                size="sm"
                color="red"
                className="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs"
              />
            )}
          </div>
          
          {notificacionesNoLeidas > 0 && (
            <Button
              size="sm"
              variant="text"
              color="blue"
              onClick={marcarTodasComoLeidas}
            >
              Marcar todas como leídas
            </Button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardBody className="p-4">
          <div className="flex gap-2">
            <Button
              variant={filtro === "todas" ? "gradient" : "outlined"}
              color="blue"
              size="sm"
              onClick={() => setFiltro("todas")}
            >
              Todas ({notificaciones.length})
            </Button>
            <Button
              variant={filtro === "no_leidas" ? "gradient" : "outlined"}
              color="amber"
              size="sm"
              onClick={() => setFiltro("no_leidas")}
            >
              No leídas ({notificacionesNoLeidas})
            </Button>
            <Button
              variant={filtro === "leidas" ? "gradient" : "outlined"}
              color="green"
              size="sm"
              onClick={() => setFiltro("leidas")}
            >
              Leídas ({notificaciones.filter(n => n.leida).length})
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Lista de Notificaciones */}
      <Card>
        <CardHeader color="blue-gray" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Notificaciones del Proyecto
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          {notificacionesFiltradas.length === 0 ? (
            <div className="text-center p-8">
              <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <Typography variant="h6" color="gray" className="mb-2">
                No hay notificaciones
              </Typography>
              <Typography color="gray">
                {filtro === "todas" 
                  ? "No hay notificaciones para este proyecto"
                  : `No hay notificaciones ${filtro === "no_leidas" ? "no leídas" : "leídas"}`
                }
              </Typography>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notificacionesFiltradas.map((notificacion) => (
                <div
                  key={notificacion._id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notificacion.leida ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icono del tipo */}
                    <div className={`p-2 rounded-full bg-${getTipoColor(notificacion.tipo)}-100`}>
                      {getTipoIcon(notificacion.tipo)}
                    </div>
                    
                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Typography variant="h6" color="blue-gray" className="font-medium">
                              {notificacion.titulo}
                            </Typography>
                            
                            {!notificacion.leida && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            
                            <Chip
                              value={notificacion.prioridad}
                              color={getPrioridadColor(notificacion.prioridad)}
                              size="sm"
                              variant="ghost"
                            />
                          </div>
                          
                          <Typography color="gray" className="mb-2">
                            {notificacion.mensaje}
                          </Typography>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <UserIcon className="h-4 w-4" />
                              <span>{notificacion.usuario_origen}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>{formatDate(notificacion.fecha_creacion)}</span>
                            </div>
                          </div>
                          
                          {notificacion.accion_requerida && (
                            <div className="mt-2">
                              <Typography variant="small" color="blue-gray" className="font-medium">
                                Acción requerida:
                              </Typography>
                              <Typography variant="small" color="blue-gray">
                                {getAccionRequerida(notificacion.accion_requerida)}
                              </Typography>
                            </div>
                          )}
                        </div>
                        
                        {/* Acciones */}
                        <div className="flex gap-2 ml-4">
                          {!notificacion.leida && (
                            <Button
                              size="sm"
                              variant="text"
                              color="blue"
                              onClick={() => marcarComoLeida(notificacion._id)}
                            >
                              <CheckIcon className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="text"
                            color="red"
                            onClick={() => eliminarNotificacion(notificacion._id)}
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Información del sistema */}
      <Card className="bg-blue-50 border-blue-200">
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Sistema de Notificaciones
          </Typography>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Las notificaciones se generan automáticamente según las acciones realizadas en el sistema.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Las notificaciones no leídas se marcan con un punto azul y se destacan en azul claro.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Puedes marcar notificaciones como leídas individualmente o todas a la vez.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Las notificaciones se organizan por prioridad: Alta (roja), Media (ámbar), Baja (verde).
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
