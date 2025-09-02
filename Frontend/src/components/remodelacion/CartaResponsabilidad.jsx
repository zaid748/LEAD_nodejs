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
  Avatar,
} from "@material-tailwind/react";
import {
  DocumentTextIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  UserIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function CartaResponsabilidad({ proyectoId, userRole }) {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    contratista: "",
    materiales_entregados: "",
    terminos_condiciones: "",
    notas: "",
  });

  useEffect(() => {
    cargarCartas();
  }, [proyectoId]);

  const cargarCartas = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // const data = await remodelacionAPI.obtenerCartasResponsabilidad(proyectoId);
      // setCartas(data);
      
      // Datos de ejemplo
      setCartas([
        {
          _id: "1",
          contratista: "Carlos López",
          fecha_firma: "2024-01-15T10:30:00Z",
          firma_url: "/uploads/firmas/firma_carlos.jpg",
          pdf_url: "/uploads/cartas/carta_carlos.pdf",
          estatus: "Firmada",
          materiales_entregados: "Cemento, Varilla, Pintura",
          terminos_condiciones: "Acepto la responsabilidad total de los materiales recibidos",
          notas: "Materiales entregados en perfecto estado",
          usuario_firma: "Carlos López",
        },
        {
          _id: "2",
          contratista: "María González",
          fecha_firma: null,
          firma_url: null,
          pdf_url: null,
          estatus: "Pendiente",
          materiales_entregados: "Azulejos, Cemento",
          terminos_condiciones: "",
          notas: "Esperando firma del contratista",
          usuario_firma: null,
        },
      ]);
    } catch (err) {
      console.error("Error al cargar cartas:", err);
      setError("Error al cargar las cartas de responsabilidad");
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
    
    if (!formData.contratista || !formData.materiales_entregados) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar llamada a API
      // const response = await remodelacionAPI.crearCartaResponsabilidad(proyectoId, formData);
      
      // Simular respuesta exitosa
      const nuevaCarta = {
        _id: Date.now().toString(),
        ...formData,
        fecha_firma: null,
        firma_url: null,
        pdf_url: null,
        estatus: "Pendiente",
        usuario_firma: null,
      };
      
      setCartas(prev => [nuevaCarta, ...prev]);
      setFormData({
        contratista: "",
        materiales_entregados: "",
        terminos_condiciones: "",
        notas: "",
      });
      
      setSuccess("Carta de responsabilidad creada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al crear carta:", err);
      setError("Error al crear la carta de responsabilidad");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (carta) => {
    setEditando(carta._id);
    setFormData({
      contratista: carta.contratista,
      materiales_entregados: carta.materiales_entregados,
      terminos_condiciones: carta.terminos_condiciones,
      notas: carta.notas,
    });
  };

  const handleActualizar = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implementar llamada a API
      // await remodelacionAPI.actualizarCartaResponsabilidad(proyectoId, editando, formData);
      
      setCartas(prev => prev.map(c => 
        c._id === editando 
          ? { ...c, ...formData }
          : c
      ));
      
      setEditando(null);
      setFormData({
        contratista: "",
        materiales_entregados: "",
        terminos_condiciones: "",
        notas: "",
      });
      
      setSuccess("Carta actualizada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al actualizar carta:", err);
      setError("Error al actualizar la carta");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setFormData({
      contratista: "",
      materiales_entregados: "",
      terminos_condiciones: "",
      notas: "",
    });
  };

  const handleEliminar = async (cartaId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta carta?")) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // await remodelacionAPI.eliminarCartaResponsabilidad(proyectoId, cartaId);
      
      setCartas(prev => prev.filter(c => c._id !== cartaId));
      setSuccess("Carta eliminada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al eliminar carta:", err);
      setError("Error al eliminar la carta");
    } finally {
      setLoading(false);
    }
  };

  const firmarCarta = async (cartaId) => {
    try {
      // TODO: Implementar llamada a API para firmar
      // await remodelacionAPI.firmarCartaResponsabilidad(proyectoId, cartaId);
      
      setCartas(prev => prev.map(c => 
        c._id === cartaId 
          ? { 
              ...c, 
              estatus: "Firmada",
              fecha_firma: new Date().toISOString(),
              usuario_firma: "Usuario Actual" // TODO: Obtener del contexto
            }
          : c
      ));
      
      setSuccess("Carta firmada exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error al firmar carta:", err);
      setError("Error al firmar la carta");
    }
  };

  const puedeCrear = userRole === "supervisor";
  const puedeEditar = userRole === "supervisor";
  const puedeFirmar = userRole === "contratista";

  const getEstatusColor = (estatus) => {
    const colors = {
      "Pendiente": "amber",
      "Firmada": "green",
      "Cancelada": "red",
    };
    return colors[estatus] || "gray";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Pendiente";
    return new Date(dateString).toLocaleDateString("es-MX");
  };

  const descargarPDF = (pdfUrl) => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'carta_responsabilidad.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const verFirma = (firmaUrl) => {
    if (firmaUrl) {
      window.open(firmaUrl, '_blank');
    }
  };

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
      <div className="flex items-center gap-3">
        <DocumentTextIcon className="h-8 w-8 text-blue-500" />
        <div>
          <Typography variant="h5" color="blue-gray">
            Carta de Responsabilidad
          </Typography>
          <Typography variant="small" color="gray">
            Gestión de responsabilidades por materiales entregados
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
              {editando ? "Editar Carta" : "Nueva Carta de Responsabilidad"}
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Contratista *"
                  name="contratista"
                  value={formData.contratista}
                  onChange={handleInputChange}
                  required
                  icon={<UserIcon className="h-4 w-4" />}
                />
                
                <Input
                  label="Materiales Entregados *"
                  name="materiales_entregados"
                  value={formData.materiales_entregados}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Cemento, Varilla, Pintura"
                />
              </div>
              
              <Textarea
                label="Términos y Condiciones"
                name="terminos_condiciones"
                value={formData.terminos_condiciones}
                onChange={handleInputChange}
                rows={4}
                placeholder="Términos legales de responsabilidad..."
              />
              
              <Textarea
                label="Notas Adicionales"
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                rows={3}
                placeholder="Observaciones sobre la entrega..."
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
                      <DocumentTextIcon className="h-4 w-4" />
                      Crear Carta
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Tabla de Cartas */}
      <Card>
        <CardHeader color="blue-gray" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Cartas de Responsabilidad ({cartas.length})
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          {cartas.length === 0 ? (
            <div className="text-center p-8">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <Typography color="gray">No hay cartas de responsabilidad</Typography>
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Contratista</TableHeaderCell>
                  <TableHeaderCell>Materiales</TableHeaderCell>
                  <TableHeaderCell>Estatus</TableHeaderCell>
                  <TableHeaderCell>Fecha Firma</TableHeaderCell>
                  <TableHeaderCell>Documentos</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartas.map((carta) => (
                  <TableRow key={carta._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={carta.firma_url}
                          alt={carta.contratista}
                          size="sm"
                          className="border-2 border-gray-200"
                        />
                        <div>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {carta.contratista}
                          </Typography>
                          {carta.notas && (
                            <Typography variant="small" color="gray" className="italic">
                              {carta.notas}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="small" color="blue-gray">
                        {carta.materiales_entregados}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        value={carta.estatus}
                        color={getEstatusColor(carta.estatus)}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-blue-gray-500" />
                        <Typography variant="small">
                          {formatDate(carta.fecha_firma)}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {carta.pdf_url && (
                          <Button
                            size="sm"
                            variant="text"
                            color="blue"
                            onClick={() => descargarPDF(carta.pdf_url)}
                            className="p-2"
                          >
                            <ArrowDownTrayIcon className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {carta.firma_url && (
                          <Button
                            size="sm"
                            variant="text"
                            color="green"
                            onClick={() => verFirma(carta.firma_url)}
                            className="p-2"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        )}
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
                        
                        {/* Editar (solo supervisor) */}
                        {puedeEditar && carta.estatus === "Pendiente" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="blue"
                            onClick={() => handleEditar(carta)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Eliminar (solo supervisor) */}
                        {puedeEditar && carta.estatus === "Pendiente" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="red"
                            onClick={() => handleEliminar(carta._id)}
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Firmar (solo contratista) */}
                        {puedeFirmar && carta.estatus === "Pendiente" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="green"
                            onClick={() => firmarCarta(carta._id)}
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

      {/* Información legal */}
      <Card className="bg-amber-50 border-amber-200">
        <CardBody className="p-6">
          <Typography variant="h6" color="amber" className="mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6" />
            Información Legal Importante
          </Typography>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <Typography variant="small" color="amber">
                La carta de responsabilidad es un documento legal que establece la responsabilidad del contratista sobre los materiales recibidos.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <Typography variant="small" color="amber">
                Al firmar, el contratista acepta ser responsable del uso, cuidado y custodia de los materiales entregados.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <Typography variant="small" color="amber">
                En caso de daño, pérdida o mal uso, el contratista será responsable de los costos de reposición.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <Typography variant="small" color="amber">
                La firma debe realizarse únicamente por el contratista asignado al proyecto.
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
