#!/bin/bash

echo "🧹 Iniciando limpieza de fotos desde Docker..."

# Verificar si estamos en Docker
if [ -f /.dockerenv ]; then
    echo "🐳 Ejecutando desde contenedor Docker"
else
    echo "💻 Ejecutando desde host local"
fi

# Ejecutar el script simple de limpieza
echo "📁 Ejecutando limpieza de fotos duplicadas..."
node src/utils/cleanup-photos-simple.js

echo "✅ Limpieza completada desde Docker"
