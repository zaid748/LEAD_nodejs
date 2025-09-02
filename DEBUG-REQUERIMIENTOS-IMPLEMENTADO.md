# 🔍 Debug de Requerimientos - Implementado

## ❌ **Problema Actual**

El contratista recibe error: **"Error al cargar requerimientos del proyecto"** pero los logs del backend no muestran que llegue la petición.

## 🔧 **Debugging Implementado**

### **1. Frontend - RemodelacionPage.jsx**

#### **Logs Agregados:**
```javascript
const verRequerimientos = async (proyecto) => {
    try {
        console.log('🚀 INICIANDO verRequerimientos para proyecto:', proyecto._id);
        setProyectoSeleccionado(proyecto);
        setLoading(true);
        
        console.log('📋 Cargando requerimientos del proyecto:', proyecto._id);
        
        const response = await axios.get(`/api/captaciones/${proyecto._id}/remodelacion/materiales`);
        
        console.log('📡 Respuesta del servidor:', response.data);
        
        if (response.data.success) {
            // ...
        }
    } catch (error) {
        console.error('❌ Error al cargar requerimientos:', error);
        setError('Error al cargar requerimientos del proyecto');
    }
};
```

### **2. Backend - Middleware de Acceso**

#### **Logs Agregados en `permisos-remodelacion.js`:**
```javascript
// Contratistas solo pueden acceder a proyectos donde están asignados
if (usuario.role === 'contratista') {
    const contratistaId = proyecto.remodelacion?.contratista?._id || proyecto.remodelacion?.contratista;
    console.log('🔍 DEBUG validarAccesoProyecto - CONTRATISTA:');
    console.log('  - Usuario ID:', usuario._id.toString());
    console.log('  - Contratista asignado ID:', contratistaId?.toString());
    console.log('  - ¿Coinciden?:', contratistaId?.toString() === usuario._id.toString());
    
    if (!contratistaId || contratistaId.toString() !== usuario._id.toString()) {
        console.log('❌ Acceso denegado para contratista');
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. No estás asignado como contratista a este proyecto'
        });
    }
    console.log('✅ Acceso permitido para contratista');
    return next();
}
```

### **3. Backend - Ruta de Materiales**

#### **Logs Agregados en `remodelacion.router.js`:**
```javascript
router.get('/materiales', async (req, res) => {
    try {
        const id = req.proyecto_id;
        const { estatus, tipo_gasto } = req.query;
        
        console.log('📋 DEBUG - Obteniendo materiales para proyecto:', id);
        console.log('📋 DEBUG - Usuario:', req.user?.role, req.user?._id);
        console.log('📋 DEBUG - Filtros query:', { estatus, tipo_gasto });

        const filtros = { proyecto_id: id };
        // ...
        
        const materiales = await require('../models/material').find(filtros)
            .populate('usuario_registro', 'prim_nom apell_pa apell_ma')
            .populate('supervisor_aprobacion', 'prim_nom apell_pa apell_ma')
            .populate('administrador_aprobacion', 'prim_nom apell_pa apell_ma')
            .sort({ fecha_registro: -1 });

        console.log('📋 DEBUG - Materiales encontrados:', materiales.length);
        console.log('📋 DEBUG - Filtros usados:', filtros);

        res.json({
            success: true,
            message: 'Materiales obtenidos exitosamente',
            data: materiales
        });
    } catch (error) {
        console.error('Error al obtener materiales:', error);
        // ...
    }
});
```

## 🎯 **Logs Esperados**

### **Escenario Exitoso:**
```
🚀 INICIANDO verRequerimientos para proyecto: 67d30a379d210b67fc82e9f4
📋 Cargando requerimientos del proyecto: 67d30a379d210b67fc82e9f4
🔍 DEBUG validarAccesoProyecto - CONTRATISTA:
  - Usuario ID: 68b46f0f0022759276c2a322
  - Contratista asignado ID: 68b46f0f0022759276c2a322
  - ¿Coinciden?: true
✅ Acceso permitido para contratista
📋 DEBUG - Obteniendo materiales para proyecto: 67d30a379d210b67fc82e9f4
📋 DEBUG - Usuario: contratista 68b46f0f0022759276c2a322
📋 DEBUG - Filtros query: {}
📋 DEBUG - Materiales encontrados: 4
📋 DEBUG - Filtros usados: { proyecto_id: "67d30a379d210b67fc82e9f4" }
📡 Respuesta del servidor: { success: true, message: "Materiales obtenidos exitosamente", data: [...] }
```

### **Escenario de Error:**
```
🚀 INICIANDO verRequerimientos para proyecto: 67d30a379d210b67fc82e9f4
📋 Cargando requerimientos del proyecto: 67d30a379d210b67fc82e9f4
🔍 DEBUG validarAccesoProyecto - CONTRATISTA:
  - Usuario ID: 68b46f0f0022759276c2a322
  - Contratista asignado ID: undefined
  - ¿Coinciden?: false
❌ Acceso denegado para contratista
❌ Error al cargar requerimientos: [Error details]
```

## 🧪 **Cómo Usar el Debug**

### **1. Abrir Consola del Navegador**
- F12 → Console tab

### **2. Hacer Click en "Requerimientos"**
- Verificar logs del frontend

### **3. Revisar Logs del Backend**
```bash
docker logs -f lead-backend-dev
```

### **4. Analizar Flujo:**
- ¿Se ejecuta `verRequerimientos`?
- ¿Llega al middleware de acceso?
- ¿Se permite el acceso?
- ¿Se ejecuta la función de materiales?
- ¿Qué respuesta se obtiene?

## 🎯 **Posibles Problemas a Detectar**

### **1. No se ejecuta verRequerimientos:**
- Problema en el onClick del botón
- Función no está definida

### **2. Se ejecuta pero no llega al backend:**
- Error en la URL de axios
- Problema de red/conexión

### **3. Llega al backend pero falla acceso:**
- IDs no coinciden
- Middleware rechaza la petición

### **4. Acceso OK pero no encuentra materiales:**
- Consulta a BD devuelve array vacío
- Filtros incorrectos

### **5. Encuentra materiales pero error en respuesta:**
- Formato de respuesta incorrecto
- Error en populate/join

---

**Estado:** 🔍 **DEBUG COMPLETO IMPLEMENTADO**  
**Objetivo:** 📊 **Identificar dónde falla exactamente el flujo**  
**Resultado:** 🎯 **Logs detallados en cada paso del proceso**
