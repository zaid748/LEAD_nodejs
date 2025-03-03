import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  CardBody,
  Select,
  Option,
  Spinner
} from "@material-tailwind/react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// Configuración global de axios
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export function SignUp({ dashboard = false }) {
  const [formData, setFormData] = useState({
    prim_nom: "",
    segun_nom: "",
    apell_pa: "",
    apell_ma: "",
    fecha_na: "",
    pust: "",
    calle: "",
    num_in: "",
    nun_ex: "",
    codigo: "",
    telefono: "",
    email: "",
    password: "",
    role: "user",
    empleado_id: "" // Nuevo campo para asociar con empleado existente
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [loadingEmpleados, setLoadingEmpleados] = useState(false);
  const [useExistingEmployee, setUseExistingEmployee] = useState(true); // Estado para cambiar entre usar empleado existente o crear nuevo
  const navigate = useNavigate();
  const { login } = useAuth();

  // Cargar la lista de empleados
  useEffect(() => {
    const fetchEmpleados = async () => {
      if (dashboard) {
        try {
          setLoadingEmpleados(true);
          console.log("Solicitando empleados...");
          
          // Actualizar a una ruta que sabemos que funciona (basado en el código)
          const response = await axios.get('/api/empleados-api');
          console.log("Respuesta completa:", response);
          
          if (response.data && response.data.success) {
            console.log("Número de empleados:", response.data.count || 'no especificado');
            console.log("Primer empleado:", response.data.empleados[0]);
            setEmpleados(response.data.empleados || []);
          } else {
            console.error("Error en la respuesta:", response.data);
            setEmpleados([]);
          }
        } catch (error) {
          console.error("Error al cargar empleados:", error);
          console.error("Detalles:", error.response?.data || error.message);
          setEmpleados([]);
        } finally {
          setLoadingEmpleados(false);
        }
      }
    };

    fetchEmpleados();
  }, [dashboard]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/check-auth');
        
        // Si está en dashboard, verificar que sea admin
        if (dashboard) {
          if (response.data.success) {
            const user = response.data.user;
            const userRole = user?.role || '';
            
            const isAdmin = userRole.toLowerCase().includes('administrator') || 
                          userRole === 'Superadministrator';
            
            // Si no es admin, redirigir al home
            if (!isAdmin) {
              navigate('/dashboard/home');
            }
            
            setIsAuthenticated(true); // Es admin, permitir acceso
          } else {
            navigate('/auth/sign-in'); // No autenticado, redirigir a login
          }
        } 
        // Para uso normal de registro (no dashboard)
        else if (!response.data.success) {
          // No está autenticado y es la página normal de registro
          setIsAuthenticated(false);
        } else {
          // Ya está autenticado, no necesita registro
          navigate('/dashboard/home');
        }
      } catch (error) {
        if (dashboard) {
          navigate('/dashboard/home');
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate, dashboard]);

  useEffect(() => {
    console.log("Empleados cargados:", empleados);
  }, [empleados]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleEmpleadoChange = async (empleadoId) => {
    console.log("Empleado seleccionado ID:", empleadoId);
    
    // Limpiar el error al cambiar de empleado
    setError("");
    
    // Si se seleccionó un empleado, buscar sus datos para prellenar el formulario
    if (empleadoId) {
      try {
        // Obtener datos completos del empleado directamente de la API
        const response = await axios.get(`/api/empleados-api/${empleadoId}`);
        
        if (response.data && response.data.success) {
          const selectedEmpleado = response.data.empleado;
          console.log("Datos completos del empleado:", selectedEmpleado);
          
          // Formatear la fecha si es necesario
          let fechaNacimiento = selectedEmpleado.fecha_na || "";
          
          // Si la fecha viene en formato dd/mm/yyyy, convertirla a yyyy-mm-dd para el input date
          if (fechaNacimiento && fechaNacimiento.includes('/')) {
            const parts = fechaNacimiento.split('/');
            if (parts.length === 3) {
              fechaNacimiento = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
          }
          
          // Asegurarnos de que todos los campos obligatorios estén presentes
          const updatedFormData = {
            ...formData,
            empleado_id: empleadoId,
            prim_nom: selectedEmpleado.prim_nom || "",
            segun_nom: selectedEmpleado.segun_nom || "",
            apell_pa: selectedEmpleado.apell_pa || "",
            apell_ma: selectedEmpleado.apell_ma || "",
            fecha_na: fechaNacimiento || new Date().toISOString().split('T')[0], // Default a hoy si no hay fecha
            pust: selectedEmpleado.pust || "",
            telefono: selectedEmpleado.telefono || "",
            calle: selectedEmpleado.calle || "Sin especificar", // Valor por defecto
            num_in: selectedEmpleado.num_in || "",
            nun_ex: selectedEmpleado.nun_ex || "S/N", // Valor por defecto
            codigo: selectedEmpleado.codigo || "00000" // Valor por defecto
          };
          
          setFormData(updatedFormData);
          console.log("Formulario actualizado con datos completos:", updatedFormData);
        }
      } catch (error) {
        console.error("Error al obtener datos del empleado:", error);
        // Continuar con los datos básicos del empleado
        const basicEmpleado = empleados.find(emp => emp._id === empleadoId);
        if (basicEmpleado) {
          // Lógica similar pero con datos básicos...
        }
      }
    } else {
      // Si se deselecciona el empleado, mantener solo email, password y role
      const { email, password, role } = formData;
      setFormData({
        prim_nom: "",
        segun_nom: "",
        apell_pa: "",
        apell_ma: "",
        fecha_na: "",
        pust: "",
        calle: "",
        num_in: "",
        nun_ex: "",
        codigo: "",
        telefono: "",
        email,
        password,
        role,
        empleado_id: ""
      });
    }
  };

  const toggleEmployeeMode = () => {
    setUseExistingEmployee(!useExistingEmployee);
    // Reset form data when switching modes
    const { email, password, role } = formData;
    setFormData({
      prim_nom: "",
      segun_nom: "",
      apell_pa: "",
      apell_ma: "",
      fecha_na: "",
      pust: "",
      calle: "",
      num_in: "",
      nun_ex: "",
      codigo: "",
      telefono: "",
      email,
      password,
      role,
      empleado_id: ""
    });
  };

  const handleRegister = async () => {
    try {
      setError("");
      
      // Verificar que todos los campos requeridos estén presentes
      console.log("Datos a enviar:", formData); // Para depuración
      
      // Comprobar campos obligatorios
      if (!formData.prim_nom || !formData.apell_pa || !formData.apell_ma || 
          !formData.fecha_na || !formData.pust || !formData.calle || 
          !formData.nun_ex || !formData.codigo || !formData.telefono || 
          !formData.email || !formData.password) {
        setError("Por favor complete todos los campos obligatorios.");
        return;
      }
      
      // Realizar la solicitud de registro
      const response = await axios.post('/api/signup', formData);
      
      if (response.data.success) {
        if (dashboard) {
          // Si estamos en dashboard, mostrar mensaje de éxito
          setFormData({
            prim_nom: "",
            segun_nom: "",
            apell_pa: "",
            apell_ma: "",
            fecha_na: "",
            pust: "",
            calle: "",
            num_in: "",
            nun_ex: "",
            codigo: "",
            telefono: "",
            email: "",
            password: "",
            role: "user",
            empleado_id: ""
          });
          alert("Usuario creado exitosamente");
        } else {
          // Si es registro normal, iniciar sesión automáticamente
          const loginSuccess = await login({
            email: formData.email,
            password: formData.password
          });
          
          if (loginSuccess) {
            navigate('/dashboard/home');
          }
        }
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(error.response?.data?.message || "Error durante el registro");
    }
  };

  if (isLoading) {
    return <div>Verificando autenticación...</div>;
  }

  if (!dashboard && !isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // Componente de descripción de campo
  const FieldDescription = ({ children }) => (
    <Typography variant="small" color="gray" className="mt-1 text-xs">
      {children}
    </Typography>
  );

  const renderForm = () => (
    <form className="mt-8 mb-2 mx-auto w-full max-w-screen-lg lg:w-3/4" onSubmit={(e) => e.preventDefault()}>
      {dashboard && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" color="blue-gray">
              Datos del Usuario
            </Typography>
            
            <Button 
              variant="text" 
              color={useExistingEmployee ? "blue" : "gray"}
              onClick={toggleEmployeeMode}
              className="flex items-center gap-2"
            >
              {useExistingEmployee ? "Crear usuario sin empleado" : "Usar empleado existente"}
            </Button>
          </div>
          
          {useExistingEmployee ? (
            <div className="mb-6">
              <Typography variant="h6" color="blue-gray" className="mb-3 font-medium">
                Asociar con Empleado Existente
              </Typography>
              
              {loadingEmpleados ? (
                <div className="flex flex-col items-center py-4">
                  <Spinner className="h-8 w-8 mb-2" />
                  <Typography color="gray">Cargando empleados...</Typography>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="text-sm text-blue-gray-700 font-medium">
                    Seleccionar Empleado *
                  </label>
                  
                  <div className="relative">
                    <select
                      value={formData.empleado_id}
                      onChange={(e) => handleEmpleadoChange(e.target.value)}
                      className="w-full h-11 px-3 py-2 border border-blue-gray-200 rounded-lg bg-white text-blue-gray-700 outline-none focus:border-gray-900 transition-all"
                    >
                      <option value="">Seleccione un empleado</option>
                      {empleados && empleados.length > 0 ? (
                        empleados.map(empleado => (
                          <option key={empleado._id} value={empleado._id}>
                            {`${empleado.prim_nom || 'Sin nombre'} ${empleado.apell_pa || ''} - ${empleado.pust || 'Sin puesto'}`}
                          </option>
                        ))
                      ) : (
                        <option disabled value="">No hay empleados disponibles</option>
                      )}
                    </select>
                    <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                  
                  <FieldDescription>
                    {empleados && empleados.length > 0 
                      ? "Al seleccionar un empleado existente, se completarán automáticamente los datos personales" 
                      : "No se encontraron empleados registrados en el sistema"}
                  </FieldDescription>
                </div>
              )}
      </div>
          ) : (
            <Typography variant="paragraph" color="gray" className="mb-4">
              Creando un usuario sin asociación a empleado existente
            </Typography>
          )}
        </div>
      )}

          <div className="mb-1 flex flex-col gap-6">
        {(!useExistingEmployee || !dashboard) && (
          <>
            <Typography variant="h6" color="blue-gray" className="mb-3 font-medium">
              Datos Personales
            </Typography>
            <div>
              <Input
                name="prim_nom"
                size="lg"
                placeholder="Primer nombre"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.prim_nom}
                onChange={handleChange}
                required
                label="Primer nombre *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Nombre principal del usuario</FieldDescription>
            </div>
            
            <div>
              <Input
                name="segun_nom"
                size="lg"
                placeholder="Segundo nombre (opcional)"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.segun_nom}
                onChange={handleChange}
                label="Segundo nombre"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Si tiene un segundo nombre (opcional)</FieldDescription>
            </div>
            
            <div>
              <Input
                name="apell_pa"
                size="lg"
                placeholder="Apellido paterno"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.apell_pa}
                onChange={handleChange}
                required
                label="Apellido paterno *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Primer apellido del usuario</FieldDescription>
            </div>
            
            <div>
              <Input
                name="apell_ma"
                size="lg"
                placeholder="Apellido materno"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.apell_ma}
                onChange={handleChange}
                required
                label="Apellido materno *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Segundo apellido del usuario</FieldDescription>
            </div>
            
            <div>
              <Input
                name="fecha_na"
                type="date"
                size="lg"
                placeholder="Fecha de nacimiento"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.fecha_na}
                onChange={handleChange}
                required
                label="Fecha de nacimiento *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Fecha de nacimiento en formato DD/MM/AAAA</FieldDescription>
            </div>
            
            <div>
              <Input
                name="telefono"
                size="lg"
                placeholder="Teléfono"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.telefono}
                onChange={handleChange}
                required
                label="Teléfono *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Número de teléfono con formato de 10 dígitos</FieldDescription>
            </div>

            <Typography variant="h6" color="blue-gray" className="mt-4 mb-3 font-medium">
              Datos Laborales
            </Typography>
            
            <div>
              <Input
                name="pust"
                size="lg"
                placeholder="Puesto"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.pust}
                onChange={handleChange}
                required
                label="Puesto o cargo *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Puesto o cargo que ocupa en la empresa</FieldDescription>
            </div>

            <Typography variant="h6" color="blue-gray" className="mt-4 mb-3 font-medium">
              Dirección
            </Typography>
            
            <div>
              <Input
                name="calle"
                size="lg"
                placeholder="Calle"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.calle}
                onChange={handleChange}
                required
                label="Calle *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Nombre de la calle donde reside</FieldDescription>
            </div>
            
            <div>
              <Input
                name="num_in"
                size="lg"
                placeholder="Número interior (opcional)"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.num_in}
                onChange={handleChange}
                label="Número interior"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Número interior del domicilio (si aplica)</FieldDescription>
            </div>
            
            <div>
              <Input
                name="nun_ex"
                size="lg"
                placeholder="Número exterior"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.nun_ex}
                onChange={handleChange}
                required
                label="Número exterior *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Número exterior del domicilio</FieldDescription>
            </div>
            
            <div>
            <Input
                name="codigo"
              size="lg"
                placeholder="Código postal"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.codigo}
                onChange={handleChange}
                required
                label="Código postal *"
                disabled={useExistingEmployee && formData.empleado_id}
              />
              <FieldDescription>Código postal de 5 dígitos</FieldDescription>
          </div>
          </>
       )}

        <Typography variant="h6" color="blue-gray" className="mt-4 mb-3 font-medium">
          Datos de Cuenta
              </Typography>
        
        <div>
          <Input
            name="email"
            type="email"
            size="lg"
            placeholder="Email"
            className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            value={formData.email}
            onChange={handleChange}
            required
            label="Correo electrónico *"
          />
          <FieldDescription>Dirección de correo electrónico para acceso al sistema</FieldDescription>
        </div>
        
        <div>
          <Input
            name="password"
            type="password"
            size="lg"
            placeholder="Contraseña"
            className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            value={formData.password}
            onChange={handleChange}
            required
            label="Contraseña *"
          />
          <FieldDescription>Contraseña segura de al menos 8 caracteres</FieldDescription>
        </div>
        
        <div className="mb-4">
          <Select
            label="Rol de usuario *"
            value={formData.role}
            onChange={handleRoleChange}
            className="bg-white"
          >
            <Option value="user">Usuario regular</Option>
            <Option value="administrator">Administrador (Acceso completo)</Option>
            <Option value="administrador">Administrador de sistema</Option>
            <Option value="supervisor de obra">Supervisor de obra</Option>
            <Option value="ayudante de administrador">Ayudante de administrador</Option>
          </Select>
          <FieldDescription>Nivel de acceso y permisos en el sistema</FieldDescription>
        </div>
      </div>
      
      <div className="mt-6">
        <Typography variant="small" color="gray" className="flex items-center justify-center gap-1 font-normal mb-4">
          <span className="text-red-500">*</span> Campos obligatorios
        </Typography>
        
        <Button 
          onClick={handleRegister}
          className="mt-2" 
          fullWidth
          color="blue"
        >
          Registrar Nuevo Usuario
        </Button>
      </div>

      {!dashboard && (
        <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
          ¿Ya tienes una cuenta?
          <Link to="/auth/sign-in" className="text-blue-500 ml-1">Iniciar sesión</Link>
        </Typography>
      )}

      {/* Botón de depuración (solo visible en desarrollo) */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="mt-4">
          <Button 
            size="sm" 
            color="gray" 
            className="mt-2" 
            onClick={() => console.log("Estado actual del formulario:", formData)}
          >
            Debug Form State
          </Button>
        </div>
      )}

      {formData.empleado_id && (
        <Button
          size="sm"
          color="light-blue"
          className="mt-2"
          onClick={async () => {
            // Volver a cargar los datos del empleado seleccionado
            if (formData.empleado_id) {
              await handleEmpleadoChange(formData.empleado_id);
            }
          }}
        >
          Cargar todos los datos del empleado
            </Button>
      )}
    </form>
  );

  if (dashboard) {
    return (
      <div className="mx-auto my-10 max-w-4xl px-4">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-4 grid h-20 place-items-center">
            <Typography variant="h3" color="white">
              Crear Nuevo Usuario
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="text-center lg:w-3/4 mx-auto">
              {error && (
                <Typography color="red" className="mt-2 mb-4 p-2 bg-red-50 rounded">
                  {error}
                </Typography>
              )}
            </div>
            {renderForm()}
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <section className="m-8 flex gap-4 bg-[#e7efe0] items-center justify-center">
      <div className="lg:w-2/4 ml-10 mt-20 mb-20 overflow-hidden rounded-3xl" 
           style={{ 
             position: 'relative',
             minHeight: '400px',
             maxWidth: '550px',
             marginRight: '40px',
           }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/img/leadimagen.jpeg)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '24px'
          }}
        />
          </div>

      <div className="w-full lg:w-2/4 mt-20 mb-20">
        <div className="text-center lg:w-3/4 mx-auto">
          <Typography variant="h2" className="font-bold mb-4">Registro de Usuario</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Complete todos los campos para crear una cuenta.</Typography>
          {error && (
            <Typography color="red" className="mt-2 p-2 bg-red-50 rounded">
              {error}
          </Typography>
          )}
        </div>
        {renderForm()}
      </div>
    </section>
  );
}

export default SignUp;
