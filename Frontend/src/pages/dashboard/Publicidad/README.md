# Sección de Marketing Inmobiliario

## Descripción
Esta sección permite a los usuarios de marketing gestionar las propiedades disponibles para venta, personalizando títulos, precios de oferta, descripciones y galerías de imágenes para optimizar la presentación al público.

## Componentes

### 1. ProyectosMarketing.jsx
- **Propósito**: Vista principal que muestra una tabla de todas las propiedades con estatus "Disponible para venta"
- **Funcionalidades**:
  - Filtrado automático por estatus
  - Búsqueda por título, dirección o fraccionamiento
  - Paginación de resultados
  - Acciones para ver detalles, editar marketing y eliminar (solo admin)
  - Contador de imágenes por propiedad

### 2. EditarMarketing.jsx
- **Propósito**: Formulario para editar la configuración de marketing de una propiedad
- **Funcionalidades**:
  - Edición de título para marketing
  - Configuración de precio de oferta
  - Descripción personalizada para marketing
  - Gestión de imágenes (añadir, eliminar, vista previa)
  - Validación de estatus "Disponible para venta"

### 3. DetalleMarketing.jsx
- **Propósito**: Vista detallada del marketing de una propiedad
- **Funcionalidades**:
  - Información completa del proyecto
  - Configuración de marketing actual
  - Galería de imágenes (originales y de marketing)
  - Información de contacto
  - Acceso rápido a edición

## Características Técnicas

### Filtrado de Datos
- Solo se muestran propiedades con estatus "Disponible para venta"
- Búsqueda semántica en múltiples campos
- Paginación eficiente para grandes volúmenes

### Gestión de Imágenes
- Soporte para múltiples imágenes simultáneas
- Vista previa antes de subir
- Eliminación selectiva de imágenes existentes
- Separación entre imágenes originales y de marketing

### Seguridad
- Verificación de autenticación en todas las rutas
- Control de acceso basado en roles
- Validación de datos en frontend y backend

## Rutas del Frontend

```
/dashboard/marketing                    - Lista de proyectos
/dashboard/marketing/:id/detalle       - Detalle de un proyecto
/dashboard/marketing/:id/editar        - Editar marketing
```

## Rutas del Backend

```
GET  /api/marketing                    - Obtener proyectos de marketing
GET  /api/marketing/:id                - Obtener proyecto específico
PUT  /api/marketing/:id                - Actualizar marketing
GET  /api/marketing/estadisticas      - Estadísticas de marketing
```

## Campos del Modelo

### Campos Originales
- `Titulo`: Título de la propiedad
- `Tipo`: Tipo de propiedad (Casa, Apartamento, etc.)
- `Direccion`: Dirección completa
- `Presio`: Precio original
- `Estatus`: Estado actual de la propiedad

### Campos de Marketing
- `precioOferta`: Precio especial para marketing
- `descripcionMarketing`: Descripción personalizada para marketing
- `imagenesMarketing`: Array de URLs de imágenes de marketing

## Flujo de Trabajo

1. **Visualización**: El usuario ve solo propiedades disponibles para venta
2. **Selección**: Hace clic en el lápiz para editar marketing
3. **Edición**: Configura título, precio de oferta y descripción
4. **Imágenes**: Sube nuevas imágenes o elimina existentes
5. **Guardado**: Los cambios se aplican a la base de datos
6. **Visualización**: Los cambios se reflejan en la vista de detalles

## Roles y Permisos

- **Admin/Administrator**: Acceso completo, incluyendo eliminación
- **Marketing**: Edición y visualización completa
- **Asesor/User**: Edición y visualización limitada
- **Otros roles**: Solo visualización

## Consideraciones de UX

- Interfaz intuitiva y responsive
- Feedback visual inmediato para todas las acciones
- Confirmaciones para acciones destructivas
- Estados de carga y error claros
- Navegación consistente con el resto de la aplicación
