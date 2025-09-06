# Implementación de Gestión de Costos para Supervisores

## Descripción

Se ha implementado una nueva funcionalidad que permite a los supervisores ingresar el costo de cada material en las listas de compra antes de aprobar. El sistema calcula automáticamente el total y permite al supervisor ver las diferencias entre costos estimados y finales.

## Funcionalidades Implementadas

### 🔧 Backend

#### 1. Nuevo Método en Controlador (`src/controllers/lista-compra.controller.js`)

```javascript
/**
 * Ingresar costos de materiales (supervisor)
 */
static async ingresarCostosMateriales(req, res) {
    // Validaciones:
    // - Usuario debe ser supervisor del proyecto
    // - Lista debe estar en estado "Enviada" o "En revisión"
    // - Debe proporcionar costos para todos los materiales
    
    // Funcionalidades:
    // - Actualiza costo_final de cada material
    // - Calcula total_final automáticamente
    // - Permite notas del supervisor
    // - Actualiza estatus a "En revisión"
}
```

#### 2. Nueva Ruta (`src/routes/lista-compra.router.js`)

```javascript
/**
 * @route   POST /api/lista-compra/:listaId/ingresar-costos
 * @desc    Ingresar costos de materiales (supervisor)
 * @access  Private - Supervisores
 */
router.post('/:listaId/ingresar-costos', async (req, res) => {
    // Verificar que el usuario es supervisor
    if (req.user.role !== 'supervisor') {
        return res.status(403).json({
            success: false,
            message: 'Solo los supervisores pueden ingresar costos de materiales'
        });
    }
    
    await ListaCompraController.ingresarCostosMateriales(req, res);
});
```

#### 3. Modelo Actualizado (`src/models/lista-compra.js`)

El modelo ya incluye los campos necesarios:
- `costo_final` en cada material
- `total_final` en la lista
- `notas_supervisor` en cada material
- Middleware para calcular totales automáticamente

### 🎨 Frontend

#### 1. Nuevos Estados (`Frontend/src/pages/dashboard/remodelacion/RemodelacionPage.jsx`)

```javascript
// Estados para modal de costos de lista de compra
const [showCostosModal, setShowCostosModal] = useState(false);
const [listaParaCostos, setListaParaCostos] = useState(null);
const [costosMateriales, setCostosMateriales] = useState([]);
const [totalCalculado, setTotalCalculado] = useState(0);
```

#### 2. Nuevas Funciones

```javascript
// Abrir modal de costos
const abrirModalCostos = (lista) => {
    // Inicializa costos con valores existentes
    // Calcula total automáticamente
    // Abre modal
};

// Actualizar costo de material
const actualizarCostoMaterial = (index, campo, valor) => {
    // Actualiza costo específico
    // Recalcula total
};

// Calcular total
const calcularTotal = (costos) => {
    // Suma todos los costos finales
};

// Guardar costos y continuar
const guardarCostosYContinuar = async () => {
    // Valida todos los costos están ingresados
    // Envía al backend
    // Recarga lista
};
```

#### 3. Modal de Costos

**Características del Modal:**
- **Lista de Materiales**: Muestra cada material con su información
- **Costo Estimado**: Muestra el costo estimado por el contratista
- **Costo Final**: Campo editable para ingresar costo real
- **Diferencia**: Calcula automáticamente la diferencia
- **Notas**: Campo para comentarios del supervisor
- **Resumen**: Muestra totales y diferencias

**Botones de Acción:**
- **Cancelar**: Cierra modal sin guardar
- **Guardar Costos**: Solo guarda los costos
- **Guardar y Aprobar**: Guarda costos y aprueba la lista

## Flujo de Trabajo

### 📋 Para Supervisores:

1. **Ver Lista de Compra**:
   - Hace clic en "Requerimientos" de un proyecto
   - Ve las listas de compra enviadas por contratistas

2. **Ingresar Costos**:
   - Hace clic en "Ingresar Costos" en una lista
   - Se abre modal con todos los materiales
   - Ingresa costo final para cada material
   - Ve diferencias automáticamente

3. **Aprobar Lista**:
   - Opción 1: Solo guardar costos
   - Opción 2: Guardar costos y aprobar inmediatamente

### 🔄 Validaciones:

- **Costo Requerido**: Todos los materiales deben tener costo final
- **Costo Válido**: Debe ser número positivo
- **Permisos**: Solo supervisores pueden ingresar costos
- **Estado**: Solo listas "Enviada" o "En revisión"

## Interfaz de Usuario

### Modal de Costos:

```
💰 Ingresar Costos de Materiales
Lista: [Título] - Proyecto: [Dirección]

┌─────────────────────────────────────┐
│ Material: Cemento                   │
│ Cantidad: 10 Costales              │
│ Urgencia: Media                     │
│                                     │
│ Descripción: Cemento gris...       │
│ Costo Estimado: $2,500             │
│                                     │
│ 💰 Costo Final (MXN)               │
│ [Input: $2,800] Diferencia: +$300  │
│                                     │
│ Notas: Precio actualizado...       │
└─────────────────────────────────────┘

📊 Resumen de Costos
Total Estimado: $15,000
Total Final:    $16,200
Diferencia:     +$1,200

[Cancelar] [💾 Guardar Costos] [✅ Guardar y Aprobar]
```

## Beneficios

### ✅ Para Supervisores:
- Control total sobre costos antes de aprobar
- Visibilidad de diferencias entre estimado y real
- Capacidad de agregar notas explicativas
- Proceso simplificado de aprobación

### ✅ Para Contratistas:
- Transparencia en el proceso de aprobación
- Conocimiento de costos reales aprobados
- Mejor estimación en futuras listas

### ✅ Para Administración:
- Control de costos antes de la compra
- Trazabilidad de decisiones de supervisores
- Datos para análisis de presupuestos

## Archivos Modificados

### Backend:
1. `src/controllers/lista-compra.controller.js` - Nuevo método `ingresarCostosMateriales`
2. `src/routes/lista-compra.router.js` - Nueva ruta `/ingresar-costos`

### Frontend:
1. `Frontend/src/pages/dashboard/remodelacion/RemodelacionPage.jsx`:
   - Nuevos estados para modal de costos
   - Funciones para manejar costos
   - Modal completo de costos
   - Actualización de `verRequerimientos`

## Testing

### Para Probar:

1. **Como Supervisor**:
   - Iniciar sesión con usuario supervisor
   - Ir a sección Remodelación
   - Hacer clic en "Requerimientos" de un proyecto
   - Ver listas de compra enviadas
   - Hacer clic en "Ingresar Costos"
   - Completar costos y aprobar

2. **Validaciones**:
   - Intentar aprobar sin ingresar costos
   - Ingresar costos negativos
   - Verificar cálculos automáticos
   - Probar notas del supervisor

## Notas Importantes

- Los costos se calculan automáticamente en el backend
- El modal previene aprobación sin costos completos
- Se mantiene historial de cambios en la base de datos
- Las diferencias se muestran en tiempo real
- El proceso es auditado con timestamps y usuarios
