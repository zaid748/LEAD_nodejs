# Corrección del Modal de Requerimientos para Listas de Compra

## Problema Identificado

El modal de requerimientos estaba configurado para mostrar materiales individuales (`req.tipo`, `req.cantidad`, etc.), pero después de actualizar la función `verRequerimientos` para cargar listas de compra, el modal seguía intentando acceder a propiedades de materiales individuales en lugar de listas de compra.

## Cambios Realizados

### 🔧 **Función `verRequerimientos` Actualizada**

```javascript
// ANTES (cargaba materiales individuales)
const response = await axios.get(`/api/captaciones/${proyecto._id}/remodelacion/materiales`);

// DESPUÉS (carga listas de compra)
const response = await axios.get(`/api/lista-compra/proyecto/${proyecto._id}`);
```

### 🎨 **Modal Actualizado para Listas de Compra**

#### 1. **Encabezado de la Lista**
```javascript
// ANTES
<Typography variant="h5" color="blue-gray" className="font-bold">
    {req.tipo || 'Material'}
</Typography>
<Typography variant="small" color="gray" className="mt-1">
    Cantidad: <span className="font-medium text-blue-gray-800">{req.cantidad || 'N/A'}</span>
</Typography>

// DESPUÉS
<Typography variant="h5" color="blue-gray" className="font-bold">
    {lista.titulo || 'Lista de Compra'}
</Typography>
<Typography variant="small" color="gray" className="mt-1">
    Materiales: <span className="font-medium text-blue-gray-800">{lista.materiales?.length || 0} items</span>
</Typography>
<Typography variant="small" color="gray" className="mt-1">
    Creada: <span className="font-medium text-blue-gray-800">
        {new Date(lista.fecha_creacion).toLocaleDateString('es-MX')}
    </span>
</Typography>
```

#### 2. **Estatus Actualizado**
```javascript
// ANTES (estatus de material individual)
value={req.estatus || 'Pendiente'}
color={
    req.estatus === 'Entregado' ? 'green' :
    req.estatus === 'Aprobado para su compra' ? 'blue' :
    // ... más estados de materiales
}

// DESPUÉS (estatus de lista de compra)
value={lista.estatus_general || 'Borrador'}
color={
    lista.estatus_general === 'Completada' ? 'green' :
    lista.estatus_general === 'Aprobada' ? 'blue' :
    lista.estatus_general === 'En revisión' ? 'orange' :
    lista.estatus_general === 'Enviada' ? 'amber' :
    lista.estatus_general === 'Rechazada' ? 'red' :
    lista.estatus_general === 'Borrador' ? 'gray' : 'gray'
}
```

#### 3. **Información de la Lista**
```javascript
// Nueva sección que muestra:
- Descripción de la lista
- Total estimado
- Lista de materiales (primeros 3)
- Contador de materiales restantes
```

#### 4. **Botones de Acción para Supervisores**

**Lista Enviada:**
- **Rechazar Lista**: Rechaza la lista completa
- **💰 Ingresar Costos**: Abre modal para ingresar costos

**Lista en Revisión:**
- **Rechazar**: Rechaza la lista
- **✅ Aprobar Lista**: Aprueba la lista

**Lista Aprobada/Rechazada:**
- Solo muestra estado (sin botones)

### 🆕 **Nueva Función Agregada**

```javascript
const rechazarListaCompra = async (listaId) => {
    try {
        setLoading(true);
        const motivo = prompt('¿Motivo del rechazo?');
        if (!motivo) {
            setLoading(false);
            return;
        }
        
        const response = await axios.post(`/api/lista-compra/${listaId}/revisar`, {
            accion: 'rechazar',
            comentarios: motivo
        });
        
        if (response.data.success) {
            console.log('✅ Lista de compra rechazada exitosamente');
            // Recargar la lista de requerimientos
            if (proyectoSeleccionado) {
                await verRequerimientos(proyectoSeleccionado);
            }
        } else {
            throw new Error(response.data.message || 'Error al rechazar lista de compra');
        }
    } catch (error) {
        console.error('❌ Error al rechazar lista de compra:', error);
        setError(error.response?.data?.message || error.message || 'Error al rechazar lista de compra');
    } finally {
        setLoading(false);
    }
};
```

## Estructura de Datos Esperada

### 📋 **Lista de Compra (lista)**
```javascript
{
    _id: "ObjectId",
    titulo: "Lista de Compra",
    descripcion: "Descripción de la lista",
    materiales: [
        {
            tipo: "Cemento",
            cantidad: 10,
            tipo_unidad: "Costal",
            costo_estimado: 2500,
            urgencia: "Media",
            descripcion: "Cemento gris"
        }
        // ... más materiales
    ],
    estatus_general: "Enviada", // Borrador, Enviada, En revisión, Aprobada, Rechazada, Completada
    total_estimado: 15000,
    fecha_creacion: "2024-01-15T10:30:00Z",
    contratista_id: "ObjectId",
    supervisor_id: "ObjectId"
}
```

## Flujo de Trabajo Actualizado

### 📋 **Para Supervisores:**

1. **Ver Requerimientos** → Hace clic en "Requerimientos" de un proyecto
2. **Ver Listas de Compra** → Modal muestra listas enviadas por contratistas
3. **Gestionar Lista** → 
   - Si está "Enviada" → Puede ingresar costos o rechazar
   - Si está "En revisión" → Puede aprobar o rechazar
   - Si está "Aprobada/Rechazada" → Solo ve estado

### 🔄 **Estados de Lista:**

- **Borrador**: Lista creada pero no enviada
- **Enviada**: Lista enviada al supervisor
- **En revisión**: Supervisor ingresó costos
- **Aprobada**: Lista aprobada por supervisor
- **Rechazada**: Lista rechazada por supervisor
- **Completada**: Lista procesada completamente

## Archivos Modificados

1. **`Frontend/src/pages/dashboard/remodelacion/RemodelacionPage.jsx`**:
   - Función `verRequerimientos` actualizada
   - Modal de requerimientos completamente reescrito
   - Nueva función `rechazarListaCompra` agregada
   - Botones de acción actualizados para listas de compra

## Testing

### Para Probar:

1. **Como Supervisor**:
   - Iniciar sesión con usuario supervisor
   - Ir a Remodelación → Requerimientos
   - Verificar que se muestran listas de compra
   - Probar botones de acción según el estado

2. **Validaciones**:
   - Verificar que se muestran correctamente los materiales
   - Probar ingresar costos
   - Probar aprobar/rechazar listas
   - Verificar que se recargan los datos

## Resultado

- ✅ El modal ahora muestra correctamente las listas de compra
- ✅ Los supervisores pueden ver información detallada de cada lista
- ✅ Los botones de acción funcionan según el estado de la lista
- ✅ Se mantiene la funcionalidad de ingresar costos
- ✅ El flujo de trabajo es intuitivo y funcional
