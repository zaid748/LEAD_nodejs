import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {
  HomeIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ArrowLeftIcon,
  PencilIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import axios from "axios";

export function ProfileUsers() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Obteniendo datos del usuario con ID:", userId);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          withCredentials: true
        });
        
        if (response.data.success) {
          let userData = response.data.user;
          
          // Procesar la foto de perfil normalmente
          if (userData.foto_perfil) {
            console.log("=== CARGA DE FOTO DE PERFIL EN PROFILEUSERS ===");
            console.log("Ruta en BD:", userData.foto_perfil);
            
            // Construir URL completa
            let photoUrl = userData.foto_perfil;
            if (!photoUrl.startsWith('http')) {
              photoUrl = `${import.meta.env.VITE_API_URL}${photoUrl}`;
            }
            
            console.log("URL construida:", photoUrl);
            
            // Usar la URL directamente sin procesamiento complejo
            userData.foto_perfil_url = photoUrl;
            console.log("✅ Foto de perfil configurada:", photoUrl);
          } else {
            console.log("ℹ️ Usuario no tiene foto de perfil configurada");
          }
          
          setUserData(userData);
        } else {
          console.error("No se pudieron cargar los datos del usuario");
        }
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleGoBack = () => {
    navigate('/dashboard/users');
  };

  const handleEdit = () => {
    navigate(`/dashboard/users/edit/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="h6" color="blue-gray">
          Cargando información del usuario...
        </Typography>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="h6" color="red">
          No se pudo cargar la información del usuario
        </Typography>
      </div>
    );
  }

  const nombreCompleto = `${userData.prim_nom} ${userData.segun_nom || ''} ${userData.apell_pa} ${userData.apell_ma}`.trim();
  const direccionCompleta = `${userData.calle} ${userData.nun_ex}, ${userData.nun_in ? 'Int. ' + userData.nun_in + ', ' : ''}CP ${userData.codigo}`;

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardHeader className="p-4 flex items-center justify-between">
          <IconButton 
            variant="text" 
            color="blue-gray" 
            onClick={handleGoBack}
            className="ml-2"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
          <Typography variant="h5" color="blue-gray">
            Información del Usuario
          </Typography>
          <Button
            color="blue"
            size="sm"
            variant="outlined"
            className="flex items-center gap-2"
            onClick={handleEdit}
          >
            <PencilIcon className="h-4 w-4" /> Editar
          </Button>
        </CardHeader>
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={userData.foto_perfil_url || userData.foto_perfil || "/img/user_icon.svg"}
                alt={nombreCompleto}
                size="xxl"
                className="border border-blue-500 shadow-xl shadow-blue-900/20"
                onError={(e) => {
                  console.error('❌ Error al cargar imagen de perfil en ProfileUsers:', userData.foto_perfil_url);
                  console.error('Elemento de imagen:', e.target);
                  console.error('Tipo de URL:', userData.foto_perfil_url?.startsWith('data:') ? 'base64' : 'URL directa');
                  
                  // Si es base64 y falla, intentar recargar
                  if (userData.foto_perfil_url?.startsWith('data:')) {
                    console.log('🔄 Reintentando carga de base64 en ProfileUsers...');
                    // Forzar recarga después de un breve delay
                    setTimeout(() => {
                      e.target.src = userData.foto_perfil_url;
                    }, 1000);
                  } else {
                    // Fallback a imagen por defecto para URLs directas
                    e.target.src = '/img/user_icon.svg';
                  }
                }}
                onLoad={() => {
                  console.log('✅ Imagen de perfil cargada exitosamente en ProfileUsers:', userData.foto_perfil_url);
                  console.log('Tipo de carga:', userData.foto_perfil_url?.startsWith('data:') ? 'base64' : 'URL directa');
                }}
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {nombreCompleto}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {userData.pust}
                </Typography>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 px-4 md:grid-cols-2">
            {/* Información Personal en formato de tarjetas */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Información Personal
              </Typography>

              <div className="space-y-6">
                {/* Nombre Completo */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <UserCircleIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Nombre Completo
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {nombreCompleto}
                    </Typography>
                  </div>
                </div>

                {/* Puesto */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <BriefcaseIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Puesto
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {userData.pust}
                    </Typography>
                  </div>
                </div>

                {/* Fecha de Nacimiento */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <CalendarDaysIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Fecha de Nacimiento
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {userData.fecha_na}
                    </Typography>
                  </div>
                </div>

                {/* Dirección */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Dirección
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {direccionCompleta}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles Adicionales */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" color="blue-gray">
                  Detalles Adicionales
                </Typography>
              </div>

              <div className="space-y-6">
                {/* Rol */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <IdentificationIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Rol
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : 'Usuario'}
                    </Typography>
                  </div>
                </div>

                {/* Correo Electrónico */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <EnvelopeIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Correo Electrónico
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {userData.email}
                    </Typography>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <PhoneIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Teléfono
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {userData.telefono}
                    </Typography>
                  </div>
                </div>

                {/* Empleado Vinculado */}
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-blue-gray-100">
                  <div className="bg-blue-gray-50 p-3 rounded-lg">
                    <BriefcaseIcon className="h-6 w-6 text-blue-gray-500" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Empleado Vinculado
                    </Typography>
                    <Typography variant="small" className="font-normal">
                      {userData.empleado_id ? (
                        <Button 
                          size="sm" 
                          variant="text" 
                          className="p-0 lowercase" 
                          onClick={() => navigate(`/dashboard/empleado-profile/${userData.empleado_id}`)}
                        >
                          Ver empleado
                        </Button>
                      ) : "No vinculado a empleado"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ProfileUsers; 