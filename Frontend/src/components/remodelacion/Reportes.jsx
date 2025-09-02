import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Spinner,
  Alert,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function Reportes({ proyectoId, userRole }) {
  const [reportes, setReportes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroPeriodo, setFiltroPeriodo] = useState("mes");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  useEffect(() => {
    cargarReportes();
  }, [proyectoId, filtroPeriodo, filtroTipo]);

  const cargarReportes = async () => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API
      // const data = await remodelacionAPI.obtenerReportes(proyectoId, { periodo: filtroPeriodo, tipo: filtroTipo });
      // setReportes(data);
      
      // Datos de ejemplo
      setReportes({
        resumen_financiero: {
          presupuesto_estimado: 150000,
          presupuesto_total: 125000,
          gastos_administrativos: 25000,
          gastos_materiales: 100000,
          diferencia: 25000,
          porcentaje_utilizado: 83.33,
        },
        metricas_tiempo: {
          tiempo_promedio_aprobacion: 2.5, // días
          tiempo_promedio_compra: 1.8, // días
          tiempo_promedio_entrega: 0.5, // días
          eficiencia_aprobaciones: 85.5, // porcentaje
        },
        gastos_por_tipo: [
          { tipo: "Cemento", cantidad: 15, costo_total: 3750, porcentaje: 3.75 },
          { tipo: "Varilla", cantidad: 50, costo_total: 15000, porcentaje: 15.0 },
          { tipo: "Pintura", cantidad: 20, costo_total: 8000, porcentaje: 8.0 },
          { tipo: "Azulejos", cantidad: 100, costo_total: 8500, porcentaje: 8.5 },
          { tipo: "Herramientas", cantidad: 10, costo_total: 5000, porcentaje: 5.0 },
        ],
        solicitudes_estado: [
          { estatus: "Solicitando material", cantidad: 3, porcentaje: 20.0 },
          { estatus: "Aprobacion administrativa", cantidad: 2, porcentaje: 13.3 },
          { estatus: "Aprobado para su compra", cantidad: 4, porcentaje: 26.7 },
          { estatus: "En proceso de entrega", cantidad: 3, porcentaje: 20.0 },
          { estatus: "Entregado", cantidad: 3, porcentaje: 20.0 },
        ],
        tendencias_mensuales: [
          { mes: "Enero", gastos: 45000, solicitudes: 8, aprobaciones: 6 },
          { mes: "Febrero", gastos: 38000, solicitudes: 5, aprobaciones: 4 },
          { mes: "Marzo", gastos: 42000, solicitudes: 7, aprobaciones: 5 },
        ],
        alertas: [
          { tipo: "presupuesto", mensaje: "El proyecto ha utilizado el 83.33% del presupuesto", prioridad: "media" },
          { tipo: "tiempo", mensaje: "Tiempo promedio de aprobación: 2.5 días", prioridad: "baja" },
          { tipo: "materiales", mensaje: "3 solicitudes pendientes de aprobación", prioridad: "alta" },
        ],
      });
    } catch (err) {
      console.error("Error al cargar reportes:", err);
      setError("Error al cargar los reportes");
    } finally {
      setLoading(false);
    }
  };

  const exportarReporte = (formato) => {
    // TODO: Implementar exportación de reportes
    console.log(`Exportando reporte en formato ${formato}`);
    alert(`Reporte exportado en formato ${formato}`);
  };

  const getPrioridadColor = (prioridad) => {
    const colors = {
      "alta": "red",
      "media": "amber",
      "baja": "green",
    };
    return colors[prioridad] || "gray";
  };

  const getTendenciaIcon = (valor, tipo) => {
    if (tipo === "gastos") {
      return valor > 40000 ? <ArrowTrendingUpIcon className="h-4 w-4 text-red-500" /> : <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="red" className="mb-4">
        {error}
      </Alert>
    );
  }

  if (!reportes) {
    return (
      <div className="text-center p-8">
        <Typography color="gray">No hay datos de reportes disponibles</Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChartBarIcon className="h-8 w-8 text-blue-500" />
          <div>
            <Typography variant="h5" color="blue-gray">
              Reportes y Métricas
            </Typography>
            <Typography variant="small" color="gray">
              Análisis financiero y métricas de rendimiento del proyecto
            </Typography>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select
            label="Período"
            value={filtroPeriodo}
            onChange={(value) => setFiltroPeriodo(value)}
            className="w-32"
          >
            <Option value="semana">Semana</Option>
            <Option value="mes">Mes</Option>
            <Option value="trimestre">Trimestre</Option>
            <Option value="año">Año</Option>
          </Select>
          
          <Select
            label="Tipo"
            value={filtroTipo}
            onChange={(value) => setFiltroTipo(value)}
            className="w-40"
          >
            <Option value="todos">Todos</Option>
            <Option value="financiero">Financiero</Option>
            <Option value="operativo">Operativo</Option>
            <Option value="materiales">Materiales</Option>
          </Select>
          
          <Button
            variant="outlined"
            color="blue"
            onClick={() => exportarReporte("PDF")}
            className="flex items-center gap-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Resumen Financiero */}
      <Card>
        <CardHeader color="blue" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Resumen Financiero
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-gray-50 rounded-lg">
              <Typography variant="h4" color="blue" className="font-bold">
                {formatCurrency(reportes.resumen_financiero.presupuesto_estimado)}
              </Typography>
              <Typography variant="small" color="blue-gray">
                Presupuesto Estimado
              </Typography>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Typography variant="h4" color="green" className="font-bold">
                {formatCurrency(reportes.resumen_financiero.presupuesto_total)}
              </Typography>
              <Typography variant="small" color="green">
                Presupuesto Total
              </Typography>
            </div>
            
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <Typography variant="h4" color="amber" className="font-bold">
                {formatCurrency(reportes.resumen_financiero.diferencia)}
              </Typography>
              <Typography variant="small" color="amber">
                Diferencia
              </Typography>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Typography variant="h4" color="purple" className="font-bold">
                {reportes.resumen_financiero.porcentaje_utilizado}%
              </Typography>
              <Typography variant="small" color="purple">
                Presupuesto Utilizado
              </Typography>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <Typography variant="h6" color="red" className="mb-2">
                Gastos Administrativos
              </Typography>
              <Typography variant="h4" color="red" className="font-bold">
                {formatCurrency(reportes.resumen_financiero.gastos_administrativos)}
              </Typography>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <Typography variant="h6" color="purple" className="mb-2">
                Gastos de Materiales
              </Typography>
              <Typography variant="h4" color="purple" className="font-bold">
                {formatCurrency(reportes.resumen_financiero.gastos_materiales)}
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Métricas de Tiempo */}
      <Card>
        <CardHeader color="green" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Métricas de Tiempo y Eficiencia
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <ClockIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <Typography variant="h4" color="blue" className="font-bold">
                {reportes.metricas_tiempo.tiempo_promedio_aprobacion} días
              </Typography>
              <Typography variant="small" color="blue-gray">
                Tiempo Promedio de Aprobación
              </Typography>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CalendarIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <Typography variant="h4" color="green" className="font-bold">
                {reportes.metricas_tiempo.tiempo_promedio_compra} días
              </Typography>
              <Typography variant="small" color="green">
                Tiempo Promedio de Compra
              </Typography>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <UserIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <Typography variant="h4" color="purple" className="font-bold">
                {reportes.metricas_tiempo.tiempo_promedio_entrega} días
              </Typography>
              <Typography variant="small" color="purple">
                Tiempo Promedio de Entrega
              </Typography>
            </div>
            
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <CheckCircleIcon className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <Typography variant="h4" color="amber" className="font-bold">
                {reportes.metricas_tiempo.eficiencia_aprobaciones}%
              </Typography>
              <Typography variant="small" color="amber">
                Eficiencia en Aprobaciones
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Gastos por Tipo de Material */}
      <Card>
        <CardHeader color="purple" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Gastos por Tipo de Material
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Tipo de Material</TableHeaderCell>
                <TableHeaderCell>Cantidad</TableHeaderCell>
                <TableHeaderCell>Costo Total</TableHeaderCell>
                <TableHeaderCell>Porcentaje</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportes.gastos_por_tipo.map((material, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      {material.tipo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" color="blue-gray">
                      {material.cantidad}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" className="font-medium text-green-600">
                      {formatCurrency(material.costo_total)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      value={`${material.porcentaje}%`}
                      color="purple"
                      size="sm"
                      variant="ghost"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Estado de Solicitudes */}
      <Card>
        <CardHeader color="amber" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Estado de Solicitudes de Materiales
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Estatus</TableHeaderCell>
                <TableHeaderCell>Cantidad</TableHeaderCell>
                <TableHeaderCell>Porcentaje</TableHeaderCell>
                <TableHeaderCell>Indicador</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportes.solicitudes_estado.map((estado, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      {estado.estatus}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" color="blue-gray">
                      {estado.cantidad}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" color="blue-gray">
                      {estado.porcentaje}%
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${estado.porcentaje}%` }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Tendencias Mensuales */}
      <Card>
        <CardHeader color="blue-gray" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Tendencias Mensuales
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Mes</TableHeaderCell>
                <TableHeaderCell>Gastos</TableHeaderCell>
                <TableHeaderCell>Solicitudes</TableHeaderCell>
                <TableHeaderCell>Aprobaciones</TableHeaderCell>
                <TableHeaderCell>Tendencia</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportes.tendencias_mensuales.map((tendencia, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      {tendencia.mes}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" className="font-medium">
                      {formatCurrency(tendencia.gastos)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" color="blue-gray">
                      {tendencia.solicitudes}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="small" color="blue-gray">
                      {tendencia.aprobaciones}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getTendenciaIcon(tendencia.gastos, "gastos")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Alertas y Recomendaciones */}
      <Card>
        <CardHeader color="red" variant="gradient" className="p-4">
          <Typography variant="h6" color="white">
            Alertas y Recomendaciones
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          <div className="space-y-4">
            {reportes.alertas.map((alerta, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alerta.prioridad === "alta"
                    ? "bg-red-50 border-red-500"
                    : alerta.prioridad === "media"
                    ? "bg-amber-50 border-amber-500"
                    : "bg-green-50 border-green-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  <ExclamationTriangleIcon className={`h-5 w-5 mt-0.5 ${
                    alerta.prioridad === "alta"
                      ? "text-red-500"
                      : alerta.prioridad === "media"
                      ? "text-amber-500"
                      : "text-green-500"
                  }`} />
                  <div className="flex-1">
                    <Typography variant="small" color="blue-gray" className="font-medium mb-1">
                      {alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1)}
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {alerta.mensaje}
                    </Typography>
                  </div>
                  <Chip
                    value={alerta.prioridad}
                    color={getPrioridadColor(alerta.prioridad)}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Información del sistema */}
      <Card className="bg-blue-50 border-blue-200">
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Sistema de Reportes
          </Typography>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Los reportes se actualizan en tiempo real según las acciones realizadas en el sistema.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Puedes filtrar por período y tipo de reporte para obtener información más específica.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Los reportes se pueden exportar en diferentes formatos para análisis externo.
              </Typography>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <Typography variant="small" color="blue-gray">
                Las alertas se generan automáticamente cuando se detectan situaciones que requieren atención.
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
