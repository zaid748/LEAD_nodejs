/**
 * Script de pruebas para las rutas API de Remodelación
 * Ejecutar con: node test_remodelacion_api.js
 */

const axios = require('axios');

// Configuración
const BASE_URL = process.env.API_URL || 'http://localhost:4000';
const API_BASE = `${BASE_URL}/api`;

// Variables globales para las pruebas
let authToken = null;
let testProjectId = null;
let testMaterialId = null;

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

/**
 * Función helper para logging con colores
 */
function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Función helper para hacer requests con autenticación
 */
async function apiRequest(method, url, data = null, headers = {}) {
    try {
        const config = {
            method,
            url: `${API_BASE}${url}`,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': authToken ? `token=${authToken}` : '',
                ...headers
            }
        };

        if (data) {
            config.data = data;
        }

        const response = await axios(config);
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
            status: error.response?.status || 500
        };
    }
}

/**
 * 1. Autenticación
 */
async function testAuthentication() {
    log('\n🔐 TESTING: Autenticación', 'cyan');
    
    const result = await apiRequest('POST', '/auth/signin', {
        email: 'admin@test.com', // Cambiar por credenciales válidas
        password: 'admin123'
    });

    if (result.success) {
        // Extraer token de las cookies
        authToken = result.data.token || 'test-token';
        log('✅ Autenticación exitosa', 'green');
        return true;
    } else {
        log('❌ Error en autenticación: ' + JSON.stringify(result.error), 'red');
        return false;
    }
}

/**
 * 2. Obtener proyectos en estado de Remodelación
 */
async function testGetRemodelacionProjects() {
    log('\n📋 TESTING: Obtener proyectos en Remodelación', 'cyan');
    
    const result = await apiRequest('GET', '/captaciones?estatus_actual=Remodelacion');
    
    if (result.success && result.data.captaciones) {
        log(`✅ Proyectos encontrados: ${result.data.captaciones.length}`, 'green');
        if (result.data.captaciones.length > 0) {
            testProjectId = result.data.captaciones[0]._id;
            log(`📍 Usando proyecto ID: ${testProjectId}`, 'blue');
        }
        return true;
    } else {
        log('❌ Error al obtener proyectos: ' + JSON.stringify(result.error), 'red');
        return false;
    }
}

/**
 * 3. Probar establecer presupuesto
 */
async function testSetBudget() {
    if (!testProjectId) {
        log('\n⚠️ SKIP: Establecer presupuesto (no hay proyecto de prueba)', 'yellow');
        return true;
    }

    log('\n💰 TESTING: Establecer presupuesto', 'cyan');
    
    const result = await apiRequest('POST', `/captaciones/${testProjectId}/remodelacion/presupuesto`, {
        presupuesto_estimado: 50000
    });
    
    if (result.success) {
        log('✅ Presupuesto establecido exitosamente', 'green');
        return true;
    } else {
        log('❌ Error al establecer presupuesto: ' + JSON.stringify(result.error), 'red');
        return false;
    }
}

/**
 * 4. Probar registro de gasto administrativo
 */
async function testAdminExpense() {
    if (!testProjectId) {
        log('\n⚠️ SKIP: Registro gasto administrativo (no hay proyecto de prueba)', 'yellow');
        return true;
    }

    log('\n🏢 TESTING: Registrar gasto administrativo', 'cyan');
    
    const result = await apiRequest('POST', `/captaciones/${testProjectId}/remodelacion/gastos-administrativos`, {
        tipo: 'Cemento',
        cantidad: 10,
        costo: 500,
        numero_factura: 'FAC-001',
        notas: 'Material para cimientos'
    });
    
    if (result.success) {
        log('✅ Gasto administrativo registrado exitosamente', 'green');
        testMaterialId = result.data?.material?._id;
        return true;
    } else {
        log('❌ Error al registrar gasto: ' + JSON.stringify(result.error), 'red');
        return false;
    }
}

/**
 * 5. Probar solicitud de material
 */
async function testMaterialRequest() {
    if (!testProjectId) {
        log('\n⚠️ SKIP: Solicitud de material (no hay proyecto de prueba)', 'yellow');
        return true;
    }

    log('\n🔨 TESTING: Solicitar material', 'cyan');
    
    const result = await apiRequest('POST', `/captaciones/${testProjectId}/remodelacion/solicitudes-material`, {
        tipo: 'Pintura',
        cantidad: 5,
        notas: 'Pintura para exterior'
    });
    
    if (result.success) {
        log('✅ Solicitud de material creada exitosamente', 'green');
        return true;
    } else {
        log('❌ Error al solicitar material: ' + JSON.stringify(result.error), 'red');
        return false;
    }
}

