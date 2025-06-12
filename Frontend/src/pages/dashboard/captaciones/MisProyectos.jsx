import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Spinner,
  Alert,
  Input
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, EyeIcon, PlusIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { fetchAPI } from "@/services/api";

export function MisProyectos() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [captaciones, setCaptaciones] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAsesor, setIsAsesor] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useState({
    limit: 10,
    sort: "-captacion.fecha" // Ordenar por fecha más reciente primero
  });

  // Mapa de colores para estados
  const statusColors = {
    'Captación': 'blue',
    'En trámite legal': 'purple',
    'En remodelación': 'amber',
    'En venta': 'green',
    'Vendida': 'green',
    'Cancelada': 'red'
  };

  // Verificar autenticación y rol
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          
          // Comprobar roles
          const userRole = data.user?.role || '';
          setIsAdmin(
            userRole.toLowerCase().includes('administrator') || 
            userRole === 'Admin' ||
            userRole === 'Superadministrator'
          );
          
          setIsAsesor(userRole === 'Asesor');
          
        } else {
          navigate('/auth/sign-in');
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        navigate('/auth/sign-in');
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Manejar búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reiniciar paginación al buscar
  };

  // Función auxiliar para obtener datos de CasasInventario como alternativa real
  async function fetchCasasInventario() {
    try {
      // La ruta correcta según server.js es /api/inventario
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/inventario`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        console.error(`Error al obtener inventario: ${response.status}`);
        return null;
      }
      
      const data = await response.json();
      console.log("Datos de inventario:", data);
      return data.casas || data; // Manejar diferentes formatos de respuesta
    } catch (e) {
      console.error("Error obteniendo inventario de casas:", e);
      return null;
    }
  }

  // Cargar captaciones
  useEffect(() => {
    if (!user) return;
    
    const fetchCaptaciones = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Construir URL con parámetros según el rol del usuario
        let apiUrl = `${import.meta.env.VITE_API_URL}/api/captaciones?page=${page}&limit=${searchParams.limit}&sort=${searchParams.sort}`;
        
        // Añadir filtro por supervisor si el usuario tiene ese rol
        if (user.role === 'Supervisor') {
          apiUrl += `&supervisor=${user._id}`;
        }
        
        // Añadir término de búsqueda si existe
        if (searchTerm) {
          apiUrl += `&search=${encodeURIComponent(searchTerm)}`;
        }
        
        // Añadir parámetro para evitar populate y el error de User
        apiUrl += '&nopopulate=true';
        
        console.log("Consultando API:", apiUrl);
        
        const response = await fetch(apiUrl, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener captaciones: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Si no hay captaciones, mostrar mensaje apropiado
        if (!data.captaciones || data.captaciones.length === 0) {
          setCaptaciones([]);
          setTotalPages(0);
          return;
        }
        
        // Procesar captaciones con manejo cuidadoso de datos
        const captacionesProcesadas = data.captaciones.map(captacion => {
          // Construir dirección completa con verificación segura de propiedades
          const direccionCompleta = captacion.propiedad?.direccion?.completa || 
            [
              captacion.propiedad?.direccion?.calle,
              captacion.propiedad?.direccion?.colonia,
              captacion.propiedad?.direccion?.ciudad,
              captacion.propiedad?.direccion?.estado
            ].filter(Boolean).join(', ');

          // Intentar obtener nombre del asesor de la mejor manera posible
          let asesorNombre = "No asignado";
          if (captacion.captacion?.asesor) {
            
            if (typeof captacion.captacion.asesor === 'object' && captacion.captacion.asesor.name) {
              asesorNombre = captacion.captacion.asesor.name;
            } else if (typeof captacion.captacion.asesor === 'string') {
        
              // Si tenemos solo el ID, intentemos obtener el nombre del objeto global de usuario
              if (user && user._id === captacion.captacion.asesor) {
                
                // Construir nombre completo del usuario actual
                asesorNombre = `${user.prim_nom || ''} ${user.segun_nom || ''} ${user.apell_pa || ''} ${user.apell_ma || ''}`.trim() || `Usuario actual`;
              } else {
                try {
                  console.log(captacion.captacion.asesor);
                  // Hacemos una petición convencional a la API con fetch
                  fetch(`${import.meta.env.VITE_API_URL}/api/users/${captacion.captacion.asesor}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                      'Accept': 'application/json'
                    }
                  })
                  .then(response => response.json())
                  .then(userData => {
                    if (userData) {
                      // Construir nombre completo usando los campos del modelo de usuario
                      const nombreCompleto = `${userData.user.prim_nom || ''} ${userData.user.segun_nom || ''} ${userData.user.apell_pa || ''} ${userData.user.apell_ma || ''}`.trim();
                      
                      if (nombreCompleto) {
                        // Actualizar el nombre del asesor en las captaciones
                        setCaptaciones(prevCaptaciones => 
                          prevCaptaciones.map(c => 
                            c._id === captacion._id 
                              ? {...c, captacion: {...c.captacion, asesor: {...c.captacion.asesor, nombre: nombreCompleto}}}
                              : c
                          )
                        );
                      }
                    }
                  })
                  .catch(err => console.error("Error al obtener datos del asesor:", err));
                } catch (error) {
                  console.error("Error al procesar datos del asesor:", error);
                }
                asesorNombre = `Asesor ID: ${captacion.captacion.asesor.substring(0, 6)}`;
              }
            }
          }

          // Crear objeto procesado con verificación cuidadosa para evitar errores de propiedades undefined
          return {
            _id: captacion._id || `temp-${Math.random()}`,
            propiedad: {
              tipo: captacion.propiedad?.tipo || "Casa/Apartamento",
              direccion: {
                completa: direccionCompleta || "Sin dirección",
                ciudad: captacion.propiedad?.direccion?.ciudad || "No especificado",
                estado: captacion.propiedad?.direccion?.estado || ""
              }
            },
            propietario: {
              nombre: captacion.propietario?.nombre || "No especificado",
              telefono: captacion.propietario?.telefono || "---"
            },
            estatus_actual: captacion.estatus_actual || "Pendiente",
            captacion: {
              fecha: captacion.captacion?.fecha || new Date().toISOString(),
              asesor: { 
                nombre: asesorNombre,
                id: typeof captacion.captacion?.asesor === 'string' ? captacion.captacion.asesor : null
              }
            }
          };
        });
        
        setCaptaciones(captacionesProcesadas);
        setTotalPages(data.paginacion?.paginas || 1);
        
      } catch (error) {
        console.error("Error al obtener captaciones:", error);
        setError(error.message || "No se pudieron cargar las captaciones");
        
        // Mostrar datos de ejemplo en caso de error
        setCaptaciones([{
          _id: "error12345",
          propiedad: {
            tipo: "Error de conexión",
            direccion: { ciudad: "Sin datos", estado: "disponibles" }
          },
          propietario: { 
            nombre: "Error al cargar datos", 
            telefono: "---" 
          },
          estatus_actual: "Error",
          captacion: { 
            fecha: new Date().toISOString(),
            asesor: { nombre: "No disponible" }
          }
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCaptaciones();
  }, [user, page, searchParams, searchTerm]);
  
  // Manejar paginación
  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, totalPages));
  };

  // Añadir esta función de descarga
  const descargarPDF = async (captacion) => {
    try {
      if (!captacion || !captacion._id) {
        console.error("ID de captación no válido:", captacion);
        alert("Error: ID de captación no válido");
        return;
      }

      console.log("Descargando PDF de captación:", captacion._id);
      
      // Si tenemos una URL directa del PDF, intentar primero con ella
      if (captacion.pdf_url) {
        window.open(captacion.pdf_url, '_blank');
        return;
      }

      // Si no hay URL directa, solicitar al backend que genere el PDF
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/captaciones/${captacion._id}/pdf`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al descargar el PDF');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `captacion_${captacion._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      alert("Error al descargar el PDF. Por favor intente nuevamente.");
    }
  };

  // Renderizar estado de carga
  if (isLoading && !captaciones.length) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Mis Proyectos de Captación
            </Typography>
            
            {/* Botón para crear nueva captación (solo admin, asesores y usuarios) */}
            {(isAdmin || isAsesor || user?.role === 'User') && (
              <Button 
                size="sm" 
                className="flex items-center gap-2" 
                color="white"
                onClick={() => navigate('/dashboard/captaciones/nueva')}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" />
                Nueva Captación
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* Barra de búsqueda */}
          <div className="flex justify-between items-center px-4 py-2">
            <div className="w-full max-w-md">
              <Input
                label="Buscar por propietario o dirección"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          {error && (
            <Alert color="red" className="mx-4 mt-4">
              {error}
            </Alert>
          )}
          
          {captaciones.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <Typography variant="h6" className="text-gray-600">
                No hay proyectos disponibles
              </Typography>
              <Typography className="text-gray-500 mt-2">
                {isAdmin || isAsesor || user?.role === 'User' 
                  ? "¡Crea tu primera captación inmobiliaria!" 
                  : "No tienes proyectos asignados"}
              </Typography>
              
              {(isAdmin || isAsesor || user?.role === 'User') && (
                <Button 
                  className="mt-4" 
                  color="blue"
                  onClick={() => navigate('/dashboard/captaciones/nueva')}
                >
                  Crear Captación
                </Button>
              )}
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Propiedad", "Propietario", "Ubicación", "Asesor Asignado", "Estatus", "Fecha", "Acciones"].map((header) => (
                      <th
                        key={header}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {captaciones.map(({ _id, propiedad, propietario, estatus_actual, captacion }, index) => {
                    const isLast = index === captaciones.length - 1;
                    const classes = isLast
                      ? "py-3 px-5"
                      : "py-3 px-5 border-b border-blue-gray-50";

                    // Manejo defensivo de datos potencialmente nulos
                    const propiedadTipo = propiedad?.tipo || "Sin especificar";
                    const propietarioNombre = propietario?.nombre || "Sin propietario";
                    const propietarioTelefono = propietario?.telefono || "---";
                    const ciudad = propiedad?.direccion?.ciudad || "N/A";
                    const estado = propiedad?.direccion?.estado || "";
                    const asesorNombre = captacion?.asesor?.nombre || "No asignado";
                    
                    // Formatear fecha con manejo de error
                    let fechaFormateada = "Fecha desconocida";
                    try {
                      if (captacion?.fecha) {
                        fechaFormateada = new Date(captacion.fecha).toLocaleDateString();
                      }
                    } catch (e) {
                      console.error("Error al formatear fecha:", e);
                    }

                    return (
                      <tr key={_id || index}>
                        <td className={classes}>
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-blue-gray-100">
                              <Typography className="text-xs font-bold text-blue-gray-800">
                                {propiedadTipo.substring(0, 2).toUpperCase()}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="small" color="blue-gray" className="font-semibold">
                                {propiedad.direccion.completa || "Sin dirección"}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {propiedadTipo}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {propietarioNombre}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {propietarioTelefono}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {ciudad}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {estado}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asesorNombre}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={estatus_actual || "Desconocido"}
                              color={statusColors[estatus_actual] || "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {fechaFormateada}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-2">
                            <Tooltip content="Ver Detalles">
                              <IconButton variant="text" color="blue-gray" onClick={() => navigate(`/dashboard/captaciones/${_id}`)}>
                                <EyeIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip content="Descargar PDF">
                              <IconButton 
                                variant="text" 
                                color="blue-gray" 
                                onClick={() => descargarPDF({ _id })}
                              >
                                <ArrowDownTrayIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                              <Tooltip content="Editar">
                                <IconButton variant="text" color="blue-gray" onClick={() => navigate(`/dashboard/captaciones/editar/${_id}`)}>
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-6 mb-2">
                  <Button 
                    variant="text" 
                    color="blue-gray" 
                    disabled={page === 1}
                    onClick={handlePrevPage}
                  >
                    Anterior
                  </Button>
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <IconButton
                        key={i}
                        variant={page === i + 1 ? "filled" : "text"}
                        color="blue-gray"
                        size="sm"
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </IconButton>
                    ))}
                  </div>
                  <Button 
                    variant="text" 
                    color="blue-gray" 
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default MisProyectos; 