#!/bin/bash

echo "🧹 Limpiando contenedores y volúmenes Docker..."

# Detener y eliminar contenedores
docker-compose -f docker-compose.dev.yml down

# Eliminar volúmenes (opcional - descomenta si quieres resetear la base de datos)
# docker volume rm lead_nodejs_mongodb_data_dev

# Eliminar imágenes (opcional)
# docker rmi lead_nodejs-backend-dev lead_nodejs-frontend-dev

# Limpiar contenedores huérfanos
docker container prune -f

# Limpiar redes no utilizadas
docker network prune -f

echo "✅ Limpieza completada"

echo "🚀 Reconstruyendo y iniciando servicios..."

# Reconstruir e iniciar
docker-compose -f docker-compose.dev.yml up --build -d

echo "⏳ Esperando que los servicios estén listos..."
sleep 30

# Verificar estado de los servicios
echo "📊 Estado de los servicios:"
docker-compose -f docker-compose.dev.yml ps

echo "🔍 Verificando logs del backend:"
docker-compose -f docker-compose.dev.yml logs backend --tail=20

echo "🔍 Verificando logs de MongoDB:"
docker-compose -f docker-compose.dev.yml logs mongodb --tail=20

echo "🎉 Proceso completado!"
