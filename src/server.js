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
const corsFixMiddleware = require('./middleware/express-cors-fix');

dotenv.config({ path: '.env' })

module.exports = {
    consumer_key : process.env.NOTES_APP_MONGODB_HOST,
    indexedDB: process.env.NOTES_APP_MONGODB_DATABASE,
    access_token_secret : process.env.SECRET
};

const app = express();

// Configuración CORS simplificada
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para logging de cookies en cada request
// app.use((req, res, next) => {
//     console.log('Request URL:', req.url);
//     console.log('Request Method:', req.method);
//     console.log('Request Headers:', req.headers);
//     next();
// });

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
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        domain: 'localhost'
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

// Servir archivos estáticos de React en producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

module.exports = app;