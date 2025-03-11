import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/solid";

export function UploadProfilePhoto({ userId, userType, onPhotoUpdated }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.includes('image/')) {
        setError("Por favor selecciona una imagen válida");
        return;
      }
      
      setSelectedFile(file);
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError("Por favor selecciona una imagen");
      return;
    }
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('foto_perfil', selectedFile);
    
    try {
      // Determinar la URL basada en el tipo de usuario
      const endpoint = userType === 'empleado' 
        ? `${import.meta.env.VITE_API_URL}/api/empleados-api/${userId}/upload-photo`
        : `${import.meta.env.VITE_API_URL}/api/users/${userId}/upload-photo`;
        
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (onPhotoUpdated) {
          onPhotoUpdated(data.foto_perfil);
        }
      } else {
        setError(data.message || "Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setError("Error al subir la imagen");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <Typography variant="h6" color="blue-gray">
            Cambiar foto de perfil
          </Typography>
          
          <div className="flex justify-center">
            <label htmlFor="upload-photo" className="cursor-pointer">
              <div className="rounded-full bg-blue-gray-50 p-4 flex items-center justify-center">
                <CameraIcon className="h-8 w-8 text-blue-gray-500" />
              </div>
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          
          {selectedFile && (
            <Typography variant="small" className="text-blue-gray-600">
              Archivo seleccionado: {selectedFile.name}
            </Typography>
          )}
          
          {error && (
            <Typography variant="small" color="red">
              {error}
            </Typography>
          )}
          
          <Button
            variant="filled"
            color="blue-gray"
            type="submit"
            disabled={!selectedFile || isLoading}
            className="mt-2"
          >
            {isLoading ? "Subiendo..." : "Subir foto"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default UploadProfilePhoto; 