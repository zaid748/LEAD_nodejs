# Solución: Error API_URL y Organización de Archivos

## 🔧 Problemas Identificados y Solucionados

### ❌ **Problema 1: Error "API_URL is not defined"**
- El código usaba `API_URL` que no estaba definido
- Causaba error al intentar confirmar compra

### ❌ **Problema 2: Archivos no organizados**
- Los archivos se guardaban sin estructura
- No había organización por proyecto

## ✅ **Soluciones Implementadas**

### **1. Corrección del Error API_URL**

#### **Frontend** (`RemodelacionPage.jsx`)
```javascript
// ❌ Antes (causaba error)
const response = await axios.post(
    `${API_URL}/api/lista-compra/${listaId}/comprada`,
    formData,
    // ...
);

// ✅ Después (corregido)
const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/lista-compra/${listaId}/comprada`,
    formData,
    // ...
);
```

**Cambios realizados:**
- Reemplazado `API_URL` por `import.meta.env.VITE_API_URL`
- Aplicado en ambas funciones: `marcarComoRecibida()` y `marcarComoComprada()`

### **2. Organización de Archivos por Proyecto**

#### **Backend** (`lista-compra.controller.js`)

**Estructura de carpetas creada:**
```
uploads/
└── comprobantes/
    └── {proyecto_id}/
        ├── comprobante_1234567890_factura.pdf
        ├── comprobante_1234567891_ticket.jpg
        └── comprobante_1234567892_recibo.png
```

**Código implementado:**
```javascript
// Crear estructura de carpetas por proyecto
const proyectoId = listaCompra.proyecto_id._id.toString();
const uploadsDir = path.join(__dirname, '../../uploads');
const comprobantesDir = path.join(uploadsDir, 'comprobantes');
const proyectoDir = path.join(comprobantesDir, proyectoId);

// Crear directorios si no existen
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(comprobantesDir)) {
    fs.mkdirSync(comprobantesDir, { recursive: true });
}
if (!fs.existsSync(proyectoDir)) {
    fs.mkdirSync(proyectoDir, { recursive: true });
}

// Guardar archivo con nombre único
for (const file of files) {
    const timestamp = Date.now();
    const fileName = `comprobante_${timestamp}_${file.originalname}`;
    const filePath = path.join(proyectoDir, fileName);
    
    // Guardar archivo en el sistema de archivos
    fs.writeFileSync(filePath, file.buffer);
    
    // Guardar información del archivo
    comprobantesUrls.push({
        nombre: file.originalname,
        nombreArchivo: fileName,
        url: `/uploads/comprobantes/${proyectoId}/${fileName}`,
        rutaCompleta: filePath,
        tipo: file.mimetype,
        tamaño: file.size,
        fechaSubida: new Date()
    });
}
```

#### **Modelo** (`lista-compra.js`)
```javascript
comprobantes: [{
    nombre: String,           // Nombre original del archivo
    nombreArchivo: String,    // Nombre único en el servidor
    url: String,             // URL para acceder al archivo
    rutaCompleta: String,    // Ruta completa en el servidor
    tipo: String,            // MIME type del archivo
    tamaño: Number,          // Tamaño en bytes
    fechaSubida: Date        // Fecha de subida
}]
```

## 🗂️ Estructura de Archivos Implementada

### **Organización por Proyecto:**
```
uploads/
├── .gitignore                    # Ignora archivos subidos
└── comprobantes/
    ├── .gitkeep                  # Mantiene la carpeta en git
    ├── 507f1f77bcf86cd799439011/ # ID del Proyecto 1
    │   ├── comprobante_1703123456789_factura.pdf
    │   ├── comprobante_1703123456790_ticket.jpg
    │   └── comprobante_1703123456791_recibo.png
    ├── 507f1f77bcf86cd799439012/ # ID del Proyecto 2
    │   ├── comprobante_1703123456792_factura.pdf
    │   └── comprobante_1703123456793_ticket.jpg
    └── 507f1f77bcf86cd799439013/ # ID del Proyecto 3
        └── comprobante_1703123456794_factura.pdf
```

### **Ventajas de esta Estructura:**
- ✅ **Organización clara** por proyecto
- ✅ **Fácil identificación** de archivos
- ✅ **Nombres únicos** para evitar conflictos
- ✅ **Metadatos completos** de cada archivo
- ✅ **Fácil limpieza** por proyecto
- ✅ **Escalabilidad** para múltiples proyectos

## 🔒 Seguridad y Validaciones

### **Validaciones de Archivo:**
- ✅ **Tipos permitidos**: JPG, PNG, GIF, PDF
- ✅ **Tamaño máximo**: 10MB por archivo
- ✅ **Cantidad máxima**: 10 archivos por compra
- ✅ **Nombres únicos**: Timestamp + nombre original

### **Gestión de Carpetas:**
- ✅ **Creación automática** de directorios
- ✅ **Permisos correctos** en carpetas
- ✅ **Prevención de conflictos** de nombres
- ✅ **Limpieza automática** si es necesario

## 🚀 Funcionalidad Final

### **Para Supervisores:**
1. **Subir comprobantes** → Se organizan automáticamente por proyecto
2. **Archivos únicos** → Nombres con timestamp para evitar conflictos
3. **Metadatos completos** → Información detallada de cada archivo
4. **Acceso organizado** → Fácil localización por proyecto

### **Para el Sistema:**
1. **Estructura clara** → Carpetas por proyecto
2. **Nombres únicos** → Sin conflictos de archivos
3. **Metadatos completos** → Información detallada
4. **Escalabilidad** → Fácil gestión de múltiples proyectos

## ✅ **Resultado Final**

- **Error API_URL solucionado** ✅
- **Archivos organizados por proyecto** ✅
- **Estructura de carpetas automática** ✅
- **Nombres únicos para archivos** ✅
- **Metadatos completos** ✅
- **Sistema escalable** ✅

**¡Ambos problemas están completamente solucionados!** 🚀

### **Estructura Final:**
```
📁 uploads/
└── 📁 comprobantes/
    └── 📁 {proyecto_id}/
        ├── 📄 comprobante_timestamp_factura.pdf
        ├── 🖼️ comprobante_timestamp_ticket.jpg
        └── 📄 comprobante_timestamp_recibo.png
```
