import React, { useState, useEffect } from 'react';
import { Card, CardBody, Typography, Button, Spinner } from '@material-tailwind/react';

export function TestImageDisplay() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lista de imágenes de prueba
  const testImages = [
    {
      name: 'Foto más reciente del usuario 6214ff3f62021ac0e041db76',
      url: `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`,
      expectedPath: '/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png'
    },
    {
      name: 'Foto del usuario 67c6fb2a18215ab2fbce7a65',
      url: `${import.meta.env.VITE_API_URL}/uploads/users/profile_67c6fb2a18215ab2fbce7a65_1741268375107.png`,
      expectedPath: '/uploads/users/profile_67c6fb2a18215ab2fbce7a65_1741268375107.png'
    }
  ];

  const testImageLoad = async (imageUrl) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🧪 Probando carga de imagen:', imageUrl);
      
      // Crear una imagen temporal para probar la carga
      const img = new Image();
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('✅ Imagen cargada exitosamente:', imageUrl);
          resolve({ success: true, width: img.width, height: img.height });
        };
        
        img.onerror = () => {
          console.error('❌ Error al cargar imagen:', imageUrl);
          reject(new Error('No se pudo cargar la imagen'));
        };
        
        // Agregar timestamp para evitar cache
        img.src = `${imageUrl}?t=${Date.now()}`;
        
        // Timeout después de 10 segundos
        setTimeout(() => {
          reject(new Error('Timeout al cargar imagen'));
        }, 10000);
      });
    } catch (error) {
      console.error('Error en prueba de imagen:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    setImages([]);
    setError(null);
    
    const results = [];
    
    for (const testImage of testImages) {
      try {
        console.log(`\n🧪 Probando: ${testImage.name}`);
        const result = await testImageLoad(testImage.url);
        results.push({
          ...testImage,
          ...result,
          status: 'success'
        });
      } catch (error) {
        console.error(`❌ Falló: ${testImage.name}`, error);
        results.push({
          ...testImage,
          error: error.message,
          status: 'error'
        });
      }
    }
    
    setImages(results);
  };

  const checkImageDirectly = (imagePath) => {
    const fullUrl = `${import.meta.env.VITE_API_URL}${imagePath}`;
    console.log('🔗 Abriendo imagen directamente:', fullUrl);
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="mx-auto my-10 max-w-screen-lg px-4">
      <Card>
        <CardBody>
          <Typography variant="h4" className="mb-4">
            🧪 Prueba de Visualización de Imágenes
          </Typography>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <Typography variant="small" color="blue" className="font-semibold mb-2">
                💡 Información de configuración:
              </Typography>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'No configurado'}</p>
                <p><strong>Navegador:</strong> {navigator.userAgent}</p>
                <p><strong>Cookies:</strong> {document.cookie ? 'Disponibles' : 'No disponibles'}</p>
              </div>
            </div>

            <Button
              onClick={runAllTests}
              disabled={loading}
              className="flex items-center gap-2"
              color="blue"
            >
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Probando imágenes...
                </>
              ) : (
                '🚀 Ejecutar Pruebas de Imágenes'
              )}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <Typography color="red" className="font-semibold">
                  ❌ Error:
                </Typography>
                <Typography color="red" className="text-sm">
                  {error}
                </Typography>
              </div>
            )}

            {images.length > 0 && (
              <div className="space-y-4">
                <Typography variant="h6" color="blue-gray">
                  📊 Resultados de las Pruebas:
                </Typography>
                
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-md p-4 ${
                      image.status === 'success' 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Typography variant="small" className="font-semibold mb-2">
                          {image.name}
                        </Typography>
                        
                        <div className="text-sm space-y-1">
                          <p><strong>URL:</strong> {image.url}</p>
                          <p><strong>Ruta esperada:</strong> {image.expectedPath}</p>
                          
                          {image.status === 'success' ? (
                            <>
                              <p><strong>Dimensiones:</strong> {image.width} x {image.height}</p>
                              <p className="text-green-600">✅ Imagen cargada correctamente</p>
                            </>
                          ) : (
                            <p className="text-red-600">❌ Error: {image.error}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => checkImageDirectly(image.expectedPath)}
                          color="blue"
                        >
                          🔗 Abrir
                        </Button>
                        
                        {image.status === 'success' && (
                          <div className="w-20 h-20 border rounded overflow-hidden">
                            <img 
                              src={`${image.url}?t=${Date.now()}`}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <Typography variant="small" color="gray" className="font-semibold mb-2">
                🔍 Instrucciones de debugging:
              </Typography>
              <div className="text-xs text-gray-600 space-y-1">
                <p>1. Ejecuta las pruebas para ver el estado de cada imagen</p>
                <p>2. Usa el botón "Abrir" para ver la imagen directamente en el navegador</p>
                <p>3. Revisa la consola para logs detallados</p>
                <p>4. Si las imágenes se abren directamente pero no en el componente, es un problema de CORS</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TestImageDisplay;
