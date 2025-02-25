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
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";

export function ProfileUsers() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Intentar obtener datos del sessionStorage primero
    const storedUserData = sessionStorage.getItem('selectedUserProfile');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setLoading(false);
    } else {
      // Si no hay datos en sessionStorage, obtenerlos de la API
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setUserData(data.user);
      } else {
        console.error("Error al obtener datos del usuario");
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard/users');
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
          <div className="w-6"></div> {/* Elemento vacío para mantener el equilibrio */}
        </CardHeader>
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/team-1.jpeg"
                alt={nombreCompleto}
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
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
            <div className="w-96">
              <Tabs value="perfil">
                <TabsHeader>
                  <Tab value="perfil">
                    <UserCircleIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Perfil
                  </Tab>
                  <Tab value="contacto">
                    <PhoneIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Contacto
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 px-4 md:grid-cols-2">
            <ProfileInfoCard
              title="Información Personal"
              details={{
                "Nombre Completo": nombreCompleto,
                "Puesto": userData.pust,
                "Fecha de Nacimiento": userData.fecha_na,
                "Correo Electrónico": userData.email,
                "Dirección": direccionCompleta,
                "Teléfono": userData.telefono
              }}
              action={
                <Tooltip content="Editar Perfil">
                  <Button 
                    size="sm" 
                    variant="outlined"
                    onClick={() => navigate(`/dashboard/users/edit/${userId}`)}
                  >
                    Editar
                  </Button>
                </Tooltip>
              }
            />
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Detalles Adicionales
              </Typography>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                  <div className="rounded-lg bg-gray-900/10 p-2">
                    <IdentificationIcon className="h-6 w-6 text-blue-gray-700" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Rol
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {userData.role || 'Usuario'}
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                  <div className="rounded-lg bg-gray-900/10 p-2">
                    <EnvelopeIcon className="h-6 w-6 text-blue-gray-700" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Correo Electrónico
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {userData.email}
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                  <div className="rounded-lg bg-gray-900/10 p-2">
                    <PhoneIcon className="h-6 w-6 text-blue-gray-700" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Teléfono
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {userData.telefono}
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                  <div className="rounded-lg bg-gray-900/10 p-2">
                    <MapPinIcon className="h-6 w-6 text-blue-gray-700" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Dirección
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {direccionCompleta}
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 border rounded-lg border-blue-gray-100">
                  <div className="rounded-lg bg-gray-900/10 p-2">
                    <CalendarDaysIcon className="h-6 w-6 text-blue-gray-700" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Fecha de Nacimiento
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {userData.fecha_na}
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