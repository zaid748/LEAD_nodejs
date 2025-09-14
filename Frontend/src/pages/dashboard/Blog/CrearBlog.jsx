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
  Tooltip,
  Select,
  Option
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PhotoIcon, TrashIcon, PlusIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

export function CrearBlog() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);

  // Estados del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    resumen: "",
    contenido: "",
    categoria: "",
    estado: "Borrador",
    fechaPublicacion: "",
    tags: ""
  });

  // Estados para la gestión de imágenes
  const [imagenes, setImagenes] = useState([]);

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
        } else {
          navigate('/sign-in');
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        navigate('/sign-in');
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar selección de imágenes
  const handleImagenesSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Verificar límite de imágenes
    if (imagenes.length + files.length > 10) {
      setError('No se pueden subir más de 10 imágenes por blog');
      return;
    }
    
    setImagenes(prev => [...prev, ...files]);
    setError(null);
  };

  // Eliminar imagen
  const removeImagen = (index) => {
    setImagenes(prev => prev.filter((_, i) => i !== index));
  };

  // Validar formulario
  const validateForm = () => {
    if (!formData.titulo.trim()) {
      setError('El título es obligatorio');
      return false;
    }
    
    if (!formData.contenido.trim()) {
      setError('El contenido es obligatorio');
      return false;
    }
    
    if (!formData.categoria) {
      setError('La categoría es obligatoria');
      return false;
    }
    
    if (formData.estado === 'Publicado' && !formData.fechaPublicacion) {
      setError('La fecha de publicación es obligatoria para blogs publicados');
      return false;
    }
    
    return true;
  };

  // Guardar blog
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Crear FormData para enviar datos e imágenes
      const formDataToSend = new FormData();
      
      // Datos del blog
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('resumen', formData.resumen);
      formDataToSend.append('contenido', formData.contenido);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('estado', formData.estado);
      formDataToSend.append('tags', formData.tags);
      
      if (formData.fechaPublicacion) {
        formDataToSend.append('fechaPublicacion', formData.fechaPublicacion);
      }
      
      // Imágenes (la primera será la principal, las demás adicionales)
      imagenes.forEach((imagen, index) => {
        formDataToSend.append('imagenes', imagen);
      });
      
      console.log('Enviando datos del blog:', {
        titulo: formData.titulo,
        categoria: formData.categoria,
        estado: formData.estado,
        imagenes: imagenes.length
      });
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
        throw new Error(errorData.mensaje || `Error al crear el blog: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setSuccess('Blog creado correctamente');
        
        // Limpiar formulario
        setFormData({
          titulo: "",
          resumen: "",
          contenido: "",
          categoria: "",
          estado: "Borrador",
          fechaPublicacion: "",
          tags: ""
        });
        setImagenes([]);
        
        // Redirigir después de un momento
        setTimeout(() => {
          navigate('/dashboard/blog');
        }, 2000);
        
      } else {
        throw new Error(result.message || 'Error al crear el blog');
      }
      
    } catch (error) {
      console.error("Error al guardar:", error);
      setError(error.message || "Error al guardar el blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Crear Nuevo Blog
            </Typography>
            
            <Button 
              size="sm" 
              variant="text" 
              color="white"
              onClick={() => navigate('/dashboard/blog')}
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
          
          {/* Formulario del blog */}
          <div className="space-y-6">
            {/* Información básica */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Información Básica
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Título del Blog *"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ej: Participamos en la Expo Inmobiliaria 2024"
                />
                
                <Select
                  label="Categoría *"
                  value={formData.categoria}
                  onChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}
                >
                  <Option value="eventos">Eventos</Option>
                  <Option value="cursos">Cursos</Option>
                  <Option value="noticias">Noticias</Option>
                  <Option value="proyectos">Proyectos</Option>
                  <Option value="testimonios">Testimonios</Option>
                  <Option value="otros">Otros</Option>
                </Select>
              </div>
              
              <div className="mt-4">
                <Textarea
                  label="Resumen"
                  name="resumen"
                  value={formData.resumen}
                  onChange={handleInputChange}
                  placeholder="Breve descripción del blog (aparecerá en la lista)"
                  rows={3}
                />
              </div>
              
              <div className="mt-4">
                <Textarea
                  label="Contenido Completo *"
                  name="contenido"
                  value={formData.contenido}
                  onChange={handleInputChange}
                  placeholder="Escribe aquí el contenido completo del blog..."
                  rows={8}
                />
              </div>
            </div>
            
            {/* Configuración de publicación */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Configuración de Publicación
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Estado"
                  value={formData.estado}
                  onChange={(value) => setFormData(prev => ({ ...prev, estado: value }))}
                >
                  <Option value="Borrador">Borrador</Option>
                  <Option value="Publicado">Publicado</Option>
                  <Option value="Programado">Programado</Option>
                </Select>
                
                <Input
                  label="Fecha de Publicación"
                  name="fechaPublicacion"
                  type="date"
                  value={formData.fechaPublicacion}
                  onChange={handleInputChange}
                  disabled={formData.estado === 'Borrador'}
                />
                
                <Input
                  label="Tags (separados por comas)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Ej: inmobiliaria, eventos, expo"
                />
              </div>
            </div>
            
            {/* Gestión de imágenes */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Imágenes del Blog
              </Typography>
              
              {/* Campo único para múltiples imágenes */}
              <div className="mb-6">
                <Typography variant="small" color="blue-gray" className="mb-2">
                  Seleccionar Imágenes (máximo 10):
                </Typography>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagenesSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <Typography variant="small" color="gray" className="mt-1">
                  La primera imagen será la portada del blog (1200x630px). Las demás serán imágenes adicionales (800x600px). 
                  Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB por imagen.
                </Typography>
              </div>
              
              {/* Vista previa de imágenes */}
              {imagenes.length > 0 && (
                <div className="mb-4">
                  <Typography variant="small" color="blue-gray" className="mb-2">
                    Imágenes seleccionadas ({imagenes.length}):
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagenes.map((imagen, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(imagen)}
                          alt={`Vista previa ${index + 1}`}
                          className={`w-full h-32 object-cover rounded-lg border-2 ${
                            index === 0 ? 'border-blue-500' : 'border-green-200'
                          }`}
                        />
                        {index === 0 && (
                          <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Principal
                          </div>
                        )}
                        <IconButton
                          variant="text"
                          color="red"
                          size="sm"
                          className="absolute top-2 right-2 bg-white"
                          onClick={() => removeImagen(index)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                variant="text"
                color="gray"
                onClick={() => navigate('/dashboard/blog')}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              
              <Button
                color="blue"
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <DocumentTextIcon className="h-4 w-4" />
                    Crear Blog
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

export default CrearBlog;
