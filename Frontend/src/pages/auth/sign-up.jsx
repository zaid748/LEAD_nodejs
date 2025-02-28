import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  CardBody,
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
    role: "user"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    setError("");

    // Validar que todos los campos estén llenos
    for (const key in formData) {
      if (!formData[key]) {
        setError("Por favor, completa todos los campos.");
        return;
      }
    }

    try {
      const response = await axios.post('/api/signup', formData);

      if (response.data.success) {
        // Si estamos en dashboard, redirigir a la tabla de usuarios
        if (dashboard) {
          navigate('/dashboard/users');
        } else {
          // Comportamiento normal
          navigate('/auth/sign-in');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar usuario');
    }
  };

  if (isLoading) {
    return <div>Verificando autenticación...</div>;
  }

  if (!dashboard && !isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

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
              <Typography variant="h2" className="font-bold mb-4">Sign Up</Typography>
              <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to register.</Typography>
              {error && (
                <Typography color="red" className="mt-2">
                  {error}
                </Typography>
              )}
            </div>
            <form className="mt-8 mb-2 mx-auto w-full max-w-screen-lg lg:w-3/4" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Datos Personales
                </Typography>
                <Input
                  name="prim_nom"
                  size="lg"
                  placeholder="Primer nombre"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.prim_nom}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="segun_nom"
                  size="lg"
                  placeholder="Segundo nombre (opcional)"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.segun_nom}
                  onChange={handleChange}
                />
                <Input
                  name="apell_pa"
                  size="lg"
                  placeholder="Apellido paterno"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.apell_pa}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="apell_ma"
                  size="lg"
                  placeholder="Apellido materno"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.apell_ma}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="fecha_na"
                  type="date"
                  size="lg"
                  placeholder="Fecha de nacimiento"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.fecha_na}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="telefono"
                  size="lg"
                  placeholder="Teléfono"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Datos Laborales
                </Typography>
                <Input
                  name="pust"
                  size="lg"
                  placeholder="Puesto"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.pust}
                  onChange={handleChange}
                  required
                />

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Dirección
                </Typography>
                <Input
                  name="calle"
                  size="lg"
                  placeholder="Calle"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.calle}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="num_in"
                  size="lg"
                  placeholder="Número interior (opcional)"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.num_in}
                  onChange={handleChange}
                />
                <Input
                  name="nun_ex"
                  size="lg"
                  placeholder="Número exterior"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.nun_ex}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="codigo"
                  size="lg"
                  placeholder="Código postal"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                />

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Datos de Cuenta
                </Typography>
                <Input
                  name="email"
                  type="email"
                  size="lg"
                  placeholder="Email"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="Contraseña"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button 
                onClick={handleRegister}
                className="mt-6" 
                fullWidth
              >
                Register Now
              </Button>

              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                Already have an account?
                <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
              </Typography>
            </form>
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
          <Typography variant="h2" className="font-bold mb-4">Sign Up</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to register.</Typography>
          {error && (
            <Typography color="red" className="mt-2">
              {error}
            </Typography>
          )}
        </div>
        <form className="mt-8 mb-2 mx-auto w-full max-w-screen-lg lg:w-3/4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Datos Personales
            </Typography>
            <Input
              name="prim_nom"
              size="lg"
              placeholder="Primer nombre"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.prim_nom}
              onChange={handleChange}
              required
            />
            <Input
              name="segun_nom"
              size="lg"
              placeholder="Segundo nombre (opcional)"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.segun_nom}
              onChange={handleChange}
            />
            <Input
              name="apell_pa"
              size="lg"
              placeholder="Apellido paterno"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.apell_pa}
              onChange={handleChange}
              required
            />
            <Input
              name="apell_ma"
              size="lg"
              placeholder="Apellido materno"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.apell_ma}
              onChange={handleChange}
              required
            />
            <Input
              name="fecha_na"
              type="date"
              size="lg"
              placeholder="Fecha de nacimiento"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.fecha_na}
              onChange={handleChange}
              required
            />
            <Input
              name="telefono"
              size="lg"
              placeholder="Teléfono"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.telefono}
              onChange={handleChange}
              required
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Datos Laborales
            </Typography>
            <Input
              name="pust"
              size="lg"
              placeholder="Puesto"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.pust}
              onChange={handleChange}
              required
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Dirección
            </Typography>
            <Input
              name="calle"
              size="lg"
              placeholder="Calle"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.calle}
              onChange={handleChange}
              required
            />
            <Input
              name="num_in"
              size="lg"
              placeholder="Número interior (opcional)"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.num_in}
              onChange={handleChange}
            />
            <Input
              name="nun_ex"
              size="lg"
              placeholder="Número exterior"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.nun_ex}
              onChange={handleChange}
              required
            />
            <Input
              name="codigo"
              size="lg"
              placeholder="Código postal"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.codigo}
              onChange={handleChange}
              required
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Datos de Cuenta
            </Typography>
            <Input
              name="email"
              type="email"
              size="lg"
              placeholder="Email"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="Contraseña"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            onClick={handleRegister}
            className="mt-6" 
            fullWidth
          >
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
