import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Button,
  Spinner,
  Input,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  CurrencyDollarIcon,
  IdentificationIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "@/context/AuthContext";

export function Profile() {
  const { user, isAuthenticated, loading: authLoading, authChecked, refreshAuthStatus } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("/img/user_icon.svg");
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const fileInputRef = useRef(null);
  const [nominas, setNominas] = useState([]);
  const [activeTab, setActiveTab] = useState("perfil");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Estado de autenticación en Profile:", { 
        authLoading, 
        isAuthenticated, 
        authChecked,
        user: user ? "existe" : "no existe" 
      });
      
      if (authChecked && !authLoading && !user) {
        console.log("No hay usuario pero auth ya se verificó, intentando refrescar...");
        const refreshedUser = await refreshAuthStatus();
        
        if (!refreshedUser) {
          console.log("No se pudo obtener usuario después de refrescar");
          setLoading(false);
          return;
        }
      }
      
      if (user && isAuthenticated) {
        console.log("Cargando datos del usuario:", user);
        await loadUserData();
      } else if (authChecked) {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, isAuthenticated, authLoading, authChecked]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("Consultando usuario con ID:", user.id);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
        credentials: 'include'
      });
      
      console.log("Respuesta status:", response.status);
      
      const data = await response.json();
      console.log(data.user.empleado_id);
      if(data.user.empleado_id === undefined || data.user.empleado_id === null){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api/by-user/${user.id}`, {
          credentials: 'include'
        });  

        const empleadoData = await response.json();
        console.log(empleadoData);
        if(empleadoData.success){
          data.user.empleado_id = empleadoData.empleado._id;
        }
      }

      console.log(data.user);
      
      if (data.success) {
        setUserData(data.user);
        
        if (data.user.foto_perfil) {
          const photoUrl = `${import.meta.env.VITE_API_URL}${data.user.foto_perfil}`;
          console.log("URL de foto de perfil:", photoUrl);
          setProfilePhoto(photoUrl);
        }
        
        if (data.user.empleado_id) {
          await loadNominas(data.user.empleado_id);
        }
      } else {
        setError("No se pudo cargar la información del usuario");
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      setError("Error al cargar datos del usuario: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const loadNominas = async (empleadoId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nominas-api/empleado/${empleadoId}`, {
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNominas(data.nominas || []);
      }
    } catch (error) {
      console.error("Error al cargar nóminas:", error);
    }
  };

  const handleChangeProfilePhoto = () => {
    fileInputRef.current.click();
  };

  const handlePhotoSelected = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setIsUpdatingPhoto(true);
    
    try {
      const formData = new FormData();
      formData.append('foto_perfil', file);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}/upload-photo`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        const photoUrl = data.foto_perfil;
        handlePhotoUpdated(photoUrl);
      } else {
        console.error("Error al actualizar foto:", data.message);
      }
    } catch (error) {
      console.error("Error al subir la foto:", error);
    } finally {
      setIsUpdatingPhoto(false);
    }
  };

  const handlePhotoUpdated = (photoUrl) => {
    console.log("Foto actualizada:", photoUrl);
    
    if (!photoUrl.startsWith('http')) {
      photoUrl = `${import.meta.env.VITE_API_URL}${photoUrl}`;
    }
    
    setProfilePhoto(photoUrl);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
  };

  return (
    <div className="mx-auto my-10 max-w-screen-lg px-4">
      <Card className="mb-6">
        <CardBody className="p-4">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Spinner className="h-12 w-12" />
              <Typography className="ml-4">Cargando información...</Typography>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md">
              <Typography variant="paragraph" color="red">
                {error}
              </Typography>
            </div>
          ) : userData ? (
            <>
              <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
                <div className="relative">
                  <Avatar
                    src={profilePhoto}
                    alt={userData.prim_nom || "Usuario"}
                    size="xxl"
                    className="border border-blue-gray-100 p-1"
                  />
                  
                  {isUpdatingPhoto ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                      <Spinner className="h-8 w-8 text-white" />
                    </div>
                  ) : (
                    <button 
                      className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full text-white"
                      onClick={handleChangeProfilePhoto}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  )}
                  
                  <input 
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoSelected}
                  />
                </div>
                
                <div>
                  <Typography variant="h4" color="blue-gray" className="mb-1">
                    {userData.prim_nom} {userData.segun_nom} {userData.apell_pa} {userData.apell_ma}
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="font-normal mb-1">
                    {userData.pust || userData.role}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {userData.email}
                  </Typography>
                  {userData.telefono && (
                    <Typography variant="small" color="gray" className="font-normal">
                      Tel: {userData.telefono}
                    </Typography>
                  )}
                </div>
              </div>
              
              <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                <TabsHeader>
                  <Tab value="perfil">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="w-5 h-5" />
                      Perfil
                    </div>
                  </Tab>
                  <Tab value="nominas">
                    <div className="flex items-center gap-2">
                      <CurrencyDollarIcon className="w-5 h-5" />
                      Nóminas
                    </div>
                  </Tab>
                </TabsHeader>
                
                <TabsBody>
                  <TabPanel value="perfil">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                          Información Personal
                        </Typography>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Nombre Completo
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {userData.prim_nom} {userData.segun_nom} {userData.apell_pa} {userData.apell_ma}
                            </Typography>
                          </div>
                          
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Correo Electrónico
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {userData.email}
                            </Typography>
                          </div>
                          
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Teléfono
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {userData.telefono || "No especificado"}
                            </Typography>
                          </div>
                          
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Fecha de Nacimiento
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {formatDate(userData.fecha_na)}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                          Dirección
                        </Typography>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Calle
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {userData.calle || "No especificado"}
                            </Typography>
                          </div>
                          
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Número Exterior
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {userData.nun_ex || "No especificado"}
                            </Typography>
                          </div>
                          
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Número Interior
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {userData.num_in || "No especificado"}
                            </Typography>
                          </div>
                          
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              Código Postal
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                              {userData.codigo || "No especificado"}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel value="nominas">
                    {nominas.length > 0 ? (
                      <div className="bg-white p-4 rounded-lg shadow">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                          Historial de Nóminas
                        </Typography>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-max table-auto text-left">
                            <thead>
                              <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                  <Typography variant="small" color="blue-gray" className="font-semibold">
                                    Fecha
                                  </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-40">
                                  <Typography variant="small" color="blue-gray" className="font-semibold">
                                    Concepto
                                  </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                  <Typography variant="small" color="blue-gray" className="font-semibold">
                                    Monto
                                  </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                  <Typography variant="small" color="blue-gray" className="font-semibold">
                                    Acciones
                                  </Typography>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {nominas.map((nomina, index) => (
                                <tr key={index} className="even:bg-blue-gray-50/50">
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      {formatDate(nomina.fecha)}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal truncate max-w-[160px]">
                                      {nomina.conceptoDePago}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      ${parseFloat(nomina.salario).toLocaleString('es-MX')}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    {nomina.url && (
                                      <div className="flex items-center gap-3">
                                        <button 
                                          onClick={() => {
                                            const url = nomina.url.startsWith('http') ? nomina.url : `${import.meta.env.VITE_API_URL}${nomina.url}`;
                                            window.open(url, '_blank');
                                          }}
                                          className="text-gray-500 hover:text-gray-700 transition-colors"
                                          title="Descargar PDF"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-blue-gray-50/50 rounded-lg">
                        <IdentificationIcon className="h-16 w-16 mx-auto text-blue-gray-300 mb-4" />
                        <Typography variant="h5" color="blue-gray">
                          No hay nóminas disponibles
                        </Typography>
                        <Typography variant="paragraph" color="gray" className="font-normal mt-2 max-w-lg mx-auto">
                          No se encontraron registros de nóminas para este usuario. Si crees que esto es un error, contacta a tu administrador.
                        </Typography>
                      </div>
                    )}
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-8">
              <Typography variant="h6" color="red">
                No se encontró información del usuario
              </Typography>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;