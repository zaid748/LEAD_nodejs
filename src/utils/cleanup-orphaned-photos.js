const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Configuración de MongoDB para Docker
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-inmobiliaria';

/**
 * Script para limpiar fotos de perfil huérfanas
 * Elimina archivos que no están referenciados en la base de datos
 */
async function cleanupOrphanedPhotos() {
  try {
    console.log('🧹 Iniciando limpieza de fotos huérfanas...');
    console.log('🔌 Conectando a MongoDB:', MONGODB_URI);
    
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 segundos de timeout
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Conectado a MongoDB exitosamente');
    
    // Importar el modelo User después de conectar
    const User = require('../models/user');
    
    const uploadsDir = path.join(__dirname, '../public/uploads/users');
    
    // Verificar que el directorio existe
    if (!fs.existsSync(uploadsDir)) {
      console.log('❌ Directorio de uploads no encontrado');
      return;
    }
    
    console.log('📁 Directorio de uploads encontrado:', uploadsDir);
    
    // Obtener todas las fotos de perfil de la base de datos
    console.log('🔍 Consultando usuarios en la base de datos...');
    const users = await User.find({}, 'foto_perfil').lean();
    const referencedPhotos = new Set();
    
    users.forEach(user => {
      if (user.foto_perfil && !user.foto_perfil.includes('user_icon.svg')) {
        referencedPhotos.add(user.foto_perfil);
        console.log(`📸 Foto referenciada: ${user.foto_perfil}`);
      }
    });
    
    console.log(`📊 Total de fotos referenciadas en BD: ${referencedPhotos.size}`);
    
    // Leer todos los archivos en el directorio de uploads
    const files = fs.readdirSync(uploadsDir);
    console.log(`📁 Total de archivos en directorio: ${files.length}`);
    
    let orphanedCount = 0;
    let deletedCount = 0;
    let skippedCount = 0;
    
    for (const file of files) {
      if (file.startsWith('profile_')) {
        const filePath = `/uploads/users/${file}`;
        
        if (!referencedPhotos.has(filePath)) {
          orphanedCount++;
          const fullPath = path.join(uploadsDir, file);
          
          try {
            // Verificar que el archivo existe antes de eliminarlo
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
              console.log(`🗑️ Eliminada foto huérfana: ${file}`);
              deletedCount++;
            } else {
              console.log(`⚠️ Archivo no encontrado: ${file}`);
            }
          } catch (error) {
            console.error(`❌ Error al eliminar ${file}:`, error.message);
          }
        } else {
          skippedCount++;
          console.log(`✅ Foto referenciada, se mantiene: ${file}`);
        }
      } else {
        console.log(`ℹ️ Archivo no es foto de perfil: ${file}`);
      }
    }
    
    console.log(`📈 Resumen de limpieza:`);
    console.log(`   - Fotos referenciadas: ${referencedPhotos.size}`);
    console.log(`   - Fotos huérfanas encontradas: ${orphanedCount}`);
    console.log(`   - Fotos eliminadas: ${deletedCount}`);
    console.log(`   - Fotos mantenidas: ${skippedCount}`);
    console.log('✅ Limpieza completada');
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('🔌 Error de conexión a MongoDB. Verifica que el servicio esté ejecutándose.');
      console.error('💡 Si estás usando Docker, asegúrate de que el contenedor de MongoDB esté activo.');
    }
  } finally {
    // Cerrar la conexión de MongoDB
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Conexión a MongoDB cerrada');
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  cleanupOrphanedPhotos().then(() => {
    console.log('🏁 Script finalizado');
    process.exit(0);
  }).catch(error => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
}

module.exports = { cleanupOrphanedPhotos };
