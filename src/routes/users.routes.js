const express = require('express');
const router = express.Router();
const { logout, signup, signIn } = require('../controllers/users.controller');
const { isAuthenticated } = require('../helpers/auth');

// Rutas de API
router.get('/check-auth', isAuthenticated, (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            user: {
                id: req.user,
                role: req.role
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'No autorizado'
        });
    }
});

router.post('/signin', signIn);
router.post('/signup', signup);
router.get('/logout', logout);

module.exports = router;