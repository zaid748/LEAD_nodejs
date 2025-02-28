import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Typography,
  Button,
  IconButton,
  Input,
  Tooltip,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import {
  HomeIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ArrowLeftIcon,
  BanknotesIcon,
  ClockIcon,
  BuildingOfficeIcon,
  TrashIcon,
  PencilIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { CustomAvatar } from "@/components/CustomAvatar";

export function ProfileEmpleados() {
  const [empleadoData, setEmpleadoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nominas, setNominas] = useState([]);
  const [nominasDisplay, setNominasDisplay] = useState([]);
  const [loadingNominas, setLoadingNominas] = useState(false);
  const [activeTab, setActiveTab] = useState("perfil");
  const [filtroDesde, setFiltroDesde] = useState("");
  const [filtroHasta, setFiltroHasta] = useState("");
  
  const { empleadoId } = useParams();
  const navigate = useNavigate();

  // Añadir este estado al componente
  const [usuarios, setUsuarios] = useState([]);
  
  // Añadir la definición del estado isAdmin que falta
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Cargar datos del empleado
  useEffect(() => {
    console.log("ID del empleado en perfil:", empleadoId);
    const storedEmpleadoData = sessionStorage.getItem('selectedEmpleadoProfile');
    
    if (storedEmpleadoData) {
      setEmpleadoData(JSON.parse(storedEmpleadoData));
      console.log(storedEmpleadoData);
      setLoading(false);
    } else {
      fetchEmpleadoData();
    }
  }, [empleadoId]);

  // Este efecto se ejecuta cuando cambia la pestaña activa
  useEffect(() => {
    console.log("Estado activo de la pestaña cambiado a:", activeTab);
    if (empleadoId && activeTab === "laboral") {
      fetchNominas();
    }
  }, [activeTab]);

  // Este efecto se ejecuta cuando cambian los filtros
  useEffect(() => {
    filtrarNominas();
  }, [filtroDesde, filtroHasta, nominas]);

  // Obtener información del usuario actual para verificar si es admin
  useEffect(() => {
    // Verificar si el usuario es admin (puedes ajustar esto según cómo manejes la autenticación)
    const checkAdminStatus = async () => {
      try {
        // Usar la ruta correcta que existe en tu aplicación
        const response = await fetch('http://localhost:4000/api/check-auth', {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        // Mostrar la respuesta completa para debugging
        console.log("Respuesta completa de check-auth:", data);
        
        // Comprobar si el usuario está autenticado basándose en la respuesta
        // Aquí adaptamos para manejar diferentes formatos de respuesta
        if (data.authenticated || data.success) {
          // Obtener el usuario, adaptando a diferentes estructuras posibles
          const user = data.user || data;
          const userRole = user?.role || '';
          
          console.log("Información de usuario:", user);
          console.log("Rol del usuario:", userRole);
          
          const admin = userRole.toLowerCase().includes('administrator') || 
                        userRole === 'Superadministrator';
          
          setIsAdmin(admin);
          console.log("Estado de administrador:", admin);
        } else {
          console.log("Usuario no autenticado o sin privilegios de administrador");
        }
      } catch (error) {
        console.error("Error al verificar estado de admin:", error);
      }
    };
    
    checkAdminStatus();
  }, []);

  // Añadir este efecto
  useEffect(() => {
    if (isAdmin) {
      // Cargar usuarios disponibles para asociar
      const fetchUsuarios = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/users', {
            credentials: 'include'
          });
          const data = await response.json();
          
          if (data.users) {
            setUsuarios(data.users);
          }
        } catch (error) {
          console.error("Error al cargar usuarios:", error);
        }
      };
      
      fetchUsuarios();
    }
  }, [isAdmin]);

  const fetchEmpleadoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/empleados-api/${empleadoId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        console.log(data.empleado);
        setEmpleadoData(data.empleado);
      } else {
        console.error("Error al obtener datos del empleado");
      }
    } catch (error) {
      console.error("Error al obtener datos del empleado:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNominas = async () => {
    try {
      setLoadingNominas(true);
      console.log("Obteniendo nóminas para el empleado:", empleadoId);
      
      // Agregar parámetros para limitar resultados si no hay filtros activos
      const hayFiltrosActivos = filtroDesde || filtroHasta;
      const url = hayFiltrosActivos 
        ? `http://localhost:4000/api/nominas-api/empleado/${empleadoId}` 
        : `http://localhost:4000/api/nominas-api/empleado/${empleadoId}?limite=20`;
      
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      const data = await response.json();
      console.log("Respuesta de la API de nóminas:", data);
      
      if (data.success) {
        setNominas(data.nominas || []);
        setNominasDisplay(data.nominas || []);
        
        // Si hay límite, mostrar mensaje
        if (!hayFiltrosActivos && data.totalRegistros > 20) {
          // Opcional: mostrar un mensaje indicando que hay más registros
          console.log(`Mostrando 20 de ${data.totalRegistros} nóminas disponibles`);
        }
      } else {
        console.error("Error al obtener nóminas:", data.message);
        setNominas([]);
        setNominasDisplay([]);
      }
    } catch (error) {
      console.error("Error al obtener nóminas:", error);
      setNominas([]);
      setNominasDisplay([]);
    } finally {
      setLoadingNominas(false);
    }
  };

  const filtrarNominas = () => {
    if (!nominas.length) return;
    
    let nominasFiltradas = [...nominas];
    
    if (filtroDesde) {
      const fechaDesde = new Date(filtroDesde);
      nominasFiltradas = nominasFiltradas.filter(nomina => {
        const fechaNomina = convertirFechaStringADate(nomina.fecha);
        return fechaNomina >= fechaDesde;
      });
    }
    
    if (filtroHasta) {
      const fechaHasta = new Date(filtroHasta);
      nominasFiltradas = nominasFiltradas.filter(nomina => {
        const fechaNomina = convertirFechaStringADate(nomina.fecha);
        return fechaNomina <= fechaHasta;
      });
    }
    
    setNominasDisplay(nominasFiltradas);
  };

  const convertirFechaStringADate = (fechaString) => {
    if (!fechaString) return new Date();
    
    // Si la fecha está en formato DD/MM/YYYY
    if (fechaString.includes('/')) {
      const [dia, mes, anio] = fechaString.split('/');
      return new Date(anio, mes - 1, dia);
    } 
    
    // Si la fecha está en formato YYYY-MM-DD
    if (fechaString.includes('-')) {
      return new Date(fechaString);
    }
    
    // Si no se puede parsear, devolver fecha actual
    return new Date();
  };

  const handleDeleteNomina = async (nominaId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nómina?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/nominas-api/${nominaId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Recargar la lista de nóminas
          fetchNominas();
        } else {
          console.error("Error al eliminar la nómina:", data.message);
        }
      } catch (error) {
        console.error("Error al eliminar la nómina:", error);
      }
    }
  };

  const handleViewNomina = (nomina) => {
    // Abrir el PDF de la nómina en una nueva pestaña
    if (nomina?.url) {
      window.open(nomina.url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="h6" color="blue-gray">
          Cargando información del empleado...
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Card className="mx-3 mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Typography variant="h6" color="blue-gray">
                Cargando datos del empleado...
              </Typography>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <CustomAvatar
                    src={empleadoData.foto_perfil}
                    alt={`${empleadoData.prim_nom} ${empleadoData.apell_pa}`}
                    size="xl"
                    className="shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {`${empleadoData.prim_nom} ${empleadoData.segun_nom ? empleadoData.segun_nom : ''} ${empleadoData.apell_pa} ${empleadoData.apell_ma}`}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {empleadoData.pust}
                    </Typography>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {isAdmin && (
                    <Button 
                      onClick={() => {
                        console.log("Redirigiendo a editar con ID:", empleadoId);
                        // Ruta absoluta para pruebas
                        window.location.href = `/dashboard/empleados/editar/${empleadoId}`;
                      }} 
                      variant="outlined" 
                      color="blue" 
                      size="sm"
                    >
                      <PencilIcon strokeWidth={2} className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  )}
                  <Button onClick={() => navigate('/dashboard/empleados')} variant="outlined" size="sm">
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 mr-2" />
                    Volver
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="flex flex-col gap-4">
                    <div 
                      className={`cursor-pointer rounded-lg p-4 hover:bg-blue-gray-50 ${activeTab === 'perfil' ? 'bg-blue-gray-50' : ''}`}
                      onClick={() => setActiveTab('perfil')}
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-gray-900/10 p-2">
                          <UserCircleIcon className="h-6 w-6 text-blue-gray-700" />
                        </div>
                        <Typography variant="h6" color="blue-gray">
                          Perfil Personal
                        </Typography>
                      </div>
                    </div>
                    
                    <div 
                      className={`cursor-pointer rounded-lg p-4 hover:bg-blue-gray-50 ${activeTab === 'laboral' ? 'bg-blue-gray-50' : ''}`}
                      onClick={() => setActiveTab('laboral')}
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-gray-900/10 p-2">
                          <BuildingOfficeIcon className="h-6 w-6 text-blue-gray-700" />
                        </div>
                        <Typography variant="h6" color="blue-gray">
                          Información Laboral
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  {activeTab === 'perfil' && (
                    <div>
                      <Typography variant="h6" color="blue-gray" className="mb-4">
                        Información Personal
                      </Typography>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                            <div className="rounded-lg bg-gray-900/10 p-2">
                              <UserCircleIcon className="h-6 w-6 text-blue-gray-700" />
                            </div>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                Nombre Completo
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {empleadoData.prim_nom} {empleadoData.segun_nom} {empleadoData.apell_pa} {empleadoData.apell_ma}
                              </Typography>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                            <div className="rounded-lg bg-gray-900/10 p-2">
                              <CalendarDaysIcon className="h-6 w-6 text-blue-gray-700" />
                            </div>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                Fecha de Nacimiento
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {empleadoData.fecha_na}
                              </Typography>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                            <div className="rounded-lg bg-gray-900/10 p-2">
                              <EnvelopeIcon className="h-6 w-6 text-blue-gray-700" />
                            </div>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                Correo Electrónico
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {empleadoData.email}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                            <div className="rounded-lg bg-gray-900/10 p-2">
                              <PhoneIcon className="h-6 w-6 text-blue-gray-700" />
                            </div>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                Teléfono
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {empleadoData.telefono}
                              </Typography>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                            <div className="rounded-lg bg-gray-900/10 p-2">
                              <MapPinIcon className="h-6 w-6 text-blue-gray-700" />
                            </div>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                Dirección
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {empleadoData.calle} {empleadoData.nun_ex}, {empleadoData.nun_in ? 'Int. ' + empleadoData.nun_in + ', ' : ''}CP {empleadoData.codigo}, {empleadoData.estado}
                              </Typography>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                            <div className="rounded-lg bg-gray-900/10 p-2">
                              <IdentificationIcon className="h-6 w-6 text-blue-gray-700" />
                            </div>
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                Estado
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                {empleadoData.estado}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'laboral' && (
                    <div>
                      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Typography variant="h6" color="blue-gray">
                          Nóminas
                        </Typography>
                        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                          <div className="flex flex-col gap-1">
                            <Typography variant="small" color="blue-gray">
                              Desde
                            </Typography>
                            <Input
                              type="date"
                              value={filtroDesde}
                              onChange={(e) => setFiltroDesde(e.target.value)}
                              size="md"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <Typography variant="small" color="blue-gray">
                              Hasta
                            </Typography>
                            <Input
                              type="date"
                              value={filtroHasta}
                              onChange={(e) => setFiltroHasta(e.target.value)}
                              size="md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-bold leading-none opacity-70"
                                    >
                                      Fecha
                                    </Typography>
                                  </th>
                                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-bold leading-none opacity-70"
                                    >
                                      Concepto
                                    </Typography>
                                  </th>
                                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-bold leading-none opacity-70"
                                    >
                                      Salario
                                    </Typography>
                                  </th>
                                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-bold leading-none opacity-70"
                                    >
                                      Acciones
                                    </Typography>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {loadingNominas ? (
                                  <tr>
                                    <td colSpan={4} className="p-4 text-center">
                                      <Typography color="blue-gray">Cargando nóminas...</Typography>
                                    </td>
                                  </tr>
                                ) : nominasDisplay && nominasDisplay.length > 0 ? (
                                  nominasDisplay.map((nomina) => (
                                    <tr key={nomina._id} className="even:bg-blue-gray-50/50">
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {nomina.fecha}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          {nomina.conceptoDePago}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                          ${nomina.salario}
                                        </Typography>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex items-center gap-2">
                                          <Tooltip content="Ver nómina">
                                            <IconButton 
                                              variant="text" 
                                              color="blue-gray"
                                              size="sm"
                                              onClick={() => handleViewNomina(nomina)}
                                            >
                                              <EyeIcon className="h-4 w-4" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip content="Descargar PDF">
                                            <IconButton 
                                              variant="text" 
                                              color="blue-gray"
                                              size="sm"
                                              onClick={() => window.open(nomina.url, '_blank')}
                                            >
                                              <DocumentArrowDownIcon className="h-4 w-4" />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip content="Eliminar nómina">
                                            <IconButton 
                                              variant="text" 
                                              color="red"
                                              size="sm"
                                              onClick={() => handleDeleteNomina(nomina._id)}
                                            >
                                              <TrashIcon className="h-4 w-4" />
                                            </IconButton>
                                          </Tooltip>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={4} className="p-4 text-center">
                                      <Typography color="blue-gray">No hay nóminas registradas</Typography>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isAdmin && empleadoData.userId && (
            <div className="mt-4 p-4 border rounded-lg border-blue-gray-100">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gray-900/10 p-2">
                  <UserCircleIcon className="h-6 w-6 text-blue-gray-700" />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Usuario Asociado
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {usuarios.find(u => u._id === empleadoData.userId)?.email || "Cargando información del usuario..."}
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="mt-4">
              <Button
                variant="gradient"
                color="blue"
                className="flex items-center gap-3"
                onClick={() => navigate(`/dashboard/nomina/crear/${empleadoData._id}`)}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" />
                Crear Nueva Nómina
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default ProfileEmpleados; 