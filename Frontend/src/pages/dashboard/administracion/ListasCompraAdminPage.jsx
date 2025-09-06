import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Typography, 
    Button, 
    Chip, 
    Input,
    Select,
    Option,
    Spinner,
    Alert
} from '@material-tailwind/react';
import { 
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    UserIcon,
    EyeIcon,
    CheckIcon,
    XMarkIcon,
    ExclamationCircleIcon,
    PrinterIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

// Configurar axios para esta página
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const ListasCompraAdminPage = () => {
    const navigate = useNavigate();
    const [listasCompra, setListasCompra] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [filtros, setFiltros] = useState({
        busqueda: '',
        estatus: 'todos',
        proyecto: 'todos'
    });
    const [proyectos, setProyectos] = useState([]);
    
    // Estados para modal de detalles
    const [showDetallesModal, setShowDetallesModal] = useState(false);
    const [listaSeleccionada, setListaSeleccionada] = useState(null);

    // Verificar autenticación del usuario
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
                    credentials: 'include'
                });
                
                const data = await response.json();
                
                if (data.success) {
                    setUser(data.user);
                } else {
                    navigate('/auth/sign-in');
                }
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                navigate('/auth/sign-in');
            }
        };
        
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        if (user) {
            cargarListasCompra();
            cargarProyectos();
        }
    }, [user]);

    const cargarListasCompra = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('📋 Cargando listas de compra para administración...');
            
            // Obtener todas las listas de compra aprobadas por supervisores
            const response = await axios.get('/api/lista-compra/admin/pendientes');
            
            console.log('📡 Respuesta del servidor:', response.data);
            
            if (response.data.success) {
                setListasCompra(response.data.data || []);
                console.log('✅ Listas de compra cargadas:', response.data.data.length);
            } else {
                throw new Error('Error al cargar listas de compra');
            }
        } catch (error) {
            console.error('❌ Error al cargar listas de compra:', error);
            setError(`Error al cargar las listas de compra: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const cargarProyectos = async () => {
        try {
            const response = await axios.get('/api/captaciones', {
                params: { estatus: 'Remodelacion' }
            });
            
            if (response.data && Array.isArray(response.data)) {
                setProyectos(response.data);
            }
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
        }
    };

    const handleFiltroChange = (name, value) => {
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const limpiarFiltros = () => {
        setFiltros({
            busqueda: '',
            estatus: 'todos',
            proyecto: 'todos'
        });
    };

    const aprobarListaCompra = async (listaId) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('✅ Aprobando lista de compra:', listaId);
            
            const response = await axios.post(`/api/lista-compra/${listaId}/admin/aprobar`, {
                comentarios: 'Lista de compra aprobada por administración'
            });

            if (response.data.success) {
                console.log('✅ Lista de compra aprobada exitosamente');
                // Recargar la lista
                await cargarListasCompra();
            } else {
                throw new Error(response.data.message || 'Error al aprobar lista de compra');
            }
        } catch (error) {
            console.error('❌ Error al aprobar lista de compra:', error);
            setError(error.response?.data?.message || error.message || 'Error al aprobar lista de compra');
        } finally {
            setLoading(false);
        }
    };

    const rechazarListaCompra = async (listaId) => {
        try {
            setLoading(true);
            setError(null);
            
            const motivo = prompt('¿Motivo del rechazo?');
            if (!motivo) {
                setLoading(false);
                return;
            }
            
            console.log('❌ Rechazando lista de compra:', listaId, 'Motivo:', motivo);
            
            const response = await axios.post(`/api/lista-compra/${listaId}/admin/rechazar`, {
                motivo_rechazo: motivo,
                comentarios: `Lista de compra rechazada por administración - Motivo: ${motivo}`
            });

            if (response.data.success) {
                console.log('✅ Lista de compra rechazada exitosamente');
                // Recargar la lista
                await cargarListasCompra();
            } else {
                throw new Error(response.data.message || 'Error al rechazar lista de compra');
            }
        } catch (error) {
            console.error('❌ Error al rechazar lista de compra:', error);
            setError(error.response?.data?.message || error.message || 'Error al rechazar lista de compra');
        } finally {
            setLoading(false);
        }
    };

    const abrirModalDetalles = (lista) => {
        setListaSeleccionada(lista);
        setShowDetallesModal(true);
    };

    const cerrarModalDetalles = () => {
        setShowDetallesModal(false);
        setListaSeleccionada(null);
    };

    const imprimirOrdenCompra = (lista) => {
        console.log('🖨️ Imprimiendo orden de compra para:', lista._id);
        // TODO: Implementar funcionalidad de impresión
        alert('Funcionalidad de impresión será implementada próximamente');
    };

    const formatearDireccion = (direccion) => {
        if (!direccion || typeof direccion !== 'object') return 'N/A';
        const { calle, numero, colonia, ciudad } = direccion;
        return `${calle || ''} ${numero || ''}, ${colonia || ''}, ${ciudad || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '') || 'N/A';
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

    const getStatusColor = (status) => {
        const colors = {
            'Aprobada': 'green',
            'Rechazada': 'red',
            'En revisión': 'blue',
            'Enviada': 'orange',
            'Borrador': 'gray',
            'Completada': 'purple'
        };
        return colors[status] || 'gray';
    };

    const getListasFiltradas = () => {
        let filtradas = [...listasCompra];

        // Filtro de búsqueda
        if (filtros.busqueda) {
            filtradas = filtradas.filter(lista =>
                lista.titulo?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                lista.descripcion?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                lista.contratista_id?.prim_nom?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                lista.contratista_id?.apell_pa?.toLowerCase().includes(filtros.busqueda.toLowerCase())
            );
        }

        // Filtro de estatus
        if (filtros.estatus !== 'todos') {
            filtradas = filtradas.filter(lista => lista.estatus_general === filtros.estatus);
        }

        // Filtro de proyecto
        if (filtros.proyecto !== 'todos') {
            filtradas = filtradas.filter(lista => lista.proyecto_id === filtros.proyecto);
        }

        return filtradas;
    };

    const listasFiltradas = getListasFiltradas();

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
                                    Administración de Listas de Compra
                                </Typography>
                                <Typography variant="small" color="white" className="mt-1">
                                    Revisión y aprobación de listas de compra aprobadas por supervisores
                                </Typography>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Filtros */}
            <Card className="mx-3 lg:mx-4">
                <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <Typography variant="h6" color="blue-gray">
                            Filtros de Búsqueda
                        </Typography>
                        <div className="flex gap-2">
                            <Button
                                color="gray"
                                size="sm"
                                variant="outlined"
                                onClick={limpiarFiltros}
                            >
                                Limpiar
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            type="text"
                            label="Buscar por título, descripción o contratista"
                            value={filtros.busqueda}
                            onChange={(e) => handleFiltroChange('busqueda', e.target.value)}
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                        
                        <Select
                            label="Estatus"
                            value={filtros.estatus}
                            onChange={(value) => handleFiltroChange('estatus', value)}
                        >
                            <Option value="todos">Todos los estatus</Option>
                            <Option value="Aprobada">Aprobada por Supervisor</Option>
                            <Option value="En revisión">En revisión</Option>
                            <Option value="Enviada">Enviada</Option>
                        </Select>
                        
                        <Select
                            label="Proyecto"
                            value={filtros.proyecto}
                            onChange={(value) => handleFiltroChange('proyecto', value)}
                        >
                            <Option value="todos">Todos los proyectos</Option>
                            {proyectos.map((proyecto) => (
                                <Option key={proyecto._id} value={proyecto._id}>
                                    {formatearDireccion(proyecto.propiedad?.direccion)}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </CardBody>
            </Card>

            {/* Alertas */}
            {error && (
                <div className="mx-3 lg:mx-4">
                    <Alert color="red" className="flex items-center gap-2">
                        <ExclamationCircleIcon className="h-5 w-5" />
                        {error}
                    </Alert>
                </div>
            )}

            {/* Lista de Listas de Compra */}
            <Card className="mx-3 lg:mx-4">
                <CardHeader color="green" variant="gradient" className="p-6">
                    <div className="flex items-center gap-3">
                        <BuildingOfficeIcon className="h-6 w-6" />
                        <Typography variant="h5" color="white">
                            Listas de Compra Pendientes ({listasFiltradas.length})
                        </Typography>
                    </div>
                </CardHeader>
                
                <CardBody className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center p-8">
                            <Spinner size="lg" />
                        </div>
                    ) : listasFiltradas.length === 0 ? (
                        <div className="text-center p-8">
                            <BuildingOfficeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <Typography variant="h6" color="gray" className="mb-2">
                                No hay listas de compra pendientes
                            </Typography>
                            <Typography color="gray">
                                {filtros.busqueda || filtros.estatus !== 'todos' || filtros.proyecto !== 'todos'
                                    ? 'Ajusta los filtros para ver más resultados'
                                    : 'Las listas de compra aparecerán aquí cuando sean aprobadas por supervisores'
                                }
                            </Typography>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px] table-auto">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Lista de Compra
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Proyecto
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Contratista
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Total
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Estatus
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Fecha
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Acciones
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {listasFiltradas.map((lista) => (
                                    <tr key={lista._id}>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div>
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    {lista.titulo || 'Lista de Compra'}
                                                </Typography>
                                                <Typography variant="small" color="gray">
                                                    {lista.materiales?.length || 0} materiales
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray">
                                                {formatearDireccion(lista.proyecto_id?.propiedad?.direccion)}
                                            </Typography>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-2">
                                                <UserIcon className="h-4 w-4 text-gray-500" />
                                                <Typography variant="small" color="blue-gray">
                                                    {lista.contratista_id ? 
                                                        `${lista.contratista_id.prim_nom || ''} ${lista.contratista_id.apell_pa || ''}`.trim() || lista.contratista_id.email
                                                        : 'N/A'}
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography variant="small" color="green" className="font-medium">
                                                {formatCurrency(lista.total_final || lista.total_estimado || 0)}
                                            </Typography>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Chip
                                                value={lista.estatus_general}
                                                color={getStatusColor(lista.estatus_general)}
                                                size="sm"
                                            />
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray">
                                                {formatDate(lista.fecha_creacion)}
                                            </Typography>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    color="blue"
                                                    variant="text"
                                                    className="p-2"
                                                    onClick={() => abrirModalDetalles(lista)}
                                                    title="Ver detalles"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </Button>
                                                
                                                {lista.estatus_general === 'Aprobada' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            color="green"
                                                            variant="outlined"
                                                            className="flex items-center gap-1 px-3 py-1"
                                                            onClick={() => aprobarListaCompra(lista._id)}
                                                            disabled={loading}
                                                            title="Aprobar compra"
                                                        >
                                                            <CheckIcon className="h-4 w-4" />
                                                            Aprobar
                                                        </Button>
                                                        
                                                        <Button
                                                            size="sm"
                                                            color="red"
                                                            variant="outlined"
                                                            className="flex items-center gap-1 px-3 py-1"
                                                            onClick={() => rechazarListaCompra(lista._id)}
                                                            disabled={loading}
                                                            title="Rechazar compra"
                                                        >
                                                            <XMarkIcon className="h-4 w-4" />
                                                            Rechazar
                                                        </Button>
                                                        
                                                        <Button
                                                            size="sm"
                                                            color="purple"
                                                            variant="outlined"
                                                            className="flex items-center gap-1 px-3 py-1"
                                                            onClick={() => imprimirOrdenCompra(lista)}
                                                            title="Imprimir orden de compra"
                                                        >
                                                            <PrinterIcon className="h-4 w-4" />
                                                            Imprimir
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Modal de Detalles */}
            {showDetallesModal && listaSeleccionada && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            📋 Detalles de Lista de Compra
                        </Typography>
                        
                        <Typography variant="small" color="gray" className="mb-6">
                            Lista: {listaSeleccionada.titulo} - Proyecto: {formatearDireccion(listaSeleccionada.proyecto_id?.propiedad?.direccion)}
                        </Typography>
                        
                        {/* Información General */}
                        <Card className="mb-6">
                            <CardBody className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Typography variant="small" color="gray" className="font-medium">📅 Fecha de Creación</Typography>
                                        <Typography variant="small" color="blue-gray">{formatDate(listaSeleccionada.fecha_creacion)}</Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" color="gray" className="font-medium">👤 Contratista</Typography>
                                        <Typography variant="small" color="blue-gray">
                                            {listaSeleccionada.contratista_id ? 
                                                `${listaSeleccionada.contratista_id.prim_nom || ''} ${listaSeleccionada.contratista_id.apell_pa || ''}`.trim() || listaSeleccionada.contratista_id.email
                                                : 'N/A'}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" color="gray" className="font-medium">💰 Total</Typography>
                                        <Typography variant="small" color="green" className="font-bold">
                                            {formatCurrency(listaSeleccionada.total_final || listaSeleccionada.total_estimado || 0)}
                                        </Typography>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Lista de Materiales */}
                        <div className="space-y-4">
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                📦 Materiales Solicitados
                            </Typography>
                            
                            {listaSeleccionada.materiales?.map((material, index) => (
                                <Card key={index} className="border-l-4 border-l-blue-500">
                                    <CardBody className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <Typography variant="h6" color="blue-gray" className="font-bold">
                                                    {material.tipo}
                                                </Typography>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                                    <div>
                                                        <Typography variant="small" color="gray">Cantidad</Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-medium">
                                                            {material.cantidad} {material.tipo_unidad}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="small" color="gray">Urgencia</Typography>
                                                        <Chip
                                                            value={material.urgencia}
                                                            color={
                                                                material.urgencia === 'Urgente' ? 'red' :
                                                                material.urgencia === 'Alta' ? 'orange' :
                                                                material.urgencia === 'Media' ? 'yellow' : 'green'
                                                            }
                                                            size="sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Typography variant="small" color="gray">Costo Estimado</Typography>
                                                        <Typography variant="small" color="blue" className="font-medium">
                                                            {formatCurrency(material.costo_estimado || 0)}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="small" color="gray">Costo Final</Typography>
                                                        <Typography variant="small" color="green" className="font-medium">
                                                            {formatCurrency(material.costo_final || 0)}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                {material.descripcion && (
                                                    <div className="mt-2">
                                                        <Typography variant="small" color="gray">Descripción</Typography>
                                                        <Typography variant="small" color="blue-gray">{material.descripcion}</Typography>
                                                    </div>
                                                )}
                                                {material.notas_supervisor && (
                                                    <div className="mt-2">
                                                        <Typography variant="small" color="gray">Notas del Supervisor</Typography>
                                                        <Typography variant="small" color="blue-gray">{material.notas_supervisor}</Typography>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Descripción General */}
                        {listaSeleccionada.descripcion && (
                            <Card className="mt-6">
                                <CardBody className="p-4">
                                    <Typography variant="small" color="gray" className="font-medium mb-2">📝 Descripción General</Typography>
                                    <Typography variant="small" color="blue-gray">{listaSeleccionada.descripcion}</Typography>
                                </CardBody>
                            </Card>
                        )}

                        {/* Botones de Acción */}
                        {listaSeleccionada.estatus_general === 'Aprobada' && (
                            <div className="flex gap-3 justify-end mt-6">
                                <Button
                                    size="lg"
                                    color="green"
                                    onClick={() => {
                                        aprobarListaCompra(listaSeleccionada._id);
                                        cerrarModalDetalles();
                                    }}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <CheckIcon className="h-5 w-5" />
                                    ✅ Aprobar Compra
                                </Button>
                                <Button
                                    size="lg"
                                    color="red"
                                    variant="outlined"
                                    onClick={() => {
                                        rechazarListaCompra(listaSeleccionada._id);
                                        cerrarModalDetalles();
                                    }}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                    ❌ Rechazar Compra
                                </Button>
                                <Button
                                    size="lg"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => imprimirOrdenCompra(listaSeleccionada)}
                                    className="flex items-center gap-2"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    🖨️ Imprimir Orden
                                </Button>
                            </div>
                        )}
                        
                        <div className="flex justify-end mt-6">
                            <Button
                                color="gray"
                                variant="outlined"
                                onClick={cerrarModalDetalles}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListasCompraAdminPage;
