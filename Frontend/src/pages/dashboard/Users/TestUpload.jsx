import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, Typography, Spinner } from '@material-tailwind/react';

export function TestUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
    setResult(null);
    
    if (selectedFile) {
      console.log('=== ARCHIVO SELECCIONADO ===');
      console.log('Nombre:', selectedFile.name);
      console.log('Tipo:', selectedFile.type);
      console.log('Tamaño:', (selectedFile.size / 1024 / 1024).toFixed(2), 'MB');
      console.log('Última modificación:', new Date(selectedFile.lastModified).toISOString());
    }
  };

  const testUpload = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('foto_perfil', file);

      console.log('=== INICIANDO PRUEBA DE UPLOAD ===');
      console.log('URL base:', import.meta.env.VITE_API_URL);
      console.log('FormData creado:', formData);
      console.log('Archivo en FormData:', formData.get('foto_perfil'));

      // Usar un ID de usuario de prueba (deberías reemplazar esto con un ID real)
      const testUserId = '6214ff3f62021ac0e041db76'; // ID del usuario que viste en los logs
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/${testUserId}/upload-photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
          timeout: 30000,
        }
      );

      console.log('=== RESPUESTA EXITOSA ===');
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('=== ERROR EN LA PRUEBA ===');
      console.error('Error completo:', error);
      
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        setError(`Error del servidor: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor');
        console.error('Request:', error.request);
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        console.error('Error en la configuración:', error.message);
        setError(`Error de configuración: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-screen-lg px-4">
      <Card>
        <CardBody>
          <Typography variant="h4" className="mb-4">
            🧪 Prueba de Subida de Fotos
          </Typography>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona una imagen para probar:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {file && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <Typography variant="small" color="blue" className="font-semibold mb-2">
                  📁 Archivo seleccionado:
                </Typography>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Nombre:</strong> {file.name}</p>
                  <p><strong>Tipo:</strong> {file.type}</p>
                  <p><strong>Tamaño:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>Última modificación:</strong> {new Date(file.lastModified).toLocaleString()}</p>
                </div>
              </div>
            )}

            <Button
              onClick={testUpload}
              disabled={!file || loading}
              className="flex items-center gap-2"
              color="blue"
            >
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Probando upload...
                </>
              ) : (
                '🚀 Probar Upload'
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

            {result && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <Typography color="green" className="font-semibold">
                  ✅ Éxito:
                </Typography>
                <pre className="text-sm text-green-800 mt-2 bg-white p-2 rounded border">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <Typography variant="small" color="gray" className="font-semibold mb-2">
                💡 Información de debugging:
              </Typography>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'No configurado'}</p>
                <p><strong>User Agent:</strong> {navigator.userAgent}</p>
                <p><strong>Cookies disponibles:</strong> {document.cookie ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TestUpload;
