const mongoose = require('mongoose');
const CaptacionInmobiliaria = require('../models/captacion-inmobiliaria');

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-inmobiliaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function cleanupMarketingImages() {
    try {
        console.log('🔍 Buscando captaciones con imágenes de marketing...');
        
        // Buscar captaciones que tengan imágenes de marketing
        const captaciones = await CaptacionInmobiliaria.find({
            'marketing.imagenes.0': { $exists: true }
        });
        
        console.log(`📊 Encontradas ${captaciones.length} captaciones con imágenes de marketing`);
        
        for (const captacion of captaciones) {
            console.log(`\n🏠 Procesando captación: ${captacion._id}`);
            
            if (captacion.marketing?.imagenes) {
                console.log(`   📸 Imágenes encontradas: ${captacion.marketing.imagenes.length}`);
                
                // Limpiar imágenes que tengan keys incorrectos (que empiecen con "Marketing/")
                const imagenesLimpias = captacion.marketing.imagenes.filter(imagen => {
                    if (imagen.key && imagen.key.startsWith('Marketing/')) {
                        console.log(`   🗑️  Eliminando imagen con key incorrecto: ${imagen.key}`);
                        return false;
                    }
                    return true;
                });
                
                if (imagenesLimpias.length !== captacion.marketing.imagenes.length) {
                    console.log(`   ✅ Imágenes limpiadas: ${imagenesLimpias.length}/${captacion.marketing.imagenes.length}`);
                    
                    // Actualizar la captación
                    await CaptacionInmobiliaria.findByIdAndUpdate(
                        captacion._id,
                        {
                            $set: {
                                'marketing.imagenes': imagenesLimpias,
                                'marketing.fecha_actualizacion': new Date()
                            }
                        }
                    );
                    
                    console.log(`   💾 Captación actualizada`);
                } else {
                    console.log(`   ✅ Todas las imágenes ya están limpias`);
                }
            }
        }
        
        console.log('\n🎉 Limpieza completada exitosamente');
        
    } catch (error) {
        console.error('❌ Error durante la limpieza:', error);
    } finally {
        mongoose.connection.close();
        console.log('🔌 Conexión a MongoDB cerrada');
    }
}

// Ejecutar la limpieza
cleanupMarketingImages();
