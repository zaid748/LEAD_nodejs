# Implementación de Lista de Compra para Contratistas

## Resumen de Cambios

Se ha implementado una nueva funcionalidad que permite a los contratistas crear **listas de compra** en lugar de solicitar materiales uno por uno. Esta mejora incluye el campo **tipo de unidad** para cada material.

## Cambios en el Backend

### 1. Modelo de Material Actualizado (`src/models/material.js`)
- ✅ Agregado campo `tipo_unidad` con opciones predefinidas específicas para construcción:
  - **Unidades básicas**: Pieza, Kilogramo, Litro, Metro, Metro cuadrado, Metro cúbico
  - **Contenedores**: Caja, Bolsa, Rollo, Costal, Saco, Bulto, Barril, Galón
  - **Materiales de construcción**: Tubo, Varilla, Lámina, Placa, Tabla, Viga, Poste, Bloque, Ladrillo
  - **Pesos**: Quintal, Tonelada, Gramo, Mililitro
  - **Medidas**: Pulgada, Pie, Yarda, Acre, Hectárea
  - **Otro**: Para casos especiales

### 2. Nuevo Modelo de Lista de Compra (`src/models/lista-compra.js`)
- ✅ Modelo completo para gestionar listas de compra
- ✅ Campos principales:
  - `proyecto_id`: Referencia al proyecto
  - `contratista_id`: Contratista que crea la lista
  - `supervisor_id`: Supervisor asignado al proyecto
  - `titulo`: Título de la lista
  - `descripcion`: Descripción general
  - `materiales`: Array de materiales con todos los campos necesarios
  - `estatus_general`: Estado de la lista (Borrador, Enviada, En revisión, etc.)
  - `total_estimado` y `total_final`: Cálculos automáticos
- ✅ Middleware para calcular totales automáticamente
- ✅ Índices para optimizar consultas

### 3. Nuevo Controlador (`src/controllers/lista-compra.controller.js`)
- ✅ `crearListaCompra()`: Crear nueva lista (contratista)
- ✅ `enviarListaCompra()`: Enviar lista al supervisor
- ✅ `obtenerListasCompra()`: Obtener listas del proyecto
- ✅ `obtenerListaCompra()`: Obtener detalles específicos
- ✅ `actualizarListaCompra()`: Editar lista (solo en borrador)
- ✅ `revisarListaCompra()`: Aprobar/rechazar (supervisor)
- ✅ `eliminarListaCompra()`: Eliminar lista (solo en borrador)
- ✅ Verificación de permisos por rol
- ✅ Sistema de notificaciones integrado

### 4. Nuevas Rutas (`src/routes/lista-compra.router.js`)
- ✅ `POST /api/lista-compra` - Crear lista
- ✅ `GET /api/lista-compra/proyecto/:proyecto_id` - Obtener listas del proyecto
- ✅ `GET /api/lista-compra/:listaId` - Obtener detalles
- ✅ `PUT /api/lista-compra/:listaId` - Actualizar lista
- ✅ `POST /api/lista-compra/:listaId/enviar` - Enviar al supervisor
- ✅ `POST /api/lista-compra/:listaId/revisar` - Revisar (supervisor)
- ✅ `DELETE /api/lista-compra/:listaId` - Eliminar lista
- ✅ Middleware de autenticación y validación de roles

### 5. Servidor Actualizado (`src/server.js`)
- ✅ Registradas las nuevas rutas de lista de compra

## Cambios en el Frontend

### 1. Página de Remodelación Actualizada (`Frontend/src/pages/dashboard/remodelacion/RemodelacionPage.jsx`)

#### Estados Nuevos:
- ✅ `showListaCompraModal`: Control del modal de lista de compra
- ✅ `listaCompra`: Estado de la lista completa
- ✅ `materialActual`: Estado del material que se está agregando

#### Funciones Nuevas:
- ✅ `abrirModalListaCompra()`: Abrir modal para crear lista
- ✅ `cerrarModalListaCompra()`: Cerrar modal y limpiar estados
- ✅ `agregarMaterialALista()`: Agregar material a la lista
- ✅ `eliminarMaterialDeLista()`: Remover material de la lista
- ✅ `crearListaCompra()`: Enviar lista al backend

