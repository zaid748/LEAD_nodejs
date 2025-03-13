const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET} = process.env;

// Middleware para autenticación con cookies
const isAuthenticated = async(req, res, next) => {
    try {
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

// Verificar si es administrador
const isAustheAdministrator = async(req, res, next) => {
    const role = req.role;
    if(role === "administrator" || role === "admin"){
        return next();
    }
    return res.status(403).json({
        success: false,
        message: 'Requiere permisos de administrador'
    });
};

// Verificar JWT con Authorization
const verificarToken = async (req, res, next) => {
    try {
        // Obtener token del header
        const token = req.cookies.Authorization;
        
        if (!token) {
            return res.status(401).json({ mensaje: 'No hay token, acceso denegado' });
        }
        
        // Verificar token
        const decodificado = jwt.verify(token, process.env.JWT_SECRET || SECRET);
        console.log('Token decodificado:', decodificado);
        // Buscar usuario en base de datos
        const usuario = await User.findById(decodificado._id).select('-password');
        
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Token inválido - usuario no encontrado' });
        }
        
        // Añadir usuario a la request
        req.user = usuario;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: 'Token expirado' });
        }
        
        console.error('Error de autenticación:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Middleware para verificar si es administrador
const esAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }
    
    if (req.user.role !== 'administrator') {
        return res.status(403).json({ mensaje: 'Acción permitida solo para administradores' });
    }
    
    next();
};

// Middleware para verificar si es administrador o supervisor
const esAdminOSupervisor = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }
    
    if (req.user.role !== 'administrator' && req.user.role !== 'supervisor') {
        return res.status(403).json({ mensaje: 'Acción permitida solo para administradores y supervisores' });
    }
    
    next();
};

// Middleware para sanitizar entradas
const sanitizarEntradas = (req, res, next) => {
    // Esta función podría implementarse para limpiar datos de entrada
    // Ejemplo básico: eliminar caracteres HTML peligrosos
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key]
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
            }
        });
    }
    
    next();
};

// Exportar todas las funciones correctamente
module.exports = {
    isAuthenticated,
    isAustheAdministrator,
    verificarToken,
    esAdmin,
    esAdminOSupervisor,
    sanitizarEntradas
};