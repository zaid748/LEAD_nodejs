import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
  Select,
  Option,
  Checkbox,
  Alert
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

export function EditarEmpleado() {
  const navigate = useNavigate();
  const { empleadoId } = useParams();
  const [formData, setFormData] = useState({
    prim_nom: "",
    segun_nom: "",
    apell_pa: "",
    apell_ma: "",
    pust: "",
    fecha_na: "",
    calle: "",
    num_in: "",
    nun_ex: "",
    codigo: "",
    telefono: "",
    email: "",
    salario: "",
    fecha_ing: "",
    estado: "Activo",
    userId: ""
  });
  
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log("ID del empleado en edición:", empleadoId);
    // Verificar si el usuario es admin
    checkAdminStatus();
    // Cargar datos del empleado
    fetchEmpleado();
  }, [empleadoId]);

  useEffect(() => {
    if (formData.userId && usuarios.length > 0) {
      // Verificar si el usuario existe en la lista
      const userExists = usuarios.some(u => u._id === formData.userId);
      
      if (!userExists) {
        // Si el usuario no está en la lista, cargarlo individualmente
        const fetchUsuario = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${formData.userId}`, {
              credentials: 'include'
            });
            const data = await response.json();
            
            if (data.success && data.user) {
              // Añadir el usuario a la lista si no existe
              setUsuarios(prev => {
                // Verificar si ya existe para evitar duplicados
                if (!prev.some(u => u._id === data.user._id)) {
                  return [...prev, data.user];
                }
                return prev;
              });
            }
          } catch (error) {
            console.error("Error al cargar usuario específico:", error);
          }
        };
        
        fetchUsuario();
      }
    }
  }, [formData.userId, usuarios]);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
        credentials: 'include'
      });
      
      const data = await response.json();
      console.log("Respuesta de verificación de admin:", data);
      
      if (data.authenticated || data.success) {
        const user = data.user || data;
        const userRole = user?.role || '';
        const admin = userRole.toLowerCase().includes('administrator') || 
                     userRole === 'Superadministrator';
        setIsAdmin(admin);
        
        // Si es admin, cargar la lista de usuarios
        if (admin) {
          fetchUsuarios();
        }
      }
    } catch (error) {
      console.error("Error al verificar permisos:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.users) {
        setUsuarios(data.users);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const fetchEmpleado = async () => {
    try {
      setFetchingData(true);
      console.log("Cargando datos del empleado ID:", empleadoId);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api/${empleadoId}`, {
        credentials: 'include'
      });
      
      const data = await response.json();
      console.log("Respuesta al cargar empleado:", data);
      
      if (data.success) {
        const empleado = data.empleado;
        
        // Formatear fechas para los campos de fecha en el formulario
        if (empleado.fecha_na && empleado.fecha_na.length > 10) {
          empleado.fecha_na = empleado.fecha_na.substring(0, 10);
        }
        
        if (empleado.fecha_ing && empleado.fecha_ing.length > 10) {
          empleado.fecha_ing = empleado.fecha_ing.substring(0, 10);
        }
        
        console.log("Datos del empleado cargados:", empleado);
        setFormData(empleado);
      } else {
        setError("No se pudo cargar la información del empleado");
      }
    } catch (error) {
      console.error("Error al cargar datos del empleado:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setFetchingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log("Enviando datos actualizados:", formData);
      
      // Guardar datos del empleado
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api/${empleadoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log("Respuesta al actualizar empleado:", data);
      
      // Si se actualizó el empleado correctamente y se cambió el usuario asociado
      if (data.success && formData.userId) {
        // Actualizar la asociación de usuario-empleado si hay un usuario seleccionado
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${formData.userId}/asociar-empleado`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ empleado_id: empleadoId })
        });
        
        const userData = await userResponse.json();
        console.log("Respuesta al asociar usuario:", userData);
      }
      
      setSuccess(true);
      // Esperar un momento para mostrar el mensaje de éxito antes de redirigir
      setTimeout(() => {
        navigate(`/dashboard/empleados/profile/${empleadoId}`);
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      setError("Error al guardar los datos. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const validarFormulario = () => {
    // Eliminar la validación obligatoria del email
    if (!formData.prim_nom || !formData.apell_pa || !formData.telefono) {
      setError("Por favor completa todos los campos obligatorios");
      return false;
    }
    return true;
  };

  return (
    <div className="mx-auto my-8 max-w-5xl px-4">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 grid h-20 place-items-center">
          <Typography variant="h3" color="white">
            {fetchingData ? "Cargando..." : "Editar Empleado"}
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {error && (
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert color="green" className="mb-4">
              Empleado actualizado correctamente.
            </Alert>
          )}
          
          {fetchingData ? (
            <div className="text-center py-12">
              <Typography variant="h6" color="blue-gray">
                Cargando información del empleado...
              </Typography>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Información Personal
                </Typography>
                
                <Input
                  type="text"
                  label="Primer Nombre"
                  name="prim_nom"
                  value={formData.prim_nom}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  type="text"
                  label="Segundo Nombre"
                  name="segun_nom"
                  value={formData.segun_nom || ""}
                  onChange={handleChange}
                />
                
                <Input
                  type="text"
                  label="Apellido Paterno"
                  name="apell_pa"
                  value={formData.apell_pa}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  type="text"
                  label="Apellido Materno"
                  name="apell_ma"
                  value={formData.apell_ma}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  type="date"
                  label="Fecha de Nacimiento"
                  name="fecha_na"
                  value={formData.fecha_na}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  name="email"
                  type="email"
                  size="lg"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.email}
                  onChange={handleChange}
                  label="Correo electrónico (opcional)"
                />
                
                <Input
                  type="tel"
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-4">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Información Laboral
                </Typography>
                
                <Input
                  type="text"
                  label="Puesto"
                  name="pust"
                  value={formData.pust}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  type="number"
                  label="Salario"
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  type="date"
                  label="Fecha de Ingreso"
                  name="fecha_ing"
                  value={formData.fecha_ing}
                  onChange={handleChange}
                  required
                />
                
                <Select
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={(value) => handleSelectChange("estado", value)}
                  required
                >
                  <Option value="Activo">Activo</Option>
                  <Option value="Inactivo">Inactivo</Option>
                </Select>
                
                <Typography variant="h6" color="blue-gray" className="mb-3 mt-6">
                  Dirección
                </Typography>
                
                <Input
                  type="text"
                  label="Calle"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="Número Exterior"
                    name="nun_ex"
                    value={formData.nun_ex}
                    onChange={handleChange}
                    required
                  />
                  
                  <Input
                    type="text"
                    label="Número Interior"
                    name="num_in"
                    value={formData.num_in || ""}
                    onChange={handleChange}
                  />
                </div>
                
                <Input
                  type="text"
                  label="Código Postal"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                />
                
                <div className="mt-6">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Asociar con Usuario
                  </Typography>
                  
                  <label className="text-sm text-blue-gray-700 font-medium">
                    Usuario
                  </label>
                  
                  <div className="relative">
                    <select
                      value={formData.userId || ""}
                      onChange={(e) => handleSelectChange("userId", e.target.value)}
                      className="w-full h-11 px-3 py-2 border border-blue-gray-200 rounded-lg bg-white text-blue-gray-700 outline-none focus:border-gray-900 transition-all"
                    >
                      <option value="">Ninguno</option>
                      {usuarios.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.prim_nom} {user.apell_pa} ({user.email})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                  
                  {formData.userId && (
                    <Typography variant="small" color="blue-gray" className="mt-2">
                      Usuario seleccionado: {
                        usuarios.find(u => u._id === formData.userId)?.email || 
                        "Cargando información del usuario..."
                      }
                    </Typography>
                  )}
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
                <Button
                  color="red"
                  onClick={() => navigate(`/dashboard/empleados/profile/${empleadoId}`)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="blue"
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "Actualizar Empleado"}
                </Button>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default EditarEmpleado; 