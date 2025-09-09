const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const captacionesController = require('../controllers/captaciones.controller');
const { verificarToken, esAdmin, esAdminOSupervisor, sanitizarEntradas } = require('../helpers/auth');
const { CrearPdfCaptacion } = require('../libs/PDF');
const { uploadObject } = require('../libs/multer');

// Middleware de autenticación para todas las rutas
router.use(verificarToken);
// Sanitizar entradas en todas las rutas POST y PUT
router.use(['POST', 'PUT'], sanitizarEntradas);

// Obtener todas las captaciones (con filtros)
router.get('/', captacionesController.getCaptaciones);

// -------- Rutas para Remodelación (ANTES de /:id para evitar conflictos) --------

// Importar y usar las rutas de remodelación
const remodelacionRouter = require('./remodelacion.router');
// Pasar el parámetro id a las rutas de remodelación
router.use('/:id/remodelacion', (req, res, next) => {
    console.log('🔗 DEBUG - LLEGÓ AL MIDDLEWARE DE CAPTACIONES para remodelación');
    console.log('🔗 DEBUG - req.params.id:', req.params.id);
    console.log('🔗 DEBUG - req.originalUrl:', req.originalUrl);
    console.log('🔗 DEBUG - Usuario presente:', !!req.user, req.user?.role);
    req.proyecto_id = req.params.id;
    next();
}, remodelacionRouter);

// Obtener una captación por ID
router.get('/:id', captacionesController.getCaptacionById);

// Crear nueva captación
router.post('/',
    [
        check('propiedad.tipo', 'El tipo de propiedad es requerido').not().isEmpty(),
        check('propietario.nombre', 'El nombre del propietario es requerido').not().isEmpty(),
        check('propietario.telefono', 'El teléfono del propietario es requerido').not().isEmpty(),
    ],
    captacionesController.createCaptacion,
    CrearPdfCaptacion,
    uploadObject
);

// Crear propiedad externa (Mercado Libre / Renta) - sin documentos/adeudos/referencias obligatorios
router.post('/externas',
    [
        check('propiedad.tipo', 'El tipo de propiedad es requerido').not().isEmpty(),
        check('propietario.nombre', 'El nombre del propietario o inmobiliaria es requerido').not().isEmpty(),
        check('tipo_operacion').optional().isIn(['Venta', 'Renta'])
    ],
    captacionesController.createPropiedadExterna
);

// Actualizar captación (función original) - DEPRECATED
// router.put('/:id', captacionesController.updateCaptacion);

// Actualizar captación (nueva función con estatus unificado) - AHORA ES LA PRINCIPAL
router.put('/:id', captacionesController.updateCaptacionUnificada);
router.put('/:id/unified', captacionesController.updateCaptacionUnificada);

// Eliminar captación (solo admin)
router.delete('/:id', esAdmin, captacionesController.deleteCaptacion);

// -------- Operaciones específicas --------

// Actualizar estatus
router.patch('/:id/estatus', 
    esAdminOSupervisor,
    captacionesController.updateEstatus
);

// Agregar trámite
router.post('/:id/tramites', 
    esAdminOSupervisor,
    [
        check('tipo', 'El tipo de trámite es requerido').not().isEmpty(),
        check('descripcion', 'La descripción del trámite es requerida').not().isEmpty(),
    ],
    captacionesController.addTramite
);

// Agregar gasto de remodelación
router.post('/:id/gastos', 
    esAdminOSupervisor,
    [
        check('concepto', 'El concepto del gasto es requerido').not().isEmpty(),
        check('monto', 'El monto del gasto es requerido').isNumeric(),
    ],
    captacionesController.addGasto
);

// Agregar inversionista
router.post('/:id/inversionistas', 
    esAdmin,
    [
        check('nombre', 'El nombre del inversionista es requerido').not().isEmpty(),
        check('porcentaje_participacion', 'El porcentaje de participación es requerido').isNumeric(),
        check('monto_invertido', 'El monto invertido es requerido').isNumeric(),
    ],
    captacionesController.addInversionista
);

// Registrar venta
router.post('/:id/venta', 
    esAdmin,
    [
        check('comprador.nombre', 'El nombre del comprador es requerido').not().isEmpty(),
        check('comprador.telefono', 'El teléfono del comprador es requerido').not().isEmpty(),
        check('monto_venta', 'El monto de venta es requerido').isNumeric(),
        check('tipo_de_pago', 'El tipo de pago es requerido').not().isEmpty(),
    ],
    captacionesController.registrarVenta
);

// -------- Nuevas Rutas para Características Adicionales --------

// Agregar/Actualizar datos laborales
router.post('/:id/datos-laborales',
    [
        check('empresa', 'La empresa es requerida').optional(),
        check('antiguedad', 'La antigüedad debe ser un número').optional().isNumeric(),
    ],
    captacionesController.updateDatosLaborales
);

// Agregar referencia personal
router.post('/:id/referencias',
    [
        check('nombre', 'El nombre de la referencia es requerido').not().isEmpty(),
        check('relacion', 'La relación con la referencia es requerida').not().isEmpty(),
        check('telefono', 'El teléfono de la referencia es requerido').not().isEmpty(),
    ],
    captacionesController.addReferencia
);

// Agregar documento
router.post('/:id/documentos',
    [
        check('nombre', 'El nombre del documento es requerido').not().isEmpty(),
        check('url', 'La URL del documento es requerida').not().isEmpty(),
        check('tipo', 'El tipo de documento es requerido').not().isEmpty(),
    ],
    captacionesController.addDocumento
);

// Agregar adeudo
router.post('/:id/adeudos',
    [
        check('tipo', 'El tipo de adeudo es requerido').not().isEmpty(),
        check('monto', 'El monto del adeudo es requerido').isNumeric(),
        check('estatus', 'El estatus del adeudo es requerido').optional().isIn(['Pagado', 'Pendiente', 'En proceso']),
    ],
    captacionesController.addAdeudo
);

// Actualizar estatus de venta
router.patch('/:id/venta/estatus',
    esAdmin,
    [
        check('estatus_venta', 'El estatus de venta es requerido').isIn(['En proceso', 'Finalizada', 'Cancelada']),
    ],
    captacionesController.updateEstatusVenta
);

// Agregar documento de venta
router.post('/:id/venta/documentos',
    esAdmin,
    [
        check('tipo', 'El tipo de documento es requerido').not().isEmpty(),
        check('url', 'La URL del documento es requerida').not().isEmpty(),
    ],
    captacionesController.addDocumentoVenta
);

// Ruta para descargar PDF
router.get('/download/:id', verificarToken, captacionesController.descargarPDF);

// -------- Rutas para Marketing Inmobiliario --------

// Obtener proyecto específico para marketing
router.get('/marketing/:id', verificarToken, captacionesController.getProyectoMarketing);

// Actualizar marketing de un proyecto
router.put('/marketing/:id', verificarToken, captacionesController.actualizarMarketing);

// -------- Rutas para Imágenes de Marketing --------

// Subir imágenes de marketing
router.post('/:id/marketing/imagenes', 
    verificarToken, 
    captacionesController.uploadImagenesMarketing
);

// Obtener imágenes de marketing
router.get('/:id/marketing/imagenes', 
    verificarToken, 
    captacionesController.getImagenesMarketing
);

// Eliminar imagen de marketing
router.delete('/:id/marketing/imagenes/:imageKey', 
    verificarToken, 
    captacionesController.deleteImagenMarketing
);

// Reordenar imágenes de marketing
router.put('/:id/marketing/imagenes/orden', 
    verificarToken, 
    captacionesController.reordenarImagenesMarketing
);

module.exports = router;