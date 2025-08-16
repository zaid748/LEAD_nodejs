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
    // Verificar que es una imagen
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    // Verificar que el mimetype sea realmente una imagen
    if (!mimetype || !extname) {
      return cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
    }
    
    // Verificar que el nombre del archivo no contenga caracteres peligrosos
    const safeFilename = /^[a-zA-Z0-9._-]+$/;
    if (!safeFilename.test(path.basename(file.originalname, path.extname(file.originalname)))) {
      return cb(new Error('Nombre de archivo no válido'));
    }
    
    cb(null, true);
  }
});

module.exports = {
  profilePhotoUpload
}; 