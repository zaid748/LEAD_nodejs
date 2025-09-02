import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  Spinner,
  Alert,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, PencilIcon, PhotoIcon, MapPinIcon, HomeIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

export function DetalleMarketing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proyecto, setProyecto] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);

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
          
          setIsMarketing(
            userRole === 'Marketing' || 
            userRole === 'Asesor' ||
            userRole === 'User'
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

  // Cargar datos del proyecto
  useEffect(() => {
    if (!user || !id) return;
    
    const fetchProyecto = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Usar la API de captaciones en lugar de inventario
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/captaciones/${id}`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener el proyecto: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("=== DEBUG: Respuesta completa del backend ===");
        console.log("data:", data);
        
        // La respuesta del backend ya contiene la captación completa
        const proyectoData = data;
        
        // Verificar que el proyecto esté disponible para marketing
        console.log("=== DEBUG: Estatus del proyecto ===");
        console.log("proyectoData.venta?.estatus_venta:", proyectoData.venta?.estatus_venta);
        console.log("proyectoData.estatus_actual:", proyectoData.estatus_actual);
        console.log("proyectoData.venta:", proyectoData.venta);
        
        // Validación más flexible: permitir proyectos con estatus de venta "Disponible para venta", estatus general "En venta", "Disponible para venta" o "Remodelacion"
        const estatusValido = 
          proyectoData.venta?.estatus_venta === 'Disponible para venta' ||
          proyectoData.estatus_actual === 'En venta' ||
          proyectoData.estatus_actual === 'Disponible para venta' ||
          proyectoData.estatus_actual === 'Remodelacion';
        
        if (!estatusValido) {
          setError(`Este proyecto no está disponible para marketing. Estatus actual: ${proyectoData.venta?.estatus_venta || proyectoData.estatus_actual || 'No definido'}. Solo se pueden ver propiedades con estatus "Disponible para venta", "En venta" o "Remodelacion".`);
          return;
        }
        
        setProyecto(proyectoData);
        
        console.log("=== DEBUG: Datos del proyecto cargados en DetalleMarketing ===");
        console.log("proyectoData:", proyectoData);
        console.log("marketing:", proyectoData.marketing);
        console.log("marketing.titulo:", proyectoData.marketing?.titulo);
        console.log("marketing.precioOferta:", proyectoData.marketing?.precioOferta);
        console.log("marketing.descripcion:", proyectoData.marketing?.descripcion);
        
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        setError(error.message || "No se pudo cargar el proyecto");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProyecto();
  }, [user, id]);

  // Renderizar estado de carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  // Renderizar error si no se puede cargar el proyecto
  if (error && !proyecto) {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="p-6">
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
            <Button 
              color="blue" 
              onClick={() => navigate('/dashboard/marketing')}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a Marketing
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="p-6">
            <Typography variant="h6" color="red" className="mb-4">
              Proyecto no encontrado
            </Typography>
            <Button 
              color="blue" 
              onClick={() => navigate('/dashboard/marketing')}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a Marketing
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Detalle de Marketing - {proyecto.propiedad?.tipo || "Proyecto"}
            </Typography>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="text" 
                color="white"
                onClick={() => navigate('/dashboard/marketing')}
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Volver
              </Button>
              
              {(isAdmin || isMarketing) && (
                <Button 
                  size="sm" 
                  color="white"
                  onClick={() => navigate(`/dashboard/marketing/${id}/editar`)}
                  className="flex items-center gap-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  Editar Marketing
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardBody className="p-6">
          {/* Información básica del proyecto */}
          <div className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Información del Proyecto
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <HomeIcon className="h-6 w-6 text-blue-500" />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    Tipo de Propiedad
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {proyecto.propiedad?.tipo || "Sin especificar"}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <MapPinIcon className="h-6 w-6 text-green-500" />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    Ubicación
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {proyecto.propiedad?.direccion?.calle || "Sin especificar"}, {proyecto.propiedad?.direccion?.colonia || ""}, {proyecto.propiedad?.direccion?.ciudad || ""}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-amber-500" />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    Precio de Venta
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    ${proyecto.venta?.monto_venta || "Sin precio definido"}
                  </Typography>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Typography variant="h6" color="blue-gray">
                  {proyecto.propiedad?.caracteristicas?.habitaciones || "Sin especificar"}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  Recámaras
                </Typography>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Typography variant="h6" color="blue-gray">
                  {proyecto.propiedad?.caracteristicas?.m2_terreno || "Sin especificar"}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  m² Terreno
                </Typography>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Typography variant="h6" color="blue-gray">
                  {proyecto.propiedad?.caracteristicas?.m2_construccion || "Sin especificar"}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  m² Construcción
                </Typography>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Typography variant="h6" color="blue-gray">
                  {proyecto.propiedad?.caracteristicas?.baños || "Sin especificar"}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  Baños
                </Typography>
              </div>
            </div>
          </div>
          
          {/* Configuración de Marketing */}
          <div className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Configuración de Marketing
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <Typography variant="h6" color="green" className="mb-2">
                  Título para Marketing
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.marketing?.titulo || "Sin título personalizado"}
                </Typography>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <Typography variant="h6" color="green" className="mb-2">
                  Precio de Oferta
                </Typography>
                <Typography variant="h5" color="green" className="font-bold">
                  ${proyecto.marketing?.precioOferta || "Sin precio definido"}
                </Typography>
              </div>
            </div>
            
            {proyecto.marketing?.descripcion && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">
                  Descripción Personalizada
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.marketing.descripcion}
                </Typography>
              </div>
            )}
          </div>
          
                      {/* Imágenes */}
            <div className="mb-8">
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Galería de Imágenes
              </Typography>
              
              {/* Imágenes de marketing */}
              {proyecto.marketing?.imagenes && proyecto.marketing.imagenes.length > 0 && (
                <div>
                  <Typography variant="h6" color="green" className="mb-3">
                    Imágenes de Marketing ({proyecto.marketing.imagenes.length})
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {proyecto.marketing.imagenes.map((imagen, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imagen.url}
                          alt={`Imagen marketing ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-green-200 hover:border-green-500 transition-colors cursor-pointer"
                          onClick={() => window.open(imagen.url, '_blank')}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <PhotoIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Marketing
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {(!proyecto.marketing?.imagenes || proyecto.marketing.imagenes.length === 0) && (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <Typography variant="h6" color="gray" className="mb-2">
                    No hay imágenes de marketing disponibles
                  </Typography>
                  <Typography variant="small" color="gray">
                    Este proyecto aún no tiene imágenes de marketing cargadas
                  </Typography>
                </div>
              )}
            </div>
          
          {/* Información del propietario */}
          <div className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Información del Propietario
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">
                  Nombre del Propietario
                </Typography>
                                  <Typography variant="paragraph" color="blue-gray">
                    {proyecto.propietario?.nombre || "Sin especificar"}
                  </Typography>
                </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">
                  Teléfono
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.propietario?.telefono || "Sin especificar"}
                </Typography>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">
                  Correo Electrónico
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.propietario?.correo || "Sin especificar"}
                </Typography>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">
                  Estado Civil
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.propietario?.estado_civil || "Sin especificar"}
                </Typography>
              </div>
            </div>
          </div>
          
          {/* Información de la captación */}
          <div className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Información de Captación
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-purple-50 rounded-lg">
                <Typography variant="h6" color="purple" className="mb-2">
                  Tipo de Captación
                </Typography>
                                  <Typography variant="paragraph" color="blue-gray">
                    {proyecto.captacion?.tipo_captacion || "Sin especificar"}
                  </Typography>
                </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <Typography variant="h6" color="purple" className="mb-2">
                  Fecha de Captación
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.captacion?.fecha ? new Date(proyecto.captacion.fecha).toLocaleDateString() : "Sin especificar"}
                </Typography>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <Typography variant="h6" color="purple" className="mb-2">
                  Asesor
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.captacion?.asesor?.nombre || "No asignado"}
                </Typography>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <Typography variant="h6" color="purple" className="mb-2">
                  Estatus Actual
                </Typography>
                <Chip
                  value={proyecto.estatus_actual || "Desconocido"}
                  color={
                    proyecto.estatus_actual === 'Disponible para venta' ? 'green' :
                    proyecto.estatus_actual === 'Remodelacion' ? 'amber' :
                    proyecto.estatus_actual === 'En venta' ? 'green' :
                    proyecto.estatus_actual === 'Vendida' ? 'gray' :
                    proyecto.estatus_actual === 'Cancelada' ? 'red' : 'blue'
                  }
                  size="sm"
                />
              </div>
            </div>
            
            {proyecto.captacion?.observaciones && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <Typography variant="h6" color="purple" className="mb-2">
                  Observaciones
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {proyecto.captacion.observaciones}
                </Typography>
              </div>
            )}
          </div>
          
          {/* Botones de acción */}
          <div className="flex justify-center gap-4 pt-6 border-t">
            <Button
              variant="text"
              color="gray"
              onClick={() => navigate('/dashboard/marketing')}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a Marketing
            </Button>
            
            {(isAdmin || isMarketing) && (
              <Button
                color="green"
                onClick={() => navigate(`/dashboard/marketing/${id}/editar`)}
                className="flex items-center gap-2"
              >
                <PencilIcon className="h-4 w-4" />
                Editar Marketing
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default DetalleMarketing;
