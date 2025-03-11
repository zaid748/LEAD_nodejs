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
  Alert
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/solid";

export function MisProyectos() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [captaciones, setCaptaciones] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useState({
    limit: 10
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
          
          // Comprobar si es admin
          const userRole = data.user?.role || '';
          setIsAdmin(
            userRole.toLowerCase().includes('administrator') || 
            userRole === 'Admin'
          );
          
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

  // Cargar captaciones
  useEffect(() => {
    if (!user) return;
    
    const fetchCaptaciones = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        
        // Construir parámetros de búsqueda
        const params = new URLSearchParams({
          page,
          limit: searchParams.limit
        });
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/captaciones?${params}`, {
          headers: {
            'x-auth-token': token
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.mensaje || "Error al obtener captaciones");
        }
        
        setCaptaciones(data.captaciones || []);
        setTotalPages(data.paginacion?.paginas || 1);
        
      } catch (error) {
        console.error("Error al obtener captaciones:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCaptaciones();
  }, [user, page, searchParams]);
  
  // Manejar paginación
  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, totalPages));
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
            
            {/* Botón para crear nueva captación (solo admin y usuarios) */}
            {(isAdmin || user?.role === 'User') && (
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
                {isAdmin || user?.role === 'User' 
                  ? "¡Crea tu primera captación inmobiliaria!" 
                  : "No tienes proyectos asignados"}
              </Typography>
              
              {(isAdmin || user?.role === 'User') && (
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
                    {["Propiedad", "Propietario", "Ubicación", "Estatus", "Fecha", "Acciones"].map((header) => (
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

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={propiedad.imagenes?.[0] || "/img/casa-default.png"}
                              alt={propiedad.tipo || "Propiedad"}
                              size="sm"
                              variant="rounded"
                            />
                            <div>
                              <Typography variant="small" color="blue-gray" className="font-semibold">
                                {propiedad.tipo}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {_id.substring(0, 6)}...
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {propietario.nombre}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {propietario.telefono}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {propiedad.direccion?.ciudad || "N/A"}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {propiedad.direccion?.estado || ""}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={estatus_actual}
                              color={statusColors[estatus_actual] || "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {new Date(captacion.fecha).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-2">
                            <Tooltip content="Ver Detalles">
                              <IconButton variant="text" color="blue-gray" onClick={() => navigate(`/dashboard/captaciones/${_id}`)}>
                                <EyeIcon className="h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                            
                            {/* Editar sólo para Admin */}
                            {isAdmin && (
                              <Tooltip content="Editar">
                                <IconButton variant="text" color="blue-gray" onClick={() => navigate(`/dashboard/captaciones/editar/${_id}`)}>
                                  <PencilIcon className="h-5 w-5" />
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