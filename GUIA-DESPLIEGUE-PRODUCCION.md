# 🚀 Guía de Despliegue a Producción - LEAD Inmobiliaria

## 📋 **REQUISITOS PREVIOS**

### 1. **Dominio y SSL**
- ✅ Dominio configurado: `lead-inmobiliaria.com`
- ✅ Certificados SSL (Let's Encrypt recomendado)
- ✅ DNS apuntando al servidor

### 2. **Servidor**
- ✅ Ubuntu 20.04+ o similar
- ✅ Docker y Docker Compose instalados
- ✅ Nginx instalado
- ✅ Puertos 80 y 443 abiertos

## 🔧 **PASOS DE DESPLIEGUE**

### **Paso 1: Configurar Variables de Entorno**

```bash
# Copiar archivo de ejemplo
cp env-production-example.txt .env.prod

# Editar con tus valores reales
nano .env.prod
```

**Variables importantes a cambiar:**
- `SECRET`: JWT secret único y seguro
- `ALLOWED_ORIGINS`: Tu dominio real
- `VAPID_PUBLIC_KEY` y `VAPID_PRIVATE_KEY`: Generar nuevas
- Credenciales de base de datos

### **Paso 2: Generar VAPID Keys**

```bash
# Instalar web-push globalmente
npm install -g web-push

# Generar nuevas keys
web-push generate-vapid-keys
```

**Actualizar en:**
- `.env.prod`
- `docker-compose.prod.yml`
- `Frontend/.env.production`

### **Paso 3: Configurar SSL con Let's Encrypt**

```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificados
sudo certbot --nginx -d lead-inmobiliaria.com -d www.lead-inmobiliaria.com
```

### **Paso 4: Configurar Nginx**

```bash
# Copiar configuración
sudo cp nginx/nginx-prod.conf /etc/nginx/sites-available/lead-inmobiliaria

# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/lead-inmobiliaria /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### **Paso 5: Construir y Desplegar**

```bash
# Construir frontend para producción
cd Frontend
npm run build

# Volver al directorio raíz
cd ..

# Desplegar con Docker Compose
docker-compose -f docker-compose.prod.yml up -d --build
```

### **Paso 6: Verificar Despliegue**

```bash
# Verificar contenedores
docker-compose -f docker-compose.prod.yml ps

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f backend

# Verificar SSL
curl -I https://lead-inmobiliaria.com/api/health
```

## 📱 **CONFIGURAR NOTIFICACIONES MÓVILES**

### **1. Registrar Service Worker**
- El Service Worker se registra automáticamente en HTTPS
- VAPID keys permiten push notifications

### **2. Probar Notificaciones**
1. **Abrir** `https://lead-inmobiliaria.com` en móvil
2. **Aceptar** permisos de notificación
3. **Probar** con el botón "📱 Probar Móvil"

### **3. Verificar Funcionamiento**
- ✅ **WebSocket**: Funciona en tiempo real
- ✅ **Push Notifications**: Funcionan como WhatsApp/Facebook
- ✅ **Notificaciones del Sistema**: Funcionan nativamente

## 🔍 **MONITOREO Y MANTENIMIENTO**

### **Logs**
```bash
# Backend
docker-compose -f docker-compose.prod.yml logs -f backend

# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### **Backup**
```bash
# Backup de base de datos
docker-compose -f docker-compose.prod.yml exec mongodb mongodump --out /backup

# Backup de archivos
tar -czf backup-$(date +%Y%m%d).tar.gz ./uploads ./logs
```

### **Actualizaciones**
```bash
# Actualizar código
git pull origin main

# Reconstruir y reiniciar
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🚨 **TROUBLESHOOTING**

### **Problema: CORS en producción**
- Verificar `ALLOWED_ORIGINS` en `.env.prod`
- Verificar configuración de Nginx

### **Problema: Notificaciones no funcionan**
- Verificar VAPID keys
- Verificar HTTPS
- Verificar permisos en móvil

### **Problema: SSL no funciona**
- Verificar certificados Let's Encrypt
- Verificar configuración de Nginx
- Verificar DNS

## 📞 **SOPORTE**

Si tienes problemas:
1. Revisar logs del backend
2. Verificar configuración de Nginx
3. Verificar variables de entorno
4. Verificar DNS y SSL

**¡Tu aplicación estará lista para producción con notificaciones móviles como WhatsApp/Facebook!** 🎉
