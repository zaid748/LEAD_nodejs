import { useState, useEffect } from "react";
import {
  Typography,
  Spinner,
  Alert,
  IconButton
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { 
  ArrowRightIcon, 
  MapPinIcon
} from "@heroicons/react/24/solid";

export function VistaPublicaMarketing() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proyecto, setProyecto] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cargar datos del proyecto
  useEffect(() => {
    if (!id) return;
    
    const fetchProyecto = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("=== DEBUG: Cargando proyecto público ===");
        console.log("ID del proyecto:", id);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/publico/marketing/${id}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `Error ${response.status}` }));
          throw new Error(errorData.message || `Error al obtener el proyecto: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("=== DEBUG: Proyecto cargado ===");
        console.log("data:", data);
        
        setProyecto(data.proyecto);
        
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        setError(error.message || "No se pudo cargar el proyecto");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProyecto();
  }, [id]);

  // Navegar entre imágenes del carrusel
  const nextImage = () => {
    if (proyecto?.marketing?.imagenes) {
      setCurrentImageIndex((prev) => 
        prev === proyecto.marketing.imagenes.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (proyecto?.marketing?.imagenes) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? proyecto.marketing.imagenes.length - 1 : prev - 1
      );
    }
  };

  // Función para obtener el nombre de la imagen sin extensión
  const getImageNameWithoutExtension = (imageName) => {
    if (!imageName) return "Imagen";
    return imageName.replace(/\.[^/.]+$/, ""); // Remueve la extensión del archivo
  };

  // Renderizar estado de carga
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96" style={{ backgroundColor: '#D6D6D6' }}>
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  // Renderizar error si no se puede cargar el proyecto
  if (error && !proyecto) {
    return (
      <div className="min-h-screen py-8" style={{ backgroundColor: '#D6D6D6' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto p-8 text-center" style={{ backgroundColor: '#FFFFFF' }}>
            <Alert color="red" className="mb-6">
              {error}
            </Alert>
            <Typography variant="h5" className="mb-4" style={{ color: '#344914' }}>
              Proyecto no encontrado
            </Typography>
            <Typography variant="paragraph" className="mb-6" style={{ color: '#344914' }}>
              El proyecto que buscas no está disponible o no existe.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (!proyecto) {
    return null;
  }

  // Obtener las primeras 4 imágenes para la parte superior
  const imagenesSuperiores = proyecto.marketing?.imagenes?.slice(0, 4) || [];
  const todasLasImagenes = proyecto.marketing?.imagenes || [];

  return (
    <div>
      <h1>Vista Pública de Marketing</h1>
    </div>
  );
}

export default VistaPublicaMarketing;
