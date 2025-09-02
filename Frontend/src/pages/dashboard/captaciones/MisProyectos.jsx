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
  const [refreshKey, setRefreshKey] = useState(0); // Para forzar actualizaciones

  // Mapa de colores para estados
  const statusColors = {
    'Captación': 'blue',
    'En trámite legal': 'purple',
    'Remodelacion': 'amber',
    'En venta': 'green',
    'Disponible para venta': 'green',
    'Vendida': 'gray',
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
        
        // El backend automáticamente filtrará por supervisor si el usuario tiene ese rol
        console.log('🔍 DEBUG - Usuario:', user ? `${user.name} (${user.role})` : 'No user');
        console.log('🔍 DEBUG - URL de consulta:', apiUrl);
        
        // Añadir término de búsqueda si existe
        if (searchTerm) {
          apiUrl += `&search=${encodeURIComponent(searchTerm)}`;
        }
        
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
        const captacionesProcesadas = data.captaciones.map((captacion, idx) => {
          console.log(`\n--- Procesando captación #${idx + 1} ---`);
          console.log('Raw captacion:', captacion);

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
              if (user && user._id === captacion.captacion.asesor) {
                asesorNombre = `${user.prim_nom || ''} ${user.segun_nom || ''} ${user.apell_pa || ''} ${user.apell_ma || ''}`.trim() || `Usuario actual`;
              } else {
                try {
                  console.log('Asesor solo ID:', captacion.captacion.asesor);
                  fetch(`${import.meta.env.VITE_API_URL}/api/users/${captacion.captacion.asesor}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Accept': 'application/json' }
                  })
                  .then(response => response.json())
                  .then(userData => {
                    if (userData) {
                      const nombreCompleto = `${userData.user.prim_nom || ''} ${userData.user.segun_nom || ''} ${userData.user.apell_pa || ''} ${userData.user.apell_ma || ''}`.trim();
                      if (nombreCompleto) {
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

          // LOG HISTORIAL
          console.log('historial_estatus:', captacion.historial_estatus);
          if (Array.isArray(captacion.historial_estatus)) {
            captacion.historial_estatus.forEach((h, i) => {
              console.log(`  Historial #${i + 1}:`, h);
              if (h.usuario) {
                console.log(`    Usuario:`, h.usuario);
              }
            });
          }

          // Crear objeto procesado
          const obj = {
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
            },
            historial_estatus: captacion.historial_estatus || []
          };
          console.log('Objeto procesado para tabla:', obj);
          return obj;
        });
        console.log('captacionesProcesadas FINAL:', captacionesProcesadas);
        
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
  }, [user, page, searchParams, searchTerm, refreshKey]);
  
  // Función para refrescar datos
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

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
      
      // Intentar descargar el PDF como blob
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/captaciones/download/${captacion._id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(errorData.message || `Error al descargar el PDF: ${response.status}`);
      }

      // Verificar que la respuesta es un PDF
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('La respuesta no es un PDF válido');
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
      alert(error.message || "Error al descargar el PDF. Por favor intente nuevamente.");
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
            
            <div className="flex gap-2">
              {/* Botón para refrescar datos */}
              <Button 
                size="sm" 
                className="flex items-center gap-2" 
                color="white"
                variant="outlined"
                onClick={refreshData}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0112.719-3.986" />
                </svg>
                Refrescar
              </Button>
              
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
                    {["Propiedad", "Propietario", "Ubicación", "Última Actualización", "Estatus", "Fecha", "Acciones"].map((header) => (
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
                  {captaciones.map(({ _id, propiedad, propietario, estatus_actual, captacion, historial_estatus }, index) => {
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

                    // Mostrar nombre y fecha de última actualización desde historial_estatus
                    let ultimaActualizacionNombre = "Nunca editado";
                    let ultimaActualizacionFecha = "";
                    const historial = historial_estatus || [];
                    if (historial.length > 0) {
                        const ultimo = historial[historial.length - 1];
                        if (ultimo.usuario) {
                            ultimaActualizacionNombre =
                                ultimo.usuario.name ||
                                ultimo.usuario.nombre ||
                                ([
                                    ultimo.usuario.prim_nom,
                                    ultimo.usuario.segun_nom,
                                    ultimo.usuario.apell_pa,
                                    ultimo.usuario.apell_ma
                                ].filter(Boolean).join(' ')) ||
                                ultimo.usuario.email ||
                                "Sin nombre";
                            if (ultimo.fecha) {
                                try {
                                    ultimaActualizacionFecha = new Date(ultimo.fecha).toLocaleDateString();
                                } catch {}
                            }
                        }
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
                            {ultimaActualizacionNombre}
                          </Typography>
                          {ultimaActualizacionFecha && (
                            <Typography className="text-xs text-blue-gray-400">
                              {ultimaActualizacionFecha}
                            </Typography>
                          )}
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
                              <IconButton variant="text" color="blue-gray" onClick={() => navigate(`/dashboard/captaciones/${_id}/detalle`)}>
                                <EyeIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip content="Descargar PDF">
                              <IconButton 
                                variant="text" 
                                color="blue-gray" 
                                onClick={() => descargarPDF({ _id: _id })}
                              >
                                <ArrowDownTrayIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                              <Tooltip content="Editar">
                                <IconButton variant="text" color="blue-gray" onClick={() => navigate(`/dashboard/captaciones/editar/${_id}`)}>
                                  <PencilIcon className="h-5 w-5" />
                                </IconButton>
                              </Tooltip>
                            {/* Eliminar solo para Admin */}
                            {isAdmin && (
                              <Tooltip content="Eliminar">
                                <IconButton
                                  variant="text"
                                  color="red"
                                  onClick={async () => {
                                    if (window.confirm('¿Estás seguro de que deseas eliminar esta captación? Esta acción no se puede deshacer.')) {
                                      try {
                                        setIsLoading(true);
                                        setError(null);
                                        await fetchAPI(`/api/captaciones/${_id}`, 'DELETE');
                                        setCaptaciones(prev => prev.filter(c => c._id !== _id));
                                      } catch (err) {
                                        setError('Error al eliminar la captación');
                                      } finally {
                                        setIsLoading(false);
                                      }
                                    }
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </IconButton>
                              </Tooltip>
                            )}
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