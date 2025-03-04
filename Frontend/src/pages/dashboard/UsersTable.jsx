import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Chip,
  Button,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon, MagnifyingGlassIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

// Función para capitalizar el rol y hacerlo más presentable
const capitalizeRole = (role) => {
  if (!role) return 'Usuario';
  
  // Convertir a minúsculas y luego capitalizar primera letra
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};



export function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
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
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Solo cargar los datos sin redirigir
      fetchUserDetailsWithoutRedirect(selectedUser);
    } else {
      setSelectedUserData(null);
    }
  }, [selectedUser]);

  // Aplicar filtro cuando cambie el término de búsqueda o la lista de usuarios
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = users.filter(user => {
        const nombreCompleto = `${user.prim_nom || ""} ${user.segun_nom || ""} ${user.apell_pa || ""} ${user.apell_ma || ""}`.toLowerCase();
        const email = (user.email || "").toLowerCase();
        const puesto = (user.pust || "").toLowerCase();
        const telefono = (user.telefono || "").toLowerCase();
        const role = (user.role || "").toLowerCase();
        
        return nombreCompleto.includes(searchTermLower) || 
               email.includes(searchTermLower) ||
               puesto.includes(searchTermLower) ||
               telefono.includes(searchTermLower) ||
               role.includes(searchTermLower);
      });
      
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        // Ordenar usuarios: primero administradores, luego usuarios normales
        const usuariosOrdenados = [...data.users].sort((a, b) => {
          // Ordenar por rol (administradores primero)
          const isAdminA = (a.role || "").toLowerCase().includes("admin");
          const isAdminB = (b.role || "").toLowerCase().includes("admin");
          
          if (isAdminA && !isAdminB) return -1;
          if (!isAdminA && isAdminB) return 1;
          
          // Si ambos tienen el mismo rol, ordenar por nombre
          return a.prim_nom?.localeCompare(b.prim_nom || "") || 0;
        });
        
        setUsers(usuariosOrdenados);
        setFilteredUsers(usuariosOrdenados);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchUserDetailsWithoutRedirect = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSelectedUserData(data.user);
        sessionStorage.setItem('selectedUserProfile', JSON.stringify(data.user));
        // No redirigir aquí
      }
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSelectedUserData(data.user);
        sessionStorage.setItem('selectedUserProfile', JSON.stringify(data.user));
        navigate(`/dashboard/user-profile/${userId}`);
      }
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
    }
  };

  const handleRowClick = (userId) => {
    setSelectedUser(userId);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewUser = () => {
    if (selectedUser) {
      // Guardar datos del usuario en sessionStorage antes de navegar
      if (selectedUserData) {
        sessionStorage.setItem('selectedUserProfile', JSON.stringify(selectedUserData));
      }
      
      // La navegación debe usar el formato exacto de la ruta en routes.jsx
      // Si en routes.jsx está definido como "/user-profile/:id"
      navigate(`/dashboard/user-profile/${selectedUser}`);
    } else {
      alert('Por favor, selecciona un usuario primero.');
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
          console.log("Intentando eliminar usuario con ID:", selectedUser);
          
          const response = await fetch(`http://localhost:4000/api/users/${selectedUser}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const data = await response.json();
          console.log("Respuesta del servidor:", data);

          if (data.success) {
            // Actualizar la lista de usuarios después de eliminar
            fetchUsers();
            // Reiniciar el usuario seleccionado
            setSelectedUser(null);
            alert('Usuario eliminado correctamente');
          } else {
            alert('Error al eliminar usuario: ' + (data.message || 'Error desconocido'));
          }
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          alert('Error al eliminar usuario: ' + (error.message || 'Error desconocido'));
        }
      }
    } else {
      alert('Por favor, selecciona un usuario primero.');
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-6">
      {/* Barra Superior - Similar a la de la imagen */}
      <Card className="bg-gray-900 shadow-lg rounded-lg">
        <CardBody className="p-4">
          <div className="flex justify-between items-center">
            <Typography variant="h5" color="white" className="font-bold">
              Usuarios
            </Typography>
            <div className="flex gap-4">
              <IconButton 
                variant="text" 
                color="white" 
                size="lg"
                onClick={handleViewUser}
                disabled={!selectedUser}
                className={!selectedUser ? "opacity-50 cursor-not-allowed" : ""}
              >
                <EyeIcon strokeWidth={2} className="h-6 w-6" />
              </IconButton>
              <IconButton 
                variant="text" 
                color="white" 
                size="lg"
                onClick={handleDeleteUser}
                disabled={!selectedUser}
                className={!selectedUser ? "opacity-50 cursor-not-allowed" : ""}
              >
                <TrashIcon strokeWidth={2} className="h-6 w-6" />
              </IconButton>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Encabezado con título, buscador y botón */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Lista de Usuarios
        </Typography>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex w-full max-w-[24rem]">
            <Input
              type="text"
              label="Buscar usuarios..."
              value={searchTerm}
              onChange={handleSearch}
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]"
              }}
            />
            <div className="!absolute right-1 top-1 rounded-lg">
              <IconButton variant="text" className="flex items-center rounded-lg">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
          
          <Button
            className="flex items-center gap-3 bg-blue-500"
            onClick={() => navigate('/dashboard/users/crear')}
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
            NUEVO USUARIO
          </Button>
        </div>
      </div>

      {/* Contador de resultados */}
      <Typography variant="paragraph" color="blue-gray" className="font-normal mb-2">
        Mostrando {filteredUsers.length} de {users.length} usuarios
      </Typography>

      {/* Tabla de Usuarios */}
      <Card className="overflow-hidden">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {["", "NOMBRE COMPLETO", "CORREO", "PUESTO", "TELÉFONO", "ROL"].map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => {
                const isLast = index === filteredUsers.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                const isAdmin = (user.role || "").toLowerCase().includes("admin");
                const nombreCompleto = `${user.prim_nom || ""} ${user.segun_nom || ""} ${user.apell_pa || ""} ${user.apell_ma || ""}`.trim();
                const avatarSrc = user.foto_perfil || "/img/user_icon.svg";

                return (
                  <tr 
                    key={user._id} 
                    className={`hover:bg-blue-gray-50 cursor-pointer ${selectedUser === user._id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleRowClick(user._id)}
                  >
                    <td className={classes}>
                      <Avatar
                        src={avatarSrc}
                        alt={nombreCompleto}
                        size="sm"
                        className="border border-blue-500"
                      />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {nombreCompleto}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.pust}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.telefono}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant={isAdmin ? "filled" : "outlined"}
                          value={capitalizeRole(user.role || 'Usuario')}
                          color={isAdmin ? "blue" : "blue-gray"}
                          className={isAdmin 
                            ? "bg-blue-500 text-white" 
                            : "border-blue-gray-500 text-blue-gray-500"}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    No se encontraron usuarios con los criterios de búsqueda.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default UsersTable; 