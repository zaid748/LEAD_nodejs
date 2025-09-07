const express = require('express');
const router = express.Router();

// Ruta de prueba para verificar CORS
router.get('/test-cors', (req, res) => {
  console.log('=== PRUEBA DE CORS ===');
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.get('User-Agent'));
  
  res.json({
    success: true,
    message: 'CORS funcionando correctamente',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba para verificar acceso a imágenes
router.get('/test-image-access', (req, res) => {
  console.log('=== PRUEBA DE ACCESO A IMAGEN ===');
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.get('User-Agent'));
  
  // Simular una respuesta de imagen con headers CORS
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Content-Type', 'image/png');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  
  res.json({
    success: true,
    message: 'Acceso a imagen configurado correctamente',
    origin: req.headers.origin,
    corsHeaders: {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '*',
      'Access-Control-Allow-Credentials': allowedOrigins.includes(origin) ? 'true' : 'false',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    },
    timestamp: new Date().toISOString()
  });
});

// Ruta principal
router.get('/', (req, res) => {
    res.json({
        message: 'API LEAD Inmobiliaria funcionando correctamente',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;