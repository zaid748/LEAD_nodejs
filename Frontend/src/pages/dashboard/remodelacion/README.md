# Sección de Remodelación - Dashboard LEAD

## Descripción
Sistema de gestión de proyectos en remodelación para el dashboard inmobiliario LEAD.

## Funcionalidades Principales

### 1. Gestión de Presupuestos
- Establecer presupuesto estimado al cambiar estatus a "Remodelacion"
- Seguimiento de gastos vs. presupuesto
- Alertas de desviación presupuestaria

### 2. Gestión de Materiales
- **Gastos Administrativos**: Registro directo por administración
- **Solicitudes de Contratista**: Flujo completo de aprobación
- Estados: Solicitando → Aprobación → Compra → Entrega → Entregado

### 3. Sistema de Notificaciones
- Notificaciones en tiempo real entre roles
- Seguimiento de estados de solicitudes
- Alertas de acciones requeridas

### 4. Carta de Responsabilidad
- Firma digital para recepción de materiales
- Términos y condiciones legales
- Almacenamiento seguro de firmas

### 5. Reportes y Métricas
- Análisis de gastos por proyecto
- Comparación presupuesto vs. real
- Métricas de eficiencia y rendimiento

## Roles y Permisos

### Administrador/Administrador del Sistema
- ✅ Acceso total a todos los proyectos
- ✅ Gestión de presupuestos
- ✅ Aprobación de solicitudes
- ✅ Registro de gastos administrativos

### Supervisor
- ✅ Acceso a proyectos asignados
- ✅ Agregar costos a solicitudes
- ✅ Realizar compras de materiales
- ✅ Gestionar entregas

### Contratista
- ✅ Acceso solo a proyectos asignados
- ✅ Solicitar materiales
- ✅ Firmar carta de responsabilidad
- ✅ Ver estado de solicitudes

### Ayudante de Administrador
- ✅ Mismas funciones que Administrador
- ✅ Acceso limitado según configuración

## Flujo de Trabajo

### Cambio de Estatus a Remodelación
1. **Administrador** cambia estatus desde Captaciones
2. **Sistema** solicita presupuesto estimado
3. **Proyecto** aparece en lista de Remodelación
4. **Supervisor** es asignado automáticamente

### Solicitud de Material por Contratista
1. **Contratista** solicita material (tipo, cantidad)
2. **Supervisor** agrega costo y envía a administración
3. **Administración** aprueba o rechaza
4. **Supervisor** realiza compra y registra folio
5. **Contratista** recibe y firma carta de responsabilidad

## Estructura de Archivos

```
remodelacion/
├── index.js                 # Exportaciones
├── README.md               # Esta documentación
├── RemodelacionPage.jsx    # Lista principal de proyectos
├── DetalleRemodelacion.jsx # Vista detallada del proyecto
└── EditarRemodelacion.jsx  # Edición de proyecto
```

## Integración con Captaciones

- **Relación**: Los proyectos en "Remodelacion" mantienen su información de captación
- **Sincronización**: Cambios en Remodelación se reflejan en Captaciones
- **Estatus**: Solo el estatus cambia, no se duplica información

## Tecnologías Utilizadas

- **Frontend**: React + Material-Tailwind
- **Estado**: useState, useEffect
- **API**: Servicios RESTful
- **Notificaciones**: WebSocket (futuro)
- **Firmas**: Canvas HTML5 + PDF
- **Reportes**: Exportación Excel + Métricas en tiempo real
