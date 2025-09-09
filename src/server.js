const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const { helmetConfig, limiter, mongoSanitize, xss, hpp } = require('./config/security');

dotenv.config({ path: '.env' })

module.exports = {
    consumer_key : process.env.NOTES_APP_MONGODB_HOST,
    indexedDB: process.env.NOTES_APP_MONGODB_DATABASE,
    access_token_secret : process.env.SECRET
};

const app = express();

// Configuración de CORS (usa ALLOWED_ORIGINS en producción)
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://lead-inmobiliaria.com',
  'https://www.lead-inmobiliaria.com'
];
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(',').map(s => s.trim()).filter(Boolean)
  : defaultAllowedOrigins;

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // permitir herramientas como curl/healthcheck
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware de seguridad
app.use(helmetConfig);
app.use(limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Middleware para logging de cookies en cada request
// app.use((req, res, next) => {
//     console.log('Request URL:', req.url);
//     console.log('Request Method:', req.method);
//     console.log('Request Headers:', req.headers);
//     next();
// });

// Middleware temporal para debugging de uploads
app.use('/api/users/:id/upload-photo', (req, res, next) => {
  console.log('=== MIDDLEWARE DE DEBUGGING PARA UPLOAD ===');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.get('Content-Type'));
  console.log('User-Agent:', req.get('User-Agent'));
  next();
});

// Middleware para debugging de acceso a imágenes
app.use('/uploads', (req, res, next) => {
  console.log('=== MIDDLEWARE DE DEBUGGING PARA IMÁGENES ===');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.get('User-Agent'));
  console.log('Accept:', req.get('Accept'));
  next();
});

// Settings 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.ejs', exphbs.engine({
    defaultLayout: 'main', 
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.ejs',
    handlebars: handlebars
}));

handlebars.registerHelper('equals', (arg1, arg2, options) => {
    return arg1==arg2;
});
app.set('view engine', '.ejs');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || process.env.SECRET || 'fallback-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? 'lead-inmobiliaria.com' : 'localhost'
    },
    name: 'sessionId'
}));
app.use(flash());
//Global variables 
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Ruta de prueba para verificar CORS
app.get('/api/test-cors', (req, res) => {
  console.log('=== PRUEBA DE CORS DIRECTA ===');
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.get('User-Agent'));
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  
  res.json({
    success: true,
    message: 'CORS funcionando correctamente (directo)',
    origin: req.headers.origin,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba para verificar acceso a imágenes
app.get('/api/test-image-access', (req, res) => {
  console.log('=== PRUEBA DE ACCESO A IMAGEN DIRECTA ===');
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
    message: 'Acceso a imagen configurado correctamente (directo)',
    origin: req.headers.origin,
    corsHeaders: {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '*',
      'Access-Control-Allow-Credentials': allowedOrigins.includes(origin) ? 'true' : 'false',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    },
    timestamp: new Date().toISOString()
  });
});

// Importar rutas de captaciones
const captacionesRouter = require('./routes/captaciones.router');
const listaCompraRouter = require('./routes/lista-compra.router');

// Routes con prefijo /api
app.use('/api', require('./routes/index.routes'));
app.use('/api', require('./routes/notes.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/api', require('./routes/empleados.router'));
app.use('/api', require('./routes/nominas.router'));
// app.use('/api', require('./routes/Inventario.router')); // ROUTER ELIMINADO - NO SE USA
app.use('/api', require('./routes/marketing.router'));
app.use('/api/captaciones', captacionesRouter);
app.use('/api/lista-compra', listaCompraRouter);

// Router público para marketing (sin autenticación)
app.use('/api', require('./routes/marketing-publico.router'));

// Manejo de errores 404
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.originalUrl}`
    });
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Servir archivos de uploads con headers CORS apropiados ANTES de las rutas estáticas
app.use('/uploads', (req, res, next) => {
  const origin = req.headers.origin;

  // Permitir acceso desde orígenes específicos (no usar wildcard con credentials)
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    // No incluir Access-Control-Allow-Credentials cuando usamos wildcard
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Para imágenes, agregar headers específicos
  if (req.path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    const ext = req.path.split('.').pop().toLowerCase();
    res.header('Content-Type', `image/${ext}`);
    res.header('Cache-Control', 'public, max-age=31536000'); // Cache por 1 año
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
  }
  
  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
}, express.static(path.join(__dirname, 'public/uploads')));

// ===== SERVIR ARCHIVOS ESTÁTICOS DEL FRONTEND PÚBLICO =====
// Ruta para servir archivos estáticos de la plantilla HTML pública
app.use('/publico', express.static(path.join(__dirname, '../FrontendPublic'), {
  setHeaders: (res, path, stat) => {
    // Configurar tipos MIME correctos para diferentes archivos
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.woff')) {
      res.setHeader('Content-Type', 'font/woff');
    } else if (path.endsWith('.woff2')) {
      res.setHeader('Content-Type', 'font/woff2');
    } else if (path.endsWith('.ttf')) {
      res.setHeader('Content-Type', 'font/ttf');
    } else if (path.endsWith('.eot')) {
      res.setHeader('Content-Type', 'application/vnd.ms-fontobject');
    }
    
    // Headers de cache para archivos estáticos
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
}));

// ===== MIDDLEWARE DE SEGURIDAD PARA FRONTEND PÚBLICO =====
// Headers de seguridad específicos para archivos estáticos
app.use('/publico', (req, res, next) => {
  // Prevenir clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevenir MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// Servir archivos estáticos de React en producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

module.exports = app;