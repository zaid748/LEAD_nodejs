# Sección de Blog Corporativo

## Descripción
Esta sección permite gestionar el contenido del blog corporativo de LEAD Inmobiliaria, donde se pueden publicar eventos, cursos, noticias, proyectos y otros contenidos relevantes para la empresa.

## Componentes

### BlogList.jsx
- **Propósito**: Vista principal que muestra todos los blogs en formato de tabla
- **Funcionalidades**:
  - Lista paginada de blogs con información básica
  - Búsqueda por título o contenido
  - Filtrado por categoría (eventos, cursos, noticias, proyectos, testimonios, otros)
  - Acciones: Ver detalles, Editar
  - Botón para crear nuevo blog

### CrearBlog.jsx
- **Propósito**: Formulario para crear nuevos blogs
- **Funcionalidades**:
  - Formulario completo con validación
  - Campos: título, resumen, contenido, categoría, estado, fecha de publicación, tags
  - Subida de imagen principal (portada)
  - Subida de hasta 9 imágenes adicionales
  - Vista previa de imágenes antes de subir
  - Validación de campos obligatorios

### EditarBlog.jsx
- **Propósito**: Formulario para editar blogs existentes
- **Funcionalidades**:
  - Carga datos existentes del blog
  - Permite modificar todos los campos
  - Gestión de imágenes: agregar nuevas, eliminar existentes
  - Vista previa de imágenes actuales y nuevas
  - Validación de formulario

### DetalleBlog.jsx
- **Propósito**: Vista detallada de un blog específico
- **Funcionalidades**:
  - Muestra toda la información del blog
  - Galería de imágenes con vista ampliada
  - Información del autor y fechas
  - Estado de publicación
  - Botones de acción (Editar, Volver)

## Estructura de Datos

### Blog
```javascript
{
  id: String,
  titulo: String,           // Obligatorio
  resumen: String,          // Opcional
  contenido: String,        // Obligatorio
  categoria: String,        // Obligatorio: eventos, cursos, noticias, proyectos, testimonios, otros
  estado: String,          // Borrador, Publicado, Programado
  fechaPublicacion: Date,  // Obligatorio si estado = Publicado
  tags: String,           // Separados por comas
  imagenPrincipal: Object, // { url, key }
  imagenes: Array,         // Array de objetos { url, key }
  autor: Object,          // { nombre, id }
  createdAt: Date,
  updatedAt: Date
}
```

## Rutas

- `/dashboard/blog` - Lista de blogs
- `/dashboard/blog/nuevo` - Crear nuevo blog
- `/dashboard/blog/:id/editar` - Editar blog existente
- `/dashboard/blog/:id/detalle` - Ver detalles del blog

## Permisos de Acceso

- **Usuarios permitidos**: user, administrator, administrador, ayudante de administrador
- **Usuarios sin acceso**: supervisor, contratista

## API Endpoints Requeridos

### Backend debe implementar:

1. **GET /api/blog** - Listar blogs con paginación y filtros
2. **POST /api/blog** - Crear nuevo blog
3. **GET /api/blog/:id** - Obtener blog específico
4. **PUT /api/blog/:id** - Actualizar blog
5. **DELETE /api/blog/:id/imagenes** - Eliminar imagen específica

### Parámetros de consulta para GET /api/blog:
- `page` - Número de página
- `limit` - Elementos por página
- `sort` - Ordenamiento (ej: -createdAt)
- `search` - Búsqueda en título y contenido
- `category` - Filtro por categoría

## Características Técnicas

### Subida de Imágenes
- **Imagen principal**: Una imagen de portada (recomendado 1200x630px)
- **Imágenes adicionales**: Máximo 9 imágenes adicionales
- **Formatos soportados**: JPG, PNG, GIF
- **Tamaño máximo**: 5MB por imagen
- **Total máximo**: 10 imágenes por blog

### Validaciones
- Título obligatorio
- Contenido obligatorio
- Categoría obligatoria
- Fecha de publicación obligatoria si estado = "Publicado"
- Límite de imágenes respetado

### Estados de Publicación
- **Borrador**: No visible públicamente
- **Publicado**: Visible en el sitio web público
- **Programado**: Se publicará en fecha específica

## Integración con Sitio Público

Los blogs con estado "Publicado" estarán disponibles para ser mostrados en el sitio web público de LEAD Inmobiliaria, proporcionando contenido dinámico y actualizado sobre la empresa.

## Notas de Desarrollo

- Todos los componentes siguen las convenciones del proyecto
- Uso de Material Tailwind para la UI
- Manejo de errores consistente
- Autenticación requerida para todas las operaciones
- Responsive design para diferentes tamaños de pantalla
- Iconos de Heroicons para consistencia visual
