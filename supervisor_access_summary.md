# 🔒 RESTRICCIONES DE ACCESO PARA SUPERVISOR Y CONTRATISTA

## ✅ **CAMBIOS IMPLEMENTADOS**

Se han implementado restricciones de acceso para los roles `supervisor` (supervisor de obra) y `contratista` eliminando su acceso a las siguientes secciones:

### **1. 🏢 Proyectos - ACCESO RESTRINGIDO**
- **Antes:** ✅ Supervisor y Contratista podían ver todos los proyectos
- **Ahora:** ❌ Supervisor y Contratista NO pueden acceder a la vista general de proyectos
- **Motivo:** Solo deben trabajar con proyectos específicos asignados en Remodelación

### **2. ➕ Nueva Captación - ACCESO RESTRINGIDO**
- **Antes:** ✅ Supervisor y Contratista podían crear nuevas captaciones
- **Ahora:** ❌ Supervisor y Contratista NO pueden crear nuevas captaciones
- **Motivo:** No deben crear proyectos, solo trabajar en fase de remodelación

### **3. 📸 Marketing - ACCESO RESTRINGIDO**
- **Antes:** ✅ Supervisor y Contratista podían acceder a Marketing
- **Ahora:** ❌ Supervisor y Contratista NO pueden acceder a Marketing
- **Motivo:** Se enfocan en remodelación, no en promoción/ventas

## 🎯 **ROLES CON ACCESO ACTUAL**

| **Sección** | **Admin** | **Administrador** | **Supervisor** | **Contratista** | **User** | **Ayudante Admin** |
|-------------|-----------|-------------------|----------------|-----------------|----------|--------------------|
| **Proyectos** | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Nueva Captación** | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Marketing** | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Remodelación** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |

## 🔧 **ARCHIVOS MODIFICADOS**

### **1. Frontend/src/routes.jsx**
```javascript
// ANTES
{
  icon: <BuildingOffice2Icon {...icon} />,
  name: "Proyectos",
  path: "/captaciones",
  element: <MisProyectos />,
  alwaysShow: true, // Disponible para todos los roles
},

// AHORA
{
  icon: <BuildingOffice2Icon {...icon} />,
  name: "Proyectos",
  path: "/captaciones",
  element: <MisProyectos />,
  roleAccess: ["user", "administrator", "administrador", "ayudante de administrador"], // Supervisor no tiene acceso
},
```

### **2. Frontend/src/widgets/layout/sidenav.jsx**
```javascript
// NUEVA FUNCIONALIDAD AGREGADA
// Verificar acceso por rol si está definido
if (page.roleAccess && userData && userData.role) {
  const hasRoleAccess = page.roleAccess.includes(userData.role);
  if (!hasRoleAccess) {
    return false; // El usuario no tiene el rol necesario
  }
}
```

## 🎯 **LO QUE PUEDE HACER CADA ROL AHORA**

### ✅ **SUPERVISOR - ACCESO PERMITIDO:**
- **🔧 Remodelación**: Gestión completa de proyectos en remodelación
  - Ver proyectos asignados
  - Gestionar materiales
  - Aprobar costos
  - Realizar compras
  - Supervisar contratistas
- **👤 Mi Perfil**: Gestión de información personal
- **💰 Mi Nómina**: Ver información salarial

### ✅ **CONTRATISTA - ACCESO PERMITIDO:**
- **🔧 Remodelación**: Acceso limitado a proyectos asignados
  - Ver solo proyectos donde está trabajando
  - Solicitar materiales
  - Firmar cartas de responsabilidad
  - Ver reportes de sus proyectos
- **👤 Mi Perfil**: Gestión de información personal
- **💰 Mi Nómina**: Ver información salarial

### ❌ **ACCESO RESTRINGIDO (AMBOS ROLES):**
- **🏢 Proyectos**: No pueden ver la lista general de proyectos
- **➕ Nueva Captación**: No pueden crear nuevos proyectos
- **📸 Marketing**: No pueden gestionar marketing
- **👥 Usuarios**: No pueden gestionar usuarios
- **👷 Empleados**: No pueden gestionar empleados

## 🔍 **CÓMO VALIDAR LOS CAMBIOS**

### **🔧 SUPERVISOR:**
1. **Iniciar sesión con usuario supervisor**
2. **Verificar sidebar**: No debe aparecer "Proyectos", "Nueva Captación" ni "Marketing"
3. **Solo debe ver**: "Mi Perfil", "Mi Nómina", "Remodelación"
4. **Intentar acceso directo**: URLs restringidas deben redirigir o mostrar error 403

### **👷 CONTRATISTA:**
1. **Iniciar sesión con usuario contratista**
2. **Verificar sidebar**: No debe aparecer "Proyectos", "Nueva Captación" ni "Marketing"
3. **Solo debe ver**: "Mi Perfil", "Mi Nómina", "Remodelación"
4. **En Remodelación**: Solo ver proyectos donde está asignado
5. **Permisos limitados**: Solo solicitar materiales y firmar recibos

## 🛡️ **SEGURIDAD IMPLEMENTADA**

- **Frontend**: Control de acceso en rutas y sidebar
- **Backend**: Middleware de permisos ya existente
- **Validación**: Verificación de roles en tiempo real
- **Navegación**: Prevención de acceso no autorizado

## ✅ **RESULTADO FINAL**

El supervisor de obra ahora tiene un **acceso focalizado** únicamente en:
- Gestión de **remodelaciones asignadas**
- Supervisión de **materiales y costos**
- Coordinación con **contratistas**
- Gestión de **su perfil y nómina**

Esto mejora la **seguridad del sistema** y asegura que cada rol tenga acceso solo a las funcionalidades necesarias para su trabajo.
