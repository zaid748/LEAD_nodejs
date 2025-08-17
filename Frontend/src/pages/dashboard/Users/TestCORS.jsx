import React, { useState } from 'react';
import { Card, CardBody, Typography, Button, Spinner } from '@material-tailwind/react';
import axios from 'axios';

export function TestCORS() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const testCORS = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🧪 Probando CORS...');
      console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

      // Prueba 1: Endpoint de prueba
      const corsResponse = await axios.get('/api/test-cors', {
        withCredentials: true
      });
      console.log('✅ CORS test exitoso:', corsResponse.data);

      // Prueba 2: Cargar imagen directamente
      const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log('🖼️ Probando carga de imagen:', imageUrl);

      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('✅ Imagen cargada exitosamente');
          resolve({ success: true, width: img.width, height: img.height });
        };
        img.onerror = (e) => {
          console.error('❌ Error al cargar imagen:', e);
          reject(new Error('No se pudo cargar la imagen'));
        };
        img.src = imageUrl;
      });

      // Prueba 3: Fetch directo a la imagen
      const fetchResponse = await fetch(imageUrl, {
        method: 'GET',
        credentials: 'include'
      });
      console.log('📡 Fetch response status:', fetchResponse.status);
      console.log('📡 Fetch response headers:', Object.fromEntries(fetchResponse.headers.entries()));

      setResults({
        cors: corsResponse.data,
        image: imageTest,
        fetch: {
          status: fetchResponse.status,
          headers: Object.fromEntries(fetchResponse.headers.entries())
        }
      });

    } catch (error) {
      console.error('❌ Error en prueba de CORS:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const testImageInNewTab = () => {
    const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
    console.log('🔗 Abriendo imagen en nueva pestaña:', imageUrl);
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="mx-auto my-10 max-w-screen-lg px-4">
      <Card>
        <CardBody>
          <Typography variant="h4" className="mb-4">
            🧪 Prueba de Configuración CORS
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

            <div className="flex gap-4">
              <Button
                onClick={testCORS}
                disabled={loading}
                className="flex items-center gap-2"
                color="blue"
              >
                {loading ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Probando CORS...
                  </>
                ) : (
                  '🚀 Probar CORS'
                )}
              </Button>

              <Button
                onClick={testImageInNewTab}
                color="green"
                variant="outlined"
              >
                🔗 Abrir Imagen
              </Button>
            </div>

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

            {results && (
              <div className="space-y-4">
                <Typography variant="h6" color="blue-gray">
                  📊 Resultados de las Pruebas:
                </Typography>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Prueba CORS */}
                  <div className="border border-green-200 bg-green-50 rounded-md p-4">
                    <Typography variant="small" className="font-semibold mb-2 text-green-800">
                      ✅ Prueba CORS
                    </Typography>
                    <div className="text-xs text-green-700 space-y-1">
                      <p><strong>Origin:</strong> {results.cors.origin}</p>
                      <p><strong>Timestamp:</strong> {results.cors.timestamp}</p>
                      <p><strong>Message:</strong> {results.cors.message}</p>
                    </div>
                  </div>

                  {/* Prueba Imagen */}
                  <div className={`border rounded-md p-4 ${
                    results.image.success 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <Typography variant="small" className="font-semibold mb-2">
                      {results.image.success ? '✅' : '❌'} Prueba Imagen
                    </Typography>
                    <div className="text-xs space-y-1">
                      {results.image.success ? (
                        <>
                          <p><strong>Dimensiones:</strong> {results.image.width} x {results.image.height}</p>
                          <p className="text-green-600">Imagen cargada correctamente</p>
                        </>
                      ) : (
                        <p className="text-red-600">Error al cargar imagen</p>
                      )}
                    </div>
                  </div>

                  {/* Prueba Fetch */}
                  <div className="border border-blue-200 bg-blue-50 rounded-md p-4">
                    <Typography variant="small" className="font-semibold mb-2 text-blue-800">
                      📡 Prueba Fetch
                    </Typography>
                    <div className="text-xs text-blue-700 space-y-1">
                      <p><strong>Status:</strong> {results.fetch.status}</p>
                      <p><strong>Content-Type:</strong> {results.fetch.headers['content-type']}</p>
                      <p><strong>CORS:</strong> {results.fetch.headers['access-control-allow-origin']}</p>
                    </div>
                  </div>
                </div>

                {/* Detalles completos */}
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <Typography variant="small" className="font-semibold mb-2">
                    📋 Detalles Completos:
                  </Typography>
                  <pre className="text-xs text-gray-700 bg-white p-2 rounded border overflow-x-auto">
                    {JSON.stringify(results, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <Typography variant="small" color="gray" className="font-semibold mb-2">
                🔍 Instrucciones de debugging:
              </Typography>
              <div className="text-xs text-gray-600 space-y-1">
                <p>1. Ejecuta "Probar CORS" para verificar la configuración</p>
                <p>2. Usa "Abrir Imagen" para ver si se puede acceder directamente</p>
                <p>3. Revisa la consola para logs detallados</p>
                <p>4. Si CORS funciona pero la imagen no se muestra, es un problema de headers</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TestCORS;