#### Interfaz Actualizada:
- ✅ Botón "Lista de Compra" en lugar de "Material" para contratistas
- ✅ Modal completo con:
  - Formulario para información general de la lista
  - Formulario para agregar materiales individuales
  - Lista visual de materiales agregados
  - Campo de tipo de unidad para cada material
  - Gestión de urgencia por material
  - Notas generales

## Flujo de Trabajo

### Para Contratistas:
1. **Crear Lista**: El contratista hace clic en "Lista de Compra"
2. **Agregar Materiales**: Completa el formulario para cada material:
   - Tipo de material
   - Cantidad
   - Tipo de unidad (nuevo campo)
   - Urgencia
   - Descripción
3. **Revisar Lista**: Ve todos los materiales agregados
4. **Crear Lista**: Guarda la lista en estado "Borrador"
5. **Enviar al Supervisor**: La lista pasa a estado "Enviada"

### Para Supervisores:
1. **Recibir Notificación**: Cuando el contratista envía la lista
2. **Revisar Lista**: Ve todos los materiales solicitados
3. **Aprobar/Rechazar**: Puede aprobar toda la lista o rechazarla
4. **Agregar Costos**: Si aprueba, puede agregar costos estimados
5. **Enviar a Administración**: Lista aprobada va a administradores

## Beneficios de la Nueva Implementación

### ✅ Mejoras para Contratistas:
- **Eficiencia**: Crear una lista completa en lugar de solicitudes individuales
- **Organización**: Todos los materiales en un solo lugar
- **Flexibilidad**: Puede editar la lista antes de enviarla
- **Claridad**: Campo de tipo de unidad para especificar mejor las necesidades

### ✅ Mejoras para Supervisores:
- **Visión Completa**: Ve todos los materiales de una vez
- **Gestión Centralizada**: Aprobar/rechazar toda la lista
- **Control de Costos**: Agregar costos estimados por material
- **Notificaciones**: Recibe alertas cuando hay nuevas listas

### ✅ Mejoras para el Sistema:
- **Escalabilidad**: Mejor manejo de múltiples materiales
- **Trazabilidad**: Historial completo de cada lista
- **Flexibilidad**: Fácil agregar nuevos tipos de unidad
- **Seguridad**: Validación de permisos por rol

## Campos de Material Incluidos

Cada material en la lista incluye:
- ✅ **Tipo**: Nombre del material
- ✅ **Cantidad**: Número de unidades
- ✅ **Tipo de Unidad**: Pieza, Kilogramo, Litro, Metro, etc. (NUEVO)
- ✅ **Urgencia**: Baja, Media, Alta, Urgente
- ✅ **Descripción**: Especificaciones adicionales
- ✅ **Costo Estimado**: Para cálculos automáticos
- ✅ **Costo Final**: Después de revisión del supervisor
- ✅ **Estatus**: Pendiente, Aprobado, Rechazado, etc.

## Próximos Pasos Sugeridos

1. **Testing**: Probar la funcionalidad completa
2. **Notificaciones**: Implementar notificaciones en tiempo real
3. **Reportes**: Agregar reportes de listas de compra
4. **Historial**: Vista de historial de listas por proyecto
5. **Plantillas**: Permitir guardar listas como plantillas reutilizables

## Archivos Modificados

### Backend:
- `src/models/material.js` - Agregado campo tipo_unidad
- `src/models/lista-compra.js` - Nuevo modelo
- `src/controllers/lista-compra.controller.js` - Nuevo controlador
- `src/routes/lista-compra.router.js` - Nuevas rutas
- `src/server.js` - Registro de rutas

### Frontend:
- `Frontend/src/pages/dashboard/remodelacion/RemodelacionPage.jsx` - Interfaz actualizada

## Compatibilidad

- ✅ **Retrocompatible**: Las solicitudes individuales existentes siguen funcionando
- ✅ **Migración Gradual**: Los contratistas pueden usar el nuevo sistema gradualmente
- ✅ **Datos Existentes**: No se afectan los datos existentes
- ✅ **Roles**: Mantiene la estructura de permisos existente
