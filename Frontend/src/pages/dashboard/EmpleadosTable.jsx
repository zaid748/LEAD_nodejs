import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Chip,
  Button,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function EmpleadosTable() {
  const [empleados, setEmpleados] = useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [selectedEmpleadoData, setSelectedEmpleadoData] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.authenticated || data.success) {
          const user = data.user || data;
          const userRole = user?.role || '';
          
          const admin = userRole.toLowerCase().includes('administrator') || 
                        userRole === 'Superadministrator';
          
          setIsAdmin(admin);
          
          // Redirigir si no es administrador
          if (!admin) {
            navigate('/dashboard/home');
          }
        }
      } catch (error) {
        console.error("Error al verificar permisos:", error);
        navigate('/dashboard/home');
      }
    };
    
    checkAdminAccess();
  }, [navigate]);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  useEffect(() => {
    if (selectedEmpleado) {
      fetchEmpleadoDetails(selectedEmpleado);
    } else {
      setSelectedEmpleadoData(null);
    }
  }, [selectedEmpleado]);

  // Aplicar filtro cuando cambie el término de búsqueda o la lista de empleados
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmpleados(empleados);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = empleados.filter(empleado => {
        const nombreCompleto = `${empleado.prim_nom || ""} ${empleado.segun_nom || ""} ${empleado.apell_pa || ""} ${empleado.apell_ma || ""}`.toLowerCase();
        const email = (empleado.email || "").toLowerCase();
        const puesto = (empleado.pust || "").toLowerCase();
        const telefono = (empleado.telefono || "").toLowerCase();
        const estado = (empleado.estado || "").toLowerCase();
        const salario = (empleado.salario || "").toString().toLowerCase();
        
        return nombreCompleto.includes(searchTermLower) || 
               email.includes(searchTermLower) ||
               puesto.includes(searchTermLower) ||
               telefono.includes(searchTermLower) ||
               estado.includes(searchTermLower) ||
               salario.includes(searchTermLower);
      });
      setFilteredEmpleados(filtered);
    }
  }, [searchTerm, empleados]);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        // Ordenar empleados: primero activos, luego inactivos
        const empleadosOrdenados = [...data.empleados].sort((a, b) => {
          // Comparar por estado (Activo primero)
          if (a.estado === 'Activo' && b.estado !== 'Activo') return -1;
          if (a.estado !== 'Activo' && b.estado === 'Activo') return 1;
          
          // Si ambos tienen el mismo estado, ordenar por nombre
          return a.prim_nom.localeCompare(b.prim_nom);
        });
        
        setEmpleados(empleadosOrdenados);
        setFilteredEmpleados(empleadosOrdenados);
      }
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  const fetchEmpleadoDetails = async (empleadoId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api/${empleadoId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSelectedEmpleadoData(data.empleado);
      }
    } catch (error) {
      console.error("Error al obtener detalles del empleado:", error);
    }
  };

  const handleRowClick = (empleadoId) => {
    setSelectedEmpleado(empleadoId);
  };

  const handleViewProfile = () => {
    if (selectedEmpleado && selectedEmpleadoData) {
      sessionStorage.setItem('selectedEmpleadoProfile', JSON.stringify(selectedEmpleadoData));
      navigate(`/dashboard/empleado-profile/${selectedEmpleado}`);
    }
  };

  const handleViewDocument = () => {
    if (selectedEmpleado) {
      navigate(`/dashboard/empleado-documents/${selectedEmpleado}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteEmpleado = async () => {
    if (!selectedEmpleado) return;
    
    if (window.confirm("¿Está seguro de que desea eliminar este empleado? Esta acción no se puede deshacer.")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api/${selectedEmpleado}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Actualizar la lista de empleados
          fetchEmpleados();
          setSelectedEmpleado(null);
          setSelectedEmpleadoData(null);
        } else {
          alert("Error al eliminar empleado: " + data.message);
        }
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
        alert("Error al eliminar empleado");
      }
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="white">
              Empleados
            </Typography>
            <div className="flex gap-2">
              <IconButton 
                color="white" 
                variant="text" 
                onClick={handleViewProfile} 
                disabled={!selectedEmpleado}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-7 h-7">
                  <path fill="currentColor" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63.2 225.1 49.2 256c13.9 30.9 40.4 72.5 78.9 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7c38.5-35.8 64.9-77.4 78.9-108.3c-13.9-30.9-40.4-72.5-78.9-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                </svg>
              </IconButton>
              <IconButton 
                color="white" 
                variant="text" 
                onClick={handleViewDocument} 
                disabled={!selectedEmpleado}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-7 h-7">
                  <path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                </svg>
              </IconButton>
              <IconButton 
                color="white" 
                variant="text" 
                onClick={handleDeleteEmpleado} 
                disabled={!selectedEmpleado}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7">
                  <path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 mb-4">
            <Typography variant="h5" color="blue-gray">
              Lista de Empleados
            </Typography>
            <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <Input
                  type="text"
                  label="Buscar empleados..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pr-10"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              {isAdmin && (
                <Button 
                  color="blue" 
                  className="flex items-center gap-3"
                  onClick={() => navigate('/dashboard/empleados/crear')}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                  Nuevo Empleado
                </Button>
              )}
            </div>
          </div>
          
          {/* Mostrar número de resultados */}
          <div className="px-4 mb-2">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Mostrando {filteredEmpleados.length} de {empleados.length} empleados
            </Typography>
          </div>
          
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nombre Completo", "Correo", "Puesto", "Teléfono", "Estado", "Salario"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmpleados.length > 0 ? (
                filteredEmpleados.map((empleado) => {
                  const isSelected = selectedEmpleado === empleado._id;
                  const className = `py-3 px-5 border-b border-blue-gray-50 cursor-pointer transition-colors ${
                    isSelected ? "bg-blue-gray-50" : "hover:bg-blue-gray-50/50"
                  }`;

                  const nombreCompleto = `${empleado.prim_nom} ${empleado.segun_nom || ''} ${empleado.apell_pa} ${empleado.apell_ma}`.trim();
                  const isActive = empleado.estado === "activo";

                  return (
                    <tr 
                      key={empleado._id}
                      onClick={() => handleRowClick(empleado._id)}
                      className={className}
                    >
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {nombreCompleto}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {empleado.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {empleado.pust}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {empleado.telefono}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant={empleado.estado === "Activo" ? "filled" : "outlined"}
                            value={empleado.estado}
                            color={empleado.estado === "Activo" ? "green" : "red"}
                            className={empleado.estado === "Activo" 
                              ? "bg-green-500 text-white" 
                              : "border-red-500 text-red-500"}
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          ${empleado.salario}
                        </Typography>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 px-5 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      No se encontraron empleados con los criterios de búsqueda.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default EmpleadosTable; 