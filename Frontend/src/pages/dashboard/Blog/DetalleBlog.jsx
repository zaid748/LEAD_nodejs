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
import { ArrowLeftIcon, PencilIcon, PhotoIcon, CalendarIcon, UserIcon, TagIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

export function DetalleBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);

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

  // Cargar datos del blog
  useEffect(() => {
    if (!user || !id) return;
    
    const fetchBlog = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/${id}`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener el blog: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("=== DEBUG: Respuesta completa del backend ===");
        console.log("data:", data);
        
        const blogData = data.blog || data;
        setBlog(blogData);
        
        console.log("=== DEBUG: Datos del blog cargados en DetalleBlog ===");
        console.log("blogData:", blogData);
        
      } catch (error) {
        console.error("Error al obtener el blog:", error);
        setError(error.message || "No se pudo cargar el blog");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [user, id]);

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Renderizar estado de carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  // Renderizar error si no se puede cargar el blog
  if (error && !blog) {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="p-6">
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
            <Button 
              color="blue" 
              onClick={() => navigate('/dashboard/blog')}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a Blog
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="p-6">
            <Typography variant="h6" color="red" className="mb-4">
              Blog no encontrado
            </Typography>
            <Button 
              color="blue" 
              onClick={() => navigate('/dashboard/blog')}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a Blog
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Detalle del Blog - {blog.titulo}
            </Typography>
            
            <div className="flex gap-2">
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
              
              <Button 
                size="sm" 
                color="white"
                onClick={() => navigate(`/dashboard/blog/${id}/editar`)}
                className="flex items-center gap-2"
              >
                <PencilIcon className="h-4 w-4" />
                Editar Blog
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardBody className="p-6">
          {/* Información básica del blog */}
          <div className="mb-8">
            <Typography variant="h4" color="blue-gray" className="mb-4">
              {blog.titulo}
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <TagIcon className="h-6 w-6 text-blue-500" />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    Categoría
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {blog.categoria || "Sin categoría"}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <UserIcon className="h-6 w-6 text-green-500" />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    Autor
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {blog.autor ? `${blog.autor.prim_nom || ''} ${blog.autor.apell_pa || ''}`.trim() || "Sin autor" : "Sin autor"}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-amber-500" />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    Fecha de Publicación
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray">
                    {formatDate(blog.fechaPublicacion)}
                  </Typography>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-purple-500" />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    Estado
                  </Typography>
                  <Chip
                    value={blog.estado || "Borrador"}
                    color={
                      blog.estado === 'Publicado' ? 'green' :
                      blog.estado === 'Borrador' ? 'amber' :
                      blog.estado === 'Programado' ? 'blue' : 'red'
                    }
                    size="sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Tags */}
            {blog.tags && (
              <div className="mb-6">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Tags
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.split(',').map((tag, index) => (
                    <Chip
                      key={index}
                      value={tag.trim()}
                      variant="outlined"
                      size="sm"
                      color="blue"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Resumen */}
          {blog.resumen && (
            <div className="mb-8">
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Resumen
              </Typography>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Typography variant="paragraph" color="blue-gray">
                  {blog.resumen}
                </Typography>
              </div>
            </div>
          )}
          
          {/* Contenido */}
          <div className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Contenido Completo
            </Typography>
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <Typography 
                variant="paragraph" 
                color="blue-gray"
                className="whitespace-pre-wrap"
              >
                {blog.contenido}
              </Typography>
            </div>
          </div>
          
          {/* Imágenes */}
          <div className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Galería de Imágenes
            </Typography>
            
            {/* Imagen principal */}
            {blog.imagenPrincipal && (
              <div className="mb-6">
                <Typography variant="h6" color="blue" className="mb-3">
                  Imagen Principal
                </Typography>
                <div className="relative group">
                  <img
                    src={blog.imagenPrincipal.url}
                    alt="Imagen principal"
                    className="w-full max-w-2xl h-64 object-cover rounded-lg border-2 border-blue-200 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => window.open(blog.imagenPrincipal.url, '_blank')}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <PhotoIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                </div>
              </div>
            )}
            
            {/* Imágenes adicionales */}
            {blog.imagenes && blog.imagenes.length > 0 && (
              <div>
                <Typography variant="h6" color="green" className="mb-3">
                  Imágenes Adicionales ({blog.imagenes.length})
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {blog.imagenes.map((imagen, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imagen.url}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-green-200 hover:border-green-500 transition-colors cursor-pointer"
                        onClick={() => window.open(imagen.url, '_blank')}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                        <PhotoIcon className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(!blog.imagenPrincipal && (!blog.imagenes || blog.imagenes.length === 0)) && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <Typography variant="h6" color="gray" className="mb-2">
                  No hay imágenes disponibles
                </Typography>
                <Typography variant="small" color="gray">
                  Este blog aún no tiene imágenes cargadas
                </Typography>
              </div>
            )}
          </div>
          
          {/* Información adicional */}
          <div className="mb-8">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Información Adicional
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">
                  Fecha de Creación
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {formatDate(blog.createdAt)}
                </Typography>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <Typography variant="h6" color="blue" className="mb-2">
                  Última Actualización
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {formatDate(blog.updatedAt)}
                </Typography>
              </div>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex justify-center gap-4 pt-6 border-t">
            <Button
              variant="text"
              color="gray"
              onClick={() => navigate('/dashboard/blog')}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver a Blog
            </Button>
            
            <Button
              color="blue"
              onClick={() => navigate(`/dashboard/blog/${id}/editar`)}
              className="flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" />
              Editar Blog
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default DetalleBlog;
