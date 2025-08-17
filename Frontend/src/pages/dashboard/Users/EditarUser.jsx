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
  Spinner,
  Switch
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

// Configuración global de axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// Componente auxiliar para descripciones de campos
const FieldDescription = ({ children }) => (
  <Typography variant="small" color="gray" className="mt-1 font-normal">
    {children}
  </Typography>
);

export function EditarUser({ dashboard = false }) {
  const { userId } = useParams();
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
    role: "",
    empleado_id: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [loadingEmpleados, setLoadingEmpleados] = useState(false);
  const [useExistingEmployee, setUseExistingEmployee] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [linkedEmpleado, setLinkedEmpleado] = useState(null);
  const [relationDirection, setRelationDirection] = useState(null); // "userToEmpleado" o "empleadoToUser"
  const navigate = useNavigate();

  // Cargar datos del usuario a editar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        
        if (response.data.success) {
          const userData = response.data.user;
          
          // Cargar foto de perfil si existe
          if (userData.foto_perfil) {
            setPreviewUrl(`${import.meta.env.VITE_MEDIA_URL}${userData.foto_perfil}`);
          }
          
          // Verificar si el usuario tiene un empleado_id
          if (userData.empleado_id) {
            setUseExistingEmployee(true);
            setLinkedEmpleado(userData.empleado_id);
            setRelationDirection("userToEmpleado");
            console.log("Relación encontrada: usuario -> empleado");
          } else {
            // Si no tiene empleado_id, buscar si hay algún empleado que referencie a este usuario
            try {
              const empleadoResponse = await axios.get(`/api/empleados-api/by-user/${userId}`);
              
              if (empleadoResponse.data.success && empleadoResponse.data.empleado) {
                setUseExistingEmployee(true);
                setLinkedEmpleado(empleadoResponse.data.empleado._id);
                setRelationDirection("empleadoToUser");
                console.log("Relación encontrada: empleado -> usuario", empleadoResponse.data.empleado);
              } else {
                setUseExistingEmployee(false);
                console.log("No se encontró relación en ninguna dirección");
              }
            } catch (error) {
              console.error("Error al buscar empleado por userId:", error);
              setUseExistingEmployee(false);
            }
          }
          
          // Actualizar formulario con datos del usuario
          setFormData({
            prim_nom: userData.prim_nom || "",
            segun_nom: userData.segun_nom || "",
            apell_pa: userData.apell_pa || "",
            apell_ma: userData.apell_ma || "",
            fecha_na: userData.fecha_na || "",
            pust: userData.pust || "",
            calle: userData.calle || "",
            num_in: userData.num_in || "",
            nun_ex: userData.nun_ex || "",
            codigo: userData.codigo || "",
            telefono: userData.telefono || "",
            email: userData.email || "",
            role: userData.role || "user",
            empleado_id: userData.empleado_id || ""
          });
        } else {
          setError("No se pudo cargar la información del usuario");
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        setError("Error al cargar datos del usuario");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);

  // Cargar la lista de empleados
  useEffect(() => {
    const fetchEmpleados = async () => {
        try {
          setLoadingEmpleados(true);
          const response = await axios.get('/api/empleados-api');
          
          if (response.data && response.data.success) {
            // Filtrar solo empleados activos para la asignación
            const empleadosActivos = response.data.empleados.filter(
              empleado => empleado.estado === 'Activo'
            );
            
            setEmpleados(empleadosActivos || []);
          } else {
            console.error("Error en la respuesta:", response.data);
            setEmpleados([]);
          }
        } catch (error) {
          console.error("Error al cargar empleados:", error);
          setEmpleados([]);
        } finally {
          setLoadingEmpleados(false);
      }
    };

    fetchEmpleados();
  }, []);

  // Si encontramos una relación empleado->usuario, necesitamos cargar los datos del empleado
  useEffect(() => {
    const fetchEmpleadoData = async () => {
      if (linkedEmpleado && relationDirection === "empleadoToUser") {
      try {
          const response = await axios.get(`/api/empleados-api/${linkedEmpleado}`);
          if (response.data.success) {
            const empleado = response.data.empleado;
            
            // Actualizar campos con datos del empleado
            setFormData(prevState => ({
              ...prevState,
              prim_nom: empleado.prim_nom || prevState.prim_nom,
              segun_nom: empleado.segun_nom || prevState.segun_nom,
              apell_pa: empleado.apell_pa || prevState.apell_pa,
              apell_ma: empleado.apell_ma || prevState.apell_ma,
              fecha_na: empleado.fecha_na || prevState.fecha_na,
              pust: empleado.pust || prevState.pust,
              calle: empleado.calle || prevState.calle,
              num_in: empleado.num_in || prevState.num_in,
              nun_ex: empleado.nun_ex || prevState.nun_ex,
              codigo: empleado.codigo || prevState.codigo,
              telefono: empleado.telefono || prevState.telefono
            }));
        }
      } catch (error) {
          console.error("Error al cargar datos del empleado vinculado:", error);
        }
      }
    };
    
    fetchEmpleadoData();
  }, [linkedEmpleado, relationDirection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para manejar la selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar que es una imagen
      if (!file.type.includes('image/')) {
        setError("Por favor selecciona una imagen válida");
        return;
      }
      
      setSelectedFile(file);
      
      // Crear la vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función separada para subir la foto
  const uploadProfilePhoto = async () => {
    if (!selectedFile) return null;
    
    try {
      const formData = new FormData();
      formData.append('foto_perfil', selectedFile);
      
      const endpoint = `/api/users/${userId}/upload-photo`;
      console.log('Subiendo foto a:', endpoint);
      console.log('Archivo a subir:', selectedFile);
      
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        timeout: 30000, // 30 segundos de timeout
      });
      
      console.log('Respuesta de subida de foto:', response.data);
      
      if (response.data.success) {
        return response.data.foto_perfil;
      } else {
        console.error('Error al subir foto:', response.data.message);
        setError(`Error al subir la foto: ${response.data.message}`);
        return null;
      }
    } catch (error) {
      console.error('Error al subir la foto:', error);
      
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        console.error('Status:', error.response.status);
        setError(`Error del servidor: ${error.response.data.message || 'Error desconocido'}`);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor');
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        console.error('Error en la configuración:', error.message);
        setError(`Error de configuración: ${error.message}`);
      }
      
      return null;
    }
  };

  const handleRoleChange = (value) => {
          setFormData({
      ...formData,
      role: value
    });
  };

  const handleEmployeeChange = (value) => {
    setFormData({
      ...formData,
      empleado_id: value
    });
  };

  // Modificar la función handleUpdateUser para que primero actualice los datos y luego la foto
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError("");
    
    try {
      // 1. Primero actualizamos los datos del usuario
      const response = await axios.put(`/api/users/${userId}`, formData);
      
      // 2. Si hay un archivo seleccionado, lo subimos
      if (selectedFile) {
        console.log('Subiendo foto de perfil...');
        const photoPath = await uploadProfilePhoto();
        if (photoPath) {
          console.log('Foto subida correctamente:', photoPath);
        }
      }
      
      // 3. Mostrar mensaje de éxito y redirigir
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/users');
      }, 1500);
      
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error al actualizar usuario');
      } else {
        setError('Error al conectar con el servidor');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
  if (isLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <Spinner className="h-12 w-12" />
        </div>
      );
    }
    
    return (
      <form className="mt-8 mb-2 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Typography variant="h6" color="blue-gray" className="col-span-1 lg:col-span-2 font-medium">
            Información Personal
            </Typography>
          
            <div>
              <Input
                name="prim_nom"
                size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.prim_nom}
                onChange={handleChange}
                required
              label="Primer Nombre *"
              />
            </div>
            
            <div>
              <Input
                name="segun_nom"
                size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.segun_nom}
                onChange={handleChange}
              label="Segundo Nombre"
              />
            </div>
            
            <div>
              <Input
                name="apell_pa"
                size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.apell_pa}
                onChange={handleChange}
                required
              label="Apellido Paterno *"
              />
            </div>
            
            <div>
              <Input
                name="apell_ma"
                size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.apell_ma}
                onChange={handleChange}
                required
              label="Apellido Materno *"
              />
            </div>
            
            <div>
              <Input
                name="fecha_na"
                type="date"
                size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.fecha_na}
                onChange={handleChange}
                required
              label="Fecha de Nacimiento *"
              />
            </div>
            
          {/* Relación con empleado */}
          <div className="col-span-1 lg:col-span-2 mt-4">
            <Typography variant="h6" color="blue-gray" className="mb-3 font-medium">
              Vinculación con Empleado
            </Typography>
            
            {relationDirection === "empleadoToUser" ? (
              <div className="mb-4 p-4 border rounded-lg border-blue-gray-100">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Este usuario está vinculado al empleado desde los registros de empleados. 
                  Para cambiar esta relación, debe editarse desde la sección de Empleados.
                </Typography>
                {linkedEmpleado && (
                  <Typography variant="small" color="blue-gray" className="font-medium mt-2">
                    ID de Empleado vinculado: {linkedEmpleado}
                  </Typography>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4 mb-4">
                <Switch
                  checked={useExistingEmployee}
                  onChange={() => setUseExistingEmployee(!useExistingEmployee)}
                  label="Vincular con empleado existente"
                />
              </div>
            )}
            
            {useExistingEmployee && relationDirection !== "empleadoToUser" && (
              <div className="mb-4">
                <Select
                  label="Selecciona un empleado"
                  value={formData.empleado_id}
                  onChange={handleEmployeeChange}
                  className="bg-white"
                  disabled={loadingEmpleados}
                >
                  <Option value="">-- Sin vincular --</Option>
                  {empleados.map(empleado => (
                    <Option key={empleado._id} value={empleado._id}>
                      {empleado.prim_nom} {empleado.apell_pa} {empleado.apell_ma} 
                      {empleado.pust ? ` - ${empleado.pust}` : ''}
                    </Option>
                  ))}
                </Select>
                <FieldDescription>Selecciona un empleado para vincularlo con este usuario</FieldDescription>
              </div>
            )}
            </div>

          {!useExistingEmployee && (
            <>
              <Typography variant="h6" color="blue-gray" className="col-span-1 lg:col-span-2 mt-4 mb-3 font-medium">
                Información de Contacto y Dirección
            </Typography>
            
            <div>
              <Input
                name="calle"
                size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.calle}
                onChange={handleChange}
                required
                label="Calle *"
              />
            </div>
            
              <div className="grid grid-cols-2 gap-4">
              <Input
                name="nun_ex"
                size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.nun_ex}
                onChange={handleChange}
                required
                  label="Número Exterior *"
                />
                
                <Input
                  name="num_in"
                  size="lg"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.num_in}
                  onChange={handleChange}
                  label="Número Interior"
                />
            </div>
            
            <div>
            <Input
                name="codigo"
              size="lg"
                className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={formData.codigo}
                onChange={handleChange}
                required
                  label="Código Postal *"
                />
              </div>
              
              <div>
                <Input
                  name="telefono"
                  size="lg"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  label="Teléfono *"
                />
              </div>
              
              <div>
                <Input
                  name="pust"
                  size="lg"
                  className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                  value={formData.pust}
                  onChange={handleChange}
                  required
                  label="Puesto *"
                />
                <FieldDescription>Cargo o posición del usuario</FieldDescription>
          </div>
          </>
       )}

          <Typography variant="h6" color="blue-gray" className="col-span-1 lg:col-span-2 mt-4 mb-3 font-medium">
            Información de la Cuenta
              </Typography>
        
        <div>
          <Input
            name="email"
            type="email"
            size="lg"
            className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            value={formData.email}
            onChange={handleChange}
            required
            label="Correo electrónico *"
          />
          <FieldDescription>Dirección de correo electrónico para acceso al sistema</FieldDescription>
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

          <Typography variant="h6" color="blue-gray" className="col-span-1 lg:col-span-2 mt-4 mb-3 font-medium">
          Foto de Perfil (Opcional)
        </Typography>

          <div className="col-span-1 lg:col-span-2 mt-2 mb-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {previewUrl ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={previewUrl} 
                    alt="Vista previa" 
                    className="max-h-44 max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudArrowUpIcon className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG o GIF (Máx. 2MB)</p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {selectedFile && (
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500 truncate">{selectedFile.name}</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          )}
          <FieldDescription>Imagen para tu perfil de usuario (opcional)</FieldDescription>
        </div>
      </div>
      
      <div className="mt-6">
        <Typography variant="small" color="gray" className="flex items-center justify-center gap-1 font-normal mb-4">
          <span className="text-red-500">*</span> Campos obligatorios
        </Typography>
          
          {success && (
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <Typography color="green" className="text-center">
                ¡Usuario actualizado correctamente! Redirigiendo...
              </Typography>
            </div>
          )}
          
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate('/dashboard/users')}
              className="mt-2 flex-1" 
              color="red"
              variant="outlined"
            >
              Cancelar
            </Button>
        
        <Button 
              onClick={handleUpdateUser}
              className="mt-2 flex-1" 
          color="blue"
        >
              Guardar Cambios
        </Button>
      </div>
        </div>
    </form>
  );
  };

    return (
      <div className="mx-auto my-10 max-w-4xl px-4">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-4 grid h-20 place-items-center">
            <Typography variant="h3" color="white">
            Editar Usuario
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

export default EditarUser;
