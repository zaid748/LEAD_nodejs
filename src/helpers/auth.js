const helpers = {};
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET} = process.env;

helpers.isAuthenticated = async(req, res, next) => {
    try {
        console.log('Cookies received:', req.cookies);
        const authorization = req.cookies.Authorization;

        if (!authorization) {
            console.log('No authorization cookie found');
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        try {
            const decoded = jwt.verify(authorization, SECRET);
            console.log('Token decoded:', decoded);
            
            const usuario = await User.findById(decoded._id);
            
            if (!usuario) {
                console.log('No user found for token');
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token - no user found'
                });
            }

            req.token = authorization;
            req.user = usuario.id;
            req.role = usuario.role;
            
            console.log('User authenticated:', {
                id: usuario.id,
                role: usuario.role
            });
            
            next();
        } catch (jwtError) {
            console.error('JWT verification failed:', jwtError);
            return res.status(401).json({
                success: false,
                message: 'Invalid token - verification failed'
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during authentication'
        });
    }
};

helpers.isAustheAdministrator = async(req, res, next) => {
    const role = req.role;
    if(role === "administrator" || role === "admin"){
        return next();
    }
    return res.status(403).json({
        success: false,
        message: 'Requiere permisos de administrador'
    });
}

module.exports = helpers;