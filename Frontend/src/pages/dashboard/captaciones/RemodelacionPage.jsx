import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Typography, Button, Chip, Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import { 
    CurrencyDollarIcon, 
    ClipboardDocumentListIcon, 
    TruckIcon, 
    DocumentTextIcon,
    ChartBarIcon,
    BellIcon
} from '@heroicons/react/24/outline';

// Componentes de remodelación
import Presupuesto from '../../../components/remodelacion/Presupuesto';
import MaterialForm from '../../../components/remodelacion/MaterialForm';
import SolicitudForm from '../../../components/remodelacion/SolicitudForm';
import Notificaciones from '../../../components/remodelacion/Notificaciones';
import CartaResponsabilidad from '../../../components/remodelacion/CartaResponsabilidad';
import Reportes from '../../../components/remodelacion/Reportes';

// Servicios
import { getRemodelacionData } from '../../../services/remodelacionService';

const TABS = [
    {
        label: "Presupuesto",
        value: "presupuesto",
        icon: CurrencyDollarIcon,
    },
    {
        label: "Gastos Administrativos",
        value: "gastos-admin",
        icon: ClipboardDocumentListIcon,
    },
    {
        label: "Solicitudes de Material",
        value: "solicitudes",
        icon: TruckIcon,
    },
    {
        label: "Carta de Responsabilidad",
        value: "carta",
        icon: DocumentTextIcon,
    },
    {
        label: "Reportes",
        value: "reportes",
        icon: ChartBarIcon,
    },
    {
        label: "Notificaciones",
        value: "notificaciones",
        icon: BellIcon,
    },
];

const RemodelacionPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("presupuesto");
    const [remodelacionData, setRemodelacionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState(0);

    useEffect(() => {
        cargarDatosRemodelacion();
    }, [id]);

    const cargarDatosRemodelacion = async () => {
        try {
            setLoading(true);
            const response = await getRemodelacionData(id);
            
            if (response.success) {
                setRemodelacionData(response.data);
                setNotificacionesNoLeidas(response.data.notificaciones?.length || 0);
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error('Error al cargar datos de remodelación:', error);
            setError('Error al cargar los datos de remodelación');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    const actualizarDatos = () => {
        cargarDatosRemodelacion();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardBody className="text-center">
                        <Typography variant="h5" color="red" className="mb-4">
                            Error
                        </Typography>
                        <Typography color="gray" className="mb-4">
                            {error}
                        </Typography>
                        <Button onClick={cargarDatosRemodelacion} color="blue">
                            Reintentar
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }

    if (!remodelacionData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardBody className="text-center">
                        <Typography variant="h5" color="gray" className="mb-4">
                            No hay datos de remodelación
                        </Typography>
                        <Typography color="gray">
                            Este proyecto no tiene información de remodelación configurada.
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        );
    }

    const { proyecto, estadisticas } = remodelacionData;

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Header de la página */}
            <div className="mb-6">
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    Gestión de Remodelación
                </Typography>
                <Typography variant="paragraph" color="gray" className="mb-4">
                    Proyecto: {proyecto.titulo}
                </Typography>
                
                {/* Estado del proyecto */}
                <div className="flex items-center gap-4 mb-4">
                    <Chip
                        value={proyecto.estatus_actual}
                        color={proyecto.estatus_actual === 'Remodelacion' ? 'amber' : 'gray'}
                        size="lg"
                    />
                    {proyecto.estatus_actual !== 'Remodelacion' && (
                        <Typography variant="small" color="red">
                            El proyecto debe estar en estatus "Remodelacion" para gestionar la remodelación
                        </Typography>
                    )}
                </div>

                {/* Resumen de estadísticas */}
                {estadisticas && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="bg-blue-50">
                            <CardBody className="p-4">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Presupuesto Estimado
                                </Typography>
                                <Typography variant="h4" color="blue" className="font-bold">
                                    ${proyecto.remodelacion?.presupuesto_estimado?.toLocaleString() || '0'}
                                </Typography>
                            </CardBody>
                        </Card>

                        <Card className="bg-green-50">
                            <CardBody className="p-4">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Gastos Totales
                                </Typography>
                                <Typography variant="h4" color="green" className="font-bold">
                                    ${estadisticas.total_gastos?.toLocaleString() || '0'}
                                </Typography>
                            </CardBody>
                        </Card>

                        <Card className="bg-orange-50">
                            <CardBody className="p-4">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Materiales
                                </Typography>
                                <Typography variant="h4" color="orange" className="font-bold">
                                    {estadisticas.total_materiales || '0'}
                                </Typography>
                            </CardBody>
                        </Card>

                        <Card className="bg-purple-50">
                            <CardBody className="p-4">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Notificaciones
                                </Typography>
                                <Typography variant="h4" color="purple" className="font-bold">
                                    {notificacionesNoLeidas}
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </div>

            {/* Tabs de navegación */}
            <Card className="mb-6">
                <CardHeader color="blue-gray" className="relative h-16">
                    <div className="flex items-center justify-between">
                        <Typography variant="h4" color="white">
                            Gestión de Remodelación
                        </Typography>
                        <div className="flex items-center gap-2">
                            {notificacionesNoLeidas > 0 && (
                                <Chip
                                    value={notificacionesNoLeidas}
                                    color="red"
                                    size="sm"
                                    className="animate-pulse"
                                />
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    <Tabs value={activeTab} onChange={handleTabChange}>
                        <TabsHeader className="rounded-none border-b border-blue-gray-50 bg-transparent p-0">
                            {TABS.map(({ label, value, icon: Icon }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    className={`flex items-center gap-2 px-6 py-3 ${
                                        activeTab === value
                                            ? "border-b-2 border-blue-500 text-blue-500"
                                            : "text-blue-gray-500"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </CardBody>
            </Card>

            {/* Contenido de los tabs */}
            <div className="min-h-[600px]">
                {activeTab === "presupuesto" && (
                    <Presupuesto 
                        proyectoId={id}
                        presupuestoActual={proyecto.remodelacion?.presupuesto_estimado}
                        onActualizar={actualizarDatos}
                    />
                )}

                {activeTab === "gastos-admin" && (
                    <MaterialForm 
                        proyectoId={id}
                        tipoGasto="Administrativo"
                        onActualizar={actualizarDatos}
                    />
                )}

                {activeTab === "solicitudes" && (
                    <SolicitudForm 
                        proyectoId={id}
                        onActualizar={actualizarDatos}
                    />
                )}

                {activeTab === "carta" && (
                    <CartaResponsabilidad 
                        proyectoId={id}
                        onActualizar={actualizarDatos}
                    />
                )}

                {activeTab === "reportes" && (
                    <Reportes 
                        proyectoId={id}
                        estadisticas={estadisticas}
                    />
                )}

                {activeTab === "notificaciones" && (
                    <Notificaciones 
                        proyectoId={id}
                        onActualizar={actualizarDatos}
                        notificacionesNoLeidas={notificacionesNoLeidas}
                        setNotificacionesNoLeidas={setNotificacionesNoLeidas}
                    />
                )}
            </div>
        </div>
    );
};

export default RemodelacionPage;
