import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Chip,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export function EmpleadosTable() {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [selectedEmpleadoData, setSelectedEmpleadoData] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/check-auth', {
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

  const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/empleados-api', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setEmpleados(data.empleados);
      }
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  const fetchEmpleadoDetails = async (empleadoId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/empleados-api/${empleadoId}`, {
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

  const handleDeleteEmpleado = async () => {
    if (selectedEmpleado && window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/empleados-api/${selectedEmpleado}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
          fetchEmpleados();
          setSelectedEmpleado(null);
        }
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
      }
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Tabla de Empleados
            </Typography>
            <div className="flex gap-4">
              {/* Icono de documento */}
              <IconButton 
                variant="text" 
                color="white" 
                disabled={!selectedEmpleado}
                className="opacity-100 disabled:opacity-50"
                onClick={handleViewDocument}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-7 h-7">
                  <path fill="currentColor" d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"/>
                </svg>
              </IconButton>
              {/* Icono de perfil */}
              <IconButton 
                variant="text" 
                color="white"
                disabled={!selectedEmpleado}
                className="opacity-100 disabled:opacity-50"
                onClick={handleViewProfile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"/>
                </svg>
              </IconButton>
              {/* Icono de eliminar */}
              <IconButton 
                variant="text" 
                color="white"
                disabled={!selectedEmpleado}
                className="opacity-100 disabled:opacity-50"
                onClick={handleDeleteEmpleado}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7">
                  <path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-4">
            <Typography variant="h5" color="blue-gray">
              Lista de Empleados
            </Typography>
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
              {empleados.map((empleado) => {
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
                          variant="ghost"
                          value={empleado.estado}
                          color={empleado.estado === "Activo" ? "green" : "red"}
                          className={empleado.estado === "Activo" ? "bg-green-100" : "bg-red-100"}
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
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default EmpleadosTable; 