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
} from "@heroicons/react/24/outline";

export default function MaterialForm({ proyectoId, userRole }) {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    tipo_material: "",
    cantidad: "",
    costo: "",
    numero_factura: "",
    notas: "",
  });

  useEffect(() => {
    cargarMateriales();
  }, [proyectoId]);

  const cargarMateriales = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // const data = await remodelacionAPI.obtenerMateriales(proyectoId);
      // setMateriales(data);
      
      // Datos de ejemplo
      setMateriales([
        {
          _id: "1",
          tipo_material: "Cemento",
          cantidad: "10 sacos",
          costo: 2500,
          numero_factura: "F-001-2024",
          notas: "Cemento Portland tipo I",
          usuario_registro: "Admin User",
          fecha_registro: "2024-01-15T10:30:00Z",
          estatus: "Recibido",
        },
        {
          _id: "2",
          tipo_material: "Varilla",
          cantidad: "50 piezas",
          costo: 15000,
          numero_factura: "F-002-2024",
          notas: "Varilla corrugada 3/8",
          usuario_registro: "Admin User",
          fecha_registro: "2024-01-16T14:20:00Z",
          estatus: "Pendiente",
        },
      ]);
    } catch (err) {
      console.error("Error al cargar materiales:", err);
      setError("Error al cargar los materiales");
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
    
    if (!formData.tipo_material || !formData.cantidad || !formData.costo) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar llamada a API
      // const response = await remodelacionAPI.registrarMaterial(proyectoId, formData);
      
      // Simular respuesta exitosa
      const nuevoMaterial = {
        _id: Date.now().toString(),
        ...formData,
        costo: parseFloat(formData.costo),
        usuario_registro: "Usuario Actual", // TODO: Obtener del contexto
        fecha_registro: new Date().toISOString(),
        estatus: "Pendiente",
      };
      
      setMateriales(prev => [nuevoMaterial, ...prev]);
      setFormData({
        tipo_material: "",
        cantidad: "",
        costo: "",
        numero_factura: "",
        notas: "",
      });
      
      setSuccess("Material registrado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al registrar material:", err);
      setError("Error al registrar el material");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (material) => {
    setEditando(material._id);
    setFormData({
      tipo_material: material.tipo_material,
      cantidad: material.cantidad,
      costo: material.costo.toString(),
      numero_factura: material.numero_factura,
      notas: material.notas,
    });
  };

  const handleActualizar = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar llamada a API
      // await remodelacionAPI.actualizarMaterial(proyectoId, editando, formData);
      
      setMateriales(prev => prev.map(m => 
        m._id === editando 
          ? { ...m, ...formData, costo: parseFloat(formData.costo) }
          : m
      ));
      
      setEditando(null);
      setFormData({
        tipo_material: "",
        cantidad: "",
        costo: "",
        numero_factura: "",
        notas: "",
      });
      
      setSuccess("Material actualizado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al actualizar material:", err);
      setError("Error al actualizar el material");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setFormData({
      tipo_material: "",
      cantidad: "",
      costo: "",
      numero_factura: "",
      notas: "",
    });
  };

  const handleEliminar = async (materialId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este material?")) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // await remodelacionAPI.eliminarMaterial(proyectoId, materialId);
      
      setMateriales(prev => prev.filter(m => m._id !== materialId));
      setSuccess("Material eliminado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al eliminar material:", err);
      setError("Error al eliminar el material");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstatus = async (materialId, nuevoEstatus) => {
    try {
      // TODO: Implementar llamada a API
      // await remodelacionAPI.cambiarEstatusMaterial(proyectoId, materialId, nuevoEstatus);
      
      setMateriales(prev => prev.map(m => 
        m._id === materialId 
          ? { ...m, estatus: nuevoEstatus }
          : m
      ));
      
      setSuccess("Estatus actualizado exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al cambiar estatus:", err);
      setError("Error al cambiar el estatus");
    }
  };

  const puedeEditar = userRole === "administrator" || userRole === "administrador" || userRole === "ayudante de administrador";
  const puedeCambiarEstatus = userRole === "supervisor" || userRole === "contratista";

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-MX");
  };

  const getEstatusColor = (estatus) => {
    const colors = {
      "Pendiente": "amber",
      "Recibido": "green",
      "En proceso": "blue",
      "Cancelado": "red",
    };
    return colors[estatus] || "gray";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ClipboardDocumentIcon className="h-8 w-8 text-blue-500" />
        <div>
          <Typography variant="h5" color="blue-gray">
            Gastos Administrativos de Materiales
          </Typography>
          <Typography variant="small" color="gray">
            Registro y gestión de materiales comprados por administración
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
      {puedeEditar && (
        <Card>
          <CardHeader color="blue" variant="gradient" className="p-4">
            <Typography variant="h6" color="white">
              {editando ? "Editar Material" : "Registrar Nuevo Material"}
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
                  placeholder="Ej: 10 sacos, 50 piezas"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Costo ($) *"
                  type="number"
                  name="costo"
                  value={formData.costo}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  icon={<CurrencyDollarIcon className="h-4 w-4" />}
                />
                
                <Input
                  label="Número de Factura"
                  name="numero_factura"
                  value={formData.numero_factura}
                  onChange={handleInputChange}
                  icon={<ClipboardDocumentIcon className="h-4 w-4" />}
                />
              </div>
              
              <Textarea
                label="Notas Adicionales"
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                rows={3}
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
                      Registrar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Tabla de Materiales */}
      <Card>
        <CardHeader color="blue-gray" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Materiales Registrados ({materiales.length})
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Spinner size="lg" />
            </div>
          ) : materiales.length === 0 ? (
            <div className="text-center p-8">
              <Typography color="gray">No hay materiales registrados</Typography>
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Tipo de Material</TableHeaderCell>
                  <TableHeaderCell>Cantidad</TableHeaderCell>
                  <TableHeaderCell>Costo</TableHeaderCell>
                  <TableHeaderCell>N° Factura</TableHeaderCell>
                  <TableHeaderCell>Estatus</TableHeaderCell>
                  <TableHeaderCell>Registrado por</TableHeaderCell>
                  <TableHeaderCell>Fecha</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materiales.map((material) => (
                  <TableRow key={material._id}>
                    <TableCell>
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-medium">
                          {material.tipo_material}
                        </Typography>
                        {material.notas && (
                          <Typography variant="small" color="gray">
                            {material.notas}
                          </Typography>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{material.cantidad}</TableCell>
                    <TableCell>
                      <Typography variant="small" className="font-medium">
                        {formatCurrency(material.costo)}
                      </Typography>
                    </TableCell>
                    <TableCell>{material.numero_factura || "N/A"}</TableCell>
                    <TableCell>
                      <Chip
                        value={material.estatus}
                        color={getEstatusColor(material.estatus)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-blue-gray-500" />
                        <Typography variant="small">
                          {material.usuario_registro}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-blue-gray-500" />
                        <Typography variant="small">
                          {formatDate(material.fecha_registro)}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {puedeEditar && (
                          <>
                            <Button
                              size="sm"
                              variant="text"
                              color="blue"
                              onClick={() => handleEditar(material)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="text"
                              color="red"
                              onClick={() => handleEliminar(material._id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        {puedeCambiarEstatus && material.estatus === "Pendiente" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="green"
                            onClick={() => cambiarEstatus(material._id, "Recibido")}
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
    </div>
  );
}
