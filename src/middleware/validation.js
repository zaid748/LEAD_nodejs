const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Middleware para validar y sanitizar datos de entrada
const validateAndSanitize = (req, res, next) => {
  // Sanitizar todos los campos de texto
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Eliminar HTML peligroso y caracteres especiales
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [], // No permitir HTML
          allowedAttributes: {}, // No permitir atributos
          disallowedTagsMode: 'recursiveEscape'
        });
        
        // Limpiar espacios extra y caracteres de control
        req.body[key] = req.body[key]
          .trim()
          .replace(/\s+/g, ' ')
          .replace(/[\x00-\x1F\x7F]/g, '');
      }
    });
  }
  
  next();
};

// Validaciones específicas para usuarios
const validateUserSignup = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'),
  body('prim_nom')
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Nombre inválido'),
  body('apell_pa')
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Apellido paterno inválido'),
  body('telefono')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Teléfono inválido'),
  body('codigo')
    .isLength({ min: 5, max: 10 })
    .withMessage('Código postal inválido'),
  validateAndSanitize,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validaciones para login
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .notEmpty()
    .withMessage('Contraseña requerida'),
  validateAndSanitize,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateAndSanitize,
  validateUserSignup,
  validateUserLogin
};
