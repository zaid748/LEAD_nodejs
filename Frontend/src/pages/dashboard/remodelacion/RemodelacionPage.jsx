import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExcelJS from 'exceljs';
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
    Alert,
    Textarea,
    IconButton
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
    CheckIcon,
    XMarkIcon,
    PrinterIcon,
    ShoppingBagIcon,
    DocumentCheckIcon
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
    
    // Estados para modal de lista de compra
    const [showListaCompraModal, setShowListaCompraModal] = useState(false);
    const [listaCompra, setListaCompra] = useState({
        titulo: '',
        descripcion: '',
        materiales: [],
        notas_generales: ''
    });
    const [materialActual, setMaterialActual] = useState({
        tipo: '',
        cantidad: '',
        tipo_unidad: 'Pieza',
        urgencia: 'Media',
        descripcion: ''
    });
    
    // Estados para edición de listas
    const [editandoLista, setEditandoLista] = useState(false);
    const [listaEditando, setListaEditando] = useState(null);
    
    // Estados para gestión de costos (supervisores)
    const [costosTemporales, setCostosTemporales] = useState({});
    const [guardandoCostos, setGuardandoCostos] = useState(false);

    // Estados para modal de costos de lista de compra
    const [showCostosModal, setShowCostosModal] = useState(false);
    const [listaParaCostos, setListaParaCostos] = useState(null);
    const [costosMateriales, setCostosMateriales] = useState([]);
    const [totalCalculado, setTotalCalculado] = useState(0);

    // Estados para funcionalidad de administración
    const [showListasCompraModal, setShowListasCompraModal] = useState(false);
    const [listasCompra, setListasCompra] = useState([]);
    const [showDetallesListaModal, setShowDetallesListaModal] = useState(false);
    const [listaSeleccionada, setListaSeleccionada] = useState(null);

    // Estados para funcionalidad de recibido/comprado
    const [showFirmaModal, setShowFirmaModal] = useState(false);
    const [listaParaFirma, setListaParaFirma] = useState(null);
    const [firmaContratista, setFirmaContratista] = useState('');
    const [firmaDigital, setFirmaDigital] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [showFirmaDetalles, setShowFirmaDetalles] = useState(false);
    const [showComprobanteModal, setShowComprobanteModal] = useState(false);
    const [listaParaComprobante, setListaParaComprobante] = useState(null);
    const [comprobantesFiles, setComprobantesFiles] = useState([]);
    const [proveedorGeneral, setProveedorGeneral] = useState('');
    const [notasGenerales, setNotasGenerales] = useState('');
    const [costosComprobante, setCostosComprobante] = useState([]);

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
            return total + gastos.reduce((sum, gasto) => sum + (gasto.monto || gasto.costo || 0), 0);
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
            
            console.log('📋 Cargando listas de compra del proyecto:', proyecto._id);
            
            // Cargar listas de compra del proyecto
            const response = await axios.get(`/api/lista-compra/proyecto/${proyecto._id}`);
            
            console.log('📡 Respuesta del servidor:', response.data);
            
            if (response.data.success) {
                console.log('✅ Listas de compra recibidas:', response.data.data);
                console.log('🔍 Verificando estados de las listas:');
                response.data.data.forEach((lista, index) => {
                    console.log(`  Lista ${index + 1}: ${lista.titulo} - Estado: ${lista.estatus_general}`);
                });
                setRequerimientos(response.data.data || []);
                setShowRequerimientosModal(true);
            } else {
                throw new Error('Error al cargar listas de compra');
            }
        } catch (error) {
            console.error('❌ Error al cargar listas de compra:', error);
            setError('Error al cargar listas de compra del proyecto');
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

    // === FUNCIONES PARA LISTA DE COMPRA ===
    
    const abrirModalListaCompra = (proyecto) => {
        setProyectoSeleccionado(proyecto);
        setListaCompra({
            titulo: '',
            descripcion: '',
            materiales: [],
            notas_generales: ''
        });
        setMaterialActual({
            tipo: '',
            cantidad: '',
            tipo_unidad: 'Pieza',
            urgencia: 'Media',
            descripcion: ''
        });
        setShowListaCompraModal(true);
    };

    const cerrarModalListaCompra = () => {
        setShowListaCompraModal(false);
        setProyectoSeleccionado(null);
        setEditandoLista(false);
        setListaEditando(null);
        setListaCompra({
            titulo: '',
            descripcion: '',
            materiales: [],
            notas_generales: ''
        });
        setMaterialActual({
            tipo: '',
            cantidad: '',
            tipo_unidad: 'Pieza',
            urgencia: 'Media',
            descripcion: ''
        });
    };

    const agregarMaterialALista = () => {
        if (!materialActual.tipo || !materialActual.cantidad) {
            setError('Por favor complete el tipo y cantidad del material');
            return;
        }

        const nuevoMaterial = {
            ...materialActual,
            cantidad: parseInt(materialActual.cantidad) || 1
        };

        setListaCompra(prev => ({
            ...prev,
            materiales: [...prev.materiales, nuevoMaterial]
        }));

        // Limpiar formulario
        setMaterialActual({
            tipo: '',
            cantidad: '',
            tipo_unidad: 'Pieza',
            urgencia: 'Media',
            descripcion: ''
        });
    };

    const eliminarMaterialDeLista = (index) => {
        setListaCompra(prev => ({
            ...prev,
            materiales: prev.materiales.filter((_, i) => i !== index)
        }));
    };

    const crearListaCompra = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!listaCompra.titulo.trim()) {
                setError('Por favor ingrese un título para la lista');
                return;
            }

            if (listaCompra.materiales.length === 0) {
                setError('Por favor agregue al menos un material a la lista');
                return;
            }

            const requestData = {
                proyecto_id: proyectoSeleccionado._id,
                titulo: listaCompra.titulo.trim(),
                descripcion: listaCompra.descripcion.trim(),
                materiales: listaCompra.materiales,
                notas_generales: listaCompra.notas_generales.trim()
            };

            console.log('📦 Creando lista de compra:', requestData);

            const response = await axios.post('/api/lista-compra', requestData);

            if (response.data.success) {
                console.log('✅ Lista de compra creada exitosamente');
                cerrarModalListaCompra();
                // Recargar proyectos si es necesario
                await cargarProyectosRemodelacion();
            } else {
                throw new Error(response.data.message || 'Error al crear lista de compra');
            }
        } catch (error) {
            console.error('❌ Error al crear lista de compra:', error);
            setError(error.response?.data?.message || error.message || 'Error al crear lista de compra');
        } finally {
            setLoading(false);
        }
    };

    // Función para editar lista existente
    const editarListaCompra = (lista) => {
        // Solo permitir editar si está en estado "Borrador" (recién creada, no enviada)
        if (lista.estatus_general !== 'Borrador') {
            setError('Solo se pueden editar listas en estado "Borrador" (recién creadas)');
            return;
        }

        setListaEditando(lista);
        setEditandoLista(true);
        setListaCompra({
            titulo: lista.titulo || '',
            descripcion: lista.descripcion || '',
            materiales: lista.materiales || [],
            notas_generales: lista.notas_generales || ''
        });
        setShowListaCompraModal(true);
    };

    // Función para actualizar lista existente
    const actualizarListaCompra = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔍 Iniciando actualización de lista...');
            console.log('📋 Datos de la lista:', listaCompra);
            console.log('🆔 ID de lista editando:', listaEditando?._id);

            if (!listaCompra.titulo.trim()) {
                setError('Por favor ingrese un título para la lista');
                return;
            }

            if (listaCompra.materiales.length === 0) {
                setError('Por favor agregue al menos un material a la lista');
                return;
            }

            if (!listaEditando?._id) {
                setError('No se encontró el ID de la lista a actualizar');
                return;
            }

            const requestData = {
                titulo: listaCompra.titulo.trim(),
                descripcion: listaCompra.descripcion.trim(),
                materiales: listaCompra.materiales,
                notas_generales: listaCompra.notas_generales.trim()
            };

            console.log('✏️ Actualizando lista de compra:', listaEditando._id, requestData);
            console.log('🌐 URL de la petición:', `/api/lista-compra/${listaEditando._id}`);

            const response = await axios.put(`/api/lista-compra/${listaEditando._id}`, requestData);

            console.log('📡 Respuesta del servidor:', response.data);

            if (response.data.success) {
                console.log('✅ Lista de compra actualizada exitosamente');
                cerrarModalListaCompra();
                // Recargar requerimientos si el modal está abierto
                if (proyectoSeleccionado) {
                    console.log('🔄 Recargando requerimientos...');
                    await verRequerimientos(proyectoSeleccionado);
                }
                // También recargar la lista de proyectos para refrescar los datos
                console.log('🔄 Recargando proyectos...');
                await cargarProyectosRemodelacion();
            } else {
                throw new Error(response.data.message || 'Error al actualizar lista de compra');
            }
        } catch (error) {
            console.error('❌ Error al actualizar lista de compra:', error);
            console.error('📊 Detalles del error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                statusText: error.response?.statusText
            });
            setError(error.response?.data?.message || error.message || 'Error al actualizar lista de compra');
        } finally {
            setLoading(false);
        }
    };

    // === FUNCIONES PARA RECIBIDO Y COMPRADO ===

    // Función para abrir modal de firma (contratista)
    const abrirModalFirma = (lista) => {
        setListaParaFirma(lista);
        setFirmaContratista('');
        setShowFirmaModal(true);
    };

    // Función para cerrar modal de firma
    const cerrarModalFirma = () => {
        setShowFirmaModal(false);
        setListaParaFirma(null);
        setFirmaContratista('');
        setFirmaDigital(null);
        setIsDrawing(false);
    };

    // Funciones para firma digital
    const canvasRef = React.useRef(null);

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        // Guardar la firma como imagen
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/png');
        setFirmaDigital(dataURL);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setFirmaDigital(null);
    };

    // Configurar canvas cuando se abre el modal
    React.useEffect(() => {
        if (showFirmaModal && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // Configurar estilo de dibujo
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [showFirmaModal]);

    // Función para marcar como recibida (contratista)
    const marcarComoRecibida = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!firmaDigital) {
                setError('La firma digital es obligatoria para confirmar la recepción');
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/lista-compra/${listaParaFirma._id}/recibida`,
                {
                    firma_contratista: firmaDigital,
                    comentarios: `Material recibido y firmado digitalmente por ${user.prim_nom} ${user.apell_pa}`,
                    tipo_firma: 'digital'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                cerrarModalFirma();
                // Recargar datos para reflejar cambios inmediatamente
                await cargarProyectosRemodelacion();
                // Recargar requerimientos si el modal está abierto
                if (proyectoSeleccionado) {
                    await verRequerimientos(proyectoSeleccionado);
                }
                // Mostrar notificación de éxito
                alert('✅ Material marcado como recibido exitosamente');
            } else {
                throw new Error(response.data.message || 'Error al marcar como recibida');
            }

        } catch (error) {
            console.error('Error al marcar como recibida:', error);
            setError(error.response?.data?.message || error.message || 'Error al marcar como recibida');
        } finally {
            setLoading(false);
        }
    };

    // Función para abrir modal de comprobante (supervisor)
    const abrirModalComprobante = (lista) => {
        setListaParaComprobante(lista);
        setComprobantesFiles([]);
        setProveedorGeneral('');
        setNotasGenerales('');
        
        // Inicializar costos con los valores que el supervisor ya ingresó
        const costosIniciales = lista.materiales.map((material, index) => ({
            index: index,
            costo_final: material.costo_final || material.costo_estimado || 0,
            notas: material.notas_supervisor || ''
        }));
        setCostosComprobante(costosIniciales);
        
        setShowComprobanteModal(true);
    };

    // Función para cerrar modal de comprobante
    const cerrarModalComprobante = () => {
        setShowComprobanteModal(false);
        setListaParaComprobante(null);
        setComprobantesFiles([]);
        setProveedorGeneral('');
        setNotasGenerales('');
        setCostosComprobante([]);
    };

    // Función para manejar selección de archivos de comprobante
    const handleComprobanteSelect = (e) => {
        const files = Array.from(e.target.files);
        setComprobantesFiles(prev => [...prev, ...files]);
        setError(null);
    };

    // Función para eliminar archivo de comprobante
    const removeComprobanteFile = (index) => {
        setComprobantesFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Función para actualizar costo en modal de comprobante
    const actualizarCostoComprobante = (index, campo, valor) => {
        const nuevosCostos = [...costosComprobante];
        nuevosCostos[index] = {
            ...nuevosCostos[index],
            [campo]: campo === 'costo_final' ? parseFloat(valor) || 0 : valor
        };
        setCostosComprobante(nuevosCostos);
    };

    // Función para calcular total de comprobante
    const calcularTotalComprobante = () => {
        return costosComprobante.reduce((sum, costo) => sum + (costo.costo_final || 0), 0);
    };

    // Función para marcar como comprada (supervisor)
    const marcarComoComprada = async () => {
        try {
            setLoading(true);
            setError(null);

            // Crear FormData para enviar archivos
            const formData = new FormData();
            formData.append('proveedor', proveedorGeneral);
            formData.append('notas', notasGenerales);
            formData.append('comentarios', `Material comprado por ${user.prim_nom} ${user.apell_pa}`);
            
            // Agregar costos actualizados
            console.log('🔍 Costos a enviar:', costosComprobante);
            formData.append('costos_actualizados', JSON.stringify(costosComprobante));
            
            // Agregar archivos de comprobante
            console.log('🔍 Archivos a enviar:', comprobantesFiles.length);
            comprobantesFiles.forEach((file, index) => {
                console.log(`🔍 Archivo ${index}:`, file.name, file.size);
                formData.append('comprobantes', file);
            });

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/lista-compra/${listaParaComprobante._id}/comprada`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                cerrarModalComprobante();
                // Recargar datos para reflejar cambios inmediatamente
                await cargarProyectosRemodelacion();
                // Recargar requerimientos si el modal está abierto
                if (proyectoSeleccionado) {
                    await verRequerimientos(proyectoSeleccionado);
                }
                // Mostrar notificación de éxito
                alert('✅ Material marcado como comprado exitosamente');
            } else {
                throw new Error(response.data.message || 'Error al marcar como comprada');
            }

        } catch (error) {
            console.error('Error al marcar como comprada:', error);
            setError(error.response?.data?.message || error.message || 'Error al marcar como comprada');
        } finally {
            setLoading(false);
        }
    };

    // === FUNCIONES PARA GESTIÓN DE COSTOS (SUPERVISORES) ===
    
    const manejarCambioCosto = (materialId, nuevoCosto) => {
        setCostosTemporales(prev => ({
            ...prev,
            [materialId]: nuevoCosto
        }));
    };

    const abrirModalCostos = (lista) => {
        setListaParaCostos(lista);
        // Inicializar costos con valores existentes o 0
        const costosIniciales = lista.materiales.map(material => ({
            index: lista.materiales.indexOf(material),
            costo_final: material.costo_final || 0,
            notas: material.notas_supervisor || ''
        }));
        setCostosMateriales(costosIniciales);
        calcularTotal(costosIniciales);
        setShowCostosModal(true);
    };

    const cerrarModalCostos = () => {
        setShowCostosModal(false);
        setListaParaCostos(null);
        setCostosMateriales([]);
        setTotalCalculado(0);
    };

    const actualizarCostoMaterial = (index, campo, valor) => {
        const nuevosCostos = [...costosMateriales];
        nuevosCostos[index] = {
            ...nuevosCostos[index],
            [campo]: campo === 'costo_final' ? parseFloat(valor) || 0 : valor
        };
        setCostosMateriales(nuevosCostos);
        calcularTotal(nuevosCostos);
    };

    const calcularTotal = (costos) => {
        const total = costos.reduce((sum, costo) => sum + (costo.costo_final || 0), 0);
        setTotalCalculado(total);
    };

    const guardarCostosYContinuar = async () => {
        try {
            setLoading(true);
            
            // Validar que todos los costos estén ingresados
            const costosFaltantes = costosMateriales.filter(costo => !costo.costo_final || costo.costo_final <= 0);
            if (costosFaltantes.length > 0) {
                setError('Debe ingresar un costo válido para todos los materiales');
            return;
        }

            const response = await axios.post(`/api/lista-compra/${listaParaCostos._id}/ingresar-costos`, {
                materiales_costos: costosMateriales
            });

            if (response.data.success) {
                console.log('✅ Costos guardados exitosamente');
                console.log('📊 Respuesta del servidor:', response.data);
                setError('');
                // Recargar la lista de requerimientos
                if (proyectoSeleccionado) {
                    await verRequerimientos(proyectoSeleccionado);
                }
                cerrarModalCostos();
            } else {
                throw new Error(response.data.message || 'Error al guardar costos');
            }
        } catch (error) {
            console.error('❌ Error al guardar costos:', error);
            setError(error.response?.data?.message || error.message || 'Error al guardar costos');
        } finally {
            setLoading(false);
        }
    };

    const aprobarListaConCostos = async (listaId) => {
        try {
            setLoading(true);
            const response = await axios.post(`/api/lista-compra/${listaId}/revisar`, {
                accion: 'aprobar',
                comentarios: 'Lista de compra aprobada por supervisor con costos verificados'
            });

            if (response.data.success) {
                console.log('✅ Lista de compra aprobada exitosamente');
                // Recargar la lista de requerimientos
                if (proyectoSeleccionado) {
                    await verRequerimientos(proyectoSeleccionado);
                }
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
            const motivo = prompt('¿Motivo del rechazo?');
            if (!motivo) {
                setLoading(false);
                return;
            }
            
            const response = await axios.post(`/api/lista-compra/${listaId}/revisar`, {
                accion: 'rechazar',
                comentarios: motivo
            });
            
            if (response.data.success) {
                console.log('✅ Lista de compra rechazada exitosamente');
                // Recargar la lista de requerimientos
                if (proyectoSeleccionado) {
                    await verRequerimientos(proyectoSeleccionado);
                }
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

    // Función para enviar lista de compra al supervisor (contratistas)
    const enviarListaCompra = async (listaId) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.post(`/api/lista-compra/${listaId}/enviar`);
            
            if (response.data.success) {
                // Recargar la lista de requerimientos
                if (proyectoSeleccionado) {
                    await verRequerimientos(proyectoSeleccionado);
                }
                // Mostrar mensaje de éxito
                alert('✅ Lista de compra enviada al supervisor exitosamente');
            } else {
                throw new Error(response.data.message || 'Error al enviar lista de compra');
            }
        } catch (error) {
            console.error('Error al enviar lista de compra:', error);
            setError(error.response?.data?.message || error.message || 'Error al enviar lista de compra');
        } finally {
            setLoading(false);
        }
    };

    // Función para aprobar lista de compra (supervisores)
    const aprobarListaCompra = async (listaId) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('✅ Aprobando lista de compra:', listaId);
            
            const response = await axios.post(`/api/lista-compra/${listaId}/revisar`, {
                accion: 'aprobar',
                comentarios: 'Lista de compra aprobada por supervisor'
            });
            
            if (response.data.success) {
                console.log('✅ Lista de compra aprobada exitosamente');
                // Recargar la lista de requerimientos
                if (proyectoSeleccionado) {
                    await verRequerimientos(proyectoSeleccionado);
                }
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

    // === FUNCIONES PARA ADMINISTRACIÓN ===
    
    const verListasCompraAdmin = async (proyecto) => {
        try {
            setLoading(true);
            setError(null);
            
            if (!proyecto?._id) {
                throw new Error('Proyecto no válido para cargar listas de compra');
            }
            
            console.log('📋 Cargando listas de compra para administración por proyecto...', proyecto._id);
            
            // Obtener listas de compra del proyecto seleccionado
            const response = await axios.get(`/api/lista-compra/proyecto/${proyecto._id}`, {
                withCredentials: true
            });
            
            console.log('📡 Respuesta del servidor:', response.data);
            
            if (response.data.success) {
                setListasCompra(response.data.data || []);
                setShowListasCompraModal(true);
                console.log('✅ Listas de compra cargadas para el proyecto:', response.data.data.length);
            } else {
                throw new Error('Error al cargar listas de compra del proyecto');
            }
        } catch (error) {
            console.error('❌ Error al cargar listas de compra:', error);
            setError(`Error al cargar las listas de compra del proyecto: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const abrirModalDetallesLista = (lista) => {
        setListaSeleccionada(lista);
        setShowDetallesListaModal(true);
    };

    const cerrarModalDetallesLista = () => {
        setShowDetallesListaModal(false);
        setListaSeleccionada(null);
        setShowFirmaDetalles(false);
    };

    const toggleFirmaDetalles = () => {
        setShowFirmaDetalles(!showFirmaDetalles);
    };

    const cerrarModalListasCompra = () => {
        setShowListasCompraModal(false);
        setListasCompra([]);
    };

    const imprimirOrdenCompra = async (lista) => {
        try {
            console.log('📊 Generando archivo Excel para lista:', lista._id);
            
            // Obtener información del proyecto
            const proyectoId = lista.proyecto_id?._id || lista.proyecto_id;
            const proyecto = proyectos.find(p => p._id === proyectoId);
            if (!proyecto) {
                console.error('❌ No se encontró información del proyecto:', proyectoId);
                alert('No se encontró información del proyecto');
                return;
            }

            // Obtener información del contratista y supervisor
            const contratistaId = lista.contratista_id?._id || lista.contratista_id;
            const contratista = contratistas.find(c => c._id === contratistaId);
            const supervisor = lista.supervisor_id;
            
            console.log('🔍 Datos obtenidos para Excel:');
            console.log('  - Proyecto ID:', proyectoId);
            console.log('  - Proyecto:', proyecto.titulo || 'Sin título');
            console.log('  - Contratista ID:', contratistaId);
            console.log('  - Contratista encontrado:', contratista);
            console.log('  - Contratista nombre:', contratista ? `${contratista.prim_nom} ${contratista.apell_pa}` : 'No encontrado');
            console.log('  - Supervisor:', supervisor ? `${supervisor.prim_nom} ${supervisor.apell_pa}` : 'No encontrado');
            console.log('  - Lista contratista_id:', lista.contratista_id);
            console.log('  - Contratistas disponibles:', contratistas.length);

            // Generar número de RFM
            const fecha = new Date();
            const year = fecha.getFullYear().toString().slice(-2);
            const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
            const day = fecha.getDate().toString().padStart(2, '0');
            const numeroRFM = `RFM-${proyecto._id.slice(-2)}-${year}${month}${day}-${lista._id.slice(-2)}`;

            // Cargar la plantilla desde el servidor
            const response = await fetch(`${import.meta.env.VITE_API_URL}/files/RFM-19-250130-28 hotel 16.xlsx`);
            if (!response.ok) {
                throw new Error('No se pudo cargar la plantilla Excel');
            }
            const arrayBuffer = await response.arrayBuffer();

            // Crear el workbook desde la plantilla
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(arrayBuffer);
            const worksheet = workbook.getWorksheet(1); // Obtener la primera hoja

            // Llenar la plantilla con los datos específicos
            // Actualizar el número RFM (en la celda G3)
            worksheet.getCell('G3').value = numeroRFM;
            
            // Actualizar información del proyecto (en la celda B5)
            const proyectoNombre = proyecto.titulo || 
                                  proyecto.propiedad?.direccion?.completa || 
                                  `${proyecto.propiedad?.direccion?.calle || ''} ${proyecto.propiedad?.direccion?.numero_exterior || ''}`.trim() ||
                                  `Proyecto ${proyecto._id.slice(-4)}`;
            worksheet.getCell('B5').value = proyectoNombre;
            
            // Actualizar nombre del contratista (en la celda F5)
            let contratistaNombre = 'N/A';
            
            if (contratista) {
                contratistaNombre = `${contratista.prim_nom || ''} ${contratista.apell_pa || ''}`.trim() || 
                                  contratista.email || 
                                  'Contratista sin nombre';
            } else if (lista.contratista_id && typeof lista.contratista_id === 'object') {
                // Si contratista_id es un objeto poblado directamente
                contratistaNombre = `${lista.contratista_id.prim_nom || ''} ${lista.contratista_id.apell_pa || ''}`.trim() || 
                                  lista.contratista_id.email || 
                                  'Contratista sin nombre';
            } else {
                console.warn('⚠️ No se pudo obtener información del contratista');
            }
            
            worksheet.getCell('F5').value = contratistaNombre;
            
            // Actualizar nombre del supervisor (en la celda F6)
            const supervisorNombre = supervisor ? 
                `${supervisor.prim_nom || ''} ${supervisor.apell_pa || ''}`.trim() || 
                supervisor.email || 
                'Supervisor sin nombre' : 
                'N/A';
            worksheet.getCell('F6').value = supervisorNombre;
            
            // Llenar la tabla de materiales (empezando desde la fila 15)
            let startRow = 15;
            lista.materiales.forEach((material, index) => {
                const row = startRow + index;
                worksheet.getCell(`A${row}`).value = index + 1; // ID
                worksheet.getCell(`B${row}`).value = material.tipo || 'N/A'; // ITEM
                worksheet.getCell(`C${row}`).value = material.tipo_unidad || 'N/A'; // UNIT
                worksheet.getCell(`D${row}`).value = material.cantidad || 0; // QUANTITY
                worksheet.getCell(`E${row}`).value = material.cantidad || 0; // QUANTITY (segunda columna)
                worksheet.getCell(`F${row}`).value = material.descripcion || 'N/A'; // DESCRIPTION
                // NO se agrega precio/costo según especificación del usuario
            });
            
            // Actualizar aprobado por (en la celda B46)
            worksheet.getCell('B46').value = supervisorNombre;
            
            // Actualizar fecha de solicitud (en la celda B48)
            worksheet.getCell('B48').value = new Date().toLocaleDateString();
            
            // Actualizar fecha de entrega solicitada (en la celda J37)
            worksheet.getCell('J37').value = new Date().toLocaleDateString();
            
            // Actualizar dirección del proyecto (en la celda B51)
            const direccionProyecto = proyecto.propiedad?.direccion ? 
                `${proyecto.propiedad.direccion.calle || ''} ${proyecto.propiedad.direccion.numero || ''}`.trim() ||
                `${proyecto.propiedad.direccion.calle || ''}, ${proyecto.propiedad.direccion.colonia || ''}, ${proyecto.propiedad.direccion.ciudad || ''}`.trim() ||
                'Dirección no disponible' : 
                'N/A';
            worksheet.getCell('B51').value = direccionProyecto;
            
            // Actualizar teléfono del contratista (en la celda B53)
            let contratistaTelefono = 'N/A';
            
            // Prioridad 1: Buscar en el objeto contratista encontrado
            if (contratista?.telefono) {
                contratistaTelefono = contratista.telefono;
            }
            // Prioridad 2: Buscar directamente en lista.contratista_id si es un objeto poblado
            else if (lista.contratista_id && typeof lista.contratista_id === 'object' && lista.contratista_id.telefono) {
                contratistaTelefono = lista.contratista_id.telefono;
            }
            // Prioridad 3: Buscar en campos alternativos
            else if (contratista?.phone) {
                contratistaTelefono = contratista.phone;
            }
            // Prioridad 4: Si no se encuentra, hacer consulta adicional
            else if (contratistaId) {
                try {
                    console.log('🔍 Consultando datos completos del contratista:', contratistaId);
                    const contratistaResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${contratistaId}`, {
                        withCredentials: true
                    });
                    
                    if (contratistaResponse.data.success && contratistaResponse.data.user.telefono) {
                        contratistaTelefono = contratistaResponse.data.user.telefono;
                        console.log('✅ Teléfono obtenido de consulta adicional:', contratistaTelefono);
                    }
                } catch (error) {
                    console.warn('⚠️ No se pudo obtener teléfono del contratista:', error.message);
                }
            }
            
            console.log('📞 Teléfono final del contratista:', contratistaTelefono);
            worksheet.getCell('B53').value = contratistaTelefono;

            // Generar el nombre del archivo
            const fileName = `RFM-${proyecto._id.slice(-2)}-${year}${month}${day}-${lista._id.slice(-2)}.xlsx`;

            // Descargar el archivo
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log('✅ Archivo Excel generado y descargado:', fileName);
            alert(`Archivo Excel "${fileName}" descargado exitosamente`);

        } catch (error) {
            console.error('❌ Error al generar archivo Excel:', error);
            alert('Error al generar el archivo Excel. Intenta nuevamente.');
        }
    };





    const guardarCostoMaterial = async (material) => {
        console.log('🚀 INICIANDO guardarCostoMaterial');
        console.log('  - Material:', material._id, material.tipo);
        console.log('  - Estado actual loading:', loading);
        
        // Evitar múltiples clics
        if (loading) {
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
            console.log('✅ Estableciendo loading = true');
            setGuardandoCostos(true);

            const response = await axios.put(`/api/captaciones/${proyectoSeleccionado._id}/remodelacion/materiales/${material._id}/costo`, {
                costo: parseFloat(nuevoCosto),
                estatus: 'Pendiente supervisión'
            });

            if (response.data.success) {
                // Actualizar el material en la lista local
                setRequerimientos(prev => 
                    prev.map(req => 
                        lista._id === material._id 
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
            console.log('🏁 FINALIZANDO guardarCostoMaterial - estableciendo loading = false');
            setGuardandoCostos(false);
        }
    };

    const aprobarMaterial = async (material) => {
        // Evitar múltiples clics
        if (loading) {
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
                        lista._id === material._id 
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
        if (loading) {
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
                        lista._id === material._id 
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
        if (loading) {
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
                        lista._id === material._id 
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

    const getListaCompraStatusColor = (status) => {
        const colors = {
            'Aprobada': 'green',
            'Rechazada': 'red',
            'En revisión': 'blue',
            'Enviada': 'orange',
            'Borrador': 'gray',
            'En compra': 'purple',
            'Completada': 'purple'
        };
        return colors[status] || 'gray';
    };

    const getPresupuestoColor = (proyecto) => {
        if (!proyecto.remodelacion?.presupuesto_estimado) return 'red';
        
        const presupuesto = proyecto.remodelacion.presupuesto_estimado;
        const gastos = proyecto.remodelacion?.gastos?.reduce((sum, gasto) => sum + (gasto.monto || gasto.costo || 0), 0) || 0;
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
                                                Supervisor
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                            <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                                Contratista
                                            </Typography>
                                        </th>
                                        {user?.role !== 'contratista' && (
                                            <>
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
                                                        Presupuesto Restante
                                                    </Typography>
                                                </th>
                                            </>
                                        )}
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
                                        
                                        {user?.role !== 'contratista' && (
                                            <>
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
                                                            proyecto.remodelacion?.gastos?.reduce((sum, gasto) => sum + (gasto.monto || gasto.costo || 0), 0) || 0
                                                )}
                                            </Typography>
                                        </td>
                                                
                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <Typography variant="small" color="blue" className="font-medium">
                                                        {proyecto.remodelacion?.presupuesto_restante !== undefined 
                                                            ? formatCurrency(proyecto.remodelacion.presupuesto_restante)
                                                            : proyecto.remodelacion?.presupuesto_estimado 
                                                                ? formatCurrency(proyecto.remodelacion.presupuesto_estimado - (proyecto.remodelacion?.gastos?.reduce((sum, gasto) => sum + (gasto.monto || gasto.costo || 0), 0) || 0))
                                                                : 'Sin presupuesto'
                                                        }
                                                    </Typography>
                                                </td>
                                            </>
                                        )}
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Chip
                                                value={proyecto.estatus_actual}
                                                color={getStatusColor(proyecto.estatus_actual)}
                                                size="sm"
                                            />
                                        </td>
                                        
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex gap-2">
                                                {/* Contratistas: Solo ver su propio proyecto y crear listas de compra */}
                                                {user?.role === 'contratista' ? (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            color="orange"
                                                            variant="outlined"
                                                            className="flex items-center gap-1 px-3 py-1"
                                                            onClick={() => abrirModalListaCompra(proyecto)}
                                                            title="Crear Lista de Compra"
                                                        >
                                                            <BuildingStorefrontIcon className="h-4 w-4" />
                                                            Lista de Compra
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

                                                        {/* Botón para administradores - Ver Listas de Compra */}
                                                        {['administrator', 'administrador', 'ayudante de administrador'].includes(user?.role) && (
                                                            <Button
                                                                size="sm"
                                                                color="purple"
                                                                variant="outlined"
                                                                className="flex items-center gap-1 px-3 py-1"
                                                                onClick={() => verListasCompraAdmin(proyecto)}
                                                                title="Ver Listas de Compra"
                                                            >
                                                                <PrinterIcon className="h-4 w-4" />
                                                                Listas de Compra
                                                            </Button>
                                                        )}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9997]">
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9997]">
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

            {/* Modal para crear lista de compra */}
            {showListaCompraModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
                        {/* Header del modal */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="h4" color="white" className="font-bold">
                                        {editandoLista ? '✏️ Editar Lista de Compra' : '📦 Crear Lista de Compra'}
                                    </Typography>
                                    <Typography variant="small" color="white" className="mt-2 opacity-90">
                                        Proyecto: {proyectoSeleccionado?.propiedad ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : 'N/A'}
                                    </Typography>
                                </div>
                                <Button
                                    variant="text"
                                    color="white"
                                    onClick={cerrarModalListaCompra}
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                        
                        {/* Contenido del modal */}
                        <div className="flex-1 overflow-y-auto p-8">

                            {/* Información general de la lista */}
                            <Card className="mb-8 shadow-lg border-0">
                                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-4">
                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                        📝 Información General
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <Input
                                                label="Título de la Lista"
                                                value={listaCompra.titulo}
                                                onChange={(e) => setListaCompra(prev => ({ ...prev, titulo: e.target.value }))}
                                                placeholder="Ej: Materiales para cimentación"
                                                size="lg"
                                            />
                                        </div>
                                        <div>
                                            <Textarea
                                                label="Descripción General"
                                                value={listaCompra.descripcion}
                                                onChange={(e) => setListaCompra(prev => ({ ...prev, descripcion: e.target.value }))}
                                                placeholder="Descripción general de la lista de compra..."
                                                rows="3"
                                                size="lg"
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Formulario para agregar materiales */}
                            <Card className="mb-8 shadow-lg border-0">
                                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-4">
                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                        ➕ Agregar Material
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                        <div>
                                            <Input
                                                label="Tipo de Material"
                                                value={materialActual.tipo}
                                                onChange={(e) => setMaterialActual(prev => ({ ...prev, tipo: e.target.value }))}
                                                placeholder="Ej: Cemento, Ladrillo..."
                                                size="lg"
                                            />
                                        </div>
                                        
                                        <div>
                                            <Input
                                                label="Cantidad"
                                                type="number"
                                                value={materialActual.cantidad}
                                                onChange={(e) => setMaterialActual(prev => ({ ...prev, cantidad: e.target.value }))}
                                                placeholder="Cantidad"
                                                size="lg"
                                            />
                                        </div>
                                        
                                        <div>
                                            <Select
                                                label="Tipo de Unidad"
                                                value={materialActual.tipo_unidad}
                                                onChange={(value) => setMaterialActual(prev => ({ ...prev, tipo_unidad: value }))}
                                                size="lg"
                                            >
                                                <Option value="Pieza">Pieza</Option>
                                                <Option value="Kilogramo">Kilogramo</Option>
                                                <Option value="Litro">Litro</Option>
                                                <Option value="Metro">Metro</Option>
                                                <Option value="Metro cuadrado">Metro cuadrado</Option>
                                                <Option value="Metro cúbico">Metro cúbico</Option>
                                                <Option value="Caja">Caja</Option>
                                                <Option value="Bolsa">Bolsa</Option>
                                                <Option value="Rollo">Rollo</Option>
                                                <Option value="Costal">Costal</Option>
                                                <Option value="Saco">Saco</Option>
                                                <Option value="Bulto">Bulto</Option>
                                                <Option value="Tubo">Tubo</Option>
                                                <Option value="Varilla">Varilla</Option>
                                                <Option value="Lámina">Lámina</Option>
                                                <Option value="Placa">Placa</Option>
                                                <Option value="Tabla">Tabla</Option>
                                                <Option value="Viga">Viga</Option>
                                                <Option value="Poste">Poste</Option>
                                                <Option value="Bloque">Bloque</Option>
                                                <Option value="Ladrillo">Ladrillo</Option>
                                                <Option value="Quintal">Quintal</Option>
                                                <Option value="Tonelada">Tonelada</Option>
                                                <Option value="Otro">Otro</Option>
                                            </Select>
                                        </div>
                                        
                                        <div>
                                            <Select
                                                label="Urgencia"
                                                value={materialActual.urgencia}
                                                onChange={(value) => setMaterialActual(prev => ({ ...prev, urgencia: value }))}
                                                size="lg"
                                            >
                                                <Option value="Baja">🟢 Baja</Option>
                                                <Option value="Media">🟡 Media</Option>
                                                <Option value="Alta">🟠 Alta</Option>
                                                <Option value="Urgente">🔴 Urgente</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2">
                                            <Textarea
                                                label="Descripción del Material"
                                                value={materialActual.descripcion}
                                                onChange={(e) => setMaterialActual(prev => ({ ...prev, descripcion: e.target.value }))}
                                                placeholder="Especificaciones adicionales del material..."
                                                rows="3"
                                                size="lg"
                                            />
                                        </div>
                                        
                                        <div className="flex items-end">
                                            <Button
                                                color="green"
                                                size="lg"
                                                onClick={agregarMaterialALista}
                                                disabled={!materialActual.tipo || !materialActual.cantidad}
                                                className="w-full h-full py-4 text-lg font-bold"
                                            >
                                                ➕ Agregar Material
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Lista de materiales agregados */}
                            {listaCompra.materiales.length > 0 && (
                                <Card className="mb-8 shadow-lg border-0">
                                    <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 pb-4">
                                        <Typography variant="h5" color="blue-gray" className="font-bold">
                                            📋 Materiales en la Lista ({listaCompra.materiales.length})
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="pt-6">
                                        <div className="space-y-4">
                                            {listaCompra.materiales.map((material, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Typography variant="h6" color="blue-gray" className="font-bold">
                                                                {material.tipo}
                                                            </Typography>
                                                            <Chip
                                                                value={`${material.cantidad} ${material.tipo_unidad}`}
                                                                color="blue"
                                                                size="sm"
                                                                className="font-medium"
                                                            />
                                                            <Chip
                                                                value={material.urgencia}
                                                                color={
                                                                    material.urgencia === 'Urgente' ? 'red' :
                                                                    material.urgencia === 'Alta' ? 'orange' :
                                                                    material.urgencia === 'Media' ? 'amber' : 'green'
                                                                }
                                                                size="sm"
                                                                className="font-medium"
                                                            />
                                                        </div>
                                                        {material.descripcion && (
                                                            <Typography variant="small" color="gray" className="italic">
                                                                {material.descripcion}
                                                            </Typography>
                                                        )}
                                                    </div>
                                                    <IconButton
                                                        color="red"
                                                        variant="filled"
                                                        onClick={() => eliminarMaterialDeLista(index)}
                                                        className="ml-4 hover:bg-red-600"
                                                    >
                                                        <XMarkIcon className="h-5 w-5" />
                                                    </IconButton>
                                                </div>
                                            ))}
                                        </div>
                                    </CardBody>
                                </Card>
                            )}

                            {/* Notas generales */}
                            <Card className="mb-8 shadow-lg border-0">
                                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 pb-4">
                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                        📝 Notas Generales
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-6">
                                    <Textarea
                                        label="Notas Adicionales"
                                        value={listaCompra.notas_generales}
                                        onChange={(e) => setListaCompra(prev => ({ ...prev, notas_generales: e.target.value }))}
                                        placeholder="Notas adicionales para la lista de compra..."
                                        rows="4"
                                        size="lg"
                                    />
                                </CardBody>
                            </Card>
                        </div>
                        
                        {/* Footer del modal con botones */}
                        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                            <div className="flex gap-4 justify-end">
                                <Button
                                    variant="outlined"
                                    color="gray"
                                    size="lg"
                                    onClick={cerrarModalListaCompra}
                                    disabled={loading}
                                    className="px-8"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    color="blue"
                                    size="lg"
                                    onClick={editandoLista ? actualizarListaCompra : crearListaCompra}
                                    disabled={loading || !listaCompra.titulo.trim() || listaCompra.materiales.length === 0}
                                    className="px-8 font-bold"
                                >
                                    {loading ? (editandoLista ? 'Actualizando...' : 'Creando...') : (editandoLista ? 'Actualizar Lista' : 'Crear Lista de Compra')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para ver requerimientos */}
            {showRequerimientosModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998]">
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
                                    No hay listas de compra registradas
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Los contratistas pueden crear listas de compra para este proyecto
                                </Typography>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {requerimientos.map((lista, index) => (
                                    <Card key={index} className="border-l-4 border-l-blue-500 shadow-lg">
                                        <CardBody className="p-6">
                                            {/* Encabezado de la Lista de Compra */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                                        {lista.titulo || 'Lista de Compra'}
                                                    </Typography>

                                                    <Typography variant="small" color="gray" className="mt-1">
                                                        Materiales: <span className="font-medium text-blue-gray-800">{lista.materiales?.length || 0} items</span>
                                                    </Typography>
                                                    
                                                    <Typography variant="small" color="gray" className="mt-1">
                                                        Creada: <span className="font-medium text-blue-gray-800">
                                                            {new Date(lista.fecha_creacion).toLocaleDateString('es-MX')}
                                                        </span>
                                                    </Typography>
                                                </div>
                                                <Chip
                                                    value={lista.estatus_general || 'Borrador'}
                                                    color={
                                                        lista.estatus_general === 'Completada' ? 'green' :
                                                        lista.estatus_general === 'Comprada' ? 'purple' :
                                                        lista.estatus_general === 'Recibida' ? 'teal' :
                                                        lista.estatus_general === 'En compra' ? 'indigo' :
                                                        lista.estatus_general === 'Aprobada' ? 'blue' :
                                                        lista.estatus_general === 'En revisión' ? 'orange' :
                                                        lista.estatus_general === 'Enviada' ? 'amber' :
                                                        lista.estatus_general === 'Rechazada' ? 'red' :
                                                        lista.estatus_general === 'Borrador' ? 'gray' : 'gray'
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
                                                {lista.total_estimado > 0 ? (
                                                    <div className="flex items-center justify-between">
                                                        <Typography variant="h6" color="green" className="font-bold">
                                                            ${lista.total_estimado?.toLocaleString('es-MX') || '0'}
                                                        </Typography>
                                                        <Button
                                                            size="sm"
                                                            color="blue"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                console.log('✏️ Habilitando edición de costo para:', lista._id);
                                                                {};
                                                            }}
                                                            className="ml-2 px-2 py-1"
                                                        >
                                                            ✏️ Editar
                                                        </Button>
                                                    </div>
                                                ) : (lista.total_estimado > 0 && false) ? (
                                                    <div className="flex gap-2 items-center">
                                                        <Input
                                                            type="number"
                                                            size="lg"
                                                            placeholder="Modifica el costo..."
                                                            value={lista.total_estimado || ''}
                                                            onChange={(e) => {}}
                                                            className="flex-1"
                                                            step="0.01"
                                                            min="0"
                                                            label="Costo (MXN)"
                                                        />
                                                        <Button
                                                            size="lg"
                                                            color="green"
                                                            onClick={() => {
                                                                console.log('💾 Actualizando costo existente - Material:', lista._id, 'Nuevo costo:', lista.total_estimado);
                                                                abrirModalCostos(lista);
                                                            }}
                                                            disabled={false || false || guardandoCostos}
                                                            className="px-4"
                                                        >
                                                            {loading ? 'Actualizando...' : '💾 Actualizar'}
                                                        </Button>
                                                        <Button
                                                            size="lg"
                                                            color="gray"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                console.log('❌ Cancelando edición de costo para:', lista._id);
                                                                {};
                                                            }}
                                                            className="px-3"
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    // Solo mostrar input si el supervisor habilitó el modo de agregar costo
                                                    false ? (
                                                        <div className="flex gap-2 items-center">
                                                            <Input
                                                                type="number"
                                                                size="lg"
                                                                placeholder="Ingresa el costo..."
                                                                value={lista.total_estimado || ''}
                                                                onChange={(e) => {}}
                                                                className="flex-1"
                                                                step="0.01"
                                                                min="0"
                                                                label="Costo (MXN)"
                                                            />
                                                            <Button
                                                                size="lg"
                                                                color="green"
                                                                onClick={() => {
                                                                    console.log('🔘 CLICK BOTÓN GUARDAR - Material:', lista._id, 'Costo:', lista.total_estimado);
                                                                    abrirModalCostos(lista);
                                                                }}
                                                                disabled={false || false || guardandoCostos}
                                                                className="px-4"
                                                            >
                                                                {loading ? 'Guardando...' : 'Guardar'}
                                                            </Button>
                                                            <Button
                                                                size="lg"
                                                                color="gray"
                                                                variant="outlined"
                                                                onClick={() => {
                                                                    {};
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
                                                        lista.total_estimado > 0 && (
                                                            <div className="bg-white rounded-lg p-3 border">
                                                                <Typography variant="small" color="gray" className="font-medium mb-2">💰 Costo</Typography>
                                                                <Typography variant="h6" color="green" className="font-bold">
                                                                    ${lista.total_estimado?.toLocaleString('es-MX') || '0'}
                                                                </Typography>
                                                            </div>
                                                        )
                                                    )}
                                                    
                                                    {/* Información adicional */}
                                                    <div className="space-y-3">
                                                        {true && (
                                                            <div>
                                                                <Typography variant="small" color="gray" className="font-medium">📝 Tipo de Gasto</Typography>
                                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                                    {'Solicitado por Contratista'}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                        {lista.contratista_id && (
                                                            <div>
                                                                <Typography variant="small" color="gray" className="font-medium">👤 Solicitado por</Typography>
                                                                <Typography variant="small" color="blue-gray" className="font-medium">
                                                                    {lista.contratista_id?.prim_nom || 'Contratista'} {lista.contratista_id?.apell_pa || ''}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <Typography variant="small" color="gray" className="font-medium">📅 Fecha de Solicitud</Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                                {lista.fecha_creacion ? new Date(lista.fecha_creacion).toLocaleDateString() : 'N/A'}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Materiales de la Lista */}
                                            {lista.materiales && lista.materiales.length > 0 && (
                                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                    <Typography variant="small" color="blue-gray" className="font-medium mb-3">📦 Materiales Solicitados ({lista.materiales.length})</Typography>
                                                    <div className="space-y-2">
                                                        {lista.materiales.slice(0, 3).map((material, index) => (
                                                            <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                                                                <div>
                                                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                                                        {material.tipo}
                                                                    </Typography>
                                                                    <Typography variant="small" color="gray">
                                                                        {material.cantidad} {material.tipo_unidad} • {material.urgencia}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {lista.materiales.length > 3 && (
                                                            <Typography variant="small" color="gray" className="text-center py-2">
                                                                ... y {lista.materiales.length - 3} materiales más
                                                            </Typography>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Notas */}
                                            {lista.descripcion && (
                                                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                                    <Typography variant="small" color="blue-gray" className="font-medium mb-1">📋 Notas</Typography>
                                                    <Typography variant="small" color="blue-gray">{lista.descripcion}</Typography>
                                                </div>
                                            )}

                                            {/* Motivo de rechazo */}
                                            {lista.motivo_rechazo && (
                                                <div className="bg-red-50 rounded-lg p-3 mb-4">
                                                    <Typography variant="small" color="red" className="font-medium mb-1">❌ Motivo de Rechazo</Typography>
                                                    <Typography variant="small" color="red">{lista.motivo_rechazo}</Typography>
                                                </div>
                                            )}

                                                            {/* Acciones del Supervisor */}
                {(user?.role === 'supervisor' || user?.role === 'Supervisor') && (
                    <div className="mt-4 pt-4 border-t">
                        {/* CASO 1: Material recién solicitado - Supervisor puede agregar costo o rechazar directamente */}
                        {lista.estatus_general === 'Enviada' && lista.total_estimado === 0 && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => imprimirOrdenCompra(lista)}
                                    className="flex items-center gap-2"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    Imprimir Lista
                                </Button>
                                <Button
                                    size="lg"
                                    color="red"
                                    variant="outlined"
                                    onClick={() => rechazarListaCompra(lista._id)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <ExclamationCircleIcon className="h-5 w-5" />
                                    Rechazar Material
                                </Button>
                                {true && (
                                    <Button
                                        size="lg"
                                        color="blue"
                                        variant="outlined"
                                        onClick={() => {
                                            console.log('➕ Abriendo modal de costos para lista:', lista._id);
                                            abrirModalCostos(lista);
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <CurrencyDollarIcon className="h-5 w-5" />
                                        Agregar Costo
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* CASO 2: Lista en revisión - Editar, Aprobar o Rechazar */}
                        {lista.estatus_general === 'En revisión' && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => imprimirOrdenCompra(lista)}
                                    className="flex items-center gap-2"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    Imprimir Lista
                                </Button>
                                <Button
                                    size="lg"
                                    color="blue"
                                    variant="outlined"
                                    onClick={() => abrirModalCostos(lista)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                    ✏️ Editar Costos
                                </Button>
                                <Button
                                    size="lg"
                                    color="red"
                                    variant="outlined"
                                    onClick={() => rechazarListaCompra(lista._id)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <ExclamationCircleIcon className="h-5 w-5" />
                                    Rechazar
                                </Button>
                                <Button
                                    size="lg"
                                    color="green"
                                    onClick={() => aprobarListaCompra(lista._id)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <CheckIcon className="h-5 w-5" />
                                    ✅ Aprobar Lista
                                </Button>
                            </div>
                        )}

                        {/* CASO 3: Material ya aprobado pero editable - Solo mostrar estado */}
                        {lista.estatus_general === 'Aprobada' && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => imprimirOrdenCompra(lista)}
                                    className="flex items-center gap-2"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    Imprimir Lista
                                </Button>
                                <div className="bg-blue-50 rounded-lg p-3 flex-1">
                                    <Typography variant="small" color="blue" className="text-center">
                                        ✅ Material aprobado y enviado a administración
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO NUEVO: Material en compra - Supervisor puede marcar como comprado */}
                        {lista.estatus_general === 'En compra' && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => imprimirOrdenCompra(lista)}
                                    className="flex items-center gap-2"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    Imprimir Lista
                                </Button>
                                <Button
                                    size="lg"
                                    color="green"
                                    variant="outlined"
                                    onClick={() => abrirModalComprobante(lista)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <ShoppingBagIcon className="h-5 w-5" />
                                    🛒 Marcar como Comprado
                                </Button>
                            </div>
                        )}

                        {/* CASO NUEVO: Material recibido - Esperando compra */}
                        {lista.estatus_general === 'Recibida' && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => imprimirOrdenCompra(lista)}
                                    className="flex items-center gap-2"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    Imprimir Lista
                                </Button>
                                <div className="bg-teal-50 rounded-lg p-3 flex-1">
                                    <Typography variant="small" color="teal" className="text-center">
                                        📋 Material recibido por contratista - Listo para compra
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO NUEVO: Material comprado - Proceso completado */}
                        {lista.estatus_general === 'Comprada' && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => imprimirOrdenCompra(lista)}
                                    className="flex items-center gap-2"
                                >
                                    <PrinterIcon className="h-5 w-5" />
                                    Imprimir Lista
                                </Button>
                                <div className="bg-purple-50 rounded-lg p-3 flex-1">
                                    <Typography variant="small" color="purple" className="text-center">
                                        🛒 Material comprado exitosamente - Proceso completado
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO 4: Material rechazado - Solo mostrar estado */}
                        {lista.estatus_general === 'Rechazada' && (
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

                {/* Acciones del Contratista */}
                {(user?.role === 'contratista') && (
                    <div className="mt-4 pt-4 border-t">
                        {/* CASO 1: Lista en borrador - Contratista puede editar y enviar */}
                        {lista.estatus_general === 'Borrador' && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="gray"
                                    variant="outlined"
                                    onClick={() => editarListaCompra(lista)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                    ✏️ Editar Lista
                                </Button>
                                <Button
                                    size="lg"
                                    color="blue"
                                    onClick={() => enviarListaCompra(lista._id)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <CheckIcon className="h-5 w-5" />
                                    📤 Enviar al Supervisor
                                </Button>
                            </div>
                        )}

                        {/* CASO 2: Lista enviada - Esperando respuesta */}
                        {lista.estatus_general === 'Enviada' && (
                            <div className="flex justify-center">
                                <div className="bg-blue-50 rounded-lg p-3">
                                    <Typography variant="small" color="blue" className="text-center">
                                        📤 Lista enviada al supervisor - Esperando respuesta
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO 3: Lista en revisión - Esperando decisión */}
                        {lista.estatus_general === 'En revisión' && (
                            <div className="flex justify-center">
                                <div className="bg-orange-50 rounded-lg p-3">
                                    <Typography variant="small" color="orange" className="text-center">
                                        🔍 Lista en revisión por supervisor
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO 4: Lista aprobada - Esperando administración */}
                        {lista.estatus_general === 'Aprobada' && (
                            <div className="flex justify-center">
                                <div className="bg-green-50 rounded-lg p-3">
                                    <Typography variant="small" color="green" className="text-center">
                                        ✅ Lista aprobada por supervisor - Enviada a administración
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO NUEVO: Lista comprada - Contratista debe confirmar recepción */}
                        {lista.estatus_general === 'Comprada' && (
                            <div className="flex gap-3 justify-end">
                                <Button
                                    size="lg"
                                    color="blue"
                                    variant="outlined"
                                    onClick={() => abrirModalFirma(lista)}
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <DocumentCheckIcon className="h-5 w-5" />
                                    📋 Confirmar Recibido
                                </Button>
                            </div>
                        )}

                        {/* CASO NUEVO: Lista recibida - Proceso completado */}
                        {lista.estatus_general === 'Recibida' && (
                            <div className="flex justify-center">
                                <div className="bg-green-50 rounded-lg p-3">
                                    <Typography variant="small" color="green" className="text-center">
                                        ✅ Material recibido y firmado - Proceso completado
                                    </Typography>
                                </div>
                            </div>
                        )}

                        {/* CASO 5: Lista rechazada - Mostrar motivo */}
                        {lista.estatus_general === 'Rechazada' && (
                            <div className="flex justify-center">
                                <div className="bg-red-50 rounded-lg p-3">
                                    <Typography variant="small" color="red" className="text-center">
                                        ❌ Lista rechazada por supervisor
                                    </Typography>
                                    {lista.supervisor_revision?.comentarios && (
                                        <Typography variant="small" color="red" className="text-center mt-2">
                                            Motivo: {lista.supervisor_revision.comentarios}
                                        </Typography>
                                    )}
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

            {/* Modal para ingresar costos de lista de compra */}
            {showCostosModal && listaParaCostos && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            💰 {listaParaCostos.estatus_general === 'En revisión' ? 'Editar' : 'Ingresar'} Costos de Materiales
                        </Typography>
                        
                        <Typography variant="small" color="gray" className="mb-6">
                            Lista: {listaParaCostos.titulo} - Proyecto: {proyectoSeleccionado?.propiedad ? formatearDireccion(proyectoSeleccionado.propiedad.direccion) : 'N/A'}
                        </Typography>
                        
                        <div className="space-y-6">
                            {listaParaCostos.materiales.map((material, index) => (
                                <Card key={index} className="border-l-4 border-l-green-500 shadow-lg">
                                    <CardBody className="p-6">
                                        {/* Encabezado del Material */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <Typography variant="h5" color="blue-gray" className="font-bold">
                                                    {material.tipo}
                                                </Typography>
                                                <Typography variant="small" color="gray" className="mt-1">
                                                    Cantidad: <span className="font-medium text-blue-gray-800">{material.cantidad} {material.tipo_unidad}</span>
                                                </Typography>
                                            </div>
                                            <Chip
                                                value={material.urgencia}
                                                color={
                                                    material.urgencia === 'Urgente' ? 'red' :
                                                    material.urgencia === 'Alta' ? 'orange' :
                                                    material.urgencia === 'Media' ? 'amber' : 'green'
                                                }
                                                size="lg"
                                                className="font-medium"
                                            />
                                        </div>

                                        {/* Información del Material */}
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Typography variant="small" color="gray" className="font-medium mb-2">
                                                        Descripción
                                                    </Typography>
                                                    <Typography variant="small" color="blue-gray">
                                                        {material.descripcion || 'Sin descripción'}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="small" color="gray" className="font-medium mb-2">
                                                        Costo Estimado
                                                    </Typography>
                                                    <Typography variant="h6" color="blue" className="font-bold">
                                                        ${material.costo_estimado?.toLocaleString('es-MX') || '0'}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sección de Costo Final */}
                                        <div className="bg-white rounded-lg p-4 border border-green-200">
                                            <Typography variant="small" color="gray" className="font-medium mb-3">
                                                💰 Costo Final (MXN)
                                            </Typography>
                                            <div className="flex gap-3 items-center">
                                                <Input
                                                    type="number"
                                                    size="lg"
                                                    placeholder="Ingrese el costo final..."
                                                    value={costosMateriales[index]?.costo_final || ''}
                                                    onChange={(e) => actualizarCostoMaterial(index, 'costo_final', e.target.value)}
                                                    className="flex-1"
                                                    step="0.01"
                                                    min="0"
                                                    label="Costo Final"
                                                />
                                                <div className="text-right">
                                                    <Typography variant="small" color="gray">
                                                        Diferencia
                                                    </Typography>
                                                    <Typography 
                                                        variant="h6" 
                                                        color={costosMateriales[index]?.costo_final > material.costo_estimado ? 'red' : 'green'}
                                                        className="font-bold"
                                                    >
                                                        ${((costosMateriales[index]?.costo_final || 0) - (material.costo_estimado || 0)).toLocaleString('es-MX')}
                                                    </Typography>
                                                </div>
                                            </div>
                                            
                                            {/* Campo para notas */}
                                            <div className="mt-3">
                                                <Textarea
                                                    size="lg"
                                                    placeholder="Notas adicionales sobre el costo..."
                                                    value={costosMateriales[index]?.notas || ''}
                                                    onChange={(e) => actualizarCostoMaterial(index, 'notas', e.target.value)}
                                                    label="Notas del Supervisor"
                                                    className="min-h-[80px]"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Resumen de Costos */}
                        <Card className="mt-6 border-2 border-green-500">
                            <CardBody className="p-6">
                                <Typography variant="h5" color="green" className="mb-4 text-center">
                                    📊 Resumen de Costos
                                </Typography>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div>
                                        <Typography variant="small" color="gray">
                                            Total Estimado
                                        </Typography>
                                        <Typography variant="h6" color="blue" className="font-bold">
                                            ${listaParaCostos.total_estimado?.toLocaleString('es-MX') || '0'}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" color="gray">
                                            Total Final
                                        </Typography>
                                        <Typography variant="h6" color="green" className="font-bold">
                                            ${totalCalculado.toLocaleString('es-MX')}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="small" color="gray">
                                            Diferencia
                                        </Typography>
                                        <Typography 
                                            variant="h6" 
                                            color={totalCalculado > (listaParaCostos.total_estimado || 0) ? 'red' : 'green'}
                                            className="font-bold"
                                        >
                                            ${(totalCalculado - (listaParaCostos.total_estimado || 0)).toLocaleString('es-MX')}
                                        </Typography>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        
                        <div className="flex justify-between mt-6">
                            <Button
                                color="gray"
                                variant="outlined"
                                onClick={cerrarModalCostos}
                            >
                                Cancelar
                            </Button>
                            <div className="flex gap-3">
                                <Button
                                    color="blue"
                                    onClick={guardarCostosYContinuar}
                                    disabled={loading}
                                >
                                    {loading ? 'Guardando...' : `💾 ${listaParaCostos.estatus_general === 'En revisión' ? 'Actualizar' : 'Guardar'} Costos`}
                                </Button>
                                <Button
                                    color="green"
                                    onClick={() => {
                                        guardarCostosYContinuar().then(() => {
                                            if (!error) {
                                                aprobarListaConCostos(listaParaCostos._id);
                                            }
                                        });
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : '✅ Guardar y Aprobar'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Listas de Compra para Administración */}
            {showListasCompraModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9997]">
                    <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[80vh] overflow-y-auto">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            📋 Listas de Compra - Administración
                        </Typography>
                        
                        <Typography variant="small" color="gray" className="mb-6">
                            Listas de compra pendientes de aprobación administrativa y ya procesadas por administración
                        </Typography>
                        
                        {listasCompra.length === 0 ? (
                            <div className="text-center py-8">
                                <Typography variant="h6" color="gray">
                                    No hay listas de compra disponibles
                                </Typography>
                                                            <Typography variant="small" color="gray">
                                Las listas de compra aparecerán aquí cuando sean aprobadas por supervisores o procesadas por administración
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
                                    {listasCompra.map((lista) => (
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
                                                    color={getListaCompraStatusColor(lista.estatus_general)}
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
                                                        onClick={() => abrirModalDetallesLista(lista)}
                                                        title="Ver detalles"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
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
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                        <div className="flex justify-end mt-6">
                            <Button
                                color="blue"
                                onClick={cerrarModalListasCompra}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Detalles de Lista para Administración */}
            {showDetallesListaModal && listaSeleccionada && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9997] p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header del modal */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="h4" color="white" className="font-bold">
                            📋 Detalles de Lista de Compra
                        </Typography>
                                    <Typography variant="small" color="white" className="mt-2 opacity-90">
                                        {listaSeleccionada.titulo} • {formatearDireccion(listaSeleccionada.proyecto_id?.propiedad?.direccion)}
                        </Typography>
                                </div>
                                <Button
                                    variant="text"
                                    color="white"
                                    onClick={cerrarModalDetallesLista}
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                        
                        {/* Contenido del modal */}
                        <div className="flex-1 overflow-y-auto p-8">
                        
                        {/* Información General */}
                            <Card className="mb-8 shadow-lg border-0">
                                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-4">
                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                        📊 Información General
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <CalendarIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                            <Typography variant="small" color="gray" className="font-medium mb-1">Fecha de Creación</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                {formatDate(listaSeleccionada.fecha_creacion)}
                                            </Typography>
                                    </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                            <UserIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                            <Typography variant="small" color="gray" className="font-medium mb-1">Contratista</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                            {listaSeleccionada.contratista_id ? 
                                                `${listaSeleccionada.contratista_id.prim_nom || ''} ${listaSeleccionada.contratista_id.apell_pa || ''}`.trim() || listaSeleccionada.contratista_id.email
                                                : 'N/A'}
                                        </Typography>
                                    </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <CurrencyDollarIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                            <Typography variant="small" color="gray" className="font-medium mb-1">Total</Typography>
                                            <Typography variant="small" color="green" className="font-bold text-lg">
                                            {formatCurrency(listaSeleccionada.total_final || listaSeleccionada.total_estimado || 0)}
                                        </Typography>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                            {/* Sección de Firma del Contratista - Diseño Compacto */}
                            {listaSeleccionada.firma_contratista && (
                                <Card className="mb-8 shadow-lg border-0">
                                    <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-4">
                                        <div className="flex items-center justify-between mt-2 mx-2">
                                            <Typography variant="h5" color="blue-gray" className="font-bold">
                                                ✍️ Carta Responsiva - Material Recibido
                            </Typography>
                                            <Button
                                                size="sm"
                                                color="green"
                                                variant="outlined"
                                                onClick={toggleFirmaDetalles}
                                                className="flex items-center gap-2 px-4 py-2"
                                            >
                                                {showFirmaDetalles ? (
                                                    <>
                                                        <EyeIcon className="h-4 w-4" />
                                                        Ocultar Detalles
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeIcon className="h-4 w-4" />
                                                        Ver Carta Responsiva
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    
                                    {/* Información básica siempre visible */}
                                    <CardBody className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <Chip
                                                    value={listaSeleccionada.tipo_firma === 'digital' ? 'Firma Digital' : 'Firma Texto'}
                                                    color={listaSeleccionada.tipo_firma === 'digital' ? 'blue' : 'gray'}
                                                    size="sm"
                                                    className="px-3 py-1"
                                                />
                                                <Typography variant="small" color="gray" className="font-medium">
                                                    Recibido el {listaSeleccionada.fecha_recibido ? formatDate(listaSeleccionada.fecha_recibido) : 'N/A'}
                                                </Typography>
                                            </div>
                                            <Typography variant="small" color="green" className="font-bold text-lg">
                                                ✅ Material Confirmado
                                            </Typography>
                                        </div>
                                    </CardBody>

                                    {/* Detalles expandibles */}
                                    {showFirmaDetalles && (
                                        <CardBody className="pt-0 border-t border-gray-200 bg-gray-50">
                                            <div className="space-y-6 p-4">
                                                {/* Información detallada */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <Typography variant="small" color="gray" className="font-medium mb-2">👤 Firmado por</Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {listaSeleccionada.contratista_id ? 
                                                                `${listaSeleccionada.contratista_id.prim_nom || ''} ${listaSeleccionada.contratista_id.apell_pa || ''}`.trim() || listaSeleccionada.contratista_id.email
                                                                : 'N/A'}
                                                        </Typography>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <Typography variant="small" color="gray" className="font-medium mb-2">📧 Email</Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {listaSeleccionada.contratista_id?.email || 'N/A'}
                                                        </Typography>
                                                    </div>
                                                </div>

                                                {/* Comentarios de recepción */}
                                                {listaSeleccionada.comentarios_recibido && (
                                                    <div>
                                                        <Typography variant="small" color="gray" className="font-medium mb-3">💬 Comentarios de Recepción</Typography>
                                                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                                            <Typography variant="small" color="blue-gray">
                                                                {listaSeleccionada.comentarios_recibido}
                                                        </Typography>
                                                    </div>
                                                    </div>
                                                )}

                                                {/* Visualización de la firma */}
                                                    <div>
                                                    <Typography variant="small" color="gray" className="font-medium mb-4">🖊️ Firma Capturada</Typography>
                                                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                                                        {listaSeleccionada.tipo_firma === 'digital' ? (
                                                            // Firma digital (imagen)
                                                            <div className="text-center">
                                                                <img 
                                                                    src={listaSeleccionada.firma_contratista} 
                                                                    alt="Firma digital del contratista" 
                                                                    className="max-w-full h-auto max-h-40 mx-auto border border-gray-300 rounded shadow-sm"
                                                                    style={{ maxWidth: '500px' }}
                                                                />
                                                                <Typography variant="small" color="gray" className="mt-3">
                                                                    Firma digital capturada el {listaSeleccionada.fecha_recibido ? formatDate(listaSeleccionada.fecha_recibido) : 'N/A'}
                                                                </Typography>
                                                            </div>
                                                        ) : (
                                                            // Firma de texto
                                                            <div className="text-center">
                                                                <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 shadow-sm">
                                                                    <Typography variant="small" color="blue-gray" className="font-medium text-xl">
                                                                        "{listaSeleccionada.firma_contratista}"
                                                                    </Typography>
                                                                </div>
                                                                <Typography variant="small" color="gray" className="mt-3">
                                                                    Firma de texto registrada el {listaSeleccionada.fecha_recibido ? formatDate(listaSeleccionada.fecha_recibido) : 'N/A'}
                                                                </Typography>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    )}
                                </Card>
                            )}

                            {/* Lista de Materiales */}
                            <Card className="mb-8 shadow-lg border-0">
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
                                    <Typography variant="h5" color="blue-gray" className="font-bold mt-2">
                                        📦 Materiales Solicitados ({listaSeleccionada.materiales?.length || 0})
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-6">
                                    <div className="space-y-6">
                                        {listaSeleccionada.materiales?.map((material, index) => (
                                            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <Typography variant="h6" color="blue-gray" className="font-bold">
                                                        {material.tipo}
                                                    </Typography>
                                                        <Chip
                                                            value={material.urgencia}
                                                            color={
                                                                material.urgencia === 'Urgente' ? 'red' :
                                                                material.urgencia === 'Alta' ? 'orange' :
                                                                material.urgencia === 'Media' ? 'yellow' : 'green'
                                                            }
                                                            size="sm"
                                                        className="px-3 py-1"
                                                        />
                                                    </div>
                                                
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                                        <Typography variant="small" color="gray" className="font-medium mb-1">Cantidad</Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-semibold">
                                                            {material.cantidad} {material.tipo_unidad}
                                                        </Typography>
                                                    </div>
                                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                                        <Typography variant="small" color="gray" className="font-medium mb-1">Costo Estimado</Typography>
                                                        <Typography variant="small" color="blue" className="font-semibold">
                                                            {formatCurrency(material.costo_estimado || 0)}
                                                        </Typography>
                                                    </div>
                                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                                        <Typography variant="small" color="gray" className="font-medium mb-1">Costo Final</Typography>
                                                        <Typography variant="small" color="green" className="font-bold text-lg">
                                                            {formatCurrency(material.costo_final || 0)}
                                                        </Typography>
                                                    </div>
                                                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                                                        <Typography variant="small" color="gray" className="font-medium mb-1">Diferencia</Typography>
                                                        <Typography variant="small" color={material.costo_final > material.costo_estimado ? 'red' : 'green'} className="font-semibold">
                                                            {formatCurrency((material.costo_final || 0) - (material.costo_estimado || 0))}
                                                        </Typography>
                                                </div>
                                                </div>
                                                
                                                {(material.descripcion || material.notas_supervisor) && (
                                                    <div className="mt-4 space-y-3">
                                                {material.descripcion && (
                                                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                                <Typography variant="small" color="gray" className="font-medium mb-1">📝 Descripción</Typography>
                                                        <Typography variant="small" color="blue-gray">{material.descripcion}</Typography>
                                                    </div>
                                                )}
                                                {material.notas_supervisor && (
                                                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                                <Typography variant="small" color="gray" className="font-medium mb-1">👨‍💼 Notas del Supervisor</Typography>
                                                        <Typography variant="small" color="blue-gray">{material.notas_supervisor}</Typography>
                                                    </div>
                                                )}
                                            </div>
                                                )}
                                        </div>
                            ))}
                        </div>
                                </CardBody>
                            </Card>

                        {/* Descripción General */}
                        {listaSeleccionada.descripcion && (
                                <Card className="mb-8 shadow-lg border-0">
                                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-4">
                                        <Typography variant="h5" color="blue-gray" className="font-bold">
                                            📝 Descripción General
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="pt-6">
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <Typography variant="small" color="blue-gray" className="leading-relaxed">
                                                {listaSeleccionada.descripcion}
                                            </Typography>
                                        </div>
                                </CardBody>
                            </Card>
                        )}
                        </div>

                        {/* Footer del modal con botones */}
                        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                            <div className="flex gap-4 justify-between">
                            <Button
                                size="lg"
                                color="purple"
                                variant="outlined"
                                onClick={() => imprimirOrdenCompra(listaSeleccionada)}
                                    className="flex items-center gap-2 px-6"
                            >
                                <PrinterIcon className="h-5 w-5" />
                                🖨️ Imprimir Orden
                            </Button>
                        
                            <Button
                                color="gray"
                                variant="outlined"
                                    size="lg"
                                onClick={cerrarModalDetallesLista}
                                    className="px-8"
                            >
                                Cerrar
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para firma de carta responsiva (contratistas) */}
            {showFirmaModal && listaParaFirma && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10001] p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
                        {/* Header del modal */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Typography variant="h4" color="white" className="font-bold">
                                        📋 Carta Responsiva - Recepción de Materiales
                                    </Typography>
                                    <Typography variant="small" color="white" className="mt-2 opacity-90">
                                        Lista: {listaParaFirma.titulo} • {listaParaFirma.materiales?.length || 0} materiales
                                    </Typography>
                                </div>
                                <Button
                                    variant="text"
                                    color="white"
                                    onClick={cerrarModalFirma}
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                        
                        {/* Contenido del modal */}
                        <div className="flex-1 overflow-y-auto p-8">
                            {/* Carta responsiva */}
                            <Card className="mb-8 shadow-lg border-0">
                                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-4">
                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                        📄 Carta Responsiva
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-6">
                                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                                        <Typography variant="small" color="blue-gray" className="text-justify leading-relaxed">
                                            <strong>CARTA RESPONSIVA</strong><br/><br/>
                                            Yo, <strong>{user?.prim_nom} {user?.apell_pa}</strong>, en mi calidad de contratista, 
                                            confirmo haber recibido conforme todos los materiales especificados en la lista de compra 
                                            "<strong>{listaParaFirma.titulo}</strong>" correspondiente al proyecto 
                                            "<strong>{listaParaFirma.proyecto_id?.titulo || 'Proyecto'}</strong>".
                                            <br/><br/>
                                            Me hago responsable del resguardo, uso adecuado y correcta aplicación de dichos materiales 
                                            en el proyecto mencionado. Cualquier pérdida, daño o mal uso será de mi entera responsabilidad.
                                            <br/><br/>
                                            Fecha de recepción: <strong>{new Date().toLocaleDateString('es-MX')}</strong>
                                        </Typography>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Área de firma digital */}
                            <Card className="mb-8 shadow-lg border-0">
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
                                    <Typography variant="h5" color="blue-gray" className="font-bold">
                                        ✍️ Firma Digital
                                    </Typography>
                                </CardHeader>
                                <CardBody className="pt-6">
                                    <div className="space-y-4">
                                        <Typography variant="small" color="gray" className="text-center">
                                            Dibuje su firma en el área de abajo como si fuera en papel
                                        </Typography>
                                        
                                        {/* Canvas de firma */}
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                                            <canvas
                                                ref={canvasRef}
                                                width={600}
                                                height={200}
                                                className="border border-gray-400 rounded bg-white cursor-crosshair mx-auto block"
                                                onMouseDown={startDrawing}
                                                onMouseMove={draw}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={(e) => {
                                                    e.preventDefault();
                                                    const touch = e.touches[0];
                                                    const mouseEvent = new MouseEvent('mousedown', {
                                                        clientX: touch.clientX,
                                                        clientY: touch.clientY
                                                    });
                                                    startDrawing(mouseEvent);
                                                }}
                                                onTouchMove={(e) => {
                                                    e.preventDefault();
                                                    const touch = e.touches[0];
                                                    const mouseEvent = new MouseEvent('mousemove', {
                                                        clientX: touch.clientX,
                                                        clientY: touch.clientY
                                                    });
                                                    draw(mouseEvent);
                                                }}
                                                onTouchEnd={(e) => {
                                                    e.preventDefault();
                                                    stopDrawing();
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Botones de control */}
                                        <div className="flex gap-4 justify-center">
                                            <Button
                                                color="red"
                                                variant="outlined"
                                                onClick={clearSignature}
                                                className="flex items-center gap-2"
                                            >
                                                <XMarkIcon className="h-4 w-4" />
                                                Limpiar Firma
                                            </Button>
                                        </div>
                                        
                                        {/* Vista previa de la firma */}
                                        {firmaDigital && (
                                            <div className="text-center">
                                                <Typography variant="small" color="green" className="font-medium mb-2">
                                                    ✅ Firma capturada correctamente
                                                </Typography>
                                                <img 
                                                    src={firmaDigital} 
                                                    alt="Firma digital" 
                                                    className="border border-gray-300 rounded mx-auto max-w-xs"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        
                        {/* Footer del modal con botones */}
                        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                            {error && (
                                <Alert color="red" className="mb-4">
                                    {error}
                                </Alert>
                            )}
                            
                            <div className="flex gap-4 justify-end">
                                <Button
                                    variant="outlined"
                                    color="gray"
                                    size="lg"
                                    onClick={cerrarModalFirma}
                                    disabled={loading}
                                    className="px-8"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    color="green"
                                    size="lg"
                                    onClick={marcarComoRecibida}
                                    disabled={loading || !firmaDigital}
                                    className="px-8 font-bold flex items-center gap-2"
                                >
                                    {loading ? <Spinner size="sm" /> : <DocumentCheckIcon className="h-5 w-5" />}
                                    Confirmar Recepción
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para comprobante de compra (supervisores) */}
            {showComprobanteModal && listaParaComprobante && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10001]">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            🛒 Confirmar Compra de Materiales
                        </Typography>
                        
                        <div className="mb-4">
                            <Typography variant="small" color="gray" className="mb-2">
                                Lista de Compra: <span className="font-medium">{listaParaComprobante.titulo}</span>
                            </Typography>
                            <Typography variant="small" color="gray" className="mb-4">
                                Proyecto: <span className="font-medium">{listaParaComprobante.proyecto_id?.titulo || 'Proyecto'}</span>
                            </Typography>
                        </div>

                        {/* Resumen de materiales con costos editables */}
                        <div className="mb-6">
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                📋 Materiales a Comprar - Verificar Costos
                            </Typography>
                            
                            <div className="space-y-4">
                                {listaParaComprobante.materiales?.map((material, index) => (
                                    <Card key={material._id || index} className="border">
                                        <CardBody className="p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <Typography variant="h6" color="blue-gray" className="font-medium">
                                                        {material.nombre}
                                                    </Typography>
                                                    <Typography variant="small" color="gray">
                                                        Cantidad: {material.cantidad} {material.tipo_unidad}
                                                    </Typography>
                                                    {material.descripcion && (
                                                        <Typography variant="small" color="gray">
                                                            Descripción: {material.descripcion}
                                                        </Typography>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Typography variant="small" color="gray" className="mb-1">
                                                        Costo Estimado Original:
                                                    </Typography>
                                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                                        ${(material.costo_estimado || 0).toLocaleString('es-MX')}
                                                    </Typography>
                                                </div>
                                                
                                                <div>
                                                    <Input
                                                        type="number"
                                                        label="Costo Real de Compra (MXN)"
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        min="0"
                                                        value={costosComprobante[index]?.costo_final || ''}
                                                        onChange={(e) => actualizarCostoComprobante(index, 'costo_final', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Diferencia */}
                                            <div className="mt-3 text-center">
                                                <Typography variant="small" color="gray">
                                                    Diferencia:
                                                </Typography>
                                                <Typography 
                                                    variant="h6" 
                                                    color={costosComprobante[index]?.costo_final > material.costo_estimado ? 'red' : 'green'}
                                                    className="font-bold"
                                                >
                                                    ${((costosComprobante[index]?.costo_final || 0) - (material.costo_estimado || 0)).toLocaleString('es-MX')}
                                                </Typography>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                            
                            {/* Total calculado */}
                            <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue" className="font-bold">
                                        Total Real de la Compra:
                                    </Typography>
                                    <Typography variant="h5" color="blue" className="font-bold">
                                        ${calcularTotalComprobante().toLocaleString('es-MX')}
                                    </Typography>
                                </div>
                                <Typography variant="small" color="gray" className="mt-1">
                                    Total estimado original: ${(listaParaComprobante.total_estimado || 0).toLocaleString('es-MX')}
                                </Typography>
                            </div>
                        </div>

                        {/* Información de compra */}
                        <div className="mb-6">
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                📝 Información de Compra
                            </Typography>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Proveedor"
                                    placeholder="Nombre del proveedor o tienda"
                                    value={proveedorGeneral}
                                    onChange={(e) => setProveedorGeneral(e.target.value)}
                                />
                                
                                <div>
                                    <Typography variant="small" color="gray" className="mb-2">
                                        Total a Pagar: <span className="font-bold text-green-600">
                                            ${calcularTotalComprobante().toLocaleString('es-MX')}
                                        </span>
                                    </Typography>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <Textarea
                                    label="Notas de la Compra"
                                    placeholder="Observaciones sobre la compra, condiciones especiales, etc."
                                    value={notasGenerales}
                                    onChange={(e) => setNotasGenerales(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Subir comprobantes */}
                        <div className="mb-6">
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                📎 Comprobantes de Compra
                            </Typography>
                            
                            <div className="mb-4">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    onChange={handleComprobanteSelect}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                                <Typography variant="small" color="gray" className="mt-1">
                                    Formatos permitidos: JPG, PNG, GIF, PDF. Máximo 10 archivos, 10MB por archivo.
                                </Typography>
                            </div>
                            
                            {/* Vista previa de archivos seleccionados */}
                            {comprobantesFiles.length > 0 && (
                                <div className="mb-4">
                                    <Typography variant="small" color="blue-gray" className="mb-2">
                                        Archivos seleccionados ({comprobantesFiles.length}):
                                    </Typography>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {comprobantesFiles.map((file, index) => (
                                            <div key={index} className="relative bg-gray-50 rounded-lg p-3 border">
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">
                                                        {file.type.startsWith('image/') ? '🖼️' : '📄'}
                                                    </div>
                                                    <Typography variant="small" color="blue-gray" className="truncate">
                                                        {file.name}
                                                    </Typography>
                                                    <Typography variant="small" color="gray">
                                                        {(file.size / 1024 / 1024).toFixed(1)} MB
                                                    </Typography>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    color="red"
                                                    variant="text"
                                                    className="absolute top-1 right-1 p-1"
                                                    onClick={() => removeComprobanteFile(index)}
                                                >
                                                    <XMarkIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {error && (
                            <Alert color="red" className="mb-4">
                                {error}
                            </Alert>
                        )}

                        {/* Botones */}
                        <div className="flex gap-3 justify-end">
                            <Button
                                color="gray"
                                variant="outlined"
                                onClick={cerrarModalComprobante}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                color="green"
                                onClick={marcarComoComprada}
                                disabled={loading}
                                className="flex items-center gap-2"
                            >
                                {loading ? <Spinner size="sm" /> : <ShoppingBagIcon className="h-4 w-4" />}
                                Confirmar Compra
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RemodelacionPage;

