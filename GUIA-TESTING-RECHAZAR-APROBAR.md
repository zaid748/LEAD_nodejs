# 🧪 Guía de Testing - Botones Rechazar/Aprobar

## 🎯 **Flujo Completo para Testing**

### **Paso 1: Preparación**
1. **Login como contratista** y solicita un material
2. **Cambiar a supervisor** en otra ventana
3. **Ir a Remodelación** → Click en "💰 Costos"

### **Paso 2: Agregar Costo**
4. **Ver el material** con estatus "Solicitando material" (gris)
5. **Ingresar costo** en el campo grande
6. **Click "Guardar"** → El estatus debe cambiar a "Pendiente supervisión" (amarillo)

### **Paso 3: Botones de Decisión** ⭐
7. **Los botones deben aparecer automáticamente:**
   - ❌ **"Rechazar"** (botón rojo, outlined)
   - ✅ **"Aprobar y Enviar a Admin"** (botón verde, sólido)

### **Paso 4: Probar Rechazar**
8. **Click en "Rechazar"**
9. **Aparece prompt:** "¿Motivo del rechazo?"
10. **Escribir motivo** (ej: "Muy caro")
11. **Confirmar** → Estatus cambia a "Rechazado por supervisor" (rojo)
12. **Ver motivo** en caja roja en el material

### **Paso 5: Probar Aprobar**
8. **Click en "Aprobar y Enviar a Admin"**
9. **Sin prompts** → Estatus cambia a "Pendiente aprobación administrativa" (morado)
10. **Se envía notificación** a administradores

## 🔍 **Condiciones para que Aparezcan los Botones**

Los botones **SOLO aparecen cuando:**
```javascript
// Todas estas condiciones deben ser TRUE:
user?.role === 'supervisor' &&           // ✅ Usuario es supervisor
req.costo > 0 &&                        // ✅ Material tiene costo asignado  
req.estatus === 'Pendiente supervisión' // ✅ Estatus correcto
```

## 🐛 **Si NO aparecen los botones, verificar:**

### **1. ¿El usuario es supervisor?**
```javascript
console.log('User role:', user?.role);
// Debe mostrar: 'supervisor'
```

### **2. ¿El material tiene costo?**
```javascript
console.log('Material costo:', req.costo);
// Debe ser > 0 (ej: 500)
```

### **3. ¿El estatus es correcto?**
```javascript
console.log('Material estatus:', req.estatus);
// Debe ser: 'Pendiente supervisión'
```

## 🎨 **Visualización de Estados**

### **Estado 1: Sin Costo**
```
┌─────────────────────────────┐
│ 🧱 Cemento                  │
│ Cantidad: 2        [GRAY]   │
│                             │
│ 💰 Gestión de Costo         │
│ [____Input____] [Guardar]   │ ← Campo visible
│                             │
│ ❌ NO hay botones           │
└─────────────────────────────┘
```

### **Estado 2: Con Costo (Listo para Decisión)**
```
┌─────────────────────────────┐
│ 🧱 Cemento                  │
│ Cantidad: 2      [AMBER]    │
│                             │
│ 💰 Costo: $500.00          │ ← Costo mostrado
│                             │
│ ──── Acciones ────         │
│ [❌ Rechazar] [✅ Aprobar] │ ← Botones visibles
└─────────────────────────────┘
```

### **Estado 3A: Aprobado**
```
┌─────────────────────────────┐
│ 🧱 Cemento                  │
│ Cantidad: 2     [PURPLE]    │
│                             │
│ 💰 Costo: $500.00          │
│ ✅ Enviado a Administración │
│                             │
│ ❌ NO hay botones           │
└─────────────────────────────┘
```

### **Estado 3B: Rechazado**
```
┌─────────────────────────────┐
│ 🧱 Cemento                  │
│ Cantidad: 2        [RED]    │
│                             │
│ 💰 Costo: $500.00          │
│ ❌ Motivo: Muy caro         │
│                             │
│ ❌ NO hay botones           │
└─────────────────────────────┘
```

## 🔧 **Debug en Consola del Navegador**

Agrega estos logs para debug:
```javascript
// En la condición de botones (línea 1272)
console.log('🔍 DEBUG BOTONES:');
console.log('  - Usuario rol:', user?.role);
console.log('  - Material costo:', req.costo);
console.log('  - Material estatus:', req.estatus);
console.log('  - ¿Mostrar botones?:', 
  (user?.role === 'supervisor' || user?.role === 'Supervisor') && 
  req.costo > 0 && 
  req.estatus === 'Pendiente supervisión'
);
```

## ✅ **Resultado Esperado**

**Al hacer todo correctamente deberías ver:**

1. **Material sin costo** → Campo de input visible
2. **Guardar costo** → Campo desaparece, botones aparecen
3. **Click Rechazar** → Prompt para motivo, estatus rojo
4. **Click Aprobar** → Estatus morado, notificación enviada

**Si algo no funciona, revisa los logs del navegador y del backend para identificar el problema exacto.**

