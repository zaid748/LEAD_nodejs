import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

export function CrearNomina() {
  const navigate = useNavigate();
  const { empleadoId } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [empleadoData, setEmpleadoData] = useState(null);
  
  const [formData, setFormData] = useState({
    empleadoId: empleadoId,
    empleado: "",
    salario: "",
    fecha: "",
    concepto: ""
  });

  // Verificar permisos de administrador
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/check-auth', {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          const user = data.user;
          const userRole = user?.role || '';
          
          const admin = userRole.toLowerCase().includes('administrator') || 
                        userRole === 'Superadministrator';
          
          setIsAdmin(admin);
          
          // Redirigir si no es administrador
          if (!admin) {
            navigate('/dashboard/home');
          }
        } else {
          navigate('/dashboard/home');
        }
      } catch (error) {
        console.error("Error al verificar permisos:", error);
        navigate('/dashboard/home');
      }
    };
    
    checkAdminAccess();
  }, [navigate]);

  // Cargar datos del empleado
  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/empleados-api/${empleadoId}`, {
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
          setEmpleadoData(data.empleado);
          // Actualizar el nombre completo en el formulario
          const nombreCompleto = `${data.empleado.prim_nom} ${data.empleado.segun_nom} ${data.empleado.apell_pa} ${data.empleado.apell_ma}`.trim();
          setFormData(prev => ({
            ...prev,
            empleado: nombreCompleto,
            salario: data.empleado.salario || ""
          }));
        } else {
          setError("No se pudo cargar la información del empleado");
        }
      } catch (error) {
        console.error("Error al cargar empleado:", error);
        setError("Error al cargar la información del empleado");
      }
    };
    
    if (empleadoId) {
      fetchEmpleado();
    }
  }, [empleadoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Crear un objeto con los datos en el formato esperado por el servidor
      const params = new URLSearchParams();
      params.append('empleadoId', formData.empleadoId);
      params.append('empleado', formData.empleado);
      params.append('salario', formData.salario);
      params.append('fecha', formData.fecha);
      params.append('conceptoDePago', formData.concepto); // Usar el nombre exacto que espera el modelo
      
      console.log("Enviando datos como application/x-www-form-urlencoded");
      
      const response = await fetch(`/api/CrearNomina/${empleadoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: params,
      });
      
      console.log("Respuesta del servidor:", response.status, response.statusText);
      
      if (response.redirected) {
        const redirectUrl = response.url.replace('http://localhost:4000', '/dashboard');
        navigate(redirectUrl);
        return;
      }
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/dashboard/empleado-profile/${empleadoId}`);
        }, 2000);
      } else {
        try {
          const data = await response.json();
          setError(data.message || `Error al crear la nómina. Estado: ${response.status}`);
        } catch {
          const text = await response.text();
          console.error("Error response:", text);
          setError(`Error al crear la nómina. Estado: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error al crear nómina:", error);
      setError("Error al crear la nómina. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!empleadoData) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography>Cargando información del empleado...</Typography>
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 max-w-4xl px-4">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 grid h-20 place-items-center">
          <Typography variant="h3" color="white">
            Crear Nueva Nómina
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
              Nómina creada correctamente. Redirigiendo...
            </Alert>
          )}
          
          <div className="mb-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Empleado: <span className="font-normal">{formData.empleado}</span>
            </Typography>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Información de Pago
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  label="Fecha de Pago"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mt-4">
                <Textarea
                  label="Concepto de Pago"
                  name="concepto"
                  value={formData.concepto}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button
                color="red"
                onClick={() => navigate(`/dashboard/empleado-profile/${empleadoId}`)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="blue"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear Nómina"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CrearNomina; 