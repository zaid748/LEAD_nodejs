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
import axios from "axios";

export function Profile() {
  const { user, isAuthenticated, loading: authLoading, authChecked, refreshAuthStatus } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
          console.log("=== CARGA DE FOTO DE PERFIL ===");
          console.log("Ruta en BD:", data.user.foto_perfil);
          console.log("URL construida:", photoUrl);
          console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
          console.log("Estado actual de profilePhoto:", profilePhoto);
          
          // Usar la función de fallback automático
          const finalPhotoUrl = await loadImageWithFallback(photoUrl);
          console.log("🖼️ URL final de la foto:", finalPhotoUrl);
          
          setProfilePhoto(finalPhotoUrl);
          
          // Verificar si la imagen se puede cargar (solo para logging)
          if (finalPhotoUrl.startsWith('data:')) {
            console.log("✅ Imagen cargada usando base64 (fallback)");
          } else {
            console.log("✅ Imagen cargada usando URL directa");
          }
        } else {
          console.log("ℹ️ Usuario no tiene foto de perfil configurada");
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

  // Función para cargar imagen con fallback automático a base64
  const loadImageWithFallback = async (imageUrl) => {
    try {
      console.log('🖼️ Intentando cargar imagen:', imageUrl);
      
      // PRIMER INTENTO: Carga directa con timestamp
      try {
        const timestampedUrl = `${imageUrl}?t=${Date.now()}`;
        console.log('🔄 Intentando carga directa con timestamp:', timestampedUrl);
        
        const img = new Image();
        const imageTest = await new Promise((resolve, reject) => {
          img.onload = () => {
            console.log('✅ Imagen cargada exitosamente (directo)');
            console.log('Dimensiones:', img.width, 'x', img.height);
            resolve({ success: true, width: img.width, height: img.height, method: 'directo' });
          };
          img.onerror = (e) => {
            console.error('❌ Error al cargar imagen directamente:', e);
            reject(new Error('No se pudo cargar la imagen directamente'));
          };
          
          img.src = timestampedUrl;
          
          // Timeout después de 5 segundos
          setTimeout(() => {
            reject(new Error('Timeout al cargar imagen directamente'));
          }, 5000);
        });

        console.log('✅ Carga directa exitosa, usando URL original');
        return imageUrl; // Retornar URL original si funciona
        
      } catch (directError) {
        console.log('⚠️ Carga directa falló, intentando con base64...');
      }

      // SEGUNDO INTENTO: Carga con base64 como fallback
      console.log('🔄 Intentando carga con base64...');
      
      const response = await fetch(imageUrl, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('✅ Blob creado:', blob.size, 'bytes, tipo:', blob.type);

      // Convertir blob a base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result;
          console.log('✅ Base64 generado, longitud:', base64.length);
          resolve(base64);
        };
        reader.onerror = () => reject(new Error('Error al convertir a base64'));
      });

      reader.readAsDataURL(blob);
      const base64 = await base64Promise;

      console.log('✅ Usando base64 como fallback');
      return base64; // Retornar base64 si la carga directa falla
      
    } catch (error) {
      console.error('❌ Error en carga de imagen con fallback:', error);
      // Si todo falla, retornar la URL original para que se muestre el error
      return imageUrl;
    }
  };

  const handleChangeProfilePhoto = () => {
    fileInputRef.current.click();
  };

  const handlePhotoSelected = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    console.log('=== INICIO DE SUBIDA DE FOTO ===');
    console.log('Archivo seleccionado:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    });
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona una imagen válida');
      return;
    }
    
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen debe ser menor a 5MB');
      return;
    }
    
    setIsUpdatingPhoto(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('foto_perfil', file);
      
      console.log('FormData creado:', formData);
      console.log('Enviando foto al servidor...');
      console.log('URL de envío:', `${import.meta.env.VITE_API_URL}/api/users/${user.id}/upload-photo`);
      console.log('ID del usuario:', user.id);
      
      const response = await axios.post(
        `/api/users/${user.id}/upload-photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
          timeout: 30000, // 30 segundos de timeout
        }
      );
      
      console.log('Respuesta del servidor:', response.data);
      
      if (response.data.success) {
        const photoUrl = response.data.foto_perfil;
        console.log('Foto actualizada exitosamente:', photoUrl);
        
        // Mostrar mensaje de éxito
        setSuccess('¡Foto de perfil actualizada correctamente!');
        setError('');
        
        // Actualizar la foto en la interfaz
        handlePhotoUpdated(photoUrl);
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        
        // Actualizar el contexto de autenticación si es necesario
        if (user && user.id === user.id) {
          // Refrescar el estado del usuario
          await refreshAuthStatus();
        }
      } else {
        console.error("Error al actualizar foto:", response.data.message);
        setError(`Error al actualizar la foto: ${response.data.message}`);
        setSuccess('');
      }
    } catch (error) {
      console.error("=== ERROR EN SUBIDA DE FOTO ===");
      console.error("Error completo:", error);
      
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        
        // Manejar errores específicos del servidor
        if (error.response.status === 400) {
          setError(`Error de validación: ${error.response.data.message || 'Archivo no válido'}`);
        } else if (error.response.status === 401) {
          setError('No tienes permisos para realizar esta acción');
        } else if (error.response.status === 413) {
          setError('El archivo es demasiado grande');
        } else {
          setError(`Error del servidor: ${error.response.data.message || 'Error desconocido'}`);
        }
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor');
        console.error('Request:', error.request);
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        console.error('Error en la configuración:', error.message);
        setError(`Error de configuración: ${error.message}`);
      }
    } finally {
      setIsUpdatingPhoto(false);
      console.log('=== FIN DE SUBIDA DE FOTO ===');
    }
  };

  const handlePhotoUpdated = async (photoUrl) => {
    console.log('=== MANEJANDO FOTO ACTUALIZADA ===');
    console.log('URL recibida:', photoUrl);
    
    // Construir la URL completa si no es absoluta
    let fullPhotoUrl = photoUrl;
    if (!photoUrl.startsWith('http')) {
      fullPhotoUrl = `${import.meta.env.VITE_API_URL}${photoUrl}`;
    }
    
    console.log('URL completa construida:', fullPhotoUrl);
    
    // Usar la función de fallback automático para la nueva foto
    const finalPhotoUrl = await loadImageWithFallback(fullPhotoUrl);
    console.log('🖼️ URL final de la nueva foto:', finalPhotoUrl);
    
    // Actualizar el estado con la URL final (con fallback si es necesario)
    setProfilePhoto(finalPhotoUrl);
    
    // Mostrar mensaje de éxito temporal
    setError('');
    
    // Forzar la recarga de los datos del usuario para asegurar sincronización
    setTimeout(() => {
      loadUserData();
    }, 1000);
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
          ) : success ? (
            <div className="bg-green-50 p-4 rounded-md">
              <Typography variant="paragraph" color="green">
                {success}
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
                    onError={(e) => {
                      console.error('❌ Error al cargar imagen de perfil:', profilePhoto);
                      console.error('Elemento de imagen:', e.target);
                      console.error('Tipo de URL:', profilePhoto.startsWith('data:') ? 'base64' : 'URL directa');
                      
                      // Si es base64 y falla, intentar recargar
                      if (profilePhoto.startsWith('data:')) {
                        console.log('🔄 Reintentando carga de base64...');
                        // Forzar recarga después de un breve delay
                        setTimeout(() => {
                          e.target.src = profilePhoto;
                        }, 1000);
                      } else {
                        // Fallback a imagen por defecto para URLs directas
                        e.target.src = '/img/user_icon.svg';
                      }
                    }}
                    onLoad={() => {
                      console.log('✅ Imagen de perfil cargada exitosamente:', profilePhoto);
                      console.log('Tipo de carga:', profilePhoto.startsWith('data:') ? 'base64' : 'URL directa');
                    }}
                  />
                  
                  {/* Indicador del tipo de carga */}
                  
                  
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