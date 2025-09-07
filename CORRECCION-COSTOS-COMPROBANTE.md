# Corrección de Costos en Modal de Comprobante

## 🔧 Problema Identificado y Solucionado

### ❌ **Problema:**
- El modal de comprobante no mostraba los costos que el supervisor ya había guardado
- No permitía editar los costos reales de compra
- Solo mostraba costos estimados originales

### ✅ **Solución Implementada:**

## 🛠️ Cambios Técnicos

### **Frontend** (`RemodelacionPage.jsx`)

#### **1. Estados Agregados:**
```javascript
const [costosComprobante, setCostosComprobante] = useState([]);
```

#### **2. Función de Inicialización Corregida:**
```javascript
const abrirModalComprobante = (lista) => {
    // Inicializar costos con los valores que el supervisor ya ingresó
    const costosIniciales = lista.materiales.map((material, index) => ({
        index: index,
        costo_final: material.costo_final || material.costo_estimado || 0,
        notas: material.notas_supervisor || ''
    }));
    setCostosComprobante(costosIniciales);
};
```

#### **3. Funciones de Gestión de Costos:**
```javascript
// Actualizar costo individual
const actualizarCostoComprobante = (index, campo, valor) => {
    const nuevosCostos = [...costosComprobante];
    nuevosCostos[index] = {
        ...nuevosCostos[index],
        [campo]: campo === 'costo_final' ? parseFloat(valor) || 0 : valor
    };
    setCostosComprobante(nuevosCostos);
};

// Calcular total dinámico
const calcularTotalComprobante = () => {
    return costosComprobante.reduce((sum, costo) => sum + (costo.costo_final || 0), 0);
};
```

#### **4. UI Mejorada:**
- **Muestra costo estimado original** vs **costo real editable**
- **Campo de entrada** para cada material con costo real
- **Cálculo de diferencia** en tiempo real
- **Total dinámico** que se actualiza al cambiar costos
- **Comparación visual** entre estimado y real

### **Backend** (`lista-compra.controller.js`)

#### **Función Actualizada:**
```javascript
static async marcarComoComprada(req, res) {
    // Procesar costos actualizados
    let totalReal = 0;
    if (costos_actualizados) {
        const costosArray = JSON.parse(costos_actualizados);
        listaCompra.materiales = listaCompra.materiales.map((material, index) => {
            if (costosArray[index]) {
                const costoActualizado = costosArray[index];
                totalReal += costoActualizado.costo_final || 0;
                return {
                    ...material.toObject(),
                    costo_final: costoActualizado.costo_final || material.costo_final || 0,
                    notas_supervisor: costoActualizado.notas || material.notas_supervisor || ''
                };
            }
            return material;
        });
    }
    
    // Guardar total real calculado
    listaCompra.total_real = totalReal;
}
```

## 🎯 Funcionalidad Final

### **Para Supervisores (Estado "En compra"):**

1. **Click en "🛒 Marcar como Comprado"**
2. **Modal muestra**:
   - **Costo estimado original** (no editable, solo informativo)
   - **Costo real de compra** (editable para cada material)
   - **Diferencia** calculada automáticamente
   - **Total dinámico** que se actualiza en tiempo real
   - Campos para proveedor y notas generales
   - Subida de archivos de comprobante

3. **Supervisor puede**:
   - Ver los costos que ya ingresó anteriormente
   - Ajustar costos reales si es necesario
   - Ver diferencias entre estimado y real
   - Completar información de compra
   - Subir comprobantes

4. **Confirmación**:
   - Costos actualizados se guardan
   - Estado cambia a "Comprada"
   - Notificación al contratista con total real

## 📊 Comparación Antes vs Después

| Aspecto | ❌ Antes | ✅ Después |
|---------|----------|------------|
| **Costos mostrados** | Solo estimados originales | Costos reales del supervisor |
| **Edición de costos** | No permitida | Permitida para ajustes |
| **Cálculo de total** | Estático (estimado) | Dinámico (real) |
| **Diferencias** | No visibles | Calculadas automáticamente |
| **Información** | Limitada | Completa y editable |

## 🔍 Detalles de la UI

### **Sección de Materiales:**
```
📋 Materiales a Comprar - Verificar Costos

┌─────────────────────────────────────────┐
│ Material: Cemento Portland              │
│ Cantidad: 50 Bolsas                     │
│                                         │
│ Costo Estimado Original: $2,500.00     │
│ Costo Real de Compra: [2,750.00] ←     │
│                                         │
│ Diferencia: +$250.00 (rojo/verde)      │
└─────────────────────────────────────────┘
```

### **Total Dinámico:**
```
┌─────────────────────────────────────────┐
│ Total Real de la Compra: $15,750.00    │
│ Total estimado original: $15,000.00    │
└─────────────────────────────────────────┘
```

## ✅ **Resultado Final**

El modal de comprobante ahora:
- **Muestra correctamente** los costos que el supervisor ya guardó
- **Permite editar** costos reales de compra
- **Calcula diferencias** automáticamente
- **Actualiza totales** en tiempo real
- **Mantiene funcionalidad** de subida de archivos
- **Proporciona información completa** para la compra

**¡El problema está completamente solucionado!** 🚀

### **Flujo Corregido:**
1. Supervisor ve costos que ya ingresó ✅
2. Puede ajustar costos reales si es necesario ✅
3. Ve diferencias y totales actualizados ✅
4. Completa información de compra ✅
5. Sube comprobantes ✅
6. Confirma y guarda todo ✅
