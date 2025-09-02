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
    PencilIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    BuildingStorefrontIcon,
    ListBulletIcon,
    ExclamationCircleIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import { captacionesAPI } from '../../../services/api';
import axios from 'axios';

// Configurar axios para esta página
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const RemodelacionPage = () => {
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Función para formatear direcciones de objeto a string
    const formatearDireccion = (direccion) => {
        if (!direccion || typeof direccion !== 'object') return 'N/A';
        const { calle, numero, colonia, ciudad } = direccion;
        return `${calle || ''} ${numero || ''}, ${colonia || ''}, ${ciudad || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '') || 'N/A';
    };
    const [filtros, setFiltros] = useState({
        busqueda: '',
        supervisor: 'todos',
        presupuesto: 'todos'
    });
    const [contratistas, setContratistas] = useState([]);
    const [showAsignarModal, setShowAsignarModal] = useState(false);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
    const [contratistaSeleccionado, setContratistaSeleccionado] = useState('');
    const [estadisticas, setEstadisticas] = useState({
        total: 0,
        conPresupuesto: 0,
        sinPresupuesto: 0,
        gastosTotales: 0
    });
    
    // Estados para modales de contratista
    const [showSolicitudMaterialModal, setShowSolicitudMaterialModal] = useState(false);
    const [showRequerimientosModal, setShowRequerimientosModal] = useState(false);
    const [solicitudMaterial, setSolicitudMaterial] = useState({
        material: '',
        cantidad: '',
        descripcion: '',
        urgencia: 'Media'
    });
    const [requerimientos, setRequerimientos] = useState([]);
    
    // Estados para gestión de costos (supervisores)
    const [costosTemporales, setCostosTemporales] = useState({});
    const [guardandoCostos, setGuardandoCostos] = useState(false);

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
            cargarProyectosRemodelacion();
        }
    }, [user]);

    // Cargar contratistas solo si el usuario es supervisor
    useEffect(() => {
        if (user && (user.role === 'supervisor' || user.role === 'Supervisor')) {
            cargarContratistas();
        }
    }, [user]);

    const cargarContratistas = async () => {
        try {
            const response = await axios.get('/api/users', {
                params: { role: 'contratista' }
            });
            
            if (response.data && response.data.success && Array.isArray(response.data.users)) {
                setContratistas(response.data.users);
            }
        } catch (error) {
            console.error('Error al cargar contratistas:', error);
        }
    };

    const cargarProyectosRemodelacion = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('Cargando proyectos de remodelación...');
            
            // Construir parámetros para la consulta
            const params = {
                estatus: 'Remodelacion',
                page: 1,
                limit: 100
            };
            
            // El backend automáticamente filtrará por supervisor si el usuario tiene ese rol
            console.log('🔍 RemodelacionPage - Usuario actual:', user ? `${user.name} (${user.role})` : 'No user');
            
            console.log('🔍 RemodelacionPage - Parámetros:', params);
            
            // Usar axios para mantener consistencia con AuthContext
            const response = await axios.get('/api/captaciones', {
                params: params,
                withCredentials: true
            });
            
            console.log('Respuesta del servidor:', response.data);
            
            // El backend puede devolver: Array directo O {captaciones: Array, paginacion: {}}
            let captaciones = [];
            if (Array.isArray(response.data)) {
                captaciones = response.data;
            } else if (response.data && Array.isArray(response.data.captaciones)) {
                captaciones = response.data.captaciones;
            } else {
                console.error('Respuesta inválida del servidor:', response.data);
                setError('Error al cargar los proyectos - formato de respuesta inválido');
                return;
            }
            
            // Filtrar solo proyectos en estatus "Remodelacion"
            const proyectosRemodelacion = captaciones.filter(
                proyecto => proyecto.estatus_actual === 'Remodelacion'
            );
            
            console.log('Total captaciones recibidas:', captaciones.length);
            console.log('Proyectos en Remodelación encontrados:', proyectosRemodelacion.length);
            console.log('Proyectos filtrados:', proyectosRemodelacion);
            
            setProyectos(proyectosRemodelacion);
            calcularEstadisticas(proyectosRemodelacion);
        } catch (error) {
            console.error('Error al cargar proyectos de remodelación:', error);
            setError(`Error al cargar los proyectos de remodelación: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const calcularEstadisticas = (proyectos) => {
        const total = proyectos.length;
        const conPresupuesto = proyectos.filter(p => p.remodelacion?.presupuesto_estimado).length;
        const sinPresupuesto = total - conPresupuesto;
        
        const gastosTotales = proyectos.reduce((total, proyecto) => {
            const gastos = proyecto.remodelacion?.gastos || [];
            return total + gastos.reduce((sum, gasto) => sum + (gasto.costo || 0), 0);
        }, 0);

        setEstadisticas({
            total,
            conPresupuesto,
            sinPresupuesto,
            gastosTotales
        });
    };

    const handleFiltroChange = (name, value) => {
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const aplicarFiltros = () => {
        // Los filtros se aplican en tiempo real
        // No necesitamos recargar desde la API
    };

    const limpiarFiltros = () => {
        setFiltros({
            busqueda: '',
            supervisor: 'todos',
            presupuesto: 'todos'
        });
    };

    const abrirModalAsignar = (proyecto) => {
        setProyectoSeleccionado(proyecto);
        setContratistaSeleccionado(proyecto.remodelacion?.contratista?._id || '');
        setShowAsignarModal(true);
    };

    const cerrarModalAsignar = () => {
        setShowAsignarModal(false);
        setProyectoSeleccionado(null);
        setContratistaSeleccionado('');
    };

    const asignarContratista = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('🔧 Asignando contratista:', {
                proyecto: proyectoSeleccionado._id,
                contratista: contratistaSeleccionado
            });
            
            const requestData = {
                captacion: {
                    contratista_id: contratistaSeleccionado || null // Permite desasignar si está vacío
                }
            };
            
            console.log('📤 Datos a enviar:', JSON.stringify(requestData, null, 2));
            
            const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}`, requestData);

            console.log('📡 Respuesta del servidor:', response.data);

            if (response.data.success || response.data.captacion) {
                // Encontrar los datos del contratista seleccionado
                const contratistaData = contratistaSeleccionado 
                    ? contratistas.find(c => c._id === contratistaSeleccionado) 
                    : null;

                // Actualizar el proyecto en la lista local
                setProyectos(prevProyectos => 
                    prevProyectos.map(p => 
                        p._id === proyectoSeleccionado._id 
                            ? { 
                                ...p, 
                                remodelacion: { 
                                    ...p.remodelacion, 
                                    contratista: contratistaData 
                                } 
                            }
                            : p
                    )
                );
                
                console.log('✅ Contratista asignado exitosamente');
                cerrarModalAsignar();
            } else {
                throw new Error('Respuesta inesperada del servidor');
            }
        } catch (error) {
            console.error('❌ Error al asignar contratista:', error);
            const mensajeError = error.response?.data?.mensaje || error.message || 'Error al asignar contratista';
            setError(mensajeError);
        } finally {
            setLoading(false);
        }
    };

    // === FUNCIONES PARA MODALES DE CONTRATISTA ===
    
    const abrirModalSolicitudMaterial = (proyecto) => {
        setProyectoSeleccionado(proyecto);
        setSolicitudMaterial({
            material: '',
            cantidad: '',
            descripcion: '',
            urgencia: 'Media'
        });
        setShowSolicitudMaterialModal(true);
    };

    const cerrarModalSolicitudMaterial = () => {
        setShowSolicitudMaterialModal(false);
        setProyectoSeleccionado(null);
        setSolicitudMaterial({
            material: '',
            cantidad: '',
            descripcion: '',
            urgencia: 'Media'
        });
    };

    const enviarSolicitudMaterial = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('📦 Enviando solicitud de material:', {
                proyecto: proyectoSeleccionado._id,
                solicitud: solicitudMaterial
            });

            const requestData = {
                tipo: solicitudMaterial.material.trim(),
                cantidad: parseInt(solicitudMaterial.cantidad) || 1,
                notas: solicitudMaterial.descripcion.trim() + (solicitudMaterial.urgencia ? ` [Urgencia: ${solicitudMaterial.urgencia}]` : '')
            };

            const response = await axios.post(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/solicitar-material`, requestData);

            if (response.data.success) {
                console.log('✅ Solicitud de material enviada exitosamente');
                cerrarModalSolicitudMaterial();
                // Recargar proyectos para mostrar la nueva solicitud
                cargarProyectosRemodelacion();
            } else {
                throw new Error(response.data.message || 'Error al enviar solicitud');
            }
        } catch (error) {
            console.error('❌ Error al enviar solicitud de material:', error);
            const mensajeError = error.response?.data?.message || error.message || 'Error al enviar solicitud de material';
            setError(mensajeError);
        } finally {
            setLoading(false);
        }
    };

    const verRequerimientos = async (proyecto) => {
        try {
            console.log('🚀 INICIANDO verRequerimientos para proyecto:', proyecto._id);
            setProyectoSeleccionado(proyecto);
            setLoading(true);
            
            console.log('📋 Cargando requerimientos del proyecto:', proyecto._id);
            
            // Cargar solicitudes y materiales del proyecto
            const response = await axios.get(`/api/captaciones/${proyecto._id}/remodelacion/materiales`);
            
            console.log('📡 Respuesta del servidor:', response.data);
            
            if (response.data.success) {
                setRequerimientos(response.data.data || []);
                setShowRequerimientosModal(true);
            } else {
                throw new Error('Error al cargar requerimientos');
            }
        } catch (error) {
            console.error('❌ Error al cargar requerimientos:', error);
            setError('Error al cargar requerimientos del proyecto');
        } finally {
            setLoading(false);
        }
    };

    const cerrarModalRequerimientos = () => {
        setShowRequerimientosModal(false);
        setProyectoSeleccionado(null);
        setRequerimientos([]);
        setCostosTemporales({}); // Limpiar costos temporales
    };

    // === FUNCIONES PARA GESTIÓN DE COSTOS (SUPERVISORES) ===
    
    const manejarCambioCosto = (materialId, nuevoCosto) => {
        setCostosTemporales(prev => ({
            ...prev,
            [materialId]: nuevoCosto
        }));
    };

    const guardarCostoMaterial = async (material) => {
        console.log('🚀 INICIANDO guardarCostoMaterial');
        console.log('  - Material:', material._id, material.tipo);
        console.log('  - Estado actual guardandoCostos:', guardandoCostos);
        
        // Evitar múltiples clics
        if (guardandoCostos) {
            console.log('⏳ Ya se está guardando, evitando múltiple click');
            return;
        }

        const nuevoCosto = costosTemporales[material._id];
        console.log('  - Costo a guardar:', nuevoCosto);
        
        if (!nuevoCosto || parseFloat(nuevoCosto) <= 0) {
            console.log('❌ Costo inválido');
            setError('Por favor ingresa un costo válido');
            return;
        }

        try {
            console.log('✅ Estableciendo guardandoCostos = true');
            setGuardandoCostos(true);

            const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/materiales/${material._id}/costo`, {
                costo: parseFloat(nuevoCosto),
                estatus: 'Pendiente supervisión'
            });

            if (response.data.success) {
                // Actualizar el material en la lista local
                setRequerimientos(prev => 
                    prev.map(req => 
                        req._id === material._id 
                            ? { ...req, costo: parseFloat(nuevoCosto), estatus: 'Pendiente supervisión' }
                            : req
                    )
                );
                
                // Limpiar el costo temporal
                setCostosTemporales(prev => {
                    const nueva = { ...prev };
                    delete nueva[material._id];
                    return nueva;
                });
                
                console.log('✅ Costo guardado exitosamente');
                console.log('🔄 Material actualizado:', {
                    id: material._id,
                    tipo: material.tipo,
                    nuevoCosto: parseFloat(nuevoCosto),
                    nuevoEstatus: 'Pendiente supervisión'
                });
            } else {
                throw new Error('Error al guardar el costo');
            }
        } catch (error) {
            console.error('❌ Error al guardar costo:', error);
            setError('Error al guardar el costo del material');
        } finally {
            console.log('🏁 FINALIZANDO guardarCostoMaterial - estableciendo guardandoCostos = false');
            setGuardandoCostos(false);
        }
    };

    const actualizarCostoMaterial = async (material) => {
        console.log('🔄 INICIANDO actualizarCostoMaterial');
        console.log('  - Material:', material._id, material.tipo);
        console.log('  - Costo actual:', material.costo);
        console.log('  - Nuevo costo:', costosTemporales[material._id]);
        
        // Evitar múltiples clics
        if (guardandoCostos) {
            console.log('⏳ Ya se está actualizando, evitando múltiple click');
            return;
        }

        const nuevoCosto = costosTemporales[material._id];
        
        if (!nuevoCosto || parseFloat(nuevoCosto) <= 0) {
            console.log('❌ Nuevo costo inválido');
            setError('Por favor ingresa un costo válido');
            return;
        }

        // Verificar si realmente cambió el costo
        if (parseFloat(nuevoCosto) === parseFloat(material.costo)) {
            console.log('ℹ️ El costo no cambió, cancelando edición');
            setCostosTemporales(prev => {
                const nueva = { ...prev };
                delete nueva[material._id];
                return nueva;
            });
            return;
        }

        try {
            console.log('✅ Estableciendo guardandoCostos = true para actualización');
            setGuardandoCostos(true);

            const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/materiales/${material._id}/costo`, {
                costo: parseFloat(nuevoCosto),
                estatus: 'Pendiente supervisión'
            });

            if (response.data.success) {
                console.log('✅ Costo actualizado exitosamente');
                
                // Actualizar el estado local
                setRequerimientos(prev => 
                    prev.map(req => 
                        req._id === material._id 
                            ? { ...req, costo: parseFloat(nuevoCosto), estatus: 'Pendiente supervisión' }
                            : req
                    )
                );

                // Limpiar el estado temporal
                setCostosTemporales(prev => {
                    const nueva = { ...prev };
                    delete nueva[material._id];
                    return nueva;
                });

                setSuccessMessage('Costo actualizado exitosamente');
                
                // Log para debug
                console.log('🔄 Material actualizado:', {
                    id: material._id,
                    costoAnterior: material.costo,
                    nuevoCosto: parseFloat(nuevoCosto),
                    nuevoEstatus: 'Pendiente supervisión'
                });
            } else {
                throw new Error('Error al actualizar el costo');
            }
        } catch (error) {
            console.error('❌ Error al actualizar costo:', error);
            setError('Error al actualizar el costo del material');
        } finally {
            console.log('🏁 FINALIZANDO actualizarCostoMaterial - estableciendo guardandoCostos = false');
            setGuardandoCostos(false);
        }
    };

    const aprobarMaterial = async (material) => {
        // Evitar múltiples clics
        if (guardandoCostos) {
            console.log('⏳ Ya se está procesando, evitando múltiple click');
            return;
        }

        try {
            console.log('✅ INICIANDO aprobación de material:', material.tipo, material._id);
            setGuardandoCostos(true);
            
            const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/materiales/${material._id}/aprobar`, {
                decision: 'aprobado',
                mensaje: `Material aprobado por supervisor - ${material.tipo} - Costo: $${material.costo}`
            });

            if (response.data.success) {
                // Actualizar el estatus en la lista local
                setRequerimientos(prev => 
                    prev.map(req => 
                        req._id === material._id 
                            ? { ...req, estatus: 'Pendiente aprobación administrativa' }
                            : req
                    )
                );
                
                console.log('✅ Material aprobado y enviado a administración');
            } else {
                throw new Error('Error al aprobar material');
            }
        } catch (error) {
            console.error('❌ Error al aprobar material:', error);
            setError('Error al aprobar el material');
        } finally {
            setGuardandoCostos(false);
        }
    };

    const rechazarMaterial = async (material) => {
        // Evitar múltiples clics
        if (guardandoCostos) {
            console.log('⏳ Ya se está procesando, evitando múltiple click');
            return;
        }

        try {
            console.log('❌ INICIANDO rechazo de material:', material.tipo, material._id);
            setGuardandoCostos(true);
            
            const motivo = prompt('¿Motivo del rechazo?');
            if (!motivo) {
                setGuardandoCostos(false);
                return;
            }
            
            const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/materiales/${material._id}/rechazar`, {
                decision: 'rechazado',
                motivo: motivo,
                mensaje: `Material rechazado por supervisor - ${material.tipo} - Motivo: ${motivo}`
            });

            if (response.data.success) {
                // Actualizar el estatus en la lista local
                setRequerimientos(prev => 
                    prev.map(req => 
                        req._id === material._id 
                            ? { ...req, estatus: 'Rechazado por supervisor', motivo_rechazo: motivo }
                            : req
                    )
                );
                
                console.log('✅ Material rechazado exitosamente');
            } else {
                throw new Error('Error al rechazar material');
            }
        } catch (error) {
            console.error('❌ Error al rechazar material:', error);
            setError('Error al rechazar el material');
        } finally {
            setGuardandoCostos(false);
        }
    };

    const rechazarMaterialDirecto = async (material) => {
        // Evitar múltiples clics
        if (guardandoCostos) {
            console.log('⏳ Ya se está procesando, evitando múltiple click');
            return;
        }

        try {
            console.log('❌ INICIANDO rechazo directo de material:', material.tipo, material._id);
            setGuardandoCostos(true);
            
            const motivo = prompt('¿Por qué rechazas este material? (Ej: No es necesario, muy caro, etc.)');
            if (!motivo) {
                setGuardandoCostos(false);
                return;
            }
            
            const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/materiales/${material._id}/rechazar`, {
                decision: 'rechazado',
                motivo: motivo,
                mensaje: `Material rechazado por supervisor - ${material.tipo} - Motivo: ${motivo}`
            });

            if (response.data.success) {
                // Actualizar el estatus en la lista local
                setRequerimientos(prev => 
                    prev.map(req => 
                        req._id === material._id 
                            ? { ...req, estatus: 'Rechazado por supervisor', motivo_rechazo: motivo }
                            : req
                    )
                );
                
                console.log('✅ Material rechazado directamente');
            } else {
                throw new Error('Error al rechazar material');
            }
        } catch (error) {
            console.error('❌ Error al rechazar material directo:', error);
            setError('Error al rechazar el material');
        } finally {
            setGuardandoCostos(false);
        }
    };

    const getProyectosFiltrados = () => {
        let filtrados = [...proyectos];

        // Filtro de búsqueda
        if (filtros.busqueda) {
            filtrados = filtrados.filter(proyecto =>
                proyecto.propietario?.nombre?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                proyecto.propiedad?.direccion?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                proyecto.propiedad?.tipo?.toLowerCase().includes(filtros.busqueda.toLowerCase())
            );
        }

        // Filtro de supervisor
        if (filtros.supervisor !== 'todos') {
            filtrados = filtrados.filter(proyecto =>
                proyecto.remodelacion?.supervisor === filtros.supervisor
            );
        }

        // Filtro de presupuesto
        if (filtros.presupuesto === 'con') {
            filtrados = filtrados.filter(proyecto =>
                proyecto.remodelacion?.presupuesto_estimado
            );
        } else if (filtros.presupuesto === 'sin') {
            filtrados = filtrados.filter(proyecto =>
                !proyecto.remodelacion?.presupuesto_estimado
            );
        }

        return filtrados;
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
            'Remodelacion': 'blue',
            'En trámite legal': 'amber',
            'En venta': 'green',
            'Vendida': 'green',
            'Cancelada': 'red'
        };
        return colors[status] || 'gray';
    };

    const getPresupuestoColor = (proyecto) => {
        if (!proyecto.remodelacion?.presupuesto_estimado) return 'red';
        
        const presupuesto = proyecto.remodelacion.presupuesto_estimado;
        const gastos = proyecto.remodelacion?.gastos?.reduce((sum, gasto) => sum + (gasto.costo || 0), 0) || 0;
        const porcentaje = (gastos / presupuesto) * 100;
        
        if (porcentaje > 90) return 'red';
        if (porcentaje > 75) return 'orange';
        if (porcentaje > 50) return 'amber';
        return 'green';
    };

    const proyectosFiltrados = getProyectosFiltrados();

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
                                    Proyectos en Remodelación
                                </Typography>
                                <Typography variant="small" color="white" className="mt-1">
                                    Gestión y seguimiento de proyectos en proceso de remodelación
                                </Typography>
                            </div>
                        </div>
                        {/* Solo mostrar botón Ver Captaciones si el usuario no es supervisor o contratista */}
                        {user && !['supervisor', 'contratista'].includes(user.role) && (
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <Button
                                    variant="outlined"
                                    color="white"
                                    className="flex items-center gap-2"
                                    onClick={() => navigate('/dashboard/captaciones')}
                                >
                                    <EyeIcon className="h-5 w-5" />
                                    Ver Captaciones
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>
            </Card>

            {/* Estadísticas - OCULTAS para contratistas */}
            {user && user.role !== 'contratista' && (
                <div className="mx-3 lg:mx-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="mb-1">
                                        Total Proyectos
                                    </Typography>
                                    <Typography variant="h4" color="blue" className="font-bold">
                                        {estadisticas.total}
                                    </Typography>
                                </div>
                                <BuildingOfficeIcon className="h-8 w-8 text-blue-500" />
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="mb-1">
                                        Con Presupuesto
                                    </Typography>
                                    <Typography variant="h4" color="green" className="font-bold">
                                        {estadisticas.conPresupuesto}
                                    </Typography>
                                </div>
                                <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="mb-1">
                                        Sin Presupuesto
                                    </Typography>
                                    <Typography variant="h4" color="red" className="font-bold">
                                        {estadisticas.sinPresupuesto}
                                    </Typography>
                                </div>
                                <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="h6" color="blue-gray" className="mb-1">
                                        Gastos Totales
                                    </Typography>
                                    <Typography variant="h4" color="purple" className="font-bold">
                                        {formatCurrency(estadisticas.gastosTotales)}
                                    </Typography>
                                </div>
                                <CurrencyDollarIcon className="h-8 w-8 text-purple-500" />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}

            {/* Filtros */}
            <Card className="mx-3 lg:mx-4">
                <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <Typography variant="h6" color="blue-gray">
                            Filtros de Búsqueda
                        </Typography>
                        <div className="flex gap-2">
                            <Button
                                color="blue"
                                size="sm"
                                onClick={aplicarFiltros}
                                className="flex items-center gap-2"
                            >
                                <FunnelIcon className="h-4 w-4" />
                                Aplicar
                            </Button>
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
                            label="Buscar por nombre, dirección o tipo"
                            value={filtros.busqueda}
                            onChange={(e) => handleFiltroChange('busqueda', e.target.value)}
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                        
                        <Select
                            label="Supervisor"
                            value={filtros.supervisor}
                            onChange={(value) => handleFiltroChange('supervisor', value)}
                        >
                            <Option value="todos">Todos los supervisores</Option>
                            <Option value="sin_asignar">Sin supervisor asignado</Option>
                        </Select>
                        
                        <Select
                            label="Presupuesto"
                            value={filtros.presupuesto}
                            onChange={(value) => handleFiltroChange('presupuesto', value)}
                        >
                            <Option value="todos">Todos</Option>
                            <Option value="con">Con presupuesto</Option>
                            <Option value="sin">Sin presupuesto</Option>
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

            {/* Lista de Proyectos */}
            <Card className="mx-3 lg:mx-4">
                <CardHeader color="green" variant="gradient" className="p-6">
                    <div className="flex items-center gap-3">
                        <BuildingOfficeIcon className="h-6 w-6" />
                        <Typography variant="h5" color="white">
                            Proyectos en Remodelación ({proyectosFiltrados.length})
                        </Typography>
                    </div>
                </CardHeader>
                
                <CardBody className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center p-8">
                            <Spinner size="lg" />
                        </div>
                    ) : proyectosFiltrados.length === 0 ? (
                        <div className="text-center p-8">
                            <BuildingOfficeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <Typography variant="h6" color="gray" className="mb-2">
                                No hay proyectos en remodelación
                            </Typography>
                            <Typography color="gray">
                                {filtros.busqueda || filtros.supervisor !== 'todos' || filtros.presupuesto !== 'todos'
                                    ? 'Ajusta los filtros para ver más resultados'
                                    : 'Los proyectos aparecerán aquí cuando cambien a estatus "Remodelacion"'
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
                                                Propiedad
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Propietario
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Supervisor
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Contratista
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Presupuesto
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Gastos
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Estado
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
                                {proyectosFiltrados.map((proyecto) => (
                                    <tr key={proyecto._id}>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div>
                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                    {proyecto.propiedad?.tipo || 'N/A'}
                                                </Typography>
                                                <Typography variant="small" color="gray">
                                                    {formatearDireccion(proyecto.propiedad?.direccion)}
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography variant="small" color="blue-gray">
                                                {proyecto.propietario?.nombre || 'N/A'}
                                            </Typography>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-2">
                                                <UserIcon className="h-4 w-4 text-gray-500" />
                                                <Typography variant="small" color="blue-gray">
                                                    {proyecto.remodelacion?.supervisor ? 
                                                        `${proyecto.remodelacion.supervisor.prim_nom || ''} ${proyecto.remodelacion.supervisor.apell_pa || ''}`.trim() || proyecto.remodelacion.supervisor.email
                                                        : 'Sin asignar'}
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-2">
                                                <UserIcon className="h-4 w-4 text-gray-400" />
                                                <Typography variant="small" color="blue-gray">
                                                    {proyecto.remodelacion?.contratista ? 
                                                        `${proyecto.remodelacion.contratista.prim_nom || ''} ${proyecto.remodelacion.contratista.apell_pa || ''}`.trim() || proyecto.remodelacion.contratista.email
                                                        : 'Sin asignar'}
                                                </Typography>
                                            </div>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Chip
                                                value={proyecto.remodelacion?.presupuesto_estimado 
                                                    ? formatCurrency(proyecto.remodelacion.presupuesto_estimado)
                                                    : 'Sin presupuesto'
                                                }
                                                color={getPresupuestoColor(proyecto)}
                                                size="sm"
                                            />
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography variant="small" color="green" className="font-medium">
                                                {formatCurrency(
                                                    proyecto.remodelacion?.gastos?.reduce((sum, gasto) => sum + (gasto.costo || 0), 0) || 0
                                                )}
                                            </Typography>
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Chip
                                                value={proyecto.estatus_actual}
                                                color={getStatusColor(proyecto.estatus_actual)}
                                                size="sm"
                                            />
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex gap-2">
                                                {/* Contratistas: Solo ver su propio proyecto y solicitar materiales */}
                                                {user?.role === 'contratista' ? (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            color="orange"
                                                            variant="outlined"
                                                            className="flex items-center gap-1 px-3 py-1"
                                                            onClick={() => abrirModalSolicitudMaterial(proyecto)}
                                                            title="Solicitar Material"
                                                        >
                                                            <BuildingStorefrontIcon className="h-4 w-4" />
                                                            Material
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            color="blue"
                                                            variant="outlined"
                                                            className="flex items-center gap-1 px-3 py-1"
                                                            onClick={() => verRequerimientos(proyecto)}
                                                            title="Ver Requerimientos"
                                                        >
                                                            <ListBulletIcon className="h-4 w-4" />
                                                            Requerimientos
                                                        </Button>
                                                    </div>
                                                ) : user?.role === 'supervisor' || user?.role === 'Supervisor' ? (
                                                    /* Vista específica para supervisores */
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            color="blue"
                                                            variant="text"
                                                            className="p-2"
                                                            onClick={() => navigate(`/dashboard/remodelacion/${proyecto._id}`)}
                                                            title="Ver detalles"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                        
                                                        <Button
                                                            size="sm"
                                                            color="green"
                                                            variant="outlined"
                                                            className="flex items-center gap-1 px-3 py-1"
                                                            onClick={() => verRequerimientos(proyecto)}
                                                            title="Gestionar Requerimientos y Costos"
                                                        >
                                                            <CurrencyDollarIcon className="h-4 w-4" />
                                                            Costos
                                                        </Button>
                                                        
                                                        <Button
                                                            size="sm"
                                                            color="blue"
                                                            variant="text"
                                                            className="p-2"
                                                            onClick={() => abrirModalAsignar(proyecto)}
                                                            title="Asignar contratista"
                                                        >
                                                            <UserIcon className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    /* Otros roles (administradores): Mantener funcionalidad original */
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            color="blue"
                                                            variant="text"
                                                            className="p-2"
                                                            onClick={() => navigate(`/dashboard/remodelacion/${proyecto._id}`)}
                                                            title="Ver detalles"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                        
                                                        <Button
                                                            size="sm"
                                                            color="green"
                                                            variant="text"
                                                            className="p-2"
                                                            onClick={() => navigate(`/dashboard/remodelacion/${proyecto._id}/editar`)}
                                                            title="Editar proyecto"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
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

            {/* Modal para asignar contratista */}
            {showAsignarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            Asignar Contratista
                        </Typography>
                        
                        <Typography variant="small" color="gray" className="mb-4">
                            Proyecto: {proyectoSeleccionado?.propiedad ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : 'N/A'}
                        </Typography>
                        
                        <div className="mb-6">
                            <Select
                                label="Seleccionar Contratista"
                                value={contratistaSeleccionado}
                                onChange={(value) => setContratistaSeleccionado(value)}
                            >
                                <Option value="">Sin contratista</Option>
                                {contratistas.map((contratista) => (
                                    <Option key={contratista._id} value={contratista._id}>
                                        {`${contratista.prim_nom || ''} ${contratista.apell_pa || ''}`.trim() || contratista.email}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        
                        <div className="flex gap-4 justify-end">
                            <Button
                                variant="text"
                                color="gray"
                                onClick={cerrarModalAsignar}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                color="blue"
                                onClick={asignarContratista}
                                disabled={loading}
                            >
                                {loading ? 'Asignando...' : 'Asignar'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para solicitar material */}
            {showSolicitudMaterialModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            🏗️ Solicitar Material
                        </Typography>
                        
                        <Typography variant="small" color="gray" className="mb-4">
                            Proyecto: {proyectoSeleccionado?.propiedad ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : 'N/A'}
                        </Typography>
                        
                        <div className="space-y-4">
                            <Input
                                label="Nombre del Material"
                                value={solicitudMaterial.material}
                                onChange={(e) => setSolicitudMaterial(prev => ({ ...prev, material: e.target.value }))}
                                placeholder="Ej: Cemento, Ladrillo, Pintura..."
                            />
                            
                            <Input
                                label="Cantidad"
                                type="number"
                                value={solicitudMaterial.cantidad}
                                onChange={(e) => setSolicitudMaterial(prev => ({ ...prev, cantidad: e.target.value }))}
                                placeholder="Cantidad necesaria"
                            />
                            
                            <div>
                                <Select
                                    label="Urgencia"
                                    value={solicitudMaterial.urgencia}
                                    onChange={(value) => setSolicitudMaterial(prev => ({ ...prev, urgencia: value }))}
                                >
                                    <Option value="Baja">🟢 Baja</Option>
                                    <Option value="Media">🟡 Media</Option>
                                    <Option value="Alta">🟠 Alta</Option>
                                    <Option value="Urgente">🔴 Urgente</Option>
                                </Select>
                            </div>
                            
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                                rows="3"
                                placeholder="Descripción adicional o especificaciones..."
                                value={solicitudMaterial.descripcion}
                                onChange={(e) => setSolicitudMaterial(prev => ({ ...prev, descripcion: e.target.value }))}
                            />
                        </div>
                        
                        <div className="flex gap-4 justify-end mt-6">
                            <Button
                                variant="text"
                                color="gray"
                                onClick={cerrarModalSolicitudMaterial}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                color="orange"
                                onClick={enviarSolicitudMaterial}
                                disabled={loading || !solicitudMaterial.material.trim()}
                            >
                                {loading ? 'Enviando...' : 'Enviar Solicitud'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para ver requerimientos */}
            {showRequerimientosModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            {user?.role === 'supervisor' || user?.role === 'Supervisor' 
                                ? '💰 Gestión de Costos y Requerimientos' 
                                : '📋 Mis Requerimientos'
                            }
                        </Typography>
                        
                        <Typography variant="small" color="gray" className="mb-6">
                            Proyecto: {proyectoSeleccionado?.propiedad ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : 'N/A'}
                        </Typography>
                        
                        {requerimientos.length === 0 ? (
                            <div className="text-center py-8">
                                <Typography variant="h6" color="gray">
                                    No hay requerimientos registrados
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Puedes solicitar materiales utilizando el botón "Material"
                                </Typography>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {requerimientos.map((req, index) => (
                                    <Card key={index} className="border-l-4 border-l-blue-500 shadow-lg">
                                        <CardBody className="p-6">
                                            {/* Encabezado del Material */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                                        {req.tipo || 'Material'}
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="mt-1">
                                                        Cantidad: <span className="font-medium text-blue-gray-800">{req.cantidad || 'N/A'}</span>
                                                    </Typography>
                                                </div>
                                                <Chip
                                                    value={req.estatus || 'Pendiente'}
                                                    color={
                                                        req.estatus === 'Entregado' ? 'green' :
                                                        req.estatus === 'Aprobado para su compra' ? 'blue' :
                                                        req.estatus === 'En proceso de entrega' ? 'orange' :
                                                        req.estatus === 'Pendiente supervisión' ? 'amber' :
                                                        req.estatus === 'Pendiente aprobación administrativa' ? 'purple' :
                                                        req.estatus === 'Rechazado por supervisor' ? 'red' :
                                                        req.estatus === 'Solicitando material' ? 'gray' : 'gray'
                                                    }
                                                    size="lg"
                                                    className="font-medium"
                                                />
                                            </div>

                                            {/* Información del Material */}
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Sección de Costo */}
                                                                                            {(user?.role === 'supervisor' || user?.role === 'Supervisor') ? (
                                            <div className="bg-white rounded-lg p-3 border">
                                                <Typography variant="small" color="gray" className="font-medium mb-2">💰 Gestión de Costo</Typography>
                                                {req.costo > 0 && costosTemporales[req._id] === undefined ? (
                                                    <div className="flex items-center justify-between">
                                                        <Typography variant="h6" color="green" className="font-bold">
                                                            ${req.costo?.toLocaleString('es-MX') || '0'}
                                                        </Typography>
                                                        <Button
                                                            size="sm"
                                                            color="blue"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                console.log('✏️ Habilitando edición de costo para:', req._id);
                                                                setCostosTemporales(prev => ({
                                                                    ...prev,
                                                                    [req._id]: req.costo.toString()
                                                                }));
                                                            }}
                                                            className="ml-2 px-2 py-1"
                                                        >
                                                            ✏️ Editar
                                                        </Button>
                                                    </div>
                                                ) : (req.costo > 0 && costosTemporales[req._id] !== undefined) ? (
                                                    <div className="flex gap-2 items-center">
                                                        <Input
                                                            type="number"
                                                            size="lg"
                                                            placeholder="Modifica el costo..."
                                                            value={costosTemporales[req._id] || ''}
                                                            onChange={(e) => manejarCambioCosto(req._id, e.target.value)}
                                                            className="flex-1"
                                                            step="0.01"
                                                            min="0"
                                                            label="Costo (MXN)"
                                                        />
                                                        <Button
                                                            size="lg"
                                                            color="green"
                                                            onClick={() => {
                                                                console.log('💾 Actualizando costo existente - Material:', req._id, 'Nuevo costo:', costosTemporales[req._id]);
                                                                actualizarCostoMaterial(req);
                                                            }}
                                                            disabled={!costosTemporales[req._id] || parseFloat(costosTemporales[req._id] || 0) <= 0 || guardandoCostos}
                                                            className="px-4"
                                                        >
                                                            {guardandoCostos ? 'Actualizando...' : '💾 Actualizar'}
                                                        </Button>
                                                        <Button
                                                            size="lg"
                                                            color="gray"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                console.log('❌ Cancelando edición de costo para:', req._id);
                                                                setCostosTemporales(prev => {
                                                                    const nueva = { ...prev };
                                                                    delete nueva[req._id];
                                                                    return nueva;
                                                                });
                                                            }}
                                                            className="px-3"
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    // Solo mostrar input si el supervisor habilitó el modo de agregar costo
                                                    costosTemporales[req._id] !== undefined ? (
                                                        <div className="flex gap-2 items-center">
                                                            <Input
                                                                type="number"
                                                                size="lg"
                                                                placeholder="Ingresa el costo..."
                                                                value={costosTemporales[req._id] || ''}
                                                                onChange={(e) => manejarCambioCosto(req._id, e.target.value)}
                                                                className="flex-1"
                                                                step="0.01"
                                                                min="0"
                                                                label="Costo (MXN)"
                                                            />
                                                            <Button
                                                                size="lg"
                                                                color="green"
                                                                onClick={() => {
                                                                    console.log('🔘 CLICK BOTÓN GUARDAR - Material:', req._id, 'Costo:', costosTemporales[req._id]);
                                                                    guardarCostoMaterial(req);
                                                                }}
                                                                disabled={!costosTemporales[req._id] || parseFloat(costosTemporales[req._id] || 0) <= 0 || guardandoCostos}
                                                                className="px-4"
                                                            >
                                                                {guardandoCostos ? 'Guardando...' : 'Guardar'}
                                                            </Button>
                                                            <Button
                                                                size="lg"
                                                                color="gray"
                                                                variant="outlined"
                                                                onClick={() => {
                                                                    setCostosTemporales(prev => {
                                                                        const nueva = { ...prev };
                                                                        delete nueva[req._id];
                                                                        return nueva;
                                                                    });
                                                                }}
                                                                className="px-3"
                                                            >
                                                                Cancelar
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Typography variant="small" color="gray" className="text-center py-2">
                                                            Use los botones de abajo para gestionar este material
                                                        </Typography>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                                        /* Vista para contratistas */
                                                        req.costo > 0 && (
                                                            <div className="bg-white rounded-lg p-3 border">
                                                                <Typography variant="small" color="gray" className="font-medium mb-2">💰 Costo</Typography>
                                                                <Typography variant="h6" color="green" className="font-bold">
                                                                    ${req.costo?.toLocaleString('es-MX') || '0'}
                                                                </Typography>
                                                            </div>
                                                        )
                                                    )}
                                                    
                                                    {/* Información adicional */}
                                                    <div className="space-y-3">
                                                        {req.tipo_gasto && (
                                                            <div>
                                                                <Typography variant="small" color="gray" className="font-medium">📝 Tipo de Gasto</Typography>
                                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                                    {req.tipo_gasto === 'Solicitud_Contratista' ? 'Solicitado por Contratista' : 'Administrativo'}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                        {req.usuario_registro && (
                                                            <div>
                                                                <Typography variant="small" color="gray" className="font-medium">👤 Solicitado por</Typography>
                                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                                    {req.usuario_registro.prim_nom} {req.usuario_registro.apell_pa}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <Typography variant="small" color="gray" className="font-medium">📅 Fecha de Solicitud</Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                                {req.fecha_registro ? new Date(req.fecha_registro).toLocaleDateString() : 'N/A'}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Notas */}
                                            {req.notas && (
                                                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                                    <Typography variant="small" color="blue-gray" className="font-medium mb-1">📋 Notas</Typography>
                                                    <Typography variant="small" color="blue-gray">{req.notas}</Typography>
                                                </div>
                                            )}

                                            {/* Motivo de rechazo */}
                                            {req.motivo_rechazo && (
                                                <div className="bg-red-50 rounded-lg p-3 mb-4">
                                                    <Typography variant="small" color="red" className="font-medium mb-1">❌ Motivo de Rechazo</Typography>
                                                    <Typography variant="small" color="red">{req.motivo_rechazo}</Typography>
                                                </div>
                                            )}

                                                            {/* Acciones del Supervisor */}
                {(user?.role === 'supervisor' || user?.role === 'Supervisor') && (
                    <div className="mt-4 pt-4 border-t">
                        {/* CASO 1: Material recién solicitado - Supervisor puede agregar costo o rechazar directamente */}
                        {req.estatus === 'Solicitando material' && req.costo === 0 && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="red"
                                    variant="outlined"
                                    onClick={() => rechazarMaterialDirecto(req)}
                                    disabled={guardandoCostos}
                                    className="flex items-center gap-2"
                                >
                                    <ExclamationCircleIcon className="h-5 w-5" />
                                    Rechazar Material
                                </Button>
                                {costosTemporales[req._id] === undefined && (
                                    <Button
                                        size="lg"
                                        color="blue"
                                        variant="outlined"
                                        onClick={() => {
                                            console.log('➕ Habilitando modo agregar costo para:', req._id);
                                            setCostosTemporales(prev => ({
                                                ...prev,
                                                [req._id]: ''
                                            }));
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <CurrencyDollarIcon className="h-5 w-5" />
                                        Agregar Costo
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* CASO 2: Material con costo pendiente de supervisión - Aprobar o Rechazar */}
                        {req.costo > 0 && req.estatus === 'Pendiente supervisión' && costosTemporales[req._id] === undefined && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="red"
                                    variant="outlined"
                                    onClick={() => rechazarMaterial(req)}
                                    disabled={guardandoCostos}
                                    className="flex items-center gap-2"
                                >
                                    <ExclamationCircleIcon className="h-5 w-5" />
                                    Rechazar
                                </Button>
                                <Button
                                    size="lg"
                                    color="green"
                                    onClick={() => aprobarMaterial(req)}
                                    disabled={guardandoCostos}
                                    className="flex items-center gap-2"
                                >
                                    <CheckIcon className="h-5 w-5" />
                                    Aprobar y Enviar a Admin
                                </Button>
                            </div>
                        )}

                        {/* CASO 3: Material ya aprobado pero editable - Solo mostrar estado */}
                        {req.estatus === 'Pendiente aprobación administrativa' && (
                            <div className="flex justify-center">
                                <div className="bg-blue-50 rounded-lg p-3">
                                    <Typography variant="small" color="blue" className="text-center">
                                        ✅ Material aprobado y enviado a administración
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO 4: Material rechazado - Solo mostrar estado */}
                        {req.estatus === 'Rechazado por supervisor' && (
                            <div className="flex justify-center">
                                <div className="bg-red-50 rounded-lg p-3">
                                    <Typography variant="small" color="red" className="text-center">
                                        ❌ Material rechazado por supervisor
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        )}
                        
                        <div className="flex justify-end mt-6">
                            <Button
                                color="blue"
                                onClick={cerrarModalRequerimientos}
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

export default RemodelacionPage;
