import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Textarea,
  Spinner,
  Alert,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@material-tailwind/react";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  ClipboardDocumentIcon,
  UserIcon,
  CalendarIcon,
  BellIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function SolicitudForm({ proyectoId, userRole }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    tipo_material: "",
    cantidad: "",
    notas: "",
  });

  useEffect(() => {
    cargarSolicitudes();
  }, [proyectoId]);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // const data = await remodelacionAPI.obtenerSolicitudes(proyectoId);
      // setSolicitudes(data);
      
      // Datos de ejemplo
      setSolicitudes([
        {
          _id: "1",
          tipo_material: "Pintura",
          cantidad: "20 litros",
          notas: "Pintura blanca para interiores",
          contratista: "Carlos López",
          fecha_solicitud: "2024-01-15T10:30:00Z",
          estatus: "Solicitando material",
          costo_estimado: null,
          supervisor_aprobacion: null,
          administrador_aprobacion: null,
          fecha_compra: null,
          numero_folio: null,
          foto_comprobante: null,
          fecha_entrega: null,
        },
        {
          _id: "2",
          tipo_material: "Azulejos",
          cantidad: "100 piezas",
          notas: "Azulejos 30x30 cm para baño",
          contratista: "Carlos López",
          fecha_solicitud: "2024-01-14T14:20:00Z",
          estatus: "Aprobacion administrativa",
          costo_estimado: 8500,
          supervisor_aprobacion: "Juan Pérez",
          administrador_aprobacion: null,
          fecha_compra: null,
          numero_folio: null,
          foto_comprobante: null,
          fecha_entrega: null,
        },
        {
          _id: "3",
          tipo_material: "Cemento",
          cantidad: "15 sacos",
          notas: "Cemento Portland tipo I",
          contratista: "Carlos López",
          fecha_solicitud: "2024-01-13T09:15:00Z",
          estatus: "Aprobado para su compra",
          costo_estimado: 3750,
          supervisor_aprobacion: "Juan Pérez",
          administrador_aprobacion: "Admin User",
          fecha_compra: null,
          numero_folio: null,
          foto_comprobante: null,
          fecha_entrega: null,
        },
      ]);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
      setError("Error al cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.tipo_material || !formData.cantidad) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar llamada a API
      // const response = await remodelacionAPI.crearSolicitud(proyectoId, formData);
      
      // Simular respuesta exitosa
      const nuevaSolicitud = {
        _id: Date.now().toString(),
        ...formData,
        contratista: "Usuario Actual", // TODO: Obtener del contexto
        fecha_solicitud: new Date().toISOString(),
        estatus: "Solicitando material",
        costo_estimado: null,
        supervisor_aprobacion: null,
        administrador_aprobacion: null,
        fecha_compra: null,
        numero_folio: null,
        foto_comprobante: null,
        fecha_entrega: null,
      };
      
      setSolicitudes(prev => [nuevaSolicitud, ...prev]);
      setFormData({
        tipo_material: "",
        cantidad: "",
        notas: "",
      });
      
      setSuccess("Solicitud creada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al crear solicitud:", err);
      setError("Error al crear la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (solicitud) => {
    setEditando(solicitud._id);
    setFormData({
      tipo_material: solicitud.tipo_material,
      cantidad: solicitud.cantidad,
      notas: solicitud.notas,
    });
  };

  const handleActualizar = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar llamada a API
      // await remodelacionAPI.actualizarSolicitud(proyectoId, editando, formData);
      
      setSolicitudes(prev => prev.map(s => 
        s._id === editando 
          ? { ...s, ...formData }
          : s
      ));
      
      setEditando(null);
      setFormData({
        tipo_material: "",
        cantidad: "",
        notas: "",
      });
      
      setSuccess("Solicitud actualizada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al actualizar solicitud:", err);
      setError("Error al actualizar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setFormData({
      tipo_material: "",
      cantidad: "",
      notas: "",
    });
  };

  const handleEliminar = async (solicitudId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta solicitud?")) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // await remodelacionAPI.eliminarSolicitud(proyectoId, solicitudId);
      
      setSolicitudes(prev => prev.filter(s => s._id !== solicitudId));
      setSuccess("Solicitud eliminada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al eliminar solicitud:", err);
      setError("Error al eliminar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const agregarCosto = async (solicitudId, costo) => {
    try {
      // TODO: Implementar llamada a API
      // await remodelacionAPI.agregarCosto(proyectoId, solicitudId, costo);
      
      setSolicitudes(prev => prev.map(s => 
        s._id === solicitudId 
          ? { 
              ...s, 
              costo_estimado: parseFloat(costo),
              estatus: "Aprobacion administrativa",
              supervisor_aprobacion: "Usuario Actual" // TODO: Obtener del contexto
            }
          : s
      ));
      
      setSuccess("Costo agregado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al agregar costo:", err);
      setError("Error al agregar el costo");
    }
  };

  const aprobarSolicitud = async (solicitudId) => {
    try {
      // TODO: Implementar llamada a API
      // await remodelacionAPI.aprobarSolicitud(proyectoId, solicitudId);
      
      setSolicitudes(prev => prev.map(s => 
        s._id === solicitudId 
          ? { 
              ...s, 
              estatus: "Aprobado para su compra",
              administrador_aprobacion: "Usuario Actual" // TODO: Obtener del contexto
            }
          : s
      ));
      
      setSuccess("Solicitud aprobada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al aprobar solicitud:", err);
      setError("Error al aprobar la solicitud");
    }
  };

  const puedeCrear = userRole === "contratista";
  const puedeEditar = userRole === "contratista";
  const puedeAgregarCosto = userRole === "supervisor";
  const puedeAprobar = userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";

  const getEstatusColor = (estatus) => {
    const colors = {
      "Solicitando material": "blue",
      "Aprobacion administrativa": "amber",
      "Aprobado para su compra": "green",
      "En proceso de entrega": "purple",
      "Entregado": "green",
      "Cancelado": "red",
    };
    return colors[estatus] || "gray";
  };

  const getEstatusIcon = (estatus) => {
    switch (estatus) {
      case "Solicitando material":
        return <BellIcon className="h-4 w-4" />;
      case "Aprobacion administrativa":
        return <ClipboardDocumentIcon className="h-4 w-4" />;
      case "Aprobado para su compra":
        return <CheckIcon className="h-4 w-4" />;
      case "En proceso de entrega":
        return <CurrencyDollarIcon className="h-4 w-4" />;
      case "Entregado":
        return <CheckIcon className="h-4 w-4" />;
      default:
        return <ClipboardDocumentIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-MX");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BellIcon className="h-8 w-8 text-blue-500" />
        <div>
          <Typography variant="h5" color="blue-gray">
            Solicitudes de Materiales
          </Typography>
          <Typography variant="small" color="gray">
            Gestión de solicitudes de materiales por parte de contratistas
          </Typography>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <Alert color="red" className="flex items-center gap-2">
          <XMarkIcon className="h-5 w-5" />
          {error}
        </Alert>
      )}

      {success && (
        <Alert color="green" className="flex items-center gap-2">
          <CheckIcon className="h-5 w-5" />
          {success}
        </Alert>
      )}

      {/* Formulario */}
      {puedeCrear && (
        <Card>
          <CardHeader color="blue" variant="gradient" className="p-4">
            <Typography variant="h6" color="white">
              {editando ? "Editar Solicitud" : "Nueva Solicitud de Material"}
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tipo de Material *"
                  name="tipo_material"
                  value={formData.tipo_material}
                  onChange={handleInputChange}
                  required
                  icon={<ClipboardDocumentIcon className="h-4 w-4" />}
                />
                
                <Input
                  label="Cantidad *"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: 20 litros, 100 piezas"
                />
              </div>
              
              <Textarea
                label="Notas Adicionales"
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe el material, especificaciones, etc."
              />
              
              <div className="flex gap-2 justify-end">
                {editando && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="red"
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </Button>
                )}
                
                <Button
                  type={editando ? "button" : "submit"}
                  variant="gradient"
                  color={editando ? "blue" : "green"}
                  onClick={editando ? handleActualizar : undefined}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : editando ? (
                    <>
                      <PencilIcon className="h-4 w-4" />
                      Actualizar
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-4 w-4" />
                      Crear Solicitud
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Tabla de Solicitudes */}
      <Card>
        <CardHeader color="blue-gray" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Solicitudes ({solicitudes.length})
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Spinner size="lg" />
            </div>
          ) : solicitudes.length === 0 ? (
            <div className="text-center p-8">
              <Typography color="gray">No hay solicitudes registradas</Typography>
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Material</TableHeaderCell>
                  <TableHeaderCell>Contratista</TableHeaderCell>
                  <TableHeaderCell>Estatus</TableHeaderCell>
                  <TableHeaderCell>Costo Estimado</TableHeaderCell>
                  <TableHeaderCell>Fecha Solicitud</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {solicitudes.map((solicitud) => (
                  <TableRow key={solicitud._id}>
                    <TableCell>
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-medium">
                          {solicitud.tipo_material}
                        </Typography>
                        <Typography variant="small" color="gray">
                          {solicitud.cantidad}
                        </Typography>
                        {solicitud.notas && (
                          <Typography variant="small" color="gray" className="italic">
                            {solicitud.notas}
                          </Typography>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-blue-gray-500" />
                        <Typography variant="small">
                          {solicitud.contratista}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        value={solicitud.estatus}
                        color={getEstatusColor(solicitud.estatus)}
                        size="sm"
                        icon={getEstatusIcon(solicitud.estatus)}
                      />
                    </TableCell>
                    <TableCell>
                      {solicitud.costo_estimado ? (
                        <Typography variant="small" className="font-medium text-green-600">
                          ${solicitud.costo_estimado.toLocaleString()}
                        </Typography>
                      ) : (
                        <Typography variant="small" color="gray">
                          Pendiente
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-blue-gray-500" />
                        <Typography variant="small">
                          {formatDate(solicitud.fecha_solicitud)}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {/* Ver detalles */}
                        <Button
                          size="sm"
                          variant="text"
                          color="blue"
                          className="p-2"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        
                        {/* Editar (solo contratista) */}
                        {puedeEditar && solicitud.estatus === "Solicitando material" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="blue"
                            onClick={() => handleEditar(solicitud)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Eliminar (solo contratista) */}
                        {puedeEditar && solicitud.estatus === "Solicitando material" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="red"
                            onClick={() => handleEliminar(solicitud._id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Agregar costo (solo supervisor) */}
                        {puedeAgregarCosto && solicitud.estatus === "Solicitando material" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="amber"
                            onClick={() => {
                              const costo = prompt("Ingresa el costo estimado del material:");
                              if (costo && !isNaN(costo)) {
                                agregarCosto(solicitud._id, costo);
                              }
                            }}
                          >
                            <CurrencyDollarIcon className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Aprobar (solo administrador) */}
                        {puedeAprobar && solicitud.estatus === "Aprobacion administrativa" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="green"
                            onClick={() => aprobarSolicitud(solicitud._id)}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Información del flujo */}
      <Card className="bg-blue-50 border-blue-200">
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Flujo de Solicitudes de Materiales
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Typography variant="small" color="white" className="font-bold">1</Typography>
              </div>
              <Typography variant="small" color="blue-gray" className="font-medium">
                Solicitud
              </Typography>
              <Typography variant="small" color="blue-gray">
                Contratista solicita material
              </Typography>
            </div>
            
            <div className="text-center p-3 bg-amber-100 rounded-lg">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Typography variant="small" color="white" className="font-bold">2</Typography>
              </div>
              <Typography variant="small" color="amber" className="font-medium">
                Costo
              </Typography>
              <Typography variant="small" color="amber">
                Supervisor agrega costo
              </Typography>
            </div>
            
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Typography variant="small" color="white" className="font-bold">3</Typography>
              </div>
              <Typography variant="small" color="green" className="font-medium">
                Aprobación
              </Typography>
              <Typography variant="small" color="green">
                Administración aprueba
              </Typography>
            </div>
            
            <div className="text-center p-3 bg-purple-100 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Typography variant="small" color="white" className="font-bold">4</Typography>
              </div>
              <Typography variant="small" color="purple" className="font-medium">
                Compra
              </Typography>
              <Typography variant="small" color="purple">
                Supervisor compra
              </Typography>
            </div>
            
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Typography variant="small" color="white" className="font-bold">5</Typography>
              </div>
              <Typography variant="small" color="green" className="font-medium">
                Entrega
              </Typography>
              <Typography variant="small" color="green">
                Contratista recibe
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
