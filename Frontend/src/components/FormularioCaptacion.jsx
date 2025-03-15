import React, { useState } from "react";
import { Card, CardBody, CardHeader, Typography, Button } from "@material-tailwind/react";
import { FormNavigation } from "./FormNavigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

// Componentes para cada sección del formulario
const PropietarioForm = () => (
  <div className="space-y-4">
    <Typography variant="h6" color="blue-gray">
      Información del Propietario
    </Typography>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Aquí irían los campos del formulario */}
      <div className="p-4 border rounded">Campos de información personal</div>
      <div className="p-4 border rounded">Campos de contacto</div>
    </div>
  </div>
);

const PropiedadForm = () => (
  <div className="space-y-4">
    <Typography variant="h6" color="blue-gray">
      Detalles de la Propiedad
    </Typography>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Aquí irían los campos del formulario */}
      <div className="p-4 border rounded">Ubicación y características</div>
      <div className="p-4 border rounded">Detalles legales</div>
    </div>
  </div>
);

const AdeudosForm = () => (
  <div className="space-y-4">
    <Typography variant="h6" color="blue-gray">
      Adeudos e Hipotecas
    </Typography>
    <div className="p-4 border rounded">
      Información sobre adeudos existentes
    </div>
  </div>
);

const DatosLaboralesForm = () => (
  <div className="space-y-4">
    <Typography variant="h6" color="blue-gray">
      Datos Laborales del Propietario
    </Typography>
    <div className="p-4 border rounded">
      Información laboral y de ingresos
    </div>
  </div>
);

const ReferenciasForm = () => (
  <div className="space-y-4">
    <Typography variant="h6" color="blue-gray">
      Referencias
    </Typography>
    <div className="p-4 border rounded">
      Referencias personales y profesionales
    </div>
  </div>
);

const DocumentosForm = () => (
  <div className="space-y-4">
    <Typography variant="h6" color="blue-gray">
      Documentos
    </Typography>
    <div className="p-4 border rounded">
      Carga y gestión de documentos
    </div>
  </div>
);

const VentaForm = () => (
  <div className="space-y-4">
    <Typography variant="h6" color="blue-gray">
      Información de Venta
    </Typography>
    <div className="p-4 border rounded">
      Detalles de la operación de venta
    </div>
  </div>
);

export function FormularioCaptacion() {
  const [activeTab, setActiveTab] = useState("propietario");

  // Array con todas las secciones en orden
  const tabsOrder = [
    "propietario",
    "propiedad",
    "adeudos",
    "datos_laborales",
    "referencias",
    "documentos",
    "venta"
  ];

  // Funciones para avanzar y retroceder en la navegación
  const goToNextTab = () => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex < tabsOrder.length - 1) {
      setActiveTab(tabsOrder[currentIndex + 1]);
    }
  };

  const goToPrevTab = () => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabsOrder[currentIndex - 1]);
    }
  };

  // Mapear el valor de la pestaña activa al componente correspondiente
  const renderActiveForm = () => {
    switch (activeTab) {
      case "propietario":
        return <PropietarioForm />;
      case "propiedad":
        return <PropiedadForm />;
      case "adeudos":
        return <AdeudosForm />;
      case "datos_laborales":
        return <DatosLaboralesForm />;
      case "referencias":
        return <ReferenciasForm />;
      case "documentos":
        return <DocumentosForm />;
      case "venta":
        return <VentaForm />;
      default:
        return <PropietarioForm />;
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
        <Typography variant="h6" color="white">
          Registro de Captación Inmobiliaria
        </Typography>
      </CardHeader>
      <CardBody className="p-6">
        <FormNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        >
          {renderActiveForm()}
          
          {/* Botones para navegación adicional entre pestañas */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-2"
              onClick={goToPrevTab}
              disabled={tabsOrder.indexOf(activeTab) === 0}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
            </Button>
            
            <Button
              variant="filled"
              color="blue"
              className="flex items-center gap-2"
              onClick={goToNextTab}
              disabled={tabsOrder.indexOf(activeTab) === tabsOrder.length - 1}
            >
              Siguiente <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </FormNavigation>
      </CardBody>
    </Card>
  );
}

export default FormularioCaptacion; 