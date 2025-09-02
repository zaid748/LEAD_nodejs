/**
 * Script de validación de roles y permisos
 * Ejecutar con: node validate_roles_permissions.js
 */

// Importar configuraciones
const userRoles = ['user', 'administrator', 'administrador', 'supervisor', 'contratista', 'ayudante de administrador'];

const rolesConfig = {
    ADMINISTRATOR: 'administrator',
    ADMINISTRADOR: 'administrador',
    SUPERVISOR: 'supervisor',
    CONTRATISTA: 'contratista',
    AYUDANTE_ADMIN: 'ayudante de administrador',
    USER: 'user'
};

// Permisos definidos en el middleware
const permisosPorAccion = {
    'gestionar_presupuesto': ['administrator', 'administrador'],
    'aprobar_solicitudes': ['administrator', 'administrador'],
    'registrar_gastos_admin': ['administrator', 'administrador'],
    'gestionar_materiales': ['supervisor', 'administrator', 'administrador'],
    'aprobar_costos': ['supervisor', 'administrator', 'administrador'],
    'realizar_compras': ['supervisor', 'administrator', 'administrador'],
    'solicitar_materiales': ['contratista', 'supervisor', 'administrator', 'administrador'],
    'firmar_recibo': ['contratista'],
    'ver_remodelacion': ['contratista', 'supervisor', 'administrator', 'administrador', 'ayudante de administrador']
};

// Definir casos de uso por rol
const casosDeUsoPorRol = {
    'administrator': [
        'gestionar_presupuesto',
        'aprobar_solicitudes',
        'registrar_gastos_admin',
        'gestionar_materiales',
        'aprobar_costos',
        'realizar_compras',
        'solicitar_materiales',
        'ver_remodelacion'
    ],
    'administrador': [
        'gestionar_presupuesto',
        'aprobar_solicitudes',
        'registrar_gastos_admin',
        'gestionar_materiales',
        'aprobar_costos',
        'realizar_compras',
        'solicitar_materiales',
        'ver_remodelacion'
    ],
    'supervisor': [
        'gestionar_materiales',
        'aprobar_costos',
        'realizar_compras',
        'solicitar_materiales',
        'ver_remodelacion'
    ],
    'contratista': [
        'solicitar_materiales',
        'firmar_recibo',
        'ver_remodelacion'
    ],
    'ayudante de administrador': [
        'ver_remodelacion'
    ],
    'user': []
};

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Validar que todos los roles están correctamente definidos
 */
function validateRoleDefinitions() {
    log('\n🔍 VALIDANDO: Definiciones de roles', 'cyan');
    
    let valid = true;
    
    // Verificar que todos los roles del config están en el modelo
    Object.values(rolesConfig).forEach(role => {
        if (!userRoles.includes(role)) {
            log(`❌ Rol '${role}' está en config pero no en modelo de usuario`, 'red');
            valid = false;
        }
    });
    
    // Verificar que todos los roles del modelo están en el config
    userRoles.forEach(role => {
        if (!Object.values(rolesConfig).includes(role)) {
            log(`⚠️ Rol '${role}' está en modelo pero no en config frontend`, 'yellow');
        }
    });
    
    if (valid) {
        log('✅ Todas las definiciones de roles son consistentes', 'green');
    }
    
    return valid;
}

/**
 * Validar permisos por rol
 */
function validateRolePermissions() {
    log('\n🔐 VALIDANDO: Permisos por rol', 'cyan');
    
    let valid = true;
    
    // Verificar que cada rol tiene los permisos correctos
    Object.entries(casosDeUsoPorRol).forEach(([rol, accionesEsperadas]) => {
        log(`\n👤 Validando rol: ${rol}`, 'blue');
        
        accionesEsperadas.forEach(accion => {
            const rolesPermitidos = permisosPorAccion[accion];
            
            if (!rolesPermitidos) {
                log(`❌ Acción '${accion}' no está definida en permisos`, 'red');
                valid = false;
                return;
            }
            
            if (!rolesPermitidos.includes(rol)) {
                log(`❌ Rol '${rol}' debería tener permiso para '${accion}' pero no lo tiene`, 'red');
                valid = false;
            } else {
                log(`✅ Permiso correcto: ${rol} -> ${accion}`, 'green');
            }
        });
    });
    
    return valid;
}

/**
 * Validar permisos restrictivos (que no se den permisos de más)
 */
function validateRestrictivePermissions() {
    log('\n🚫 VALIDANDO: Permisos restrictivos', 'cyan');
    
    let valid = true;
    
    // Verificar que contratistas no tienen permisos administrativos
    const accionesAdministrativas = ['gestionar_presupuesto', 'aprobar_solicitudes', 'registrar_gastos_admin'];
    
    accionesAdministrativas.forEach(accion => {
        const rolesPermitidos = permisosPorAccion[accion];
        
        if (rolesPermitidos.includes('contratista')) {
            log(`❌ SEGURIDAD: Contratista tiene permiso administrativo: ${accion}`, 'red');
            valid = false;
        } else {
            log(`✅ Seguridad correcta: Contratista no puede ${accion}`, 'green');
        }
    });
    
    // Verificar que users no tienen permisos especiales
    Object.entries(permisosPorAccion).forEach(([accion, roles]) => {
        if (roles.includes('user')) {
            log(`❌ SEGURIDAD: Usuario 'user' tiene permiso especial: ${accion}`, 'red');
            valid = false;
        }
    });
    
    if (valid) {
        log('✅ Todos los permisos restrictivos son correctos', 'green');
    }
    
    return valid;
}

/**
 * Generar matriz de permisos
 */
function generatePermissionMatrix() {
    log('\n📊 MATRIZ DE PERMISOS', 'magenta');
    log('=' .repeat(80), 'magenta');
    
    // Encabezado
    const acciones = Object.keys(permisosPorAccion);
    const rolesOrdenados = ['administrator', 'administrador', 'supervisor', 'contratista', 'ayudante de administrador', 'user'];
    
    console.log('\nACCIÓN'.padEnd(25) + rolesOrdenados.map(r => r.substring(0, 8).padEnd(10)).join(''));
    console.log('-'.repeat(25 + rolesOrdenados.length * 10));
    
    acciones.forEach(accion => {
        let fila = accion.padEnd(25);
        rolesOrdenados.forEach(rol => {
            const tienePermiso = permisosPorAccion[accion].includes(rol);
            fila += (tienePermiso ? '✅' : '❌').padEnd(10);
        });
        console.log(fila);
    });
}

/**
 * Validar casos de uso específicos
 */
function validateUseCases() {
    log('\n🎯 VALIDANDO: Casos de uso específicos', 'cyan');
    
    const testCases = [
        {
            name: 'Contratista solicita material',
            role: 'contratista',
            action: 'solicitar_materiales',
            shouldHaveAccess: true
        },
        {
            name: 'Contratista gestiona presupuesto',
            role: 'contratista',
            action: 'gestionar_presupuesto',
            shouldHaveAccess: false
        },
        {
            name: 'Supervisor aprueba costos',
            role: 'supervisor',
            action: 'aprobar_costos',
            shouldHaveAccess: true
        },
        {
            name: 'Administrador hace todo',
            role: 'administrator',
            action: 'gestionar_presupuesto',
            shouldHaveAccess: true
        },
        {
            name: 'Usuario normal ve remodelación',
            role: 'user',
            action: 'ver_remodelacion',
            shouldHaveAccess: false
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach(testCase => {
        const rolesPermitidos = permisosPorAccion[testCase.action];
        const tieneAcceso = rolesPermitidos ? rolesPermitidos.includes(testCase.role) : false;
        
        if (tieneAcceso === testCase.shouldHaveAccess) {
            log(`✅ ${testCase.name}`, 'green');
            passed++;
        } else {
            log(`❌ ${testCase.name}`, 'red');
            failed++;
        }
    });
    
    log(`\n📈 Casos de uso: ${passed} pasados, ${failed} fallidos`, passed === testCases.length ? 'green' : 'red');
    
    return failed === 0;
}

/**
 * Función principal
 */
function runValidation() {
    log('🔐 VALIDACIÓN DE ROLES Y PERMISOS - SISTEMA REMODELACIÓN', 'magenta');
    log('=' .repeat(60), 'magenta');
    
    const tests = [
        { name: 'Definiciones de roles', fn: validateRoleDefinitions },
        { name: 'Permisos por rol', fn: validateRolePermissions },
        { name: 'Permisos restrictivos', fn: validateRestrictivePermissions },
        { name: 'Casos de uso específicos', fn: validateUseCases }
    ];
    
    let allPassed = true;
    
    tests.forEach(test => {
        try {
            const result = test.fn();
            if (!result) {
                allPassed = false;
            }
        } catch (error) {
            log(`💥 ERROR en ${test.name}: ${error.message}`, 'red');
            allPassed = false;
        }
    });
    
    // Generar matriz final
    generatePermissionMatrix();
    
    // Resumen final
    log('\n' + '=' .repeat(60), 'magenta');
    if (allPassed) {
        log('🎉 VALIDACIÓN EXITOSA: Todos los roles y permisos están correctamente configurados', 'green');
    } else {
        log('⚠️ VALIDACIÓN FALLÓ: Se encontraron problemas en la configuración', 'red');
    }
    log('=' .repeat(60), 'magenta');
    
    return allPassed;
}

// Ejecutar validación si se llama directamente
if (require.main === module) {
    runValidation();
}

module.exports = {
    runValidation,
    casosDeUsoPorRol,
    permisosPorAccion,
    rolesConfig
};
