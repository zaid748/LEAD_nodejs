import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Chip,
  Button,
  Spinner,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Tooltip,
  Avatar,
  Alert,
  IconButton
} from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  PencilIcon,
  UserCircleIcon,
  HomeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/solid";
import { captacionesAPI } from "../../../services/api";

export function DetalleCaptacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [captacion, setCaptacion] = useState(null);
  const [activeTab, setActiveTab] = useState("propietario");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await captacionesAPI.getById(id);
        setCaptacion(data);
      } catch (err) {
        setError("Error al cargar la información de la captación");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <Alert color="red">{error}</Alert>
      </div>
    );
  }

  if (!captacion) {
    return (
      <div className="flex justify-center items-center h-96">
        <Typography variant="h6">No se encontró la captación</Typography>
      </div>
    );
  }

  // Utilidades para mostrar datos
  const mostrarValor = (valor, def = "-") => (valor !== undefined && valor !== null && valor !== "" ? valor : def);
  const mostrarBool = (valor) => valor ? "Sí" : "No";
  const mostrarFecha = (fecha) => fecha ? new Date(fecha).toLocaleDateString() : "-";

  // Tabs para secciones con iconos
  const tabs = [
    { label: "Propietario", value: "propietario", icon: <UserCircleIcon className="h-5 w-5" /> },
    { label: "Propiedad", value: "propiedad", icon: <HomeIcon className="h-5 w-5" /> },
    { label: "Adeudos", value: "adeudos", icon: <CurrencyDollarIcon className="h-5 w-5" /> },
    { label: "Datos Laborales", value: "laboral", icon: <BriefcaseIcon className="h-5 w-5" /> },
    { label: "Referencias", value: "referencias", icon: <UserGroupIcon className="h-5 w-5" /> },
    { label: "Documentos", value: "documentos", icon: <DocumentTextIcon className="h-5 w-5" /> },
    { label: "Venta", value: "venta", icon: <BuildingOfficeIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="mx-3 lg:mx-4">
        <CardHeader color="blue" variant="gradient" className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <BuildingOfficeIcon className="h-8 w-8 text-white" />
              <div>
                <Typography variant="h5" color="white">
                  Detalle de Captación Inmobiliaria
                </Typography>
                <Typography variant="small" color="white" className="mt-1">
                  ID: {captacion._id}
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
                <ArrowLeftIcon className="h-5 w-5" />
                Volver
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-4">
          {/* Información de última actualización */}
          <div className="mb-6 p-4 bg-blue-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar
                src={captacion.ultima_actualizacion?.usuario?.avatar}
                alt={captacion.ultima_actualizacion?.usuario?.nombre}
                size="sm"
              />
              <div>
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Última actualización por: {mostrarValor(captacion.ultima_actualizacion?.usuario?.nombre)}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  Fecha: {mostrarFecha(captacion.ultima_actualizacion?.fecha)}
                </Typography>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} className="w-full">
            <TabsHeader className="mb-6 flex flex-wrap md:flex-nowrap h-auto md:h-12 py-2 gap-1 bg-blue-gray-50 overflow-x-auto md:overflow-x-auto hide-scrollbar">
              {tabs.map(({ label, value, icon }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
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
              {/* Propietario */}
              <TabPanel value="propietario">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6" />
                    Información del Propietario
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Nombre:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.nombre)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Teléfono:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.telefono)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Correo:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.correo)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Dirección:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.direccion)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Identificación:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.identificacion)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">NSS:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.nss)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">RFC:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.rfc)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">CURP:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.curp)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Estado Civil:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propietario?.estado_civil)}</Typography>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Propiedad */}
              <TabPanel value="propiedad">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <HomeIcon className="h-6 w-6" />
                    Información de la Propiedad
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Tipo:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propiedad?.tipo)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg col-span-2">
                      <Typography variant="small" color="blue-gray" className="font-medium">Dirección:</Typography>
                      <Typography className="mt-1">
                        {[
                          captacion.propiedad?.direccion?.calle,
                          captacion.propiedad?.direccion?.numero,
                          captacion.propiedad?.direccion?.colonia,
                          captacion.propiedad?.direccion?.ciudad,
                          captacion.propiedad?.direccion?.estado,
                          captacion.propiedad?.direccion?.codigo_postal
                        ].filter(Boolean).join(", ")}
                      </Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg col-span-2">
                      <Typography variant="small" color="blue-gray" className="font-medium">Características:</Typography>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        <div>
                          <Typography variant="small" color="blue-gray">Terreno:</Typography>
                          <Typography>{mostrarValor(captacion.propiedad?.caracteristicas?.m2_terreno, "-")} m²</Typography>
                        </div>
                        <div>
                          <Typography variant="small" color="blue-gray">Construcción:</Typography>
                          <Typography>{mostrarValor(captacion.propiedad?.caracteristicas?.m2_construccion, "-")} m²</Typography>
                        </div>
                        <div>
                          <Typography variant="small" color="blue-gray">Recámaras:</Typography>
                          <Typography>{mostrarValor(captacion.propiedad?.caracteristicas?.habitaciones, "-")}</Typography>
                        </div>
                        <div>
                          <Typography variant="small" color="blue-gray">Baños:</Typography>
                          <Typography>{mostrarValor(captacion.propiedad?.caracteristicas?.baños, "-")}</Typography>
                        </div>
                        <div>
                          <Typography variant="small" color="blue-gray">Cocheras:</Typography>
                          <Typography>{mostrarValor(captacion.propiedad?.caracteristicas?.cocheras, "-")}</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg col-span-2">
                      <Typography variant="small" color="blue-gray" className="font-medium">Descripción:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.propiedad?.caracteristicas?.descripcion)}</Typography>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Adeudos */}
              <TabPanel value="adeudos">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <CurrencyDollarIcon className="h-6 w-6" />
                    Adeudos de la Propiedad
                  </Typography>
                  {captacion.propiedad?.adeudos && captacion.propiedad.adeudos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {captacion.propiedad.adeudos.map((adeudo, idx) => (
                        <div key={idx} className="bg-blue-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                              {mostrarValor(adeudo.tipo)}
                            </Typography>
                            <Chip
                              value={mostrarValor(adeudo.estatus)}
                              className="bg-blue-500"
                              size="sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <div>
                              <Typography variant="small" color="blue-gray">Monto:</Typography>
                              <Typography>${mostrarValor(adeudo.monto)}</Typography>
                            </div>
                            <div>
                              <Typography variant="small" color="blue-gray">Descripción:</Typography>
                              <Typography>{mostrarValor(adeudo.descripcion)}</Typography>
                            </div>
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

              {/* Datos Laborales */}
              <TabPanel value="laboral">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <BriefcaseIcon className="h-6 w-6" />
                    Datos Laborales del Propietario
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Empresa:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.datos_laborales?.empresa)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Puesto:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.datos_laborales?.puesto)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Área:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.datos_laborales?.area)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Turno:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.datos_laborales?.turno)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Antigüedad:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.datos_laborales?.antiguedad)} años</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Ingresos Mensuales:</Typography>
                      <Typography className="mt-1">${mostrarValor(captacion.datos_laborales?.ingresos_mensuales)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Teléfono del Trabajo:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.datos_laborales?.telefono)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Dirección del Trabajo:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.datos_laborales?.direccion)}</Typography>
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
                              size="sm"
                              variant="circular"
                              src={ref.avatar}
                              alt={ref.nombre}
                            />
                            <div>
                              <Typography variant="small" color="blue-gray" className="font-medium">
                                {mostrarValor(ref.nombre)}
                              </Typography>
                              <Typography variant="small" color="blue-gray">
                                {mostrarValor(ref.relacion)}
                              </Typography>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <Typography variant="small" color="blue-gray">Teléfono:</Typography>
                              <Typography>{mostrarValor(ref.telefono)}</Typography>
                            </div>
                            <div>
                              <Typography variant="small" color="blue-gray">Dirección:</Typography>
                              <Typography>{mostrarValor(ref.direccion)}</Typography>
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
                    Documentos Entregados
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={captacion.documentos_entregados?.ine}
                          readOnly
                          className="w-4 h-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">INE</Typography>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={captacion.documentos_entregados?.curp}
                          readOnly
                          className="w-4 h-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">CURP</Typography>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={captacion.documentos_entregados?.rfc}
                          readOnly
                          className="w-4 h-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">RFC</Typography>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={captacion.documentos_entregados?.escrituras}
                          readOnly
                          className="w-4 h-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">Escrituras</Typography>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={captacion.documentos_entregados?.comprobante_domicilio}
                          readOnly
                          className="w-4 h-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">Comprobante Domicilio</Typography>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={captacion.documentos_entregados?.predial_pagado}
                          readOnly
                          className="w-4 h-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">Predial Pagado</Typography>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={captacion.documentos_entregados?.libre_gravamen}
                          readOnly
                          className="w-4 h-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-medium">Libre Gravamen</Typography>
                      </div>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg col-span-2">
                      <Typography variant="small" color="blue-gray" className="font-medium">Observaciones:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.documentos_entregados?.observaciones)}</Typography>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Venta */}
              <TabPanel value="venta">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                    <BuildingOfficeIcon className="h-6 w-6" />
                    Información de Venta
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">En Venta:</Typography>
                      <Chip
                        value={mostrarBool(captacion.venta?.en_venta)}
                        className={captacion.venta?.en_venta ? "bg-green-500" : "bg-red-500"}
                        size="sm"
                      />
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Precio de Venta:</Typography>
                      <Typography className="mt-1">${mostrarValor(captacion.venta?.precio_venta)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Comisión de Venta:</Typography>
                      <Typography className="mt-1">${mostrarValor(captacion.venta?.comision_venta)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Fecha de Venta:</Typography>
                      <Typography className="mt-1">{mostrarFecha(captacion.venta?.fecha_venta)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Estatus de Venta:</Typography>
                      <Chip
                        value={mostrarValor(captacion.venta?.estatus_venta)}
                        className="bg-blue-500"
                        size="sm"
                      />
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg">
                      <Typography variant="small" color="blue-gray" className="font-medium">Tipo de Crédito:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.venta?.tipo_credito)}</Typography>
                    </div>
                    <div className="bg-blue-gray-50 p-4 rounded-lg col-span-2">
                      <Typography variant="small" color="blue-gray" className="font-medium">Observaciones:</Typography>
                      <Typography className="mt-1">{mostrarValor(captacion.venta?.observaciones)}</Typography>
                    </div>
                  </div>

                  {/* Datos del Comprador */}
                  <div className="mt-8">
                    <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                      <UserCircleIcon className="h-6 w-6" />
                      Datos del Comprador
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-gray-50 p-4 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-medium">Nombre:</Typography>
                        <Typography className="mt-1">{mostrarValor(captacion.venta?.comprador?.nombre)}</Typography>
                      </div>
                      <div className="bg-blue-gray-50 p-4 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-medium">Teléfono:</Typography>
                        <Typography className="mt-1">{mostrarValor(captacion.venta?.comprador?.telefono)}</Typography>
                      </div>
                      <div className="bg-blue-gray-50 p-4 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-medium">Correo:</Typography>
                        <Typography className="mt-1">{mostrarValor(captacion.venta?.comprador?.correo)}</Typography>
                      </div>
                      <div className="bg-blue-gray-50 p-4 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-medium">Dirección:</Typography>
                        <Typography className="mt-1">{mostrarValor(captacion.venta?.comprador?.direccion)}</Typography>
                      </div>
                    </div>
                  </div>

                  {/* Documentos de Venta */}
                  <div className="mt-8">
                    <Typography variant="h6" color="blue-gray" className="mb-4 flex items-center gap-2">
                      <ClipboardDocumentListIcon className="h-6 w-6" />
                      Documentos de Venta
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={captacion.venta?.documentos_entregados?.contrato}
                            readOnly
                            className="w-4 h-4"
                          />
                          <Typography variant="small" color="blue-gray" className="font-medium">Contrato</Typography>
                        </div>
                      </div>
                      <div className="bg-blue-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={captacion.venta?.documentos_entregados?.identificacion}
                            readOnly
                            className="w-4 h-4"
                          />
                          <Typography variant="small" color="blue-gray" className="font-medium">Identificación</Typography>
                        </div>
                      </div>
                      <div className="bg-blue-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={captacion.venta?.documentos_entregados?.constancia_credito}
                            readOnly
                            className="w-4 h-4"
                          />
                          <Typography variant="small" color="blue-gray" className="font-medium">Constancia Crédito</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
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