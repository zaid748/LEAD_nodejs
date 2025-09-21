import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Typography, 
    Button, 
    Chip, 
    Tabs, 
    TabsHeader, 
    Tab,
    Spinner,
    Alert
} from '@material-tailwind/react';
import { 
    BuildingOfficeIcon,
    ChevronLeftIcon,
    PencilIcon,
    CurrencyDollarIcon,
    ClipboardDocumentListIcon,
    TruckIcon,
    DocumentTextIcon,
    ChartBarIcon,
    BellIcon
} from '@heroicons/react/24/outline';

// Componentes de remodelación
import { 
    Presupuesto, 
    MaterialForm, 
    SolicitudForm, 
    // Notificaciones, // Archivo eliminado - ahora se usa GlobalNotifications en el navbar 
    CartaResponsabilidad, 
    Reportes 
} from '../../../components/remodelacion';

// Servicios
import { captacionesAPI } from '../../../services/api';
import remodelacionService from '../../../services/remodelacionService';
import axios from 'axios';

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

const DetalleRemodelacion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("presupuesto");
    const [proyecto, setProyecto] = useState(null);
    const [remodelacionData, setRemodelacionData] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState(0);

    // Función para formatear direcciones de objeto a string
    const formatearDireccion = (direccion) => {
        if (!direccion || typeof direccion !== 'object') return 'N/A';
        const { calle, numero, colonia, ciudad } = direccion;
        return `${calle || ''} ${numero || ''}, ${colonia || ''}, ${ciudad || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '') || 'N/A';
    };

    useEffect(() => {
        const inicializar = async () => {
            // Verificar autenticación y obtener datos del usuario
            try {
                const response = await axios.get('/api/auth/check');
                if (response.data.isAuthenticated) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.warn('Error al verificar autenticación:', error);
            }
            
            // Cargar datos del proyecto
            await cargarDatosProyecto();
        };
        
        inicializar();
    }, [id]);

    const cargarDatosProyecto = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Cargar datos básicos del proyecto
            const proyectoResponse = await captacionesAPI.getById(id);
            
            if (proyectoResponse) {
                setProyecto(proyectoResponse);
                
                // Verificar que el proyecto esté en estatus de remodelación
                if (proyectoResponse.estatus_actual !== 'Remodelacion') {
                    setError('Este proyecto no está en estatus de remodelación');
                    return;
                }
                
                // Cargar datos específicos de remodelación
                try {
                    const remodelacionResponse = await remodelacionService.getRemodelacionData(id);
                    if (remodelacionResponse.success) {
                        setRemodelacionData(remodelacionResponse.data);
                        setNotificacionesNoLeidas(remodelacionResponse.data.notificaciones?.length || 0);
                    }
                } catch (remodelacionError) {
                    console.warn('No se pudieron cargar datos específicos de remodelación:', remodelacionError);
                    // No es crítico, continuamos con datos básicos
                }
            } else {
                setError('Proyecto no encontrado');
            }
        } catch (error) {
            console.error('Error al cargar datos del proyecto:', error);
            setError('Error al cargar los datos del proyecto');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    const actualizarDatos = () => {
        cargarDatosProyecto();
    };

    const formatCurrency = (amount) => {
        if (!amount || amount === 0) return '$0.00';
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-MX');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Spinner size="lg" className="mx-auto mb-4" />
                    <Typography variant="h6" color="gray">
                        Cargando proyecto de remodelación...
                    </Typography>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-12 mb-8 mx-3 lg:mx-4">
                <Alert color="red" className="flex items-center gap-2">
                    {error}
                </Alert>
                <div className="mt-4">
                    <Button
                        color="blue"
                        onClick={() => navigate('/dashboard/remodelacion')}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                        Volver a Remodelación
                    </Button>
                </div>
            </div>
        );
    }

    if (!proyecto) {
        return (
            <div className="mt-12 mb-8 mx-3 lg:mx-4">
                <Alert color="red">
                    Proyecto no encontrado
                </Alert>
            </div>
        );
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-8">
            {/* Header */}
            <Card className="mx-3 lg:mx-4">
                <CardHeader color="blue" variant="gradient" className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <BuildingOfficeIcon className="h-8 w-8 text-white" />
                            <div>
                                <Typography variant="h4" color="white">
                                    Proyecto en Remodelación
                                </Typography>
                                <Typography variant="small" color="white" className="mt-1">
                                    {proyecto.propiedad?.tipo || 'Propiedad'} - {formatearDireccion(proyecto.propiedad?.direccion)}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <Button
                                variant="outlined"
                                color="white"
                                className="flex items-center gap-2"
                                onClick={() => navigate(`/dashboard/remodelacion/${id}/editar`)}
                            >
                                <PencilIcon className="h-5 w-5" />
                                Editar
                            </Button>
                            <Button
                                variant="outlined"
                                color="white"
                                className="flex gap-2"
                                onClick={() => navigate('/dashboard/remodelacion')}
                            >
                                <ChevronLeftIcon className="h-4 w-4" />
                                Volver
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Información del Proyecto */}
            <Card className="mx-3 lg:mx-4">
                <CardBody className="p-6">
                    <Typography variant="h6" color="blue-gray" className="mb-4">
                        Información del Proyecto
                    </Typography>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-blue-gray-50 p-4 rounded-lg">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                                Propietario:
                            </Typography>
                            <Typography className="mt-1">
                                {proyecto.propietario?.nombre || 'N/A'}
                            </Typography>
                        </div>
                        
                        <div className="bg-blue-gray-50 p-4 rounded-lg">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                                Tipo de Propiedad:
                            </Typography>
                            <Typography className="mt-1">
                                {proyecto.propiedad?.tipo || 'N/A'}
                            </Typography>
                        </div>
                        
                        <div className="bg-blue-gray-50 p-4 rounded-lg">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                                Dirección:
                            </Typography>
                            <Typography className="mt-1">
                                {formatearDireccion(proyecto.propiedad?.direccion)}
                            </Typography>
                        </div>
                        
                        <div className="bg-blue-gray-50 p-4 rounded-lg">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                                Estatus:
                            </Typography>
                            <Chip
                                value={proyecto.estatus_actual}
                                color="blue"
                                size="sm"
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Información de Remodelación */}
                    {remodelacionData && (
                        <div className="mt-6">
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Información de Remodelación
                            </Typography>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Presupuesto Estimado:
                                    </Typography>
                                    <Typography variant="h6" color="green" className="font-bold mt-1">
                                        {remodelacionData.presupuesto_estimado 
                                            ? formatCurrency(remodelacionData.presupuesto_estimado)
                                            : 'Sin presupuesto'
                                        }
                                    </Typography>
                                </div>
                                
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Gastos Totales:
                                    </Typography>
                                    <Typography variant="h6" color="purple" className="font-bold mt-1">
                                        {formatCurrency(
                                            remodelacionData.gastos?.reduce((sum, gasto) => sum + (gasto.costo || 0), 0) || 0
                                        )}
                                    </Typography>
                                </div>
                                
                                <div className="bg-amber-50 p-4 rounded-lg">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Supervisor:
                                    </Typography>
                                    <Typography className="mt-1">
                                        {remodelacionData.supervisor?.nombre || 'Sin asignar'}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Tabs de Funcionalidades */}
            <Card className="mx-3 lg:mx-4">
                <CardBody className="p-0">
                    <Tabs value={activeTab} className="w-full">
                        <TabsHeader className="mb-6 flex flex-wrap md:flex-nowrap h-auto md:h-12 py-2 gap-1 bg-blue-gray-50 overflow-x-auto md:overflow-x-auto hide-scrollbar">
                            {TABS.map(({ label, value, icon: Icon }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => handleTabChange(value)}
                                    className={`py-2 px-3 whitespace-nowrap rounded-md transition-all flex items-center gap-2 ${
                                        activeTab === value ? "bg-white shadow-sm font-medium" : ""
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {label}
                                    {value === "notificaciones" && notificacionesNoLeidas > 0 && (
                                        <Chip
                                            value={notificacionesNoLeidas}
                                            color="red"
                                            size="sm"
                                            className="ml-1"
                                        />
                                    )}
                                </Tab>
                            ))}
                        </TabsHeader>

                        <div className="px-6 pb-6">
                            {/* Presupuesto */}
                            {activeTab === "presupuesto" && (
                                <Presupuesto 
                                    proyectoId={id} 
                                    userRole={user?.role || "guest"}
                                    proyecto={proyecto}
                                    remodelacionData={remodelacionData}
                                />
                            )}

                            {/* Gastos Administrativos */}
                            {activeTab === "gastos-admin" && (
                                <MaterialForm 
                                    proyectoId={id} 
                                    userRole="administrator"
                                />
                            )}

                            {/* Solicitudes de Material */}
                            {activeTab === "solicitudes" && (
                                <SolicitudForm 
                                    proyectoId={id} 
                                    userRole="administrator"
                                />
                            )}

                            {/* Carta de Responsabilidad */}
                            {activeTab === "carta" && (
                                <CartaResponsabilidad 
                                    proyectoId={id} 
                                    userRole="administrator"
                                />
                            )}

                            {/* Reportes */}
                            {activeTab === "reportes" && (
                                <Reportes 
                                    proyectoId={id} 
                                    userRole="administrator"
                                />
                            )}

                            {/* Notificaciones */}
                            {activeTab === "notificaciones" && (
                                <div className="p-6 text-center">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                        Notificaciones
                                    </h3>
                                    <p className="text-gray-500">
                                        Las notificaciones ahora se muestran en el menú global del navbar (icono de campana en la parte superior).
                                    </p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Haz clic en la campana en la parte superior derecha para ver todas las notificaciones.
                                    </p>
                                </div>
                            )}
                            
                            {/* Debug: Mostrar tab activo */}
                            {console.log('🔍 Tab activo:', activeTab, 'ID del proyecto:', id)}
                        </div>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
};

export default DetalleRemodelacion;
