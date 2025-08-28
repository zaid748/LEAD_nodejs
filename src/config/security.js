const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Configuración de rate limiting - AUMENTADO para permitir navegación normal
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // AUMENTADO: máximo 1000 requests por ventana (antes era 100)
  message: {
    success: false,
    message: 'Demasiadas solicitudes desde esta IP, intente nuevamente en 15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Agregar skip para ciertas rutas que no deberían contar
  skip: (req) => {
    // No contar requests a archivos estáticos
    return req.path.startsWith('/uploads') || 
           req.path.startsWith('/img') || 
           req.path.startsWith('/css') ||
           req.path.startsWith('/js');
  }
});

// Configuración específica para login - AUMENTADO también
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // AUMENTADO: máximo 20 intentos de login (antes era 5)
  message: {
    success: false,
    message: 'Demasiados intentos de login, intente nuevamente en 15 minutos'
  },
  skipSuccessfulRequests: true,
});

// Configuración de Helmet
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

module.exports = {
  limiter,
  loginLimiter,
  helmetConfig,
  mongoSanitize,
  xss,
  hpp
};
