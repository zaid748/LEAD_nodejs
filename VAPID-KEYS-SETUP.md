# Configuración de VAPID Keys para Push Notifications

## 🔑 **VAPID Keys Configuradas**

Las siguientes VAPID keys están configuradas en el sistema:

### **Backend (docker-compose.dev.yml)**
```yaml
environment:
  - VAPID_PUBLIC_KEY=BH8QuI-t1TieUaywkDJs7MhTLYVj6ouwOfM8NZjXv_S1QgX78HmLJQL2MEp9Zm6mCsPrzYnagrG299uCFN8d5dI
  - VAPID_PRIVATE_KEY=LTyPAFQGI7wPaci3Fttt-zod9H8voNMfLaJwFKN8JMg
  - VAPID_SUBJECT=mailto:admin@lead-inmobiliaria.com
```

### **Frontend (docker-compose.dev.yml)**
```yaml
environment:
  - VITE_VAPID_PUBLIC_KEY=BH8QuI-t1TieUaywkDJs7MhTLYVj6ouwOfM8NZjXv_S1QgX78HmLJQL2MEp9Zm6mCsPrzYnagrG299uCFN8d5dI
```

## 🚀 **Cómo Generar Nuevas VAPID Keys**

Si necesitas generar nuevas VAPID keys:

```bash
# Instalar web-push globalmente
npm install -g web-push

# Generar nuevas keys
npx web-push generate-vapid-keys
```

## ✅ **Estado Actual**

- ✅ **Backend**: VAPID keys configuradas
- ✅ **Frontend**: VAPID public key configurada
- ✅ **Docker Compose**: Variables de entorno configuradas
- ✅ **Sistema Híbrido**: WebSocket + Sistema + Push (cuando disponible)

## 🔧 **Troubleshooting**

### Si las push notifications no funcionan:

1. **Verificar variables de entorno**:
   ```bash
   docker exec lead-backend-dev env | grep VAPID
   docker exec lead-frontend-dev env | grep VITE_VAPID
   ```

2. **Verificar Service Worker**:
   - Ir a `http://localhost:5173/sw.js`
   - Debe mostrar el código del Service Worker

3. **Verificar permisos del navegador**:
   - Chrome: Configuración > Privacidad y seguridad > Configuración del sitio
   - Buscar `localhost:5173` y verificar permisos de notificaciones

## 📱 **Compatibilidad**

| Navegador | WebSocket | Sistema | Push |
|-----------|-----------|---------|------|
| Chrome | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |
| Safari (macOS) | ✅ | ✅ | ⚠️ |
| Safari (iOS) | ✅ | ❌ | ❌ |
| Edge | ✅ | ✅ | ✅ |

**Nota**: WebSocket siempre funciona, garantizando notificaciones en tiempo real.
