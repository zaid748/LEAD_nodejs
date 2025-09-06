# Funcionalidad de Administración en Remodelación

## Descripción

Se ha agregado una nueva funcionalidad en la página de Remodelación que permite a los administradores ver todas las listas de compra que han pasado por su aprobación y las listas de contratistas, con opciones limitadas de solo ver detalles e imprimir órdenes de compra.

## Funcionalidades Implementadas

### 🔧 **Botón "Listas de Compra" para Administradores**

Los administradores ahora ven un botón adicional en la tabla de proyectos de remodelación:

- **Ubicación**: En la columna "Acciones" de cada proyecto
- **Visibilidad**: Solo para usuarios con roles `administrator`, `administrador`, `ayudante de administrador`
- **Acción**: Abre un modal con todas las listas de compra

### 📋 **Modal de Listas de Compra**

El modal muestra una tabla completa con:

- **Lista de Compra**: Título y número de materiales
- **Proyecto**: Dirección del proyecto
- **Contratista**: Nombre del contratista
- **Total**: Monto total de la lista
- **Estatus**: Estado actual de la lista
- **Fecha**: Fecha de creación
- **Acciones**: Botones de "Ver detalles" e "Imprimir"

**Nota**: Solo se muestran listas que están pendientes de aprobación administrativa o ya han sido procesadas por administración.

### 🔍 **Modal de Detalles**

Al hacer clic en "Ver detalles" se abre un modal que muestra:

- **Información General**: Fecha de creación, contratista, total
- **Lista de Materiales**: Detalles completos de cada material
  - Tipo de material
  - Cantidad y unidad
  - Urgencia
  - Costo estimado y final
  - Descripción
  - Notas del supervisor
- **Descripción General**: Notas adicionales de la lista
- **Botón de Impresión**: Para generar orden de compra

## Estados de Lista Mostrados

El sistema muestra listas en los siguientes estados:

- **Aprobada**: Listas aprobadas por supervisores, pendientes de aprobación administrativa
- **En compra**: Listas aprobadas por administración
- **Completada**: Listas finalizadas
- **Rechazada**: Listas rechazadas por administración

## Acciones Disponibles

### Para Administradores:

1. **Ver Detalles**: Permite ver información completa de la lista
2. **Imprimir Orden**: Genera orden de compra (funcionalidad pendiente)

### Restricciones:

- **NO pueden aprobar/rechazar**: Solo pueden ver y imprimir
- **NO pueden editar costos**: Los costos ya están establecidos por supervisores
- **NO pueden modificar estados**: Solo visualización

## Endpoints del Backend

### Nuevo Endpoint:

```
GET /api/lista-compra/admin/todas
```

**Descripción**: Obtiene todas las listas de compra para administración
**Acceso**: Solo administradores
**Respuesta**: Lista de compras con información completa

## Archivos Modificados

### Frontend:
1. **`Frontend/src/pages/dashboard/remodelacion/RemodelacionPage.jsx`**:
   - Agregados estados para modales de administración
   - Nueva función `verListasCompraAdmin()`
   - Nuevos modales para listas de compra y detalles
   - Botón "Listas de Compra" para administradores
   - Función `getListaCompraStatusColor()` para colores de estado

### Backend:
1. **`src/controllers/lista-compra.controller.js`**:
   - Nuevo método `obtenerTodasListasAdmin()`
   - Validación de permisos de administrador
   - Populate de relaciones necesarias

2. **`src/routes/lista-compra.router.js`**:
   - Nueva ruta `/admin/todas`
   - Documentación del endpoint

## Flujo de Trabajo

### Para Administradores:

1. **Acceder a Remodelación**: Ir a la página de proyectos en remodelación
2. **Ver Botón**: El botón "Listas de Compra" aparece en la tabla
3. **Abrir Modal**: Hacer clic para ver todas las listas
4. **Revisar Listas**: Ver información de cada lista de compra
5. **Ver Detalles**: Hacer clic en "Ver detalles" para información completa
6. **Imprimir**: Usar botón "Imprimir" para generar orden de compra

## Beneficios

- **Visibilidad Completa**: Los administradores pueden ver todas las listas de compra
- **Control de Acceso**: Solo pueden ver, no modificar
- **Trazabilidad**: Seguimiento completo del proceso de compras
- **Preparación para Impresión**: Base lista para implementar funcionalidad de impresión

## Próximos Pasos

1. **Implementar Impresión**: Desarrollar funcionalidad de generación de órdenes de compra
2. **Filtros Avanzados**: Agregar filtros por fecha, proyecto, contratista
3. **Exportación**: Permitir exportar listas a PDF o Excel
4. **Notificaciones**: Alertas cuando hay nuevas listas de compra

## Testing

### Para Probar:

1. **Como Administrador**:
   - Iniciar sesión con usuario administrador
   - Ir a Remodelación
   - Verificar que aparece el botón "Listas de Compra"
   - Hacer clic en el botón
   - Verificar que se abre el modal con las listas
   - Probar "Ver detalles" de una lista
   - Verificar que se muestra información completa
   - Probar botón "Imprimir" (debe mostrar alerta temporal)

2. **Validaciones**:
   - Solo administradores ven el botón
   - Modal se abre correctamente
   - Información se muestra completa
   - Estados se muestran con colores correctos
   - Botones funcionan correctamente

## Resultado

- ✅ **Administradores pueden ver todas las listas de compra**
- ✅ **Interfaz clara y organizada**
- ✅ **Acceso controlado y seguro**
- ✅ **Base lista para funcionalidad de impresión**
- ✅ **Trazabilidad completa del proceso**
