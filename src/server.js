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

// Configuración dinámica de CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://lead-inmobiliaria.com',
  'https://www.lead-inmobiliaria.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}));

// Middleware específico para CORS en archivos estáticos
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Content-Type', 'image/png');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  
  res.json({
    success: true,
    message: 'Acceso a imagen configurado correctamente (directo)',
    origin: req.headers.origin,
    corsHeaders: {
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Credentials': 'true',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    },
    timestamp: new Date().toISOString()
  });
});

// Importar rutas de captaciones
const captacionesRouter = require('./routes/captaciones.router');

// Routes con prefijo /api
app.use('/api', require('./routes/index.routes'));
app.use('/api', require('./routes/notes.routes'));
app.use('/api', require('./routes/users.routes'));
app.use('/api', require('./routes/empleados.router'));
app.use('/api', require('./routes/nominas.router'));
app.use('/api', require('./routes/Inventario.router'));
app.use('/api/captaciones', captacionesRouter);

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
  
  // Permitir acceso desde orígenes permitidos
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
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

// Servir archivos estáticos de React en producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

module.exports = app;