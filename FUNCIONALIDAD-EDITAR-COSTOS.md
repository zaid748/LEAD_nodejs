# Funcionalidad de Editar Costos para Listas "En Revisión"

## Problema Identificado

Cuando una lista de compra ya está en estado "En revisión" (con costos guardados), el supervisor no podía volver a editar esos costos. Solo tenía opciones de aprobar o rechazar la lista, pero no podía modificar los costos si necesitaba hacer ajustes.

## Solución Implementada

### 🔧 **Nuevo Botón "Editar Costos"**

Se agregó un botón "✏️ Editar Costos" en las listas que están en estado "En revisión":

```javascript
{/* CASO 2: Lista en revisión - Editar, Aprobar o Rechazar */}
{lista.estatus_general === 'En revisión' && (
    <div className="flex gap-3 justify-end">
        <Button
            size="lg"
            color="blue"
            variant="outlined"
            onClick={() => abrirModalCostos(lista)}
            disabled={loading}
            className="flex items-center gap-2"
        >
            <PencilIcon className="h-5 w-5" />
            ✏️ Editar Costos
        </Button>
        <Button
            size="lg"
            color="red"
            variant="outlined"
            onClick={() => rechazarListaCompra(lista._id)}
            disabled={loading}
            className="flex items-center gap-2"
        >
            <ExclamationCircleIcon className="h-5 w-5" />
            Rechazar
        </Button>
        <Button
            size="lg"
            color="green"
            onClick={() => aprobarListaConCostos(lista._id)}
            disabled={loading}
            className="flex items-center gap-2"
        >
            <CheckIcon className="h-5 w-5" />
            ✅ Aprobar Lista
        </Button>
    </div>
)}
```

### 🎯 **Modal de Costos Inteligente**

El modal de costos ahora detecta si se está editando una lista existente y ajusta su comportamiento:

#### **Título Dinámico:**
```javascript
<Typography variant="h6" color="blue-gray" className="mb-4">
    💰 {listaParaCostos.estatus_general === 'En revisión' ? 'Editar' : 'Ingresar'} Costos de Materiales
</Typography>
```

#### **Botón Dinámico:**
```javascript
<Button
    color="blue"
    onClick={guardarCostosYContinuar}
    disabled={loading}
>
    {loading ? 'Guardando...' : `💾 ${listaParaCostos.estatus_general === 'En revisión' ? 'Actualizar' : 'Guardar'} Costos`}
</Button>
```

### 📋 **Carga de Costos Existentes**

La función `abrirModalCostos` carga automáticamente los costos y notas existentes:

```javascript
const abrirModalCostos = (lista) => {
    setListaParaCostos(lista);
    // Inicializar costos con valores existentes o 0
    const costosIniciales = lista.materiales.map(material => ({
        index: lista.materiales.indexOf(material),
        costo_final: material.costo_final || 0,
        notas: material.notas_supervisor || ''
    }));
    setCostosMateriales(costosIniciales);
    calcularTotal(costosIniciales);
    setShowCostosModal(true);
};
```

## Flujo de Trabajo Actualizado

### 📋 **Para Supervisores:**

1. **Ver Requerimientos** → Hace clic en "Requerimientos" de un proyecto
2. **Ver Lista Enviada** → Modal muestra lista con estado "Enviada"
3. **Hacer Clic en "Agregar Costo"** → Se abre modal de costos (modo "Ingresar")
4. **Ingresar Costos** → Para cada material:
   - Costo final
   - Notas adicionales
5. **Guardar Costos** → Los costos se guardan y la lista pasa a "En revisión"
6. **Ver Botones de Acción** → Ahora aparecen:
   - **✏️ Editar Costos**: Para modificar costos existentes
   - **Rechazar**: Para rechazar la lista
   - **✅ Aprobar Lista**: Para aprobar la lista
7. **Editar Costos (Opcional)** → Hacer clic en "✏️ Editar Costos":
   - Se abre modal con costos existentes cargados
   - Título cambia a "Editar Costos de Materiales"
   - Botón cambia a "💾 Actualizar Costos"
   - Se pueden modificar costos y notas
   - Al guardar, se actualizan los costos existentes

## Estados de Lista y Acciones Disponibles

### 📊 **Lista "Enviada":**
- **💰 Ingresar Costos**: Abre modal para ingresar costos por primera vez
- **Rechazar Lista**: Rechaza la lista sin ingresar costos

### 📊 **Lista "En revisión":**
- **✏️ Editar Costos**: Abre modal con costos existentes para editar
- **Rechazar**: Rechaza la lista con costos ingresados
- **✅ Aprobar Lista**: Aprueba la lista con costos verificados

### 📊 **Lista "Aprobada/Rechazada":**
- Solo muestra estado (sin botones de acción)

## Archivos Modificados

1. **`Frontend/src/pages/dashboard/remodelacion/RemodelacionPage.jsx`**:
   - Línea 1602: Agregado botón "✏️ Editar Costos" para listas "En revisión"
   - Línea 1680: Título dinámico del modal de costos
   - Línea 1830: Botón dinámico de guardar/actualizar costos

## Testing

### Para Probar:

1. **Como Supervisor**:
   - Iniciar sesión con usuario supervisor
   - Ir a Remodelación → Requerimientos
   - Hacer clic en "Agregar Costo" para una lista "Enviada"
   - Ingresar costos y guardar
   - Verificar que la lista cambia a "En revisión"
   - Hacer clic en "✏️ Editar Costos"
   - Verificar que se abren los costos existentes
   - Modificar algunos costos
   - Hacer clic en "💾 Actualizar Costos"
   - Verificar que los cambios se guardan

2. **Validaciones**:
   - Modal se abre con costos existentes
   - Título muestra "Editar Costos"
   - Botón muestra "Actualizar Costos"
   - Cambios se guardan correctamente
   - Lista mantiene estado "En revisión"
   - Botones de acción siguen disponibles

## Resultado

- ✅ **Supervisores pueden editar costos existentes**
- ✅ **Modal detecta automáticamente si está editando**
- ✅ **Interfaz clara y consistente**
- ✅ **Flujo de trabajo completo y flexible**
- ✅ **Costos se pueden modificar en cualquier momento antes de aprobar**

Los supervisores ahora tienen control total sobre los costos: pueden ingresarlos, editarlos y aprobar/rechazar las listas según sea necesario.
