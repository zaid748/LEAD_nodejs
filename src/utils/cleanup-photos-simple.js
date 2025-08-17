const fs = require('fs');
const path = require('path');

/**
 * Script simple para limpiar fotos duplicadas del mismo usuario
 * Basado en el patrón de nombres: profile_USERID_TIMESTAMP.ext
 */
function cleanupDuplicatePhotos() {
  try {
    console.log('🧹 Iniciando limpieza de fotos duplicadas...');
    
    const uploadsDir = path.join(__dirname, '../public/uploads/users');
    
    // Verificar que el directorio existe
    if (!fs.existsSync(uploadsDir)) {
      console.log('❌ Directorio de uploads no encontrado');
      return;
    }
    
    console.log('📁 Directorio de uploads encontrado:', uploadsDir);
    
    // Leer todos los archivos en el directorio de uploads
    const files = fs.readdirSync(uploadsDir);
    console.log(`📁 Total de archivos en directorio: ${files.length}`);
    
    // Agrupar archivos por ID de usuario
    const userPhotos = {};
    
    files.forEach(file => {
      if (file.startsWith('profile_')) {
        // Extraer el ID del usuario del nombre del archivo
        // Formato: profile_USERID_TIMESTAMP.ext
        const parts = file.split('_');
        if (parts.length >= 3) {
          const userId = parts[1];
          if (!userPhotos[userId]) {
            userPhotos[userId] = [];
          }
          userPhotos[userId].push({
            name: file,
            path: path.join(uploadsDir, file),
            timestamp: parseInt(parts[2]) || 0
          });
        }
      }
    });
    
    console.log(`👥 Usuarios encontrados: ${Object.keys(userPhotos).length}`);
    
    let deletedCount = 0;
    let keptCount = 0;
    
    // Para cada usuario, mantener solo la foto más reciente
    Object.keys(userPhotos).forEach(userId => {
      const photos = userPhotos[userId];
      
      if (photos.length > 1) {
        console.log(`👤 Usuario ${userId}: ${photos.length} fotos encontradas`);
        
        // Ordenar por timestamp (más reciente primero)
        photos.sort((a, b) => b.timestamp - a.timestamp);
        
        // Mantener la primera (más reciente) y eliminar las demás
        const photoToKeep = photos[0];
        const photosToDelete = photos.slice(1);
        
        console.log(`✅ Manteniendo: ${photoToKeep.name}`);
        keptCount++;
        
        photosToDelete.forEach(photo => {
          try {
            if (fs.existsSync(photo.path)) {
              fs.unlinkSync(photo.path);
              console.log(`🗑️ Eliminada: ${photo.name}`);
              deletedCount++;
            }
          } catch (error) {
            console.error(`❌ Error al eliminar ${photo.name}:`, error.message);
          }
        });
      } else if (photos.length === 1) {
        console.log(`👤 Usuario ${userId}: 1 foto (se mantiene)`);
        keptCount++;
      }
    });
    
    console.log(`📈 Resumen de limpieza:`);
    console.log(`   - Fotos mantenidas: ${keptCount}`);
    console.log(`   - Fotos eliminadas: ${deletedCount}`);
    console.log(`   - Total de archivos procesados: ${files.length}`);
    console.log('✅ Limpieza completada');
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  cleanupDuplicatePhotos();
  console.log('🏁 Script finalizado');
}

module.exports = { cleanupDuplicatePhotos };
