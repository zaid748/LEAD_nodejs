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
  Chip,
  Select,
  Option
} from '@material-tailwind/react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  EyeIcon,
  PhotoIcon,
  PlusIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const BlogList = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
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

  // Manejar filtro por categoría
  const handleCategoryFilter = (value) => {
    setFilterCategory(value);
    setPage(1); // Reiniciar paginación al filtrar
  };

  // Cargar blogs
  useEffect(() => {
    if (!user) return;
    
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Construir URL para la API de blogs
        let apiUrl = `${import.meta.env.VITE_API_URL}/api/blog?page=${page}&limit=${searchParams.limit}&sort=${searchParams.sort}`;
        
        if (searchTerm) {
          apiUrl += `&search=${encodeURIComponent(searchTerm)}`;
        }
        
        if (filterCategory) {
          apiUrl += `&category=${encodeURIComponent(filterCategory)}`;
        }
        
        console.log("Consultando API de blogs:", apiUrl);
        
        const response = await fetch(apiUrl, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ mensaje: `Error ${response.status}` }));
          throw new Error(errorData.mensaje || `Error al obtener blogs: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Si no hay blogs, mostrar mensaje apropiado
        if (!data.blogs || data.blogs.length === 0) {
          setBlogs([]);
          setTotalPages(0);
          return;
        }
        
        console.log('Blogs obtenidos:', data.blogs);
        
        setBlogs(data.blogs);
        setTotalPages(data.paginacion?.paginas || 1);
        
      } catch (error) {
        console.error("Error al obtener blogs:", error);
        setError(error.message || "No se pudieron cargar los blogs");
        
        // En caso de error, simplemente mostrar array vacío
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogs();
  }, [user, page, searchParams, searchTerm, filterCategory]);

  // Manejar paginación
  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, totalPages));
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Renderizar estado de carga
  if (isLoading && !blogs.length) {
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
              Gestión de Blog
            </Typography>
            
            <div className="flex gap-2">
              <Typography variant="small" color="white" className="opacity-80">
                Administra el contenido del blog corporativo
              </Typography>
              <Button
                size="sm"
                color="white"
                variant="outlined"
                onClick={() => navigate('/dashboard/blog/nuevo')}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Nuevo Blog
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* Barra de búsqueda y filtros */}
          <div className="flex justify-between items-center px-4 py-2 gap-4">
            <div className="w-full max-w-md">
              <Input
                label="Buscar por título o contenido"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="w-full max-w-xs">
              <Select
                label="Filtrar por categoría"
                value={filterCategory}
                onChange={handleCategoryFilter}
              >
                <Option value="">Todas las categorías</Option>
                <Option value="eventos">Eventos</Option>
                <Option value="cursos">Cursos</Option>
                <Option value="noticias">Noticias</Option>
                <Option value="proyectos">Proyectos</Option>
                <Option value="testimonios">Testimonios</Option>
                <Option value="otros">Otros</Option>
              </Select>
            </div>
          </div>
          
          {error && (
            <Alert color="red" className="mx-4 mt-4">
              {error}
            </Alert>
          )}
          
          {blogs.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <Typography variant="h6" className="text-gray-600">
                No hay blogs disponibles
              </Typography>
              <Typography className="text-gray-500 mt-2">
                {searchTerm || filterCategory 
                  ? "No se encontraron blogs con los criterios de búsqueda"
                  : "Comienza creando tu primer blog"
                }
              </Typography>
              {!searchTerm && !filterCategory && (
                <Button
                  color="blue"
                  className="mt-4"
                  onClick={() => navigate('/dashboard/blog/nuevo')}
                >
                  Crear Primer Blog
                </Button>
              )}
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Título", "Categoría", "Autor", "Fecha", "Estado", "Imágenes", "Acciones"].map((header) => (
                      <th key={header} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography variant="small" color="blue-gray" className="font-medium leading-none opacity-70">
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, index) => (
                    <tr key={blog.id || blog._id || index}>
                      <td className="py-3 px-6">
                        <div>
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {blog.titulo || "Sin título"}
                          </Typography>
                          <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                            {blog.resumen ? blog.resumen.substring(0, 50) + '...' : "Sin resumen"}
                          </Typography>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={blog.categoria || "Sin categoría"}
                          color={
                            blog.categoria === 'eventos' ? 'green' :
                            blog.categoria === 'cursos' ? 'blue' :
                            blog.categoria === 'noticias' ? 'purple' :
                            blog.categoria === 'proyectos' ? 'amber' :
                            blog.categoria === 'testimonios' ? 'pink' : 'gray'
                          }
                        />
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-blue-gray-500" />
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {blog.autor ? `${blog.autor.prim_nom || ''} ${blog.autor.apell_pa || ''}`.trim() || "Sin autor" : "Sin autor"}
                          </Typography>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-blue-gray-500" />
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {formatDate(blog.fechaPublicacion)}
                          </Typography>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={blog.estado || "Borrador"}
                          color={
                            blog.estado === 'Publicado' ? 'green' :
                            blog.estado === 'Borrador' ? 'amber' :
                            blog.estado === 'Programado' ? 'blue' : 'red'
                          }
                        />
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-2">
                          <PhotoIcon className="h-5 w-5 text-blue-gray-500" />
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {blog.imagenes?.length || 0}/10
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
                              onClick={() => navigate(`/dashboard/blog/${blog.id || blog._id}/detalle`)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Editar blog">
                            <IconButton
                              variant="text"
                              color="green"
                              size="sm"
                              onClick={() => navigate(`/dashboard/blog/${blog.id || blog._id}/editar`)}
                            >
                              <PencilIcon className="h-4 w-4" />
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

export default BlogList;
