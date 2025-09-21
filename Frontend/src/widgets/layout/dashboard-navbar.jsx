import { useLocation, Link, useNavigate } from "react-router-dom";
import mobileNotificationService from '../../services/mobileNotifications';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Badge,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import GlobalNotifications from "../../components/GlobalNotifications";
import { useState, useEffect, useCallback } from "react";
import webSocketService from "../../services/websocket";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Callbacks estables para evitar re-renderizados
  const handleNotificationRead = useCallback(() => {
    setUnreadNotifications(prev => Math.max(0, prev - 1));
  }, []);

  const handleNotificationCountChange = useCallback((count) => {
    setUnreadNotifications(count);
  }, []);

  // Inicializar notificaciones móviles
  useEffect(() => {
    const initializeMobileNotifications = async () => {
      try {
        const status = mobileNotificationService.getStatus();
        console.log('📱 Estado de notificaciones móviles:', status);
        
        if (status.isMobile) {
          console.log('📱 Dispositivo móvil detectado, inicializando notificaciones...');
          const result = await mobileNotificationService.initialize();
          console.log('📱 Resultado de inicialización móvil:', result);
          
          if (result.success && result.type === 'mobile_push') {
            console.log('✅ ¡Notificaciones móviles activadas! Como WhatsApp/Facebook');
          }
        }
      } catch (error) {
        console.error('❌ Error inicializando notificaciones móviles:', error);
      }
    };

    initializeMobileNotifications();
  }, []);


  // Cargar contador inicial de notificaciones y escuchar en tiempo real
  useEffect(() => {
    
    // Cargar notificaciones iniciales para obtener el contador
    const loadInitialNotifications = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const response = await fetch(`${apiUrl}/api/captaciones/notificaciones-usuario`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const unreadCount = data.data?.filter(n => !n.leida).length || 0;
          setUnreadNotifications(unreadCount);
          console.log('🔢 Contador inicial de notificaciones:', unreadCount);
        }
      } catch (error) {
        console.error('Error cargando notificaciones iniciales:', error);
      }
    };

    // Configurar handler de notificaciones INMEDIATAMENTE para actualizar contador
    const handleNotification = (notification) => {
      setUnreadNotifications(prev => prev + 1);
    };

    // Registrar handler INMEDIATAMENTE
    webSocketService.onMessage('notification', handleNotification);

    // Conectar al WebSocket si no está conectado
    if (!webSocketService.isConnected()) {
      webSocketService.connect();
    }

    // Suscribirse a notificaciones
    setTimeout(() => {
      if (webSocketService.isConnected()) {
        webSocketService.subscribeToNotifications();
      }
    }, 1000);

    // Cargar contador inicial
    loadInitialNotifications();

    return () => {
      webSocketService.offMessage('notification');
    };
  }, []); // Dependencias vacías para que solo se ejecute una vez

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout', { withCredentials: true });
      await logout(); // Actualiza el estado de autenticación en el contexto
      navigate('/auth/sign-in');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Button
            variant="text"
            color="blue-gray"
            className="hidden items-center gap-1 px-4 xl:flex normal-case"
            onClick={handleLogout}
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            Logout
          </Button>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={handleLogout}
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <Badge
                  content={unreadNotifications}
                  className="min-w-[20px] min-h-[20px] bg-red-500 animate-pulse"
                  hidden={unreadNotifications === 0}
                >
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </Badge>
              </IconButton>
            </MenuHandler>
            <MenuList className="w-96 max-h-98 overflow-visible -translate-x-full">
              <div className="p-2 border-b">
                <div className="flex gap-2">
                  <button 
                    onClick={async () => {
                      try {
                        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                        const response = await fetch(`${apiUrl}/api/captaciones/test-websocket`, {
                          method: 'POST',
                          credentials: 'include',
                          headers: { 'Content-Type': 'application/json' }
                        });
                        
                        if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        
                        const data = await response.json();
                        console.log('🧪 Respuesta de prueba:', data);
                      } catch (error) {
                        console.error('❌ Error en prueba:', error);
                      }
                    }}
                    className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    🧪 Probar WebSocket
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        console.log('🔍 Estado WebSocket Local:', webSocketService.isConnected());
                        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                        const response = await fetch(`${apiUrl}/api/captaciones/websocket-status`, {
                          method: 'GET',
                          credentials: 'include',
                          headers: { 'Content-Type': 'application/json' }
                        });
                        
                        if (response.ok) {
                          const data = await response.json();
                          console.log('🔍 Estado WebSocket del Servidor:', data);
                        } else {
                          console.error('❌ Error al obtener estado WebSocket');
                        }
                      } catch (error) {
                        console.error('❌ Error al verificar estado WebSocket:', error);
                      }
                    }}
                    className="flex-1 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    🔍 Estado WS
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={async () => {
                      try {
                        const status = mobileNotificationService.getStatus();
                        console.log('📱 Estado móvil:', status);
                        
                        if (status.isMobile) {
                          // Probar notificaciones móviles
                          mobileNotificationService.showMobileNotification(
                            '📱 Prueba Móvil',
                            '¡Notificación de prueba para móvil! Como WhatsApp/Facebook',
                            { url: '/dashboard/remodelacion' }
                          );
                          alert(`📱 Notificación móvil enviada!\n\nEstrategia: ${status.strategy}\nMétodos: ${status.methods.join(', ')}\n\n${status.canPush ? '✅ Push activado - como WhatsApp/Facebook' : '⚠️ Solo cuando app esté abierta'}`);
                        } else {
                          // Probar notificaciones de escritorio
                          const { default: hybridService } = await import('../../services/hybridNotifications');
                          
                          const testNotification = {
                            titulo: 'Notificación de Prueba',
                            mensaje: 'Esta es una notificación de prueba del sistema híbrido LEAD.',
                            tipo: 'General',
                            prioridad: 'Media'
                          };

                          const results = await hybridService.sendNotification(testNotification);
                          console.log('🧪 Resultados de prueba híbrida:', results);
                          
                          const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
                          
                          if (successful.length > 0) {
                            const methods = successful.map(s => s.value.method);
                            alert(`✅ Notificación enviada por ${successful.length} método(s): ${methods.join(', ')}\n\n🎯 WebSocket siempre funciona para notificaciones en tiempo real.`);
                          } else {
                            alert('❌ No se pudo enviar la notificación por ningún método.');
                          }
                        }
                      } catch (error) {
                        console.error('❌ Error enviando notificación:', error);
                        alert('❌ Error: ' + error.message);
                      }
                    }}
                    className="flex-1 bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                  >
                    📱 Probar Móvil
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        const { default: hybridService } = await import('../../services/hybridNotifications');
                        
                        const results = await hybridService.requestAllPermissions();
                        console.log('🔐 Resultados de permisos híbridos:', results);
                        
                        const granted = Object.entries(results)
                          .filter(([_, granted]) => granted)
                          .map(([key, _]) => key);
                        
                        if (granted.length > 0) {
                          alert(`✅ Permisos configurados: ${granted.join(', ')}\n\n🎯 WebSocket siempre funciona para notificaciones en tiempo real.`);
                        } else {
                          alert('⚠️ No se pudieron configurar permisos adicionales.\n\n🎯 WebSocket siempre funciona para notificaciones en tiempo real.');
                        }
                      } catch (error) {
                        console.error('❌ Error solicitando permisos híbridos:', error);
                        alert('❌ Error: ' + error.message);
                      }
                    }}
                    className="flex-1 bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                  >
                    🔐 Configurar
                  </button>
                </div>
              </div>
              {console.log('🔔 Navbar: Renderizando GlobalNotifications')}
              <GlobalNotifications 
                onNotificationRead={handleNotificationRead}
                onNotificationCountChange={handleNotificationCountChange}
              />
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
