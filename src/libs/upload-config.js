const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear el directorio base para las fotos de usuarios si no existe
const userUploadDir = path.join(__dirname, '../public/uploads/users');
if (!fs.existsSync(userUploadDir)) {
  fs.mkdirSync(userUploadDir, { recursive: true });
}

// Configuración de multer para fotos de perfil
const profilePhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Guardar primero en una carpeta temporal
    const tempDir = path.join(__dirname, '../public/uploads/temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    // Generar un nombre único con timestamp para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile_' + uniqueSuffix + ext);
  }
});

// Configuración para validar fotos de perfil
const profilePhotoUpload = multer({
  storage: profilePhotoStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limitar a 5MB
    files: 1 // Solo un archivo por vez
  },
  fileFilter: function (req, file, cb) {
    console.log('=== VALIDACIÓN DE ARCHIVO ===');
    console.log('Nombre original:', file.originalname);
    console.log('Mimetype:', file.mimetype);
    console.log('Tamaño:', file.size);
    
    // Verificar que es una imagen
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    console.log('Mimetype válido:', mimetype);
    console.log('Extensión válida:', extname);
    
    // Verificar que el mimetype sea realmente una imagen
    if (!mimetype || !extname) {
      console.log('ERROR: Tipo de archivo no válido');
      return cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
    }
    
    // Validación más permisiva del nombre del archivo
    // Permitir caracteres comunes en nombres de archivos pero bloquear caracteres peligrosos
    const dangerousChars = /[<>:"/\\|?*\x00-\x1f]/;
    if (dangerousChars.test(file.originalname)) {
      console.log('ERROR: Nombre de archivo contiene caracteres peligrosos');
      return cb(new Error('El nombre del archivo contiene caracteres no permitidos'));
    }
    
    // Verificar longitud del nombre (máximo 255 caracteres)
    if (file.originalname.length > 255) {
      console.log('ERROR: Nombre de archivo demasiado largo');
      return cb(new Error('El nombre del archivo es demasiado largo'));
    }
    
    console.log('Archivo válido, procediendo...');
    cb(null, true);
  }
});

module.exports = {
  profilePhotoUpload
}; 