const express = require('express');
const router = express.Router();
const PushController = require('../controllers/push.controller');
const { isAuthenticated } = require('../helpers/auth');

/**
 * @route   POST /api/push/subscribe
 * @desc    Suscribir usuario a push notifications
 * @access  Private
 */
router.post('/subscribe', isAuthenticated, async (req, res) => {
    await PushController.subscribe(req, res);
});

/**
 * @route   POST /api/push/unsubscribe
 * @desc    Desuscribir usuario de push notifications
 * @access  Private
 */
router.post('/unsubscribe', isAuthenticated, async (req, res) => {
    await PushController.unsubscribe(req, res);
});

/**
 * @route   POST /api/push/test
 * @desc    Enviar notificación de prueba
 * @access  Private
 */
router.post('/test', isAuthenticated, async (req, res) => {
    await PushController.sendTestNotification(req, res);
});

/**
 * @route   GET /api/push/subscriptions
 * @desc    Obtener suscripciones del usuario
 * @access  Private
 */
router.get('/subscriptions', isAuthenticated, async (req, res) => {
    await PushController.getUserSubscriptions(req, res);
});

/**
 * @route   POST /api/push/cleanup
 * @desc    Limpiar suscripciones inactivas (Admin)
 * @access  Private - Admin
 */
router.post('/cleanup', isAuthenticated, async (req, res) => {
    // Verificar que el usuario sea administrador
    if (req.user.role !== 'administrator' && req.user.role !== 'administrador') {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Solo administradores pueden realizar esta acción.'
        });
    }
    
    await PushController.cleanupInactiveSubscriptions(req, res);
});

module.exports = router;
