// Servicio de autenticación para obtener tokens
export const getToken = () => {
    console.log('🔍 getToken() - Buscando token...');
    
    // Priorizar cookies (que es lo que usa la aplicación)
    const authCookie = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('Authorization='));
    
    if (authCookie) {
        const token = authCookie.split('=')[1];
        console.log('🍪 Token encontrado en cookies:', !!token);
        return token && token.startsWith('Bearer') ? token : `Bearer ${token}`;
    }

    // Fallback a localStorage
    const lsToken = localStorage.getItem('token');
    if (lsToken) {
        console.log('💾 Token encontrado en localStorage:', !!lsToken);
        return lsToken.startsWith('Bearer') ? lsToken : `Bearer ${lsToken}`;
    }

    console.log('❌ No se encontró token en cookies ni localStorage');
    console.log('🍪 Cookies disponibles:', document.cookie);
    return null;
};

// Obtener token específico para WebSocket
export const getWebSocketToken = async () => {
    try {
        console.log('🔌 Obteniendo token WebSocket desde API...');
        
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const url = `${apiUrl}/api/captaciones/websocket-token`;
        console.log('🔌 URL del token WebSocket:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            // Agregar timeout
            signal: AbortSignal.timeout(10000) // 10 segundos timeout
        });

        console.log('🔌 Respuesta del servidor:', response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error en respuesta del servidor:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('🔌 Datos recibidos:', data);
        
        if (data.success && data.data?.token) {
            console.log('✅ Token WebSocket obtenido exitosamente');
            return data.data.token;
        } else {
            console.error('❌ Token WebSocket no encontrado en respuesta:', data);
            throw new Error('Token WebSocket no encontrado en respuesta');
        }
    } catch (error) {
        console.error('❌ Error al obtener token WebSocket:', error);
        if (error.name === 'TimeoutError') {
            console.error('⏱️ Timeout al obtener token WebSocket - servidor no responde');
        }
        return null;
    }
};

export const isAuthenticated = () => {
    return getToken() !== null;
};
