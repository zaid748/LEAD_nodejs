@echo off
echo 🧹 Iniciando limpieza de fotos desde Docker...

REM Verificar si Docker está ejecutándose
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker no está ejecutándose. Inicia Docker primero.
    pause
    exit /b 1
)

echo 🐳 Ejecutando limpieza desde contenedor Docker...
echo 📁 Ejecutando limpieza de fotos duplicadas...

REM Ejecutar el script de limpieza dentro del contenedor
docker exec -it lead-backend-1 node src/utils/cleanup-photos-simple.js

if %errorlevel% equ 0 (
    echo ✅ Limpieza completada exitosamente
) else (
    echo ❌ Error durante la limpieza
)

pause
