import React, { useState } from 'react';

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

      // Prueba 1: Endpoint de prueba básico
      console.log('📡 Probando /api/test-cors...');
      const corsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/test-cors`, {
        method: 'GET',
        credentials: 'include'
      });
      console.log('✅ CORS test status:', corsResponse.status);
      const corsData = await corsResponse.json();
      console.log('✅ CORS test data:', corsData);

      // Prueba 2: Endpoint de prueba de imagen
      console.log('📡 Probando /api/test-image-access...');
      const imageAccessResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/test-image-access`, {
        method: 'GET',
        credentials: 'include'
      });
      console.log('🖼️ Image access test status:', imageAccessResponse.status);
      const imageAccessData = await imageAccessResponse.json();
      console.log('🖼️ Image access test data:', imageAccessData);

      // Prueba 3: Fetch directo a la imagen (sin cargar en elemento img)
      const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log('🖼️ Probando fetch de imagen:', imageUrl);

      const fetchResponse = await fetch(imageUrl, {
        method: 'GET',
        credentials: 'include'
      });
      console.log('📡 Fetch response status:', fetchResponse.status);
      console.log('📡 Fetch response headers:', Object.fromEntries(fetchResponse.headers.entries()));

      // Verificar si la imagen se puede cargar (solo verificar headers, no cargar el contenido)
      let imageTest = { success: false, error: 'No se pudo verificar' };
      
      if (fetchResponse.ok) {
        // Verificar que es una imagen válida
        const contentType = fetchResponse.headers.get('content-type');
        if (contentType && contentType.startsWith('image/')) {
          imageTest = { 
            success: true, 
            width: 'N/A (solo verificación de headers)', 
            height: 'N/A (solo verificación de headers)',
            contentType: contentType
          };
        } else {
          imageTest = { 
            success: false, 
            error: `Content-Type no válido: ${contentType}` 
          };
        }
      } else {
        imageTest = { 
          success: false, 
          error: `HTTP ${fetchResponse.status}: ${fetchResponse.statusText}` 
        };
      }

      setResults({
        cors: corsData,
        imageAccess: imageAccessData,
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

  const testImageFetch = async () => {
    try {
      const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log('📡 Probando fetch directo a imagen:', imageUrl);
      
      const response = await fetch(imageUrl, {
        method: 'GET',
        credentials: 'include'
      });
      
      console.log('📡 Status:', response.status);
      console.log('📡 Headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const blob = await response.blob();
        console.log('✅ Imagen descargada como blob:', blob.size, 'bytes');
        alert(`✅ Imagen descargada exitosamente: ${blob.size} bytes`);
      } else {
        console.error('❌ Error en fetch:', response.status, response.statusText);
        alert(`❌ Error en fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('❌ Error en fetch:', error);
      alert(`❌ Error en fetch: ${error.message}`);
    }
  };

  const testImageLoad = async () => {
    try {
      const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log('🖼️ Probando carga de imagen en elemento img:', imageUrl);

      // Agregar timestamp para forzar la recarga (como en el perfil)
      const timestampedUrl = `${imageUrl}?t=${Date.now()}`;
      console.log('🖼️ URL con timestamp:', timestampedUrl);

      // PRIMER INTENTO: Carga directa con timestamp
      try {
        const img = new Image();
        const imageTest = await new Promise((resolve, reject) => {
          img.onload = () => {
            console.log('✅ Imagen cargada exitosamente en elemento img (directo)');
            console.log('Dimensiones:', img.width, 'x', img.height);
            resolve({ success: true, width: img.width, height: img.height, method: 'directo' });
          };
          img.onerror = (e) => {
            console.error('❌ Error al cargar imagen directamente:', e);
            reject(new Error('No se pudo cargar la imagen directamente'));
          };
          
          img.src = timestampedUrl;
          
          // Timeout después de 5 segundos
          setTimeout(() => {
            reject(new Error('Timeout al cargar imagen directamente'));
          }, 5000);
        });

        alert(`✅ Imagen cargada exitosamente (directo): ${imageTest.width} x ${imageTest.height}`);
        return;
      } catch (directError) {
        console.log('⚠️ Carga directa falló, intentando con base64...');
      }

      // SEGUNDO INTENTO: Carga con base64 como fallback
      console.log('🔄 Intentando carga con base64...');
      
      const response = await fetch(imageUrl, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('✅ Blob creado:', blob.size, 'bytes, tipo:', blob.type);

      // Convertir blob a base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result;
          console.log('✅ Base64 generado, longitud:', base64.length);
          resolve(base64);
        };
        reader.onerror = () => reject(new Error('Error al convertir a base64'));
      });

      reader.readAsDataURL(blob);
      const base64 = await base64Promise;

      // Crear imagen desde base64
      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('✅ Imagen cargada exitosamente desde base64 (fallback)');
          console.log('Dimensiones:', img.width, 'x', img.height);
          resolve({ success: true, width: img.width, height: img.height, method: 'base64-fallback' });
        };
        img.onerror = (e) => {
          console.error('❌ Error al cargar imagen desde base64:', e);
          reject(new Error('No se pudo cargar la imagen desde base64'));
        };
        
        img.src = base64;
        
        // Timeout después de 5 segundos
        setTimeout(() => {
          reject(new Error('Timeout al cargar imagen desde base64'));
        }, 5000);
      });

      alert(`✅ Imagen cargada exitosamente (base64 fallback): ${imageTest.width} x ${imageTest.height}`);
    } catch (error) {
      console.error('❌ Error en carga de imagen:', error);
      alert(`❌ Error en carga de imagen: ${error.message}`);
    }
  };

  const testImageLoadAlternative = async () => {
    try {
      const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log('🖼️ Probando carga alternativa de imagen:', imageUrl);

      // Usar fetch + blob (método alternativo)
      const response = await fetch(imageUrl, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('✅ Blob creado:', blob.size, 'bytes, tipo:', blob.type);

      // Crear URL del blob
      const blobUrl = URL.createObjectURL(blob);
      console.log('✅ Blob URL creada:', blobUrl);

      // Crear imagen desde blob
      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('✅ Imagen cargada desde blob exitosamente');
          console.log('Dimensiones:', img.width, 'x', img.height);
          
          // Limpiar la URL del blob
          URL.revokeObjectURL(blobUrl);
          
          resolve({ success: true, width: img.width, height: img.height, method: 'blob' });
        };
        img.onerror = (e) => {
          console.error('❌ Error al cargar imagen desde blob:', e);
          URL.revokeObjectURL(blobUrl);
          reject(new Error('No se pudo cargar la imagen desde blob'));
        };
        
        img.src = blobUrl;
        
        // Timeout después de 10 segundos
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          reject(new Error('Timeout al cargar imagen desde blob'));
        }, 10000);
      });

      alert(`✅ Imagen cargada desde blob exitosamente: ${imageTest.width} x ${imageTest.height}`);
    } catch (error) {
      console.error('❌ Error en carga alternativa de imagen:', error);
      alert(`❌ Error en carga alternativa: ${error.message}`);
    }
  };

  const testImageLoadBase64 = async () => {
    try {
      const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/users/profile_6214ff3f62021ac0e041db76_1755436024267.png`;
      console.log('🖼️ Probando carga con base64:', imageUrl);

      // Usar fetch + base64 (método que evita CORS completamente)
      const response = await fetch(imageUrl, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log('✅ Blob creado:', blob.size, 'bytes, tipo:', blob.type);

      // Convertir blob a base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64 = reader.result;
          console.log('✅ Base64 generado, longitud:', base64.length);
          resolve(base64);
        };
        reader.onerror = () => reject(new Error('Error al convertir a base64'));
      });

      reader.readAsDataURL(blob);
      const base64 = await base64Promise;

      // Crear imagen desde base64
      const img = new Image();
      const imageTest = await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('✅ Imagen cargada desde base64 exitosamente');
          console.log('Dimensiones:', img.width, 'x', img.height);
          resolve({ success: true, width: img.width, height: img.height, method: 'base64' });
        };
        img.onerror = (e) => {
          console.error('❌ Error al cargar imagen desde base64:', e);
          reject(new Error('No se pudo cargar la imagen desde base64'));
        };
        
        img.src = base64;
        
        // Timeout después de 10 segundos
        setTimeout(() => {
          reject(new Error('Timeout al cargar imagen desde base64'));
        }, 10000);
      });

      alert(`✅ Imagen cargada desde base64 exitosamente: ${imageTest.width} x ${imageTest.height}`);
    } catch (error) {
      console.error('❌ Error en carga con base64:', error);
      alert(`❌ Error en carga con base64: ${error.message}`);
    }
  };

  const testEndpointDirectly = async (endpoint) => {
    try {
      console.log(`🧪 Probando endpoint directamente: ${endpoint}`);
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'GET',
        credentials: 'include'
      });
      
      console.log(`📡 ${endpoint} - Status:`, response.status);
      console.log(`📡 ${endpoint} - Headers:`, Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${endpoint} - Data:`, data);
        alert(`✅ ${endpoint} funcionando: ${data.message}`);
      } else {
        console.error(`❌ ${endpoint} - Error:`, response.status, response.statusText);
        alert(`❌ ${endpoint} error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`❌ ${endpoint} - Error:`, error);
      alert(`❌ ${endpoint} error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🧪 Prueba de Configuración CORS</h1>
      
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            💡 Información de configuración:
          </h2>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'No configurado'}</p>
            <p><strong>Navegador:</strong> {navigator.userAgent}</p>
            <p><strong>Cookies:</strong> {document.cookie ? 'Disponibles' : 'No disponibles'}</p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={testCORS}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Probando...' : '🚀 Probar CORS'}
          </button>

          <button
            onClick={testImageInNewTab}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            🔗 Abrir Imagen
          </button>

          <button
            onClick={testImageFetch}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            📡 Fetch Imagen
          </button>
        </div>

        {/* Botones de prueba individual */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => testEndpointDirectly('/api/test-cors')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            🧪 Test CORS Directo
          </button>

          <button
            onClick={() => testEndpointDirectly('/api/test-image-access')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            🧪 Test Image Access Directo
          </button>

          <button
            onClick={() => testEndpointDirectly('/api/')}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            🧪 Test API Root
          </button>

          <button
            onClick={testImageLoad}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            🖼️ Test Carga Imagen
          </button>

          <button
            onClick={testImageLoadAlternative}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            🖼️ Test Carga Alternativa
          </button>

          <button
            onClick={testImageLoadBase64}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            🖼️ Test Carga Base64
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 className="text-red-800 font-semibold">❌ Error:</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">📊 Resultados de las Pruebas:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prueba CORS */}
              <div className="border border-green-200 bg-green-50 rounded-md p-4">
                <h3 className="font-semibold text-green-800 mb-2">✅ Prueba CORS</h3>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>Origin:</strong> {results.cors.origin}</p>
                  <p><strong>Message:</strong> {results.cors.message}</p>
                </div>
              </div>

              {/* Prueba Acceso a Imagen */}
              <div className="border border-blue-200 bg-blue-50 rounded-md p-4">
                <h3 className="font-semibold text-blue-800 mb-2">🖼️ Acceso a Imagen</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Origin:</strong> {results.imageAccess.origin}</p>
                  <p><strong>Message:</strong> {results.imageAccess.message}</p>
                </div>
              </div>

              {/* Prueba Imagen */}
              <div className={`border rounded-md p-4 ${
                results.image.success 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
              }`}>
                <h3 className="font-semibold mb-2">
                  {results.image.success ? '✅' : '❌'} Prueba Imagen
                </h3>
                <div className="text-sm space-y-1">
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
              <div className="border border-purple-200 bg-purple-50 rounded-md p-4">
                <h3 className="font-semibold text-purple-800 mb-2">📡 Prueba Fetch</h3>
                <div className="text-sm text-purple-700 space-y-1">
                  <p><strong>Status:</strong> {results.fetch.status}</p>
                  <p><strong>Content-Type:</strong> {results.fetch.headers['content-type']}</p>
                  <p><strong>CORS:</strong> {results.fetch.headers['access-control-allow-origin']}</p>
                </div>
              </div>
            </div>

            {/* Detalles completos */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold mb-2">📋 Detalles Completos:</h3>
              <pre className="text-xs text-gray-700 bg-white p-2 rounded border overflow-x-auto">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold mb-2">🔍 Instrucciones de debugging:</h2>
          <div className="text-xs text-gray-600 space-y-1">
            <p>1. Ejecuta "Probar CORS" para verificar la configuración completa</p>
            <p>2. Usa "Abrir Imagen" para ver si se puede acceder directamente</p>
            <p>3. Usa "Fetch Imagen" para probar descarga programática</p>
            <p>4. Usa los botones individuales para probar cada endpoint por separado</p>
            <p>5. Usa "Test Carga Imagen" para probar carga directa en elemento img</p>
            <p>6. Usa "Test Carga Alternativa" para probar carga desde blob</p>
            <p>7. Usa "Test Carga Base64" para probar carga con base64 (evita CORS)</p>
            <p>8. Revisa la consola para logs detallados</p>
            <p>9. Si CORS funciona pero la imagen no se muestra, es un problema de headers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCORS;
