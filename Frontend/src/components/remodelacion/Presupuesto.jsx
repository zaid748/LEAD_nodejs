import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Spinner,
  Alert,
  Chip,
} from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Presupuesto({ proyectoId, userRole, proyecto, remodelacionData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    presupuesto_estimado: "",
    supervisor_asignado: "",
    contratista_asignado: "",
    fecha_inicio: "",
    fecha_fin: "",
    notas: "",
  });

  // Calcular datos del presupuesto usando datos reales
  const calcularDatosPresupuesto = () => {
    // Debug temporalmente deshabilitado para limpiar consola
    
    // Buscar presupuesto en diferentes ubicaciones posibles
    const presupuestoEstimado = proyecto?.presupuesto_estimado || 
                                proyecto?.remodelacion?.presupuesto_estimado || 
                                0;
    
    // presupuestoEstimado calculado: ${presupuestoEstimado}
    const gastosAdministrativos = remodelacionData?.gastos_administrativos?.reduce((total, gasto) => total + (gasto.monto || 0), 0) || 0;
    const gastosMateriales = remodelacionData?.materiales?.reduce((total, material) => total + (material.costo_total || 0), 0) || 0;
    const gastosTotales = gastosAdministrativos + gastosMateriales;
    
    // LÓGICA CORREGIDA según reglas del negocio:
    // - Presupuesto Total = el mayor entre presupuesto estimado y gastos totales
    // - Diferencia = cuánto queda disponible (puede ser negativo si se excedió)
    const presupuestoTotal = Math.max(presupuestoEstimado, gastosTotales);
    const diferencia = presupuestoEstimado - gastosTotales;
    
    // Cálculos: Estimado=${presupuestoEstimado}, Total=${presupuestoTotal}, Diff=${diferencia}

    return {
      presupuesto_estimado: presupuestoEstimado,
      presupuesto_total: presupuestoTotal,
      gastos_totales: gastosTotales,
      supervisor_asignado: remodelacionData?.supervisor_asignado?.nombre || null,
      contratista_asignado: remodelacionData?.contratista_asignado?.nombre || null,
      fecha_inicio: remodelacionData?.fecha_inicio || null,
      fecha_fin: remodelacionData?.fecha_fin || null,
      notas: remodelacionData?.notas || '',
      gastos_administrativos: gastosAdministrativos,
      gastos_materiales: gastosMateriales,
      diferencia: diferencia,
      estado: remodelacionData?.estado || 'ACTIVO'
    };
  };

  const presupuesto = calcularDatosPresupuesto();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = async () => {
    try {
      // TODO: Implementar llamada a API
      // await remodelacionAPI.actualizarPresupuesto(proyectoId, formData);
      
      setPresupuesto(prev => ({
        ...prev,
        ...formData
      }));
      setEditando(false);
    } catch (err) {
      console.error("Error al guardar presupuesto:", err);
      setError("Error al guardar el presupuesto");
    }
  };

  const handleCancelar = () => {
    setFormData({
      presupuesto_estimado: presupuesto?.presupuesto_estimado || "",
      supervisor_asignado: presupuesto?.supervisor_asignado || "",
      fecha_inicio: presupuesto?.fecha_inicio || "",
      fecha_fin: presupuesto?.fecha_fin || "",
      notas: presupuesto?.notas || "",
    });
    setEditando(false);
  };

  // Definir permisos específicos por rol
  const puedeEditarPresupuesto = userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";
  const puedeAsignarContratista = userRole === "supervisor" || userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";
  const esSupervisor = userRole === "supervisor";

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="red" className="mb-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CurrencyDollarIcon className="h-8 w-8 text-blue-500" />
          <div>
            <Typography variant="h5" color="blue-gray">
              Presupuesto del Proyecto
            </Typography>
            <Typography variant="small" color="gray">
              Gestión financiera y asignación de recursos
            </Typography>
          </div>
        </div>
        
        {puedeAsignarContratista && (
          <Button
            variant={editando ? "outlined" : "gradient"}
            color={editando ? "red" : "blue"}
            className="flex items-center gap-2"
            onClick={() => editando ? handleCancelar() : setEditando(true)}
          >
            {editando ? (
              <>
                <XMarkIcon className="h-4 w-4" />
                Cancelar
              </>
            ) : (
              <>
                <PencilIcon className="h-4 w-4" />
                Editar
              </>
            )}
          </Button>
        )}
      </div>

      {/* Información del Presupuesto */}
      <Card>
        <CardHeader color="blue" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Resumen Financiero
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Presupuesto Estimado */}
            <div className="text-center p-4 bg-blue-gray-50 rounded-lg">
              <Typography variant="h4" color="blue" className="font-bold">
                ${presupuesto?.presupuesto_estimado?.toLocaleString() || "0"}
              </Typography>
              <Typography variant="small" color="blue-gray">
                Presupuesto Estimado
              </Typography>
            </div>

            {/* Presupuesto Total */}
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Typography variant="h4" color="green" className="font-bold">
                ${presupuesto?.presupuesto_total?.toLocaleString() || "0"}
              </Typography>
              <Typography variant="small" color="green">
                Presupuesto Total
              </Typography>
            </div>

            {/* Diferencia */}
            <div className={`text-center p-4 rounded-lg ${presupuesto?.diferencia >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <Typography 
                variant="h4" 
                color={presupuesto?.diferencia >= 0 ? "green" : "red"} 
                className="font-bold"
              >
                ${presupuesto?.diferencia?.toLocaleString() || "0"}
              </Typography>
              <Typography 
                variant="small" 
                color={presupuesto?.diferencia >= 0 ? "green" : "red"}
              >
                {presupuesto?.diferencia >= 0 ? 'Disponible' : 'Excedido'}
              </Typography>
            </div>
          </div>

          {/* Desglose de Gastos */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <Typography variant="h6" color="red" className="mb-2">
                Gastos Administrativos
              </Typography>
              <Typography variant="h4" color="red" className="font-bold">
                ${presupuesto?.gastos_administrativos?.toLocaleString() || "0"}
              </Typography>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <Typography variant="h6" color="purple" className="mb-2">
                Gastos de Materiales
              </Typography>
              <Typography variant="h4" color="purple" className="font-bold">
                ${presupuesto?.gastos_materiales?.toLocaleString() || "0"}
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Detalles del Proyecto */}
      <Card>
        <CardHeader color="blue-gray" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Detalles del Proyecto
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          {editando ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {puedeEditarPresupuesto && (
                  <Input
                    label="Presupuesto Estimado ($)"
                    type="number"
                    name="presupuesto_estimado"
                    value={formData.presupuesto_estimado}
                    onChange={handleInputChange}
                    icon={<CurrencyDollarIcon className="h-4 w-4" />}
                    disabled={esSupervisor}
                  />
                )}
                
                {puedeAsignarSupervisor && (
                  <Input
                    label="Supervisor Asignado"
                    name="supervisor_asignado"
                    value={formData.supervisor_asignado}
                    onChange={handleInputChange}
                    icon={<UserIcon className="h-4 w-4" />}
                    disabled={esSupervisor}
                  />
                )}
                
                {puedeAsignarContratista && (
                  <Input
                    label="Contratista Asignado"
                    name="contratista_asignado"
                    value={formData.contratista_asignado}
                    onChange={handleInputChange}
                    icon={<UserIcon className="h-4 w-4" />}
                  />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Fecha de Inicio"
                  type="date"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleInputChange}
                  icon={<CalendarIcon className="h-4 w-4" />}
                />
                
                <Input
                  label="Fecha de Finalización"
                  type="date"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  onChange={handleInputChange}
                  icon={<CalendarIcon className="h-4 w-4" />}
                />
              </div>
              
              <Input
                label="Notas Adicionales"
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outlined"
                  color="red"
                  onClick={handleCancelar}
                >
                  Cancelar
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={handleGuardar}
                  className="flex items-center gap-2"
                >
                  <CheckIcon className="h-4 w-4" />
                  Guardar
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-blue-gray-500" />
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      Supervisor Asignado
                    </Typography>
                    <Typography>{presupuesto?.supervisor_asignado || "No asignado"}</Typography>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-blue-gray-500" />
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      Contratista Asignado
                    </Typography>
                    <Typography>{presupuesto?.contratista_asignado || "No asignado"}</Typography>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-blue-gray-500" />
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      Fecha de Inicio
                    </Typography>
                    <Typography>{presupuesto?.fecha_inicio || "No definida"}</Typography>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-blue-gray-500" />
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      Fecha de Finalización
                    </Typography>
                    <Typography>{presupuesto?.fecha_fin || "No definida"}</Typography>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                    Notas Adicionales
                  </Typography>
                  <Typography className="bg-blue-gray-50 p-3 rounded-lg">
                    {presupuesto?.notas || "Sin notas adicionales"}
                  </Typography>
                </div>
                
                <div className="flex items-center gap-2">
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    Estado:
                  </Typography>
                  <Chip
                    value={presupuesto?.presupuesto_total > 0 ? "Activo" : "Pendiente"}
                    color={presupuesto?.presupuesto_total > 0 ? "green" : "amber"}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
