# 🔔 Configurar FCM Push Notifications - Guía Paso a Paso

## 🎯 **Objetivo**
Configurar notificaciones push que aparezcan en tu computadora incluso cuando no estás viendo la página del navegador.

## 📋 **Pasos para Configurar FCM**

### **Paso 1: Crear Proyecto Firebase**

1. **Ve a [Firebase Console](https://console.firebase.google.com/)**
2. **Haz clic en "Add project"**
3. **Nombra tu proyecto**: `lead-inmobiliaria-push` (o el nombre que prefieras)
4. **Desactiva Google Analytics** (opcional)
5. **Haz clic en "Create project"**

### **Paso 2: Configurar Cloud Messaging**

1. **En el dashboard de Firebase, ve a "Cloud Messaging"** (ícono de mensaje)
2. **Haz clic en "Get started"**
3. **Ve a Project Settings** (ícono de engranaje en la izquierda)
4. **Ve a la pestaña "Cloud Messaging"**
5. **Copia el "Server Key"** (no el Sender ID)

### **Paso 3: Configurar en el Backend**

1. **Abre el archivo `docker-compose.dev.yml`**
2. **Busca la línea:**
   ```yaml
   - FCM_SERVER_KEY=YOUR_FCM_SERVER_KEY_HERE
   ```
3. **Reemplaza `YOUR_FCM_SERVER_KEY_HERE` con tu Server Key real:**
   ```yaml
   - FCM_SERVER_KEY=AAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### **Paso 4: Reiniciar el Backend**

```bash
docker-compose -f docker-compose.dev.yml restart backend
```

### **Paso 5: Probar las Notificaciones**

1. **Ve al dashboard** (`http://localhost:5173/dashboard`)
2. **Haz clic en "🔐 Configurar"** para configurar push notifications
3. **Haz clic en "🔔 Probar Sistema"** para enviar una notificación de prueba
4. **Minimiza el navegador** y espera la notificación

## 🔍 **Verificar que Funciona**

### **Logs del Backend:**
Deberías ver:
```
🔔 Endpoint FCM detectado. Intentando enviar notificación FCM...
✅ Notificación FCM enviada exitosamente
```

### **En tu Computadora:**
- **Windows**: Notificación en la esquina inferior derecha
- **macOS**: Notificación en la esquina superior derecha
- **Linux**: Depende del gestor de ventanas

## 🚨 **Troubleshooting**

### **Si no aparecen notificaciones:**

1. **Verificar permisos del navegador:**
   - Chrome: `chrome://settings/content/notifications`
   - Firefox: `about:preferences#privacy`
   - Asegúrate de que `localhost:5173` esté permitido

2. **Verificar logs del backend:**
   ```bash
   docker logs lead-backend-dev --tail 20
   ```

3. **Verificar que FCM_SERVER_KEY esté configurada:**
   ```bash
   docker exec lead-backend-dev env | grep FCM
   ```

### **Error común: "Invalid registration token"**
- El token FCM puede haber expirado
- Haz clic en "🔐 Configurar" nuevamente para renovar la suscripción

## 🎉 **Resultado Final**

Una vez configurado correctamente:
- ✅ **WebSocket**: Notificaciones cuando la página está abierta
- ✅ **Sistema**: Notificaciones nativas del navegador
- ✅ **FCM**: Notificaciones cuando la página está cerrada/minimizada

**¡Tendrás notificaciones como WhatsApp o Facebook!** 🚀

## 📱 **Para Móviles**

En dispositivos móviles, las notificaciones FCM funcionarán automáticamente una vez configurado el Server Key, proporcionando la misma experiencia que las apps nativas.

---

**¿Necesitas ayuda?** Comparte los logs del backend si tienes problemas y te ayudo a solucionarlo.
