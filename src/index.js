require('dotenv').config();

const app = require('./server');
const mongoose = require('./database');
const {createRoles} = require('./libs/initialSetup');
const fs = require('fs');
const path = require('path');

// Asegurarse de que el directorio para uploads exista
const uploadDir = path.join(__dirname, 'public/uploads/profile_photos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Esperar a que la conexión esté establecida antes de crear roles
mongoose.connection.once('connected', async () => {
  try {
    await createRoles();
    console.log('Roles creados exitosamente');
  } catch (error) {
    console.error('Error al crear roles:', error);
    // No detener el servidor si falla la creación de roles
  }
});

// server is listening
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

/* // Agregar al inicio de tu aplicación
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
    external: `${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`,
  });
}, 30000); */

// Añade este código al inicio de tu archivo index.js
if (process.env.NODE_ENV === 'production') {
  console.log = (message) => {
    // Solo muestra errores y advertencias en producción
    if (typeof message === 'string' && 
        (message.includes('ERROR') || message.includes('WARN'))) {
      process._originalConsoleLog(message);
    }
  };
  // Guarda referencia al console.log original
  process._originalConsoleLog = console.log;
}
