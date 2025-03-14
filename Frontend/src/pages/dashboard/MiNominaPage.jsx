import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

export function MiNominaPage() {
  const [userData, setUserData] = useState(null);
  const [nominas, setNominas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener datos del usuario actual y su empleado asociado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener información del usuario
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          withCredentials: true
        });
        
        console.log("Respuesta de check-auth:", userResponse.data);
        
        if (!userResponse.data.success) {
          setError("No se pudo obtener información del usuario");
          setLoading(false);
          return;
        }
        
        const user = userResponse.data.user;

        console.log("Usuario autenticado completo:", user);
        
        // Intentar obtener el empleado_id del usuario
        try {
          // Intentar primero un endpoint específico para obtener el empleado asociado al usuario
          const empleadoResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/empleados-api/by-user/${user.id}`, {
            withCredentials: true
          });
          
          if (empleadoResponse.data.success && empleadoResponse.data.empleado) {
            setUserData({
              ...user,
              empleado_id: empleadoResponse.data.empleado._id ? empleadoResponse.data.empleado._id : user.empleado_id,
              nombre_completo: `${empleadoResponse.data.empleado.prim_nom} ${empleadoResponse.data.empleado.apell_pa}`
            });
            setLoading(false); // Importante: marcar como cargado aquí
            return;
          }
          
          if(!empleadoResponse.data.success){
            const User = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
              withCredentials: true
            });
            console.log("Respuesta de users:", User.data);
            
            if (User.data.success && User.data.user && User.data.user.empleado_id) {
              setUserData({
                ...user,
                empleado_id: User.data.user.empleado_id,
                nombre_completo: User.data.user.prim_nom && User.data.user.apell_pa ? 
                  `${User.data.user.prim_nom} ${User.data.user.apell_pa}` : 'Usuario'
              });
              setLoading(false); // Marcar como cargado aquí también
              console.log("Empleado encontrado, ID:", User.data.user.empleado_id);
              return;
            }
          }
        } catch (error) {
          console.error("Error buscando empleado relacionado:", error);
        }
        
        // Si llegamos aquí, no encontramos un empleado asociado
        if (user.empleado_id) {
          setUserData({
            ...user,
            empleado_id: user.empleado_id
          });
          setLoading(false);
        } else {
          setError("No se encontró ningún empleado asociado a tu cuenta");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error obteniendo datos de usuario:", error);
        setError("Error al conectar con el servidor");
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  // Obtener nóminas cuando tengamos los datos del usuario
  useEffect(() => {
    const fetchNominas = async () => {
      if (!userData || !userData.empleado_id) {
        console.log("No hay ID de empleado disponible");
        return;
      }
      
      console.log("Intentando obtener nóminas para empleado ID:", userData.empleado_id);
      
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/nominas-api/empleado/${userData.empleado_id}`;
        console.log("Intentando URL:", url);
        
        const response = await axios.get(url, { withCredentials: true });
        
        console.log("Respuesta completa de nóminas:", response.data);
        
        if (response.data.success) {
          // Comprueba si nominas está en la respuesta y no es undefined o null
          if (response.data.nominas) {
            console.log("Nóminas obtenidas correctamente:", response.data.nominas.length || 0);
            setNominas(response.data.nominas);
          } else if (response.data.data) {
            // Alternativa si los datos están en response.data.data
            console.log("Nóminas obtenidas en data:", response.data.data.length || 0);
            setNominas(response.data.data);
          } else {
            // Si no encuentra datos en ninguno de los formatos esperados
            console.log("No se encontraron datos de nóminas en la respuesta");
            setNominas([]);
          }
          setLoading(false);
          return;
        } else {
          throw new Error("La respuesta no fue exitosa");
        }
      } catch (err) {
        console.error("Error obteniendo nóminas:", err);
        setError("No se pudieron cargar las nóminas. Por favor intenta más tarde.");
        setLoading(false);
      }
    };
    
    fetchNominas();
  }, [userData]);

  const formatFecha = (fecha) => {
    if (!fecha) return "N/A";
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX');
  };

  const formatSalario = (salario) => {
    if (!salario) return "$0.00";
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(salario);
  };

  const verPDF = (nomina) => {
    // Mostrar toda la información de la nómina para depurar
    console.log("Información completa de la nómina:", nomina);
    
    if (nomina.url) {
      console.log("Descargando PDF desde URL:", nomina.url);
      window.open(nomina.url, '_blank');
    } else {
      // Para casos sin URL, intentar construir una
      const empleadoName = nomina.empleado ? encodeURIComponent(nomina.empleado) : '';
      const fecha = nomina.fecha ? encodeURIComponent(nomina.fecha) : '';
      const altUrl = `${import.meta.env.VITE_API_URL}/nomina/download/${nomina._id}?name=${empleadoName}&fecha=${fecha}`;
      
      console.log("URL alternativa generada:", altUrl);
      window.open(altUrl, '_blank');
    }
  };

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="blue-gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Nóminas Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <div className="flex justify-center p-6">
                <Spinner className="h-12 w-12" />
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <Typography variant="paragraph" color="red" className="font-normal">
                  {error}
                </Typography>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              Fecha
                            </Typography>
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-32 max-w-xs text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              Concepto
                            </Typography>
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              Salario
                            </Typography>
                          </th>
                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-70"
                            >
                              Acciones
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="p-4 text-center">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                Cargando datos...
                              </Typography>
                            </td>
                          </tr>
                        ) : nominas.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="p-4 text-center">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                No se encontraron nóminas para este empleado
                              </Typography>
                            </td>
                          </tr>
                        ) : (
                          nominas.map((nomina, index) => (
                            <tr key={nomina._id || index} className="even:bg-blue-gray-50/50">
                              <td className="p-4 text-center">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                  {formatFecha(nomina.fecha)}
                                </Typography>
                              </td>
                              <td className="p-4 w-32 max-w-xs text-center">
                                <Typography 
                                  variant="small" 
                                  color="blue-gray" 
                                  className="font-normal truncate"
                                >
                                  {nomina.conceptoDePago || "Sin concepto"}
                                </Typography>
                              </td>
                              <td className="p-4 text-center">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                  {formatSalario(nomina.salario)}
                                </Typography>
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex items-center justify-center">
                                  <IconButton 
                                    variant="text" 
                                    color="blue-gray"
                                    size="sm"
                                    onClick={() => verPDF(nomina)}
                                  >
                                    <DocumentArrowDownIcon className="h-4 w-4" />
                                  </IconButton>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default MiNominaPage;