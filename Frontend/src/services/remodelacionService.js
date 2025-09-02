import { API_BASE_URL } from '../config/config';

/**
 * Servicio para gestión de remodelación
 */
class RemodelacionService {
    constructor() {
        this.baseURL = `${API_BASE_URL}/captaciones`;
    }

    /**
     * Obtener token de autenticación
     */
    getAuthToken() {
        return localStorage.getItem('token');
    }

    /**
     * Configurar headers de la petición
     */
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAuthToken()}`
        };
    }

    /**
     * Realizar petición HTTP
     */
    async makeRequest(url, options = {}) {
        try {
            // Usar el mismo sistema de autenticación que api.js (cookies)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Para enviar cookies automáticamente
                ...options
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en petición HTTP:', error);
            throw error;
        }
    }

    /**
     * Obtener información completa de remodelación
     */
    async getRemodelacionData(proyectoId) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion`);
    }

    /**
     * Establecer presupuesto estimado
     */
    async establecerPresupuesto(proyectoId, presupuestoEstimado) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/presupuesto`, {
            method: 'POST',
            body: JSON.stringify({ presupuesto_estimado: presupuestoEstimado })
        });
    }

    /**
     * Registrar gasto administrativo
     */
    async registrarGastoAdministrativo(proyectoId, gastoData) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/gasto-administrativo`, {
            method: 'POST',
            body: JSON.stringify(gastoData)
        });
    }

    /**
     * Solicitar material
     */
    async solicitarMaterial(proyectoId, solicitudData) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/solicitar-material`, {
            method: 'POST',
            body: JSON.stringify(solicitudData)
        });
    }

    /**
     * Agregar costo a solicitud
     */
    async agregarCosto(proyectoId, materialId, costo) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/agregar-costo`, {
            method: 'PUT',
            body: JSON.stringify({ costo })
        });
    }

    /**
     * Aprobar solicitud de material
     */
    async aprobarSolicitud(proyectoId, materialId) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/aprobar`, {
            method: 'PUT'
        });
    }

    /**
     * Registrar compra de material
     */
    async registrarCompra(proyectoId, materialId, compraData) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/registrar-compra`, {
            method: 'PUT',
            body: JSON.stringify(compraData)
        });
    }

    /**
     * Entregar material
     */
    async entregarMaterial(proyectoId, materialId, entregaData) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/material/${materialId}/entregar`, {
            method: 'PUT',
            body: JSON.stringify(entregaData)
        });
    }

    /**
     * Firmar carta de responsabilidad
     */
    async firmarCartaResponsabilidad(proyectoId, firmaData) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/firmar-carta`, {
            method: 'POST',
            body: JSON.stringify(firmaData)
        });
    }

    /**
     * Obtener reportes
     */
    async obtenerReportes(proyectoId, filtros = {}) {
        const queryParams = new URLSearchParams(filtros).toString();
        const url = queryParams ? 
            `${this.baseURL}/${proyectoId}/remodelacion/reportes?${queryParams}` :
            `${this.baseURL}/${proyectoId}/remodelacion/reportes`;
        
        return this.makeRequest(url);
    }

    /**
     * Obtener materiales del proyecto
     */
    async obtenerMateriales(proyectoId, filtros = {}) {
        const queryParams = new URLSearchParams(filtros).toString();
        const url = queryParams ? 
            `${this.baseURL}/${proyectoId}/remodelacion/materiales?${queryParams}` :
            `${this.baseURL}/${proyectoId}/remodelacion/materiales`;
        
        return this.makeRequest(url);
    }

    /**
     * Obtener notificaciones del proyecto
     */
    async obtenerNotificaciones(proyectoId, filtros = {}) {
        const queryParams = new URLSearchParams(filtros).toString();
        const url = queryParams ? 
            `${this.baseURL}/${proyectoId}/remodelacion/notificaciones?${queryParams}` :
            `${this.baseURL}/${proyectoId}/remodelacion/notificaciones`;
        
        return this.makeRequest(url);
    }

    /**
     * Marcar notificación como leída
     */
    async marcarNotificacionLeida(proyectoId, notificacionId) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/notificacion/${notificacionId}/marcar-leida`, {
            method: 'PUT'
        });
    }

    /**
     * Subir archivo (firma o comprobante)
     */
    async subirArchivo(archivo, tipo = 'general') {
        try {
            const formData = new FormData();
            formData.append('archivo', archivo);
            formData.append('tipo', tipo);

            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.getAuthToken()}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error al subir archivo:', error);
            throw error;
        }
    }

    /**
     * Generar PDF de carta de responsabilidad
     */
    async generarPDFCarta(proyectoId, datosCarta) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/generar-carta-pdf`, {
            method: 'POST',
            body: JSON.stringify(datosCarta)
        });
    }

    /**
     * Obtener estadísticas del proyecto
     */
    async obtenerEstadisticas(proyectoId, filtros = {}) {
        const queryParams = new URLSearchParams(filtros).toString();
        const url = queryParams ? 
            `${this.baseURL}/${proyectoId}/remodelacion/estadisticas?${queryParams}` :
            `${this.baseURL}/${proyectoId}/remodelacion/estadisticas`;
        
        return this.makeRequest(url);
    }

    /**
     * Exportar reporte a Excel
     */
    async exportarReporteExcel(proyectoId, filtros = {}) {
        try {
            const queryParams = new URLSearchParams(filtros).toString();
            const url = queryParams ? 
                `${this.baseURL}/${proyectoId}/remodelacion/exportar-excel?${queryParams}` :
                `${this.baseURL}/${proyectoId}/remodelacion/exportar-excel`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.getAuthToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `reporte-remodelacion-${proyectoId}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);

            return { success: true, message: 'Reporte exportado exitosamente' };
        } catch (error) {
            console.error('Error al exportar reporte:', error);
            throw error;
        }
    }

    /**
     * Obtener historial de cambios de estatus
     */
    async obtenerHistorialEstatus(proyectoId) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/historial-estatus`);
    }

    /**
     * Actualizar supervisor de remodelación
     */
    async actualizarSupervisor(proyectoId, supervisorId) {
        return this.makeRequest(`${this.baseURL}/${proyectoId}/remodelacion/supervisor`, {
            method: 'PUT',
            body: JSON.stringify({ supervisor_id: supervisorId })
        });
    }

    /**
     * Obtener usuarios por rol
     */
    async obtenerUsuariosPorRol(rol) {
        return this.makeRequest(`${API_BASE_URL}/users?role=${rol}`);
    }

    /**
     * Validar permisos del usuario
     */
    async validarPermisos(accion) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/validate-permissions`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ accion })
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('Error al validar permisos:', error);
            return false;
        }
    }
}

// Crear instancia única del servicio
const remodelacionService = new RemodelacionService();

// Exportar funciones individuales para uso directo
export const {
    getRemodelacionData,
    establecerPresupuesto,
    registrarGastoAdministrativo,
    solicitarMaterial,
    agregarCosto,
    aprobarSolicitud,
    registrarCompra,
    entregarMaterial,
    firmarCartaResponsabilidad,
    obtenerReportes,
    obtenerMateriales,
    obtenerNotificaciones,
    marcarNotificacionLeida,
    subirArchivo,
    generarPDFCarta,
    obtenerEstadisticas,
    exportarReporteExcel,
    obtenerHistorialEstatus,
    actualizarSupervisor,
    obtenerUsuariosPorRol,
    validarPermisos
} = remodelacionService;

// Exportar instancia del servicio
export default remodelacionService;