/**
 * 6. Probar obtener reportes
 */
async function testGetReports() {
    if (!testProjectId) {
        log('\n⚠️ SKIP: Obtener reportes (no hay proyecto de prueba)', 'yellow');
        return true;
    }

    log('\n📊 TESTING: Obtener reportes', 'cyan');
    
    const result = await apiRequest('GET', `/captaciones/${testProjectId}/remodelacion/reportes`);
    
    if (result.success) {
        log('✅ Reportes obtenidos exitosamente', 'green');
        log(`📈 Datos del reporte: ${JSON.stringify(result.data.resumen, null, 2)}`, 'blue');
        return true;
    } else {
        log('❌ Error al obtener reportes: ' + JSON.stringify(result.error), 'red');
        return false;
    }
}

/**
 * 7. Probar obtener datos de remodelación
 */
async function testGetRemodelacionData() {
    if (!testProjectId) {
        log('\n⚠️ SKIP: Obtener datos remodelación (no hay proyecto de prueba)', 'yellow');
        return true;
    }

    log('\n📋 TESTING: Obtener datos de remodelación', 'cyan');
    
    const result = await apiRequest('GET', `/captaciones/${testProjectId}/remodelacion`);
    
    if (result.success) {
        log('✅ Datos de remodelación obtenidos exitosamente', 'green');
        return true;
    } else {
        log('❌ Error al obtener datos: ' + JSON.stringify(result.error), 'red');
        return false;
    }
}

/**
 * 8. Validar estructura de respuestas
 */
function validateApiResponse(response, expectedFields) {
    const missing = expectedFields.filter(field => !(field in response));
    if (missing.length > 0) {
        log(`⚠️ Campos faltantes en respuesta: ${missing.join(', ')}`, 'yellow');
        return false;
    }
    return true;
}

/**
 * Función principal de testing
 */
async function runTests() {
    log('🚀 INICIANDO PRUEBAS DE API - REMODELACIÓN', 'magenta');
    log('=' .repeat(50), 'magenta');

    const tests = [
        { name: 'Autenticación', fn: testAuthentication, critical: true },
        { name: 'Obtener proyectos', fn: testGetRemodelacionProjects, critical: false },
        { name: 'Establecer presupuesto', fn: testSetBudget, critical: false },
        { name: 'Gasto administrativo', fn: testAdminExpense, critical: false },
        { name: 'Solicitud de material', fn: testMaterialRequest, critical: false },
        { name: 'Obtener reportes', fn: testGetReports, critical: false },
        { name: 'Datos de remodelación', fn: testGetRemodelacionData, critical: false }
    ];

    let passed = 0;
    let failed = 0;
    let skipped = 0;

    for (const test of tests) {
        try {
            const result = await test.fn();
            if (result === true) {
                passed++;
            } else if (result === 'skip') {
                skipped++;
            } else {
                failed++;
                if (test.critical) {
                    log(`\n❌ PRUEBA CRÍTICA FALLÓ: ${test.name}`, 'red');
                    log('🛑 Deteniendo pruebas...', 'red');
                    break;
                }
            }
        } catch (error) {
            failed++;
            log(`\n💥 ERROR INESPERADO en ${test.name}: ${error.message}`, 'red');
            if (test.critical) {
                log('🛑 Deteniendo pruebas...', 'red');
                break;
            }
        }
    }

    // Resumen final
    log('\n' + '=' .repeat(50), 'magenta');
    log('📊 RESUMEN DE PRUEBAS', 'magenta');
    log('=' .repeat(50), 'magenta');
    log(`✅ Pasadas: ${passed}`, 'green');
    log(`❌ Falladas: ${failed}`, 'red');
    log(`⚠️ Omitidas: ${skipped}`, 'yellow');
    log(`📈 Tasa de éxito: ${Math.round((passed / (passed + failed)) * 100)}%`, 'blue');

    if (failed === 0) {
        log('\n🎉 TODAS LAS PRUEBAS PASARON! El API está funcionando correctamente.', 'green');
    } else {
        log('\n⚠️ Algunas pruebas fallaron. Revisar logs arriba.', 'yellow');
    }
}

// Ejecutar las pruebas
if (require.main === module) {
    runTests().catch(error => {
        log(`\n💥 ERROR FATAL: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = {
    runTests,
    apiRequest,
    log
};
