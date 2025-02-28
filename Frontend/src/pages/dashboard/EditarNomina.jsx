import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export function EditarNomina() {
  const [nominaData, setNominaData] = useState({
    empleado: "",
    conceptoDePago: "",
    salario: "",
    fecha: ""
  });
  const [loading, setLoading] = useState(true);
  const { nominaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNominaData();
  }, [nominaId]);

  const fetchNominaData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/nominas/${nominaId}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setNominaData(data.nomina);
      } else {
        console.error("Error al obtener datos de la nómina");
      }
    } catch (error) {
      console.error("Error al obtener datos de la nómina:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNominaData({
      ...nominaData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:4000/api/nominas/${nominaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(nominaData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate(`/dashboard/empleado-profile/${nominaData.empleadoId}`);
      } else {
        console.error("Error al actualizar la nómina");
      }
    } catch (error) {
      console.error("Error al actualizar la nómina:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="h6" color="blue-gray">
          Cargando datos de la nómina...
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
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </IconButton>
            <Typography variant="h6" color="white">
              Editar Nómina
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Empleado
              </Typography>
              <Input
                size="lg"
                name="empleado"
                value={nominaData.empleado}
                onChange={handleInputChange}
                disabled
              />
            </div>
            
            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Concepto de Pago
              </Typography>
              <Input
                size="lg"
                name="conceptoDePago"
                value={nominaData.conceptoDePago}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Salario
              </Typography>
              <Input
                type="number"
                size="lg"
                name="salario"
                value={nominaData.salario}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Typography variant="small" className="mb-2 font-medium">
                Fecha
              </Typography>
              <Input
                type="date"
                size="lg"
                name="fecha"
                value={nominaData.fecha?.split('/').reverse().join('-')}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outlined"
                color="red"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button
                variant="filled"
                color="gray"
                type="submit"
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default EditarNomina; 