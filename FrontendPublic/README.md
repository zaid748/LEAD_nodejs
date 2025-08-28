# 🏠 Frontend Público - LEAD Inmobiliaria

## 📋 Descripción

Este es el frontend público para clientes de LEAD Inmobiliaria. Muestra las propiedades disponibles para venta de forma dinámica, cargando datos desde la API del backend.

## 🚀 Características

- **Carga Dinámica**: Las propiedades se cargan automáticamente desde la API
- **Solo Propiedades en Venta**: Muestra únicamente propiedades con estatus "Disponible para venta"
- **Primera Imagen**: Usa la primera imagen subida como imagen principal
- **Datos Reales**: Conectado directamente con tu base de datos
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Iconos Funcionales**: Sistema de iconos completamente funcional

## 🏗️ Estructura de Archivos

```
FrontendPublic/
├── index.html              # Página principal con propiedades
├── config.js               # Configuración y funciones utilitarias
├── test-api.html           # Página de prueba de la API
├── css/
│   ├── style.css           # Estilos principales
│   └── icons-simple.css    # Iconos del sistema
├── js/
│   └── main.js             # Funcionalidades principales
└── images/                 # Imágenes del template
```

## 🔧 Configuración

### Archivo `config.js`

Contiene toda la configuración del frontend:

- **URL de la API**: Se configura automáticamente según el entorno
- **Endpoints**: URLs de los endpoints de la API
- **Colores de marca**: Paleta de colores personalizable
- **Configuración de imágenes**: Formatos permitidos, tamaños máximos
- **Paginación**: Número de elementos por página

### Variables de Entorno

El sistema detecta automáticamente si está en:
- **Desarrollo**: `localhost:4000`
- **Producción**: `lead-inmobiliaria.com`

## 📡 API Endpoints

### Obtener Todas las Propiedades
```
GET /api/publico/marketing
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Proyectos obtenidos correctamente",
  "proyectos": [
    {
      "_id": "captacion_id",
      "tipo": "Casa",
      "direccion": {
        "calle": "Calle Principal 123",
        "colonia": "Colonia Centro",
        "ciudad": "Ciudad de México"
      },
      "caracteristicas": {
        "habitaciones": 3,
        "baños": 2,
        "m2_construccion": 150
      },
      "marketing": {
        "titulo": "Hermosa casa en venta",
        "descripcion": "Descripción de la propiedad",
        "precioOferta": "2500000",
        "imagenes": [
          {
            "url": "https://...",
            "nombre": "imagen1.jpg",
            "orden": 1
          }
        ]
      },
      "venta": {
        "estatus_venta": "Disponible para venta",
        "monto_venta": "2500000"
      }
    }
  ],
  "paginacion": {
    "pagina": 1,
    "limite": 10,
    "total": 25,
    "paginas": 3
  }
}
```

### Obtener Propiedad Específica
```
GET /api/publico/marketing/:id
```

## 🎨 Personalización

### Colores de Marca

Edita `config.js` para cambiar los colores:

```javascript
BRAND_COLORS: {
    PRIMARY: '#007bff',      // Azul principal
    SUCCESS: '#28a745',      // Verde éxito
    DANGER: '#dc3545',       // Rojo peligro
    WARNING: '#ffc107',      // Amarillo advertencia
    INFO: '#17a2b8'          // Azul información
}
```

### Imágenes

- **Placeholder**: `images/placeholder.jpg`
- **Formatos permitidos**: JPG, JPEG, PNG, GIF, WEBP
- **Tamaño máximo**: 5MB por imagen

## 🧪 Testing

### Página de Prueba

Accede a `test-api.html` para probar la API:

1. Abre `http://localhost:4000/publico/test-api.html`
2. Haz clic en "Probar API de Marketing"
3. Revisa la consola del navegador para logs detallados

### Consola del Navegador

El sistema genera logs detallados:

```
🚀 Página cargada, iniciando carga de propiedades...
🔄 Cargando propiedades de marketing...
📊 Respuesta de la API: {success: true, proyectos: [...]}
✅ 5 propiedades cargadas correctamente
```

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. No se cargan las propiedades
- Verifica que el servidor esté corriendo en puerto 4000
- Revisa la consola del navegador para errores
- Prueba la API directamente: `http://localhost:4000/api/publico/marketing`

#### 2. Iconos no se muestran
- Verifica que `css/icons-simple.css` esté incluido
- Asegúrate de que las fuentes estén en `/publico/fonts/icomoon/`

#### 3. Imágenes no se cargan
- Verifica que las URLs de las imágenes sean válidas
- Revisa que las imágenes estén en S3/DigitalOcean Spaces
- El sistema usa imágenes placeholder como fallback

### Logs de Debug

El sistema incluye logs detallados para debugging:

```javascript
console.log('🔄 Cargando propiedades de marketing...');
console.log('📊 Respuesta de la API:', data);
console.log(`✅ ${proyectos.length} propiedades cargadas correctamente`);
```

## 📱 Responsive Design

El frontend es completamente responsive:

- **Desktop**: 3 columnas de propiedades
- **Tablet**: 2 columnas de propiedades  
- **Mobile**: 1 columna de propiedades

## 🔒 Seguridad

- **CORS**: Configurado para permitir acceso público
- **Headers de Seguridad**: X-Frame-Options, X-Content-Type-Options
- **Validación**: Los datos se validan en el backend
- **Sanitización**: HTML se sanitiza antes de mostrar

## 🚀 Despliegue

### Desarrollo Local
```bash
# El servidor debe estar corriendo en puerto 4000
npm start

# Acceder al frontend público
http://localhost:4000/publico/
```

### Producción
```bash
# Configurar variables de entorno
NODE_ENV=production
PORT=4000

# El sistema detectará automáticamente el dominio
```

## 📞 Soporte

Para soporte técnico o preguntas:
- Revisa los logs de la consola del navegador
- Verifica la documentación de la API
- Contacta al equipo de desarrollo

---

**LEAD Inmobiliaria** - Tu socio de confianza en bienes raíces 🏠✨
