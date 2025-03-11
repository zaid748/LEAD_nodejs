import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";

export function DocumentosEmpleado() {
  const [documentos, setDocumentos] = useState([]);
  const [empleadoData, setEmpleadoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { empleadoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmpleadoData();
    fetchDocumentos();
  }, [empleadoId]);

  const fetchEmpleadoData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/empleados-api/${empleadoId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setEmpleadoData(data.empleado);
      } else {
        console.error("Error al obtener datos del empleado");
      }
    } catch (error) {
      console.error("Error al obtener datos del empleado:", error);
    }
  };

  const fetchDocumentos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nominas-api/empleado/${empleadoId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setDocumentos(data.nominas);
      } else {
        console.error("Error al obtener documentos del empleado");
      }
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(`/dashboard/empleado-profile/${empleadoId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="h6" color="blue-gray">
          Cargando documentos...
        </Typography>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-center">
            <IconButton 
              variant="text" 
              color="white" 
              onClick={handleGoBack}
              className="mr-4"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </IconButton>
            <Typography variant="h6" color="white">
              Documentos de {empleadoData?.prim_nom} {empleadoData?.apell_pa}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="p-4">
          {documentos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentos.map((doc) => (
                <Card key={doc._id} className="shadow-sm">
                  <CardBody className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Typography variant="h6" color="blue-gray" className="mb-1">
                          {doc.conceptoDePago}
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                          Fecha: {doc.fecha}
                        </Typography>
                        <Typography variant="small" color="blue-gray">
                          Monto: ${doc.salario}
                        </Typography>
                      </div>
                      <IconButton 
                        variant="text" 
                        color="blue-gray"
                        onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/nominas-api/descargar/${doc._id}`, '_blank')}
                      >
                        <DocumentArrowDownIcon className="h-6 w-6" />
                      </IconButton>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                No hay documentos disponibles
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-4">
                Todavía no se han generado documentos para este empleado.
              </Typography>
              <Button 
                color="gray"
                onClick={() => navigate(`/dashboard/empleado/nomina/${empleadoId}`)}
              >
                Crear Nueva Nómina
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default DocumentosEmpleado; 