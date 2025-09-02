import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Typography, 
    Button, 
    Input,
    Select,
    Option,
    Textarea,
    Chip,
    Spinner,
    Alert
} from '@material-tailwind/react';
import { 
    BuildingOfficeIcon,
    ChevronLeftIcon,
    CheckIcon,
    UserIcon,
    CurrencyDollarIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';
import { captacionesAPI } from '../../../services/api';
import { establecerPresupuesto, actualizarSupervisor } from '../../../services/remodelacionService';
import axios from 'axios';

const EditarRemodelacion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyecto, setProyecto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    // Función para formatear direcciones de objeto a string
    const formatearDireccion = (direccion) => {
        if (!direccion || typeof direccion !== 'object') return 'N/A';
        const { calle, numero, colonia, ciudad } = direccion;
        return `${calle || ''} ${numero || ''}, ${colonia || ''}, ${ciudad || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '') || 'N/A';
    };
    
    const [formData, setFormData] = useState({
        presupuesto_estimado: '',
        supervisor_id: '',
        fecha_inicio: '',
        fecha_fin: '',
        notas: ''
    });

    const [supervisores, setSupervisores] = useState([]);

    useEffect(() => {
        cargarDatosProyecto();
        cargarSupervisores();
    }, [id]);

    const cargarDatosProyecto = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Configurar axios para esta petición
            axios.defaults.baseURL = 'http://localhost:4000';
            axios.defaults.withCredentials = true;
            
            const response = await axios.get(`/api/captaciones/${id}`);
            const proyectoData = response.data;
            
            if (proyectoData) {
                setProyecto(proyectoData);
                
                // Verificar que el proyecto esté en estatus de remodelación
                if (proyectoData.estatus_actual !== 'Remodelacion') {
                    setError('Este proyecto no está en estatus de remodelación');
                    return;
                }
                
                // Cargar datos del formulario
                setFormData({
                    presupuesto_estimado: proyectoData.presupuesto_estimado || '',
                    supervisor_id: proyectoData.supervisor_id || '',
                    fecha_inicio: proyectoData.remodelacion?.fecha_inicio ? 
                        new Date(proyectoData.remodelacion.fecha_inicio).toISOString().split('T')[0] : '',
                    fecha_fin: proyectoData.remodelacion?.fecha_fin ? 
                        new Date(proyectoData.remodelacion.fecha_fin).toISOString().split('T')[0] : '',
                    notas: proyectoData.remodelacion?.notas || ''
                });
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

    const cargarSupervisores = async () => {
        try {
            // Aquí deberías cargar la lista de supervisores disponibles
            // Por ahora usamos datos de ejemplo
            setSupervisores([
                { _id: '1', nombre: 'Supervisor 1', email: 'supervisor1@example.com' },
                { _id: '2', nombre: 'Supervisor 2', email: 'supervisor2@example.com' }
            ]);
        } catch (error) {
            console.error('Error al cargar supervisores:', error);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validarFormulario = () => {
        if (!formData.presupuesto_estimado || parseFloat(formData.presupuesto_estimado) <= 0) {
            setError('El presupuesto estimado es requerido y debe ser mayor a 0');
            return false;
        }
        
        if (formData.fecha_inicio && formData.fecha_fin) {
            const fechaInicio = new Date(formData.fecha_inicio);
            const fechaFin = new Date(formData.fecha_fin);
            
            if (fechaInicio >= fechaFin) {
                setError('La fecha de fin debe ser posterior a la fecha de inicio');
                return false;
            }
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return;
        }

        try {
            setSaving(true);
            setError('');
            setSuccess('');
            
            // Guardar presupuesto
            if (formData.presupuesto_estimado) {
                const presupuestoResponse = await establecerPresupuesto(id, parseFloat(formData.presupuesto_estimado));
                if (!presupuestoResponse.success) {
                    throw new Error(presupuestoResponse.message || 'Error al establecer presupuesto');
                }
            }
            
            // Actualizar supervisor
            if (formData.supervisor_id) {
                const supervisorResponse = await actualizarSupervisor(id, formData.supervisor_id);
                if (!supervisorResponse.success) {
                    throw new Error(supervisorResponse.message || 'Error al actualizar supervisor');
                }
            }
            
            setSuccess('Proyecto de remodelación actualizado exitosamente');
            
            // Recargar datos
            setTimeout(() => {
                cargarDatosProyecto();
            }, 1000);
            
        } catch (error) {
            console.error('Error al guardar:', error);
            setError(error.message || 'Error al guardar los cambios');
        } finally {
            setSaving(false);
        }
    };

    const formatCurrency = (amount) => {
        if (!amount || amount === 0) return '$0.00';
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);
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

    if (error && !proyecto) {
        return (
            <div className="mt-12 mb-8 mx-3 lg:mx-4">
                <Alert color="red" className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="h-5 w-5" />
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
                                    Editar Proyecto de Remodelación
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
                                onClick={() => navigate(`/dashboard/remodelacion/${id}`)}
                            >
                                <ChevronLeftIcon className="h-4 w-4" />
                                Volver al Detalle
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </CardBody>
            </Card>

            {/* Formulario de Edición */}
            <Card className="mx-3 lg:mx-4">
                <CardHeader color="green" variant="gradient" className="p-6">
                    <Typography variant="h5" color="white">
                        Configuración de Remodelación
                    </Typography>
                </CardHeader>
                
                <CardBody className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Presupuesto Estimado */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Presupuesto Estimado
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Input
                                        type="number"
                                        label="Presupuesto Estimado (MXN)"
                                        value={formData.presupuesto_estimado}
                                        onChange={(e) => handleInputChange('presupuesto_estimado', e.target.value)}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        required
                                        icon={<CurrencyDollarIcon className="h-5 w-5" />}
                                    />
                                    <Typography variant="small" color="gray" className="mt-1">
                                        Presupuesto total estimado para la remodelación
                                    </Typography>
                                </div>
                                
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Presupuesto Actual:
                                    </Typography>
                                    <Typography variant="h6" color="green" className="font-bold mt-1">
                                        {proyecto.remodelacion?.presupuesto_estimado 
                                            ? formatCurrency(proyecto.remodelacion.presupuesto_estimado)
                                            : 'Sin presupuesto'
                                        }
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Supervisor */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Supervisor Asignado
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Select
                                        label="Seleccionar Supervisor"
                                        value={formData.supervisor_id}
                                        onChange={(value) => handleInputChange('supervisor_id', value)}
                                    >
                                        <Option value="">Sin supervisor</Option>
                                        {supervisores.map((supervisor) => (
                                            <Option key={supervisor._id} value={supervisor._id}>
                                                {supervisor.nombre} - {supervisor.email}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Typography variant="small" color="gray" className="mt-1">
                                        Supervisor responsable de la obra
                                    </Typography>
                                </div>
                                
                                <div className="bg-amber-50 p-4 rounded-lg">
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        Supervisor Actual:
                                    </Typography>
                                    <Typography className="mt-1">
                                        {proyecto.remodelacion?.supervisor?.nombre || 'Sin asignar'}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Fechas */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Fechas de Remodelación
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Input
                                        type="date"
                                        label="Fecha de Inicio"
                                        value={formData.fecha_inicio}
                                        onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
                                        icon={<CalendarIcon className="h-5 w-5" />}
                                    />
                                    <Typography variant="small" color="gray" className="mt-1">
                                        Fecha estimada de inicio de la remodelación
                                    </Typography>
                                </div>
                                
                                <div>
                                    <Input
                                        type="date"
                                        label="Fecha de Finalización"
                                        value={formData.fecha_fin}
                                        onChange={(e) => handleInputChange('fecha_fin', e.target.value)}
                                        icon={<CalendarIcon className="h-5 w-5" />}
                                    />
                                    <Typography variant="small" color="gray" className="mt-1">
                                        Fecha estimada de finalización
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Notas */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                                Notas y Observaciones
                            </Typography>
                            <Textarea
                                label="Notas sobre la remodelación"
                                value={formData.notas}
                                onChange={(e) => handleInputChange('notas', e.target.value)}
                                placeholder="Agregar notas, observaciones o instrucciones especiales para la remodelación..."
                                rows={4}
                            />
                            <Typography variant="small" color="gray" className="mt-1">
                                Información adicional relevante para el proyecto
                            </Typography>
                        </div>

                        {/* Alertas */}
                        {error && (
                            <Alert color="red" className="flex items-center gap-2">
                                <ExclamationTriangleIcon className="h-5 w-5" />
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert color="green" className="flex items-center gap-2">
                                <CheckIcon className="h-5 w-5" />
                                {success}
                            </Alert>
                        )}

                        {/* Botones de Acción */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                color="green"
                                size="lg"
                                disabled={saving}
                                className="flex items-center gap-2"
                            >
                                {saving ? (
                                    <Spinner size="sm" />
                                ) : (
                                    <CheckIcon className="h-5 w-5" />
                                )}
                                {saving ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                            
                            <Button
                                type="button"
                                color="gray"
                                size="lg"
                                variant="outlined"
                                onClick={() => navigate(`/dashboard/remodelacion/${id}`)}
                                disabled={saving}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default EditarRemodelacion;
