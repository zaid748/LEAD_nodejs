# Corrección del Error de Validación de Rol de Contratista

## Problema Identificado

El error "Solo los contratistas pueden crear listas de compra" aparecía incluso cuando el usuario estaba logueado como contratista. Esto se debía a un problema en la validación del rol del usuario.

## Causa Raíz

### 1. Middleware de Autenticación (`src/helpers/auth.js`)
- **Problema**: `req.user` se asignaba como `usuario.id` (solo el ID) en lugar del objeto completo del usuario
- **Impacto**: Las rutas no podían acceder a `req.user.role` porque `req.user` era solo un string

### 2. Endpoint Check-Auth (`src/routes/users.routes.js`)
- **Problema**: Devolvía `{ id: req.user, role: req.role }` en lugar del usuario completo
- **Impacto**: El frontend recibía datos incompletos del usuario

## Soluciones Implementadas

### ✅ 1. Corrección del Middleware de Autenticación
```javascript
// ANTES
req.user = usuario.id;
req.role = usuario.role;

// DESPUÉS
req.user = usuario;  // Objeto completo del usuario
req.role = usuario.role;
```

### ✅ 2. Corrección del Endpoint Check-Auth
```javascript
// ANTES
res.json({
    success: true,
    user: {
        id: req.user,
        role: req.role
    }
});

// DESPUÉS
const user = await User.findById(req.user).select('-password');
res.json({
    success: true,
    user: user  // Objeto completo del usuario
});
```

## Resultado

- ✅ Los contratistas ahora pueden crear listas de compra correctamente
- ✅ La validación de roles funciona apropiadamente
- ✅ El frontend recibe datos completos del usuario
- ✅ Se mantiene la seguridad al excluir la contraseña del usuario

## Archivos Modificados

1. **`src/helpers/auth.js`** - Corrección del middleware `isAuthenticated`
2. **`src/routes/users.routes.js`** - Corrección del endpoint `/check-auth`

## Testing

Para verificar que la corrección funciona:

1. **Login como contratista**
2. **Navegar a la sección de Remodelación**
3. **Hacer clic en "LISTA DE COMPRA"**
4. **Verificar que no aparece el error de permisos**
5. **Comprobar que se puede crear la lista de compra**

## Notas Importantes

- La corrección mantiene la seguridad al usar `.select('-password')` para excluir la contraseña
- El middleware sigue validando correctamente la autenticación
- Se mantiene la compatibilidad con el resto del sistema
