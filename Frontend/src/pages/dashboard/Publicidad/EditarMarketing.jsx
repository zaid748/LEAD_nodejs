import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  Spinner,
  Alert,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, PhotoIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { fetchAPI } from "@/services/api";

export function EditarMarketing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [proyecto, setProyecto] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    precioOferta: "",
    descripcionMarketing: "",
    imagenesMarketing: []
  });

  // Estados para la gestión de imágenes
  const [nuevasImagenes, setNuevasImagenes] = useState([]);
  const [imagenesAEliminar, setImagenesAEliminar] = useState([]);

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

  // Función para cargar datos del proyecto
  const fetchProyecto = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("=== DEBUG: fetchProyecto ejecutándose ===");
      console.log("ID del proyecto:", id);

      // Usar la API de marketing para obtener la información específica
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/marketing/${id}`, {
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
        
        // La respuesta del backend contiene el proyecto con información de marketing
        const proyectoData = data.proyecto || data;
        
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
          setError(`Este proyecto no está disponible para marketing. Estatus actual: ${proyectoData.venta?.estatus_venta || proyectoData.estatus_actual || 'No definido'}. Solo se pueden editar propiedades con estatus "Disponible para venta", "En venta" o "Remodelacion".`);
          return;
        }
        
        setProyecto(proyectoData);
        
        console.log("=== DEBUG: Datos del proyecto cargados ===");
        console.log("proyectoData:", proyectoData);
        console.log("propiedad:", proyectoData.propiedad);
        console.log("marketing:", proyectoData.marketing);
        console.log("imagenes en marketing:", proyectoData.marketing?.imagenes);
        
        // Inicializar formulario con datos existentes de marketing
        const formDataInicial = {
          titulo: proyectoData.marketing?.titulo || proyectoData.propiedad?.titulo || proyectoData.propiedad?.descripcion_adicional || "",
          precioOferta: proyectoData.marketing?.precioOferta || proyectoData.venta?.monto_venta || proyectoData.propiedad?.precio || "",
          descripcionMarketing: proyectoData.marketing?.descripcion || proyectoData.propiedad?.descripcion_adicional || "",
          imagenesMarketing: proyectoData.marketing?.imagenes || []
        };
        
        setFormData(formDataInicial);
        
        console.log("=== DEBUG: Formulario inicializado ===");
        console.log("formDataInicial:", formDataInicial);
        console.log("proyectoData.marketing:", proyectoData.marketing);
        
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        setError(error.message || "No se pudo cargar el proyecto");
      } finally {
        setIsLoading(false);
      }
    };

  // Cargar datos del proyecto
  useEffect(() => {
    if (!user || !id) return;
    fetchProyecto();
  }, [user, id]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar selección de nuevas imágenes
  const handleImageSelect = (e) => {
    console.log('=== DEBUG: handleImageSelect ejecutándose ===');
    console.log('Evento:', e);
    console.log('Files:', e.target.files);
    
    const files = Array.from(e.target.files);
    console.log('Files convertidos a array:', files);
    
    // Verificar límite de imágenes
    const currentImagesCount = proyecto?.marketing?.imagenes?.length || 0;
    console.log('Imágenes actuales en marketing:', currentImagesCount);
    console.log('Nuevas imágenes ya seleccionadas:', nuevasImagenes.length);
    console.log('Nuevas imágenes a agregar:', files.length);
    
    if (currentImagesCount + nuevasImagenes.length + files.length > 15) {
      setError(`No se pueden subir más de 15 imágenes por propiedad. Actualmente tienes ${currentImagesCount} y estás intentando agregar ${files.length} más.`);
      return;
    }
    
    setNuevasImagenes(prev => [...prev, ...files]);
    setError(null);
    console.log('Imágenes agregadas al estado. Total nuevas imágenes:', nuevasImagenes.length + files.length);
  };

  // Eliminar imagen de las nuevas
  const removeNuevaImagen = (index) => {
    setNuevasImagenes(prev => prev.filter((_, i) => i !== index));
  };

  // Marcar imagen existente para eliminar
  const toggleEliminarImagen = (imageKey) => {
    setImagenesAEliminar(prev => 
      prev.includes(imageKey) 
        ? prev.filter(key => key !== imageKey)
        : [...prev, imageKey]
    );
  };

  // Subir imágenes
  const handleUploadImages = async () => {
    console.log('=== DEBUG: handleUploadImages ejecutándose ===');
    console.log('nuevasImagenes:', nuevasImagenes);
    console.log('ID del proyecto:', id);
    
    if (nuevasImagenes.length === 0) {
      setError('No hay imágenes seleccionadas para subir');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      nuevasImagenes.forEach((imagen, index) => {
        console.log(`Agregando imagen ${index + 1}:`, imagen);
        formData.append('imagenesMarketing', imagen);
      });

      console.log('FormData creado, enviando petición...');
      console.log('URL:', `${import.meta.env.VITE_API_URL}/api/marketing/${id}/imagenes`);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/marketing/${id}/imagenes`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      console.log('=== DEBUG: Respuesta del servidor ===');
      console.log('Status:', response.status);
      console.log('StatusText:', response.statusText);
      console.log('Headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.message || 'Error al subir imágenes');
      }

      const data = await response.json();
      console.log('Respuesta exitosa:', data);
      setSuccess(data.message);
      
      // Limpiar nuevas imágenes
      setNuevasImagenes([]);
      
      // Recargar el proyecto para mostrar las nuevas imágenes
      fetchProyecto();
      
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      setError(error.message || 'Error al subir imágenes');
    } finally {
      setIsSaving(false);
    }
  };

  // Eliminar imagen existente
  const handleDeleteImage = async (imageKey) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }

    try {
      console.log('=== DEBUG: Eliminando imagen ===');
      console.log('imageKey:', imageKey);
      console.log('Tipo de imageKey:', typeof imageKey);
      console.log('ID del proyecto:', id);
      
      // Buscar la imagen en el proyecto para obtener más información
      const imagenEncontrada = proyecto?.marketing?.imagenes?.find(img => img.key === imageKey || img.s3Key === imageKey);
      console.log('Imagen encontrada en el proyecto:', imagenEncontrada);
      console.log('Todas las imágenes del proyecto:', proyecto?.marketing?.imagenes);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/marketing/${id}/imagenes?imageKey=${encodeURIComponent(imageKey)}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      console.log('=== DEBUG: Respuesta de eliminación ===');
      console.log('Status:', response.status);
      console.log('StatusText:', response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        throw new Error(errorData.message || 'Error al eliminar imagen');
      }

      const data = await response.json();
      console.log('Respuesta exitosa:', data);
      setSuccess(data.message);
      
      // Recargar el proyecto para mostrar los cambios
      fetchProyecto();
      
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
      setError(error.message || 'Error al eliminar imagen');
    }
  };

  // Guardar cambios
  const handleSave = async () => {
    if (!proyecto) return;
    
    setIsSaving(true);
      setError(null);
      setSuccess(null);
      
      try {
        // Crear FormData para enviar imágenes
        const formDataToSend = new FormData();
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('precioOferta', formData.precioOferta);
        formDataToSend.append('descripcionMarketing', formData.descripcionMarketing);
        
        // Añadir nuevas imágenes
        nuevasImagenes.forEach((imagen, index) => {
          formDataToSend.append('imagenesMarketing', imagen);
        });
        
        // Añadir imágenes a eliminar
        if (imagenesAEliminar.length > 0) {
          formDataToSend.append('imagenesAEliminar', JSON.stringify(imagenesAEliminar));
        }
        
        // Enviar actualización usando la API de marketing
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/marketing/${id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tituloMarketing: formData.titulo,
            descripcionMarketing: formData.descripcionMarketing,
            precioOferta: formData.precioOferta
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al actualizar el marketing: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setSuccess('Marketing actualizado correctamente');
          
          // Actualizar estado local
          setProyecto(prev => ({
            ...prev,
            propiedad: {
              ...prev.propiedad,
              titulo: formData.titulo,
              descripcionMarketing: formData.descripcionMarketing,
              imagenesMarketing: [
                ...(formData.imagenesMarketing.filter(img => !imagenesAEliminar.includes(img))),
                ...nuevasImagenes.map(img => URL.createObjectURL(img))
              ]
            },
            venta: {
              ...prev.venta,
              monto_venta: formData.precioOferta
            }
          }));
          
          // Limpiar estados temporales
          setNuevasImagenes([]);
          setImagenesAEliminar([]);
          
          // Redirigir después de un momento
          setTimeout(() => {
            navigate('/dashboard/marketing');
          }, 2000);
          
        } else {
          throw new Error(result.message || 'Error al actualizar el marketing');
        }
        
      } catch (error) {
        console.error("Error al guardar:", error);
        setError(error.message || "Error al guardar los cambios");
      } finally {
        setIsSaving(false);
      }
  };

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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Editar Marketing - {proyecto?.propiedad?.tipo || "Proyecto"}
            </Typography>
            
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
          </div>
        </CardHeader>
        
        <CardBody className="p-6">
          {error && (
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert color="green" className="mb-4">
              {success}
            </Alert>
          )}
          
          {/* Información básica del proyecto */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Información del Proyecto
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  Tipo: {proyecto?.propiedad?.tipo || "Sin especificar"}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  Dirección: {proyecto?.propiedad?.direccion?.calle || "Sin especificar"}, {proyecto?.propiedad?.direccion?.colonia || ""}, {proyecto?.propiedad?.direccion?.ciudad || ""}
                </Typography>
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                  Recámaras: {proyecto?.propiedad?.caracteristicas?.habitaciones || "Sin especificar"}
                </Typography>
                <Typography variant="small" color="blue-gray">
                  Construcción: {proyecto?.propiedad?.caracteristicas?.m2_construccion || "Sin especificar"} m²
                </Typography>
              </div>
            </div>
          </div>
          
          {/* Formulario de marketing */}
          <div className="space-y-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Configuración de Marketing
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Título para Marketing"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ej: Hermosa casa en fraccionamiento exclusivo"
                />
                
                <Input
                  label="Precio de Oferta"
                  name="precioOferta"
                  value={formData.precioOferta}
                  onChange={handleInputChange}
                  placeholder="Ej: $2,500,000"
                />
              </div>
              
              <div className="mt-4">
                <Textarea
                  label="Descripción Personalizada para Marketing"
                  name="descripcionMarketing"
                  value={formData.descripcionMarketing}
                  onChange={handleInputChange}
                  placeholder="Describe las características más atractivas de la propiedad para el público..."
                  rows={4}
                />
              </div>
            </div>
            
            {/* Gestión de imágenes */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Imágenes de Marketing
              </Typography>
              
              {/* Imágenes existentes */}
              {proyecto?.marketing?.imagenes && proyecto.marketing.imagenes.length > 0 && (
                <div className="mb-4">
                  <Typography variant="small" color="blue-gray" className="mb-2">
                    Imágenes actuales ({proyecto.marketing.imagenes.length}/15):
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {proyecto.marketing.imagenes.map((imagen, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imagen.url}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                          <Tooltip content="Eliminar imagen">
                            <IconButton
                              variant="text"
                              color="red"
                              onClick={() => handleDeleteImage(imagen.key || imagen.s3Key)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 rounded px-2 py-1 text-xs text-gray-700">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Subir nuevas imágenes */}
              <div className="mb-4">
                <Typography variant="small" color="blue-gray" className="mb-2">
                  Añadir nuevas imágenes:
                </Typography>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <Typography variant="small" color="gray" className="mt-1">
                  Máximo 15 imágenes por propiedad. Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB por imagen.
                </Typography>
              </div>
              
              {/* Vista previa de nuevas imágenes */}
              {nuevasImagenes.length > 0 && (
                <div className="mb-4">
                  <Typography variant="small" color="blue-gray" className="mb-2">
                    Nuevas imágenes a subir ({nuevasImagenes.length}):
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {nuevasImagenes.map((imagen, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(imagen)}
                          alt={`Nueva imagen ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-green-200"
                        />
                        <IconButton
                          variant="text"
                          color="red"
                          size="sm"
                          className="absolute top-2 right-2 bg-white"
                          onClick={() => removeNuevaImagen(index)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                  
                  {/* Botón para subir imágenes */}
                  <div className="mt-3">
                    <Button
                      color="green"
                      onClick={handleUploadImages}
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      {isSaving ? (
                        <Spinner className="h-4 w-4" />
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      )}
                      {isSaving ? 'Subiendo...' : `Subir ${nuevasImagenes.length} imagen(es)`}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                variant="text"
                color="gray"
                onClick={() => navigate('/dashboard/marketing')}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              
              <Button
                color="green"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <PhotoIcon className="h-4 w-4" />
                    Guardar Marketing
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EditarMarketing;
