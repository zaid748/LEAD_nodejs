import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// Configuración global de axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        if (response.data.success) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setError("");

    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post('/api/signin', formData);

      if (response.data.success) {
        navigate('/dashboard/home');
      }
    } catch (error) {
      setError("El correo o la contraseña son incorrectos.");
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return (
    <section className="m-8 flex gap-4 bg-[#e7efe0] items-center justify-center">
      <div className="w-full lg:w-2/4 mt-20 mb-20 overflow-hidden rounded-3xl" 
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
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
          {error && (
            <Typography color="red" className="mt-2">
              {error}
            </Typography>
          )}
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-3/4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              name="email"
              size="lg"
              placeholder="name@mail.com"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button 
            onClick={handleLogin} 
            className="mt-6" 
            fullWidth
          >
            Sign In
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
