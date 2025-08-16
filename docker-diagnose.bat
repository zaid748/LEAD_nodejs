@echo off
echo 🔍 DIAGNÓSTICO DE DOCKER - LEAD INMOBILIARIA
echo ==============================================

echo.
echo 1. 📊 ESTADO DE LOS CONTENEDORES:
docker-compose -f docker-compose.dev.yml ps

echo.
echo 2. 🐳 IMÁGENES DOCKER:
docker images | findstr lead

echo.
echo 3. 🌐 REDES DOCKER:
docker network ls | findstr lead

echo.
echo 4. 💾 VOLÚMENES DOCKER:
docker volume ls | findstr lead

echo.
echo 5. 📝 LOGS DEL BACKEND:
docker-compose -f docker-compose.dev.yml logs backend --tail=10

echo.
echo 6. 📝 LOGS DE MONGODB:
docker-compose -f docker-compose.dev.yml logs mongodb --tail=10

echo.
echo 7. 📝 LOGS DEL FRONTEND:
docker-compose -f docker-compose.dev.yml logs frontend --tail=10

echo.
echo 8. 💻 RECURSOS DEL SISTEMA:
docker stats --no-stream

echo.
echo 9. 🚨 ERRORES CRÍTICOS:
docker-compose -f docker-compose.dev.yml logs --tail=50 | findstr /i error

echo.
echo ✅ Diagnóstico completado
echo.
echo 💡 RECOMENDACIONES:
echo - Si hay errores, ejecuta: docker-cleanup.bat
echo - Para ver logs en tiempo real: docker-compose -f docker-compose.dev.yml logs -f
echo - Para acceder al contenedor: docker exec -it lead-backend-dev sh
echo.
pause
