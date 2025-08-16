@echo off
echo 🧹 Limpiando contenedores y volúmenes Docker...

REM Detener y eliminar contenedores
docker-compose -f docker-compose.dev.yml down

REM Limpiar contenedores huérfanos
docker container prune -f

REM Limpiar redes no utilizadas
docker network prune -f

echo ✅ Limpieza completada

echo 🚀 Reconstruyendo e iniciando servicios...

REM Reconstruir e iniciar
docker-compose -f docker-compose.dev.yml up --build -d

echo ⏳ Esperando que los servicios estén listos...
timeout /t 30 /nobreak > nul

REM Verificar estado de los servicios
echo 📊 Estado de los servicios:
docker-compose -f docker-compose.dev.yml ps

echo 🔍 Verificando logs del backend:
docker-compose -f docker-compose.dev.yml logs backend --tail=20

echo 🔍 Verificando logs de MongoDB:
docker-compose -f docker-compose.dev.yml logs mongodb --tail=20

echo 🎉 Proceso completado!
pause
