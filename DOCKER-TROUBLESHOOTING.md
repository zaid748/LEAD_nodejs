# 🐳 SOLUCIÓN DE PROBLEMAS DE DOCKER - LEAD INMOBILIARIA

## 🚨 PROBLEMAS IDENTIFICADOS Y SOLUCIONADOS

### 1. **Script de inicialización de MongoDB**
- ❌ **Problema**: El script `init-mongo.sh` tenía comandos conflictivos
- ✅ **Solución**: Simplificado para solo crear usuarios y colecciones
- 🔧 **Cambio**: Eliminados comandos de inicio/parada de MongoDB

### 2. **Configuración de seguridad demasiado restrictiva**
- ❌ **Problema**: `read_only: true` impedía logs y archivos temporales
- ✅ **Solución**: Removido y agregados volúmenes tmpfs específicos
- 🔧 **Cambio**: Agregado `/usr/src/app/logs` como volumen temporal

### 3. **Health checks mejorados**
- ❌ **Problema**: Health check de MongoDB sin autenticación
- ✅ **Solución**: Agregada autenticación al health check
- 🔧 **Cambio**: Credenciales incluidas en el comando de verificación

### 4. **Dependencias entre servicios**
- ❌ **Problema**: Backend iniciaba antes de que MongoDB estuviera listo
- ✅ **Solución**: Agregada condición `service_healthy` en depends_on
- 🔧 **Cambio**: Backend espera a que MongoDB pase el health check

## 🛠️ ARCHIVOS CREADOS PARA SOLUCIÓN

### Scripts de Windows (`.bat`)
- `docker-cleanup.bat` - Limpia y reinicia todos los servicios
- `docker-diagnose.bat` - Diagnostica problemas en Docker

### Scripts de Linux/Mac (`.sh`)
- `docker-cleanup.sh` - Limpia y reinicia todos los servicios
- `docker-diagnose.sh` - Diagnostica problemas en Docker

### Archivos de configuración
- `.dockerignore` - Excluye archivos innecesarios del build
- `Frontend/.dockerignore` - Excluye archivos del frontend

## 🚀 INSTRUCCIONES DE USO

### Para Windows:
```bash
# Limpiar y reiniciar
docker-cleanup.bat

# Diagnosticar problemas
docker-diagnose.bat
```

### Para Linux/Mac:
```bash
# Hacer ejecutables
chmod +x docker-cleanup.sh docker-diagnose.sh

# Limpiar y reiniciar
./docker-cleanup.sh

# Diagnosticar problemas
./docker-diagnose.sh
```

### Comandos manuales:
```bash
# Ver estado de servicios
docker-compose -f docker-compose.dev.yml ps

# Ver logs en tiempo real
docker-compose -f docker-compose.dev.yml logs -f

# Ver logs de un servicio específico
docker-compose -f docker-compose.dev.yml logs backend
docker-compose -f docker-compose.dev.yml logs mongodb
docker-compose -f docker-compose.dev.yml logs frontend

# Acceder al contenedor del backend
docker exec -it lead-backend-dev sh

# Acceder al contenedor de MongoDB
docker exec -it lead-mongodb-dev mongosh --username admin_lead --password LeadPass2024 --authenticationDatabase admin
```

## 🔍 DIAGNÓSTICO DE PROBLEMAS COMUNES

### 1. **Contenedor no inicia**
```bash
# Ver logs del contenedor
docker-compose -f docker-compose.dev.yml logs [nombre-servicio]

# Verificar recursos del sistema
docker stats --no-stream
```

### 2. **Problemas de conectividad entre servicios**
```bash
# Verificar redes
docker network ls
docker network inspect lead_nodejs_lead-network-dev

# Verificar conectividad desde contenedor
docker exec -it lead-backend-dev ping mongodb
```

### 3. **Problemas de MongoDB**
```bash
# Verificar logs de MongoDB
docker-compose -f docker-compose.dev.yml logs mongodb

# Verificar estado de la base de datos
docker exec -it lead-mongodb-dev mongosh --username admin_lead --password LeadPass2024 --authenticationDatabase admin --eval "db.adminCommand('ping')"
```

### 4. **Problemas de permisos**
```bash
# Verificar permisos del usuario node
docker exec -it lead-backend-dev ls -la /usr/src/app

# Verificar logs del sistema
docker-compose -f docker-compose.dev.yml logs backend | grep -i permission
```

## 🧹 LIMPIEZA COMPLETA (ÚLTIMO RECURSO)

Si nada funciona, ejecuta una limpieza completa:

```bash
# Detener todos los contenedores
docker-compose -f docker-compose.dev.yml down

# Eliminar volúmenes (¡CUIDADO! Esto borrará la base de datos)
docker volume rm lead_nodejs_mongodb_data_dev

# Eliminar imágenes
docker rmi lead_nodejs-backend-dev lead_nodejs-frontend-dev

# Limpiar todo
docker system prune -a --volumes

# Reconstruir desde cero
docker-compose -f docker-compose.dev.yml up --build -d
```

## 📋 CHECKLIST DE VERIFICACIÓN

- [ ] Docker Desktop está ejecutándose
- [ ] Puertos 4000, 5173, 27018 están disponibles
- [ ] Archivos `.env` están configurados correctamente
- [ ] MongoDB puede iniciar y autenticarse
- [ ] Backend puede conectarse a MongoDB
- [ ] Frontend puede conectarse al backend
- [ ] Health checks pasan correctamente

## 🆘 CONTACTO Y SOPORTE

Si los problemas persisten después de seguir esta guía:

1. Ejecuta `docker-diagnose.bat` (Windows) o `./docker-diagnose.sh` (Linux/Mac)
2. Guarda la salida del diagnóstico
3. Revisa los logs específicos del servicio problemático
4. Verifica que no haya conflictos de puertos en tu sistema

## 🔒 NOTAS DE SEGURIDAD

- Las credenciales en `docker-compose.dev.yml` son solo para desarrollo
- En producción, usa variables de entorno y secretos de Docker
- Nunca commits credenciales reales al repositorio
- Usa `.env` para configuraciones sensibles
