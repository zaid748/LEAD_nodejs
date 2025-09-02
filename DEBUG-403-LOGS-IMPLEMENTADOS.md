# 🔍 Debug Logs 403 - Implementados

## ❌ **Problema Identificado**

**Error 403 (Forbidden)** al acceder a la ruta de materiales, pero los logs de debug del middleware de remodelación **NO aparecen**, indicando que el error ocurre **ANTES** de llegar a ese middleware.

## 🔧 **Logs de Debug Implementados**

### **1. Middleware de Autenticación Global (`verificarToken`)**

#### **Archivo:** `src/helpers/auth.js`

```javascript
const verificarToken = async (req, res, next) => {
    try {
        console.log('🔐 DEBUG verificarToken - Ruta:', req.method, req.originalUrl);
        
        const token = req.cookies.Authorization;
        
        console.log('🔐 DEBUG verificarToken - Token presente:', !!token);
        
        if (!token) {
            console.log('❌ verificarToken - No hay token');
            return res.status(401).json({ mensaje: 'No hay token, acceso denegado' });
        }
        
        const decodificado = jwt.verify(token, process.env.JWT_SECRET || SECRET);
        const usuario = await User.findById(decodificado._id).select('-password');
        
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Token inválido - usuario no encontrado' });
        }
        
        req.user = usuario;
        
        console.log('✅ verificarToken - Usuario autenticado:', usuario.role, usuario._id);
        
        next();
    } catch (error) {
        console.log('❌ verificarToken - Error:', error.name, error.message);
        // ... manejo de errores
    }
};
```

### **2. Middleware de Permisos de Remodelación (Ya implementado)**

#### **Archivo:** `src/middleware/permisos-remodelacion.js`

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

### **3. Ruta de Materiales (Ya implementado)**

#### **Archivo:** `src/routes/remodelacion.router.js`

```javascript
router.get('/materiales', async (req, res) => {
    try {
        const id = req.proyecto_id;
        
        console.log('📋 DEBUG - Obteniendo materiales para proyecto:', id);
        console.log('📋 DEBUG - Usuario:', req.user?.role, req.user?._id);
        console.log('📋 DEBUG - Filtros query:', { estatus, tipo_gasto });
        
        // ... consulta a BD
        
        console.log('📋 DEBUG - Materiales encontrados:', materiales.length);
        console.log('📋 DEBUG - Filtros usados:', filtros);
    } catch (error) {
        console.error('Error al obtener materiales:', error);
    }
});
```

## 🎯 **Logs Esperados al Hacer Click en "Requerimientos"**

### **Escenario Exitoso:**
```
🔐 DEBUG verificarToken - Ruta: GET /api/captaciones/67d30a379d210b67fc82e9f4/remodelacion/materiales
🔐 DEBUG verificarToken - Token presente: true
✅ verificarToken - Usuario autenticado: contratista 68b46f0f0022759276c2a322
🔍 DEBUG validarAccesoProyecto - CONTRATISTA:
  - Usuario ID: 68b46f0f0022759276c2a322
  - Contratista asignado ID: 68b46f0f0022759276c2a322
  - ¿Coinciden?: true
✅ Acceso permitido para contratista
📋 DEBUG - Obteniendo materiales para proyecto: 67d30a379d210b67fc82e9f4
📋 DEBUG - Usuario: contratista 68b46f0f0022759276c2a322
📋 DEBUG - Materiales encontrados: 4
```

### **Escenario de Error 401 (Sin token):**
```
🔐 DEBUG verificarToken - Ruta: GET /api/captaciones/67d30a379d210b67fc82e9f4/remodelacion/materiales
🔐 DEBUG verificarToken - Token presente: false
❌ verificarToken - No hay token
```

### **Escenario de Error 403 (Sin acceso):**
```
🔐 DEBUG verificarToken - Ruta: GET /api/captaciones/67d30a379d210b67fc82e9f4/remodelacion/materiales
🔐 DEBUG verificarToken - Token presente: true
✅ verificarToken - Usuario autenticado: contratista 68b46f0f0022759276c2a322
🔍 DEBUG validarAccesoProyecto - CONTRATISTA:
  - Usuario ID: 68b46f0f0022759276c2a322
  - Contratista asignado ID: undefined
  - ¿Coinciden?: false
❌ Acceso denegado para contratista
```

## 🔄 **Flujo de Middlewares**

### **Orden de Ejecución:**
```
1. 🔐 verificarToken (src/helpers/auth.js)
   ↓ (Si token válido)
2. 🔍 validarPermisosRemodelacion('ver_remodelacion') 
   ↓ (Si permisos OK)
3. 🔍 validarAccesoProyecto
   ↓ (Si acceso OK)
4. 📋 Función de materiales
```

## 🧪 **Debugging Steps**

### **1. Reiniciar Backend**
```bash
docker-compose -f docker-compose.dev.yml restart backend
```

### **2. Monitorear Logs**
```bash
docker logs -f lead-backend-dev
```

### **3. Hacer Click en "Requerimientos"**
- Observar logs en tiempo real
- Identificar en qué paso falla

### **4. Analizar Resultado:**

#### **Si NO aparece `🔐 DEBUG verificarToken`:**
- La petición no está llegando al backend
- Problema en el frontend o red

#### **Si aparece `❌ verificarToken`:**
- Problema de autenticación
- Token inválido o expirado

#### **Si aparece `✅ verificarToken` pero NO `🔍 DEBUG validarAccesoProyecto`:**
- Problema en middleware `validarPermisosRemodelacion`
- Usuario sin permisos para `'ver_remodelacion'`

#### **Si aparece `❌ Acceso denegado para contratista`:**
- IDs no coinciden
- Contratista no asignado al proyecto

#### **Si aparece `📋 DEBUG - Obteniendo materiales`:**
- ¡Todo funciona! El problema está en otro lado

---

**Estado:** 🔍 **DEBUG COMPLETO IMPLEMENTADO**  
**Objetivo:** 📊 **Identificar exactamente dónde ocurre el error 403**  
**Siguiente:** 🧪 **Probar la funcionalidad y analizar logs**
