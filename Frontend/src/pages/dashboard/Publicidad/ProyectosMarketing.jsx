import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Spinner,
  Alert,
  IconButton,
  Tooltip,
  Chip
} from '@material-tailwind/react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  EyeIcon,
  PhotoIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const ProyectosMarketing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [captaciones, setCaptaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useState({
    limit: 10,
    sort: '-createdAt'
  });

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      console.log('=== DEBUG: Verificando autenticación ===');
      try {
        console.log('Haciendo petición a:', `${import.meta.env.VITE_API_URL}/api/check-auth`);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        console.log('Respuesta de autenticación:', response.status, response.ok);

        if (!response.ok) {
          console.log('Autenticación fallida, redirigiendo a /sign-in');
          navigate('/sign-in');
          return;
        }

        const data = await response.json();
        console.log('Usuario autenticado:', data.user);
        setUser(data.user);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        console.log('Error de autenticación, redirigiendo a /sign-in');
        navigate('/sign-in');
      }
    };

    checkAuth();
  }, [navigate]);

  // Manejar búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reiniciar paginación al buscar
  };

  // Cargar proyectos de marketing
  useEffect(() => {
    if (!user) return;
    
    const fetchProyectosMarketing = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Construir URL para la API de marketing
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/marketing?page=${page}&limit=${searchParams.limit}&sort=${searchParams.sort}${user.role === 'Supervisor' ? `&supervisor=${user._id}` : ''}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
        
        console.log("Consultando API de marketing:", apiUrl);
        
        const response = await fetch(apiUrl, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener proyectos de marketing: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Si no hay proyectos, mostrar mensaje apropiado
        if (!data.proyectos || data.proyectos.length === 0) {
          setCaptaciones([]);
          setTotalPages(0);
          return;
        }
        
        // Los datos ya vienen procesados desde el backend
        const proyectosMarketing = data.proyectos;
        
        console.log('Proyectos de marketing obtenidos:', proyectosMarketing);
        
        setCaptaciones(proyectosMarketing);
        setTotalPages(data.paginacion?.paginas || 1);
        
      } catch (error) {
        console.error("Error al obtener proyectos de marketing:", error);
        setError(error.message || "No se pudieron cargar los proyectos de marketing");
        
        // En caso de error, simplemente mostrar array vacío
        setCaptaciones([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProyectosMarketing();
  }, [user, page, searchParams, searchTerm]);

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
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Proyectos de Marketing
            </Typography>
            
            <Typography variant="small" color="white" className="opacity-80">
              Propiedades en "Disponible para venta" y "Remodelacion"
            </Typography>
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
                No hay proyectos disponibles para marketing
              </Typography>
              <Typography className="text-gray-500 mt-2">
                Solo se muestran propiedades con estatus "Disponible para venta" y "Remodelacion"
              </Typography>
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Propiedad", "Propietario", "Ubicación", "Precio", "Estatus", "Publicación", "Imágenes", "Acciones"].map((header) => (
                      <th key={header} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography variant="small" color="blue-gray" className="font-medium leading-none opacity-70">
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {captaciones.map((proyecto, index) => (
                    <tr key={proyecto.id || proyecto._id || index}>
                      <td className="py-3 px-6">
                        <div>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {proyecto.tipo || "Casa/Apartamento"}
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                            {proyecto.tituloMarketing || "Sin título personalizado"}
                          </Typography>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {proyecto.propietario || "No especificado"}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                          {proyecto.telefono || "Sin teléfono"}
                        </Typography>
                      </td>
                      <td className="py-3 px-6">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {proyecto.direccion || "Sin dirección"}
                        </Typography>
                      </td>
                      <td className="py-3 px-6">
                        <Typography variant="small" color="green" className="font-bold">
                          {(proyecto.moneda || 'MXN') === 'USD' ? 'US$' : '$'}{proyecto.precio || "Consultar"}
                        </Typography>
                        {proyecto.precioOferta && (
                          <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                            Oferta: {(proyecto.monedaOferta || proyecto.moneda || 'MXN') === 'USD' ? 'US$' : '$'}{proyecto.precioOferta}
                          </Typography>
                        )}
                      </td>
                      <td className="py-3 px-6">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={proyecto.estatusMarketing || "Sin estatus"}
                          color={
                            proyecto.estatusMarketing === 'Disponible para venta' ? 'green' :
                            proyecto.estatusMarketing === 'Remodelacion' ? 'amber' : 'blue'
                          }
                        />
                      </td>
                      <td className="py-3 px-6">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={proyecto.estatusPublicacion || "No publicada"}
                          color={
                            proyecto.estatusPublicacion === 'Publicada' ? 'green' : 'red'
                          }
                        />
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-2">
                          <PhotoIcon className="h-5 w-5 text-blue-gray-500" />
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {proyecto.imagenesMarketing?.length || 0}/15
                          </Typography>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex gap-2">
                          <Tooltip content="Ver detalles">
                            <IconButton
                              variant="text"
                              color="blue"
                              size="sm"
                              onClick={() => navigate(`/dashboard/marketing/${proyecto.id || proyecto._id}/detalle`)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Editar marketing">
                            <IconButton
                              variant="text"
                              color="green"
                              size="sm"
                              onClick={() => navigate(`/dashboard/marketing/${proyecto.id || proyecto._id}/editar`)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Ver vista pública">
                            <IconButton
                              variant="text"
                              color="orange"
                              size="sm"
                              onClick={() => {
                                const publicUrl = `http://localhost:4000/publico/property-details.html?id=${proyecto.id || proyecto._id}`;
                                window.open(publicUrl, '_blank');
                              }}
                            >
                              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-4">
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  >
                    Anterior
                  </Button>
                  
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Página {page} de {totalPages}
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
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
};

export default ProyectosMarketing;
