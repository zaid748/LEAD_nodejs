import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Spinner,
  Alert,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import {
  BuildingOfficeIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ClockIcon,
  BriefcaseIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { captacionesAPI } from "../../../services/api";

export function DetalleCaptacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [captacion, setCaptacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    cargarCaptacion();
  }, [id]);

  const cargarCaptacion = async () => {
    try {
      setLoading(true);
      setError(null);
        const data = await captacionesAPI.getById(id);
        setCaptacion(data);
      } catch (err) {
      console.error("Error al cargar captación:", err);
      setError("Error al cargar los datos de la captación");
      } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const mostrarValor = (valor) => {
    if (!valor) return "N/A";
    
    // Si es un objeto, intentar extraer propiedades útiles
    if (typeof valor === 'object' && valor !== null) {
      // Si tiene propiedades de dirección
      if (valor.calle && valor.numero) {
        const direccion = `${valor.calle} ${valor.numero}`;
        const colonia = valor.colonia ? `, ${valor.colonia}` : '';
        const ciudad = valor.ciudad ? `, ${valor.ciudad}` : '';
        const estado = valor.estado ? `, ${valor.estado}` : '';
        const codigoPostal = valor.codigo_postal ? `, ${valor.codigo_postal}` : '';
        
        return `${direccion}${colonia}${ciudad}${estado}${codigoPostal}`.replace(/^,\s*/, '').replace(/,\s*,/g, ',');
      }
      // Si tiene nombre
      if (valor.nombre) {
        return valor.nombre;
      }
      // Si es un array
      if (Array.isArray(valor)) {
        return valor.length > 0 ? valor.join(', ') : "N/A";
      }
      // Para otros objetos, mostrar JSON string
      return JSON.stringify(valor);
    }
    
    return valor.toString();
  };

  const getStatusColor = (status) => {
    const colors = {
      "Captación": "blue",
      "En trámite legal": "amber",
      "Remodelacion": "green",
      "En venta": "purple",
      "Vendida": "green",
      "Cancelada": "red",
    };
    return colors[status] || "gray";
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "$0.00";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-MX");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <Typography variant="h6" color="gray">
            Cargando captación...
          </Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 mb-8 mx-3 lg:mx-4">
        <Alert color="red" className="flex items-center gap-2">
          <ExclamationTriangleIcon className="h-5 w-5" />
          {error}
        </Alert>
      </div>
    );
  }

  if (!captacion) {
    return (
      <div className="mt-12 mb-8 mx-3 lg:mx-4">
        <Alert color="red">Captación no encontrada</Alert>
      </div>
    );
  }

  const TABS = [
    {
      label: "General",
      value: "general",
      icon: <BuildingOfficeIcon className="h-5 w-5" />,
    },
    {
      label: "Propietario",
      value: "propietario",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      label: "Propiedad",
      value: "propiedad",
      icon: <BuildingOfficeIcon className="h-5 w-5" />,
    },
    {
      label: "Financiero",
      value: "financiero",
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
    },
    {
      label: "Laboral",
      value: "laboral",
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      label: "Referencias",
      value: "referencias",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      label: "Documentos",
      value: "documentos",
      icon: <DocumentTextIcon className="h-5 w-5" />,
    },
    {
      label: "Adeudos",
      value: "adeudos",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-8">
      {/* Header */}
      <Card className="mx-3 lg:mx-4">
        <CardHeader color="blue" variant="gradient" className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <BuildingOfficeIcon className="h-8 w-8 text-white" />
              <div>
                <Typography variant="h4" color="white">
                  Detalle de Captación
                </Typography>
                <Typography variant="small" color="white" className="mt-1">
                  {captacion.propiedad?.tipo || "Propiedad"} - {mostrarValor(captacion.propiedad?.direccion)}
                </Typography>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button
                variant="outlined"
                color="white"
                className="flex items-center gap-2"
                onClick={() => navigate(`/dashboard/captaciones/editar/${id}`)}
              >
                <PencilIcon className="h-5 w-5" />
                Editar
              </Button>
              <Button
                variant="outlined"
                color="white"
                className="flex items-center gap-2"
                onClick={() => navigate("/dashboard/captaciones")}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Volver
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Información General */}
      <Card className="mx-3 lg:mx-4">
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-gray-50 p-4 rounded-lg">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Estatus:
              </Typography>
              <Chip
                value={captacion.estatus_actual}
                color={getStatusColor(captacion.estatus_actual)}
                size="sm"
                className="mt-1"
              />
            </div>
            
            <div className="bg-blue-gray-50 p-4 rounded-lg">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Fecha de Captación:
              </Typography>
              <Typography className="mt-1">
                {formatDate(captacion.fecha_captacion)}
              </Typography>
            </div>
            
            <div className="bg-blue-gray-50 p-4 rounded-lg">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Captador:
              </Typography>
              <Typography className="mt-1">
                {captacion.captador?.nombre || "N/A"}
              </Typography>
            </div>
            
            <div className="bg-blue-gray-50 p-4 rounded-lg">
                <Typography variant="small" color="blue-gray" className="font-medium">
                Propietario:
                </Typography>
              <Typography className="mt-1">
                {captacion.propietario?.nombre || "N/A"}
                </Typography>
              </div>
            </div>
        </CardBody>
      </Card>

      {/* Tabs de Información */}
      <Card className="mx-3 lg:mx-4">
        <CardBody className="p-0">
          <Tabs value={activeTab} className="w-full">
            <TabsHeader className="mb-6 flex flex-wrap md:flex-nowrap h-auto md:h-12 py-2 gap-1 bg-blue-gray-50 overflow-x-auto md:overflow-x-auto hide-scrollbar">
              {TABS.map(({ label, value, icon }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => handleTabChange(value)}
                  className={`py-2 px-3 whitespace-nowrap rounded-md transition-all flex items-center gap-2 ${
                    activeTab === value ? "bg-white shadow-sm font-medium" : ""
                  }`}
                >
                  {icon}
                  {label}
                </Tab>
              ))}
            </TabsHeader>

            <TabsBody>
              {/* Información General */}
              <TabPanel value="general">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4">
                    Información General de la Captación
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        ID de Captación:
                      </Typography>
                      <Typography className="mt-1 font-mono">{captacion._id}</Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Fecha de Creación:
                      </Typography>
                      <Typography className="mt-1">
                        {formatDate(captacion.createdAt)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Última Actualización:
                      </Typography>
                      <Typography className="mt-1">
                        {formatDate(captacion.updatedAt)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Estatus Actual:
                      </Typography>
                      <Chip
                        value={captacion.estatus_actual}
                        color={getStatusColor(captacion.estatus_actual)}
                        size="sm"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Información del Propietario */}
              <TabPanel value="propietario">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <UserIcon className="h-6 w-6" />
                    Información del Propietario
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Nombre Completo:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propietario?.nombre)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Email:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propietario?.email)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Teléfono:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propietario?.telefono)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        CURP:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propietario?.curp)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        RFC:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propietario?.rfc)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Fecha de Nacimiento:
                      </Typography>
                      <Typography className="mt-1">
                        {formatDate(captacion.propietario?.fecha_nacimiento)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Información de la Propiedad */}
              <TabPanel value="propiedad">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <BuildingOfficeIcon className="h-6 w-6" />
                    Información de la Propiedad
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Tipo de Propiedad:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propiedad?.tipo)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Dirección:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propiedad?.direccion)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Colonia:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propiedad?.colonia)}
                      </Typography>
                        </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Ciudad:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propiedad?.ciudad)}
                      </Typography>
                        </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Estado:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propiedad?.estado)}
                      </Typography>
                        </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Código Postal:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.propiedad?.codigo_postal)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Información Financiera */}
              <TabPanel value="financiero">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <CurrencyDollarIcon className="h-6 w-6" />
                    Información Financiera
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Precio de Venta:
                      </Typography>
                      <Typography className="mt-1 font-bold text-green-600">
                        {formatCurrency(captacion.precio_venta)}
                  </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                        Precio de Renta:
                      </Typography>
                      <Typography className="mt-1 font-bold text-blue-600">
                        {formatCurrency(captacion.precio_renta)}
                            </Typography>
                          </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Enganche:
                      </Typography>
                      <Typography className="mt-1">
                        {formatCurrency(captacion.enganche)}
                      </Typography>
                            </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Plazo:
                      </Typography>
                      <Typography className="mt-1">
                        {captacion.plazo ? `${captacion.plazo} años` : "N/A"}
                      </Typography>
                            </div>
                          </div>
                </div>
              </TabPanel>

              {/* Datos Laborales */}
              <TabPanel value="laboral">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <BriefcaseIcon className="h-6 w-6" />
                    Datos Laborales del Propietario
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Empresa:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.datos_laborales?.empresa)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Puesto:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.datos_laborales?.puesto)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Área:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.datos_laborales?.area)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Turno:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.datos_laborales?.turno)}
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Antigüedad:
                      </Typography>
                      <Typography className="mt-1">
                        {mostrarValor(captacion.datos_laborales?.antiguedad)} años
                      </Typography>
                    </div>
                    
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Ingresos Mensuales:
                      </Typography>
                      <Typography className="mt-1">
                        {formatCurrency(captacion.datos_laborales?.ingresos_mensuales)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Referencias */}
              <TabPanel value="referencias">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <UserGroupIcon className="h-6 w-6" />
                    Referencias Personales
                  </Typography>
                  
                  {captacion.referencias_personales && captacion.referencias_personales.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {captacion.referencias_personales.map((ref, idx) => (
                        <div key={idx} className="bg-blue-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar
                              src={ref.foto}
                              alt={ref.nombre}
                              size="sm"
                              className="border-2 border-white shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                {ref.nombre}
                              </Typography>
                              <Typography variant="small" color="blue-gray">
                                {ref.parentesco}
                              </Typography>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4 text-blue-gray-500" />
                              <Typography variant="small">
                                {ref.telefono || "N/A"}
                              </Typography>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="h-4 w-4 text-blue-gray-500" />
                              <Typography variant="small">
                                {ref.email || "N/A"}
                              </Typography>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="h-4 w-4 text-blue-gray-500" />
                              <Typography variant="small">
                                {mostrarValor(ref.direccion)}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-blue-gray-50 rounded-lg">
                      <Typography>No hay referencias registradas.</Typography>
                    </div>
                  )}
                </div>
              </TabPanel>

              {/* Documentos */}
              <TabPanel value="documentos">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <DocumentTextIcon className="h-6 w-6" />
                    Documentos del Propietario
                  </Typography>
                  
                  {captacion.documentos && captacion.documentos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {captacion.documentos.map((doc, idx) => (
                        <div key={idx} className="bg-blue-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                {doc.tipo}
                              </Typography>
                              <Typography variant="small" color="blue-gray">
                                {doc.descripcion}
                  </Typography>
                      </div>
                            <Badge color="green" className="ml-2">
                              {doc.estatus}
                            </Badge>
                    </div>
                          
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" color="blue" variant="text">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button size="sm" color="green" variant="text">
                              <ArrowDownTrayIcon className="h-4 w-4" />
                            </Button>
                      </div>
                    </div>
                      ))}
                      </div>
                  ) : (
                    <div className="text-center p-8 bg-blue-gray-50 rounded-lg">
                      <Typography>No hay documentos registrados.</Typography>
                    </div>
                  )}
                </div>
              </TabPanel>

              {/* Adeudos */}
              <TabPanel value="adeudos">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <ClipboardDocumentListIcon className="h-6 w-6" />
                    Adeudos y Deudas
                  </Typography>
                  
                  {captacion.adeudos && captacion.adeudos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {captacion.adeudos.map((adeudo, idx) => (
                        <div key={idx} className="bg-blue-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Typography variant="h6" color="blue-gray">
                              {adeudo.tipo}
                    </Typography>
                            <Badge color="red" className="ml-2">
                              {formatCurrency(adeudo.monto)}
                            </Badge>
                  </div>

                          <Typography variant="small" color="blue-gray" className="mb-2">
                            {adeudo.descripcion}
                    </Typography>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4" />
                            <span>Vencimiento: {formatDate(adeudo.fecha_vencimiento)}</span>
                        </div>
                      </div>
                      ))}
                        </div>
                  ) : (
                    <div className="text-center p-8 bg-blue-gray-50 rounded-lg">
                      <Typography>No hay adeudos registrados.</Typography>
                      </div>
                  )}
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default DetalleCaptacion; 
