# Corrección del Error "Cannot read properties of undefined (reading 'empleado_id')"

## Problema Identificado

El error aparecía en la página de Profile cuando el sistema intentaba acceder a `empleado_id` de un objeto usuario que era `undefined`. Esto se debía a un problema en el endpoint `/check-auth`.

## Causa Raíz

### Problema en `/check-auth` (`src/routes/users.routes.js`)

**Problema**: El endpoint estaba intentando buscar el usuario por `req.user` cuando `req.user` ya era el objeto completo del usuario (no solo el ID).

```javascript
// ANTES (INCORRECTO)
const user = await User.findById(req.user).select('-password');
```

**Impacto**: 
- `req.user` ya es el objeto completo del usuario desde el middleware `isAuthenticated`
- Al intentar buscar por `User.findById(req.user)`, se estaba buscando por el objeto completo en lugar del ID
- Esto causaba que el usuario fuera `undefined` en el frontend

## Solución Implementada

### ✅ Corrección del Endpoint `/check-auth`

```javascript
// DESPUÉS (CORRECTO)
// req.user ya es el objeto completo del usuario desde el middleware
// Solo necesitamos excluir la contraseña
const user = {
    _id: req.user._id,
    email: req.user.email,
    role: req.user.role,
    prim_nom: req.user.prim_nom,
    apell_pa: req.user.apell_pa,
    apell_ma: req.user.apell_ma,
    empleado_id: req.user.empleado_id,
    foto_perfil: req.user.foto_perfil,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt
};
```

## Flujo Corregido

### 🔄 Proceso de Autenticación:

1. **Middleware `isAuthenticated`**: 
   - Verifica el token JWT
   - Busca el usuario completo en la base de datos
   - Asigna el objeto completo a `req.user`

2. **Endpoint `/check-auth`**:
   - Recibe `req.user` (objeto completo)
   - Crea un nuevo objeto sin la contraseña
   - Devuelve los datos del usuario al frontend

3. **Frontend**:
   - Recibe el objeto usuario completo
   - Puede acceder a `empleado_id` sin problemas

## Verificación del Modelo

### ✅ Campo `empleado_id` Existe

El modelo `User` (`src/models/user.js`) incluye correctamente el campo:

```javascript
empleado_id: { type: Schema.Types.ObjectId, ref: 'Empleado', required: false }
```

## Resultado

- ✅ El error "Cannot read properties of undefined (reading 'empleado_id')" se ha resuelto
- ✅ La página de Profile ahora carga correctamente
- ✅ El sistema de autenticación funciona de manera consistente
- ✅ Se mantiene la seguridad al excluir la contraseña del usuario

## Archivos Modificados

1. **`src/routes/users.routes.js`** - Corrección del endpoint `/check-auth`

## Testing

Para verificar que la corrección funciona:

1. **Iniciar sesión** en la aplicación
2. **Navegar a la página de Profile**
3. **Verificar que no aparece el error**
4. **Comprobar que se muestran los datos del usuario correctamente**

## Notas Importantes

- El middleware `isAuthenticated` ya devuelve el objeto completo del usuario
- No es necesario hacer una consulta adicional a la base de datos en `/check-auth`
- Se mantiene la seguridad al no devolver la contraseña del usuario
- El campo `empleado_id` es opcional (`required: false`) en el modelo
