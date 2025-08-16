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
import { useNavigate } from "react-router-dom";

export function CrearEmpleado() {
  const navigate = useNavigate();
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es admin
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.authenticated) {
          const userRole = data.user?.role || '';
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
    
    checkAdminStatus();
  }, []);

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard/empleados');
        }, 1500);
      } else {
        setError(data.message || "Error al crear el empleado");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Crear Nuevo Empleado
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
              Empleado creado exitosamente. Redirigiendo...
            </Alert>
          )}
          
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
                value={formData.segun_nom}
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
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Número Exterior"
                  name="nun_ex"
                  value={formData.nun_ex}
                  onChange={handleChange}
                />
                
                <Input
                  type="text"
                  label="Número Interior"
                  name="num_in"
                  value={formData.num_in}
                  onChange={handleChange}
                />
              </div>
              
              <Input
                type="text"
                label="Código Postal"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
              />
              
              {isAdmin && (
                <div className="mt-6">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Asociar con Usuario
                  </Typography>
                  <Select
                    label="Usuario"
                    value={formData.userId}
                    onChange={(value) => handleSelectChange("userId", value)}
                  >
                    <Option value="">Ninguno</Option>
                    {usuarios.map((user) => (
                      <Option key={user._id} value={user._id}>
                        {user.prim_nom} {user.apell_pa} ({user.email})
                      </Option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
            
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
              <Button
                color="red"
                onClick={() => navigate('/dashboard/empleados')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="blue"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar Empleado"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CrearEmpleado; 