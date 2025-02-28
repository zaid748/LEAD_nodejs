import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { routes } from "@/routes";

export function Sidenav({ brandImg, brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  // Verificar rol de administrador
  useEffect(() => {
    // Solo verificar en rutas protegidas
    if (!location.pathname.includes("/auth/")) {
      const checkAdminStatus = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/check-auth', {
            credentials: 'include'
          });
          
          const data = await response.json();
          console.log("Respuesta de verificación en sidenav:", data);
          
          if (data.success) {
            const user = data.user;
            const userRole = user?.role || '';
            
            const admin = userRole.toLowerCase().includes('administrator') || 
                         userRole === 'Superadministrator';
            
            setIsAdmin(admin);
          }
        } catch (error) {
          console.error("Error al verificar estado de admin:", error);
        }
      };
      
      checkAdminStatus();
    }
  }, [location.pathname]);

  // Obtener las rutas para mostrar
  const dashboardLayout = routes.find(route => route.layout === "dashboard");
  const authLayout = routes.find(route => route.layout === "auth");
  
  // Determinar qué sección mostrar
  const isAuthPage = location.pathname.includes("/auth/");
  const activeLayout = isAuthPage ? authLayout : dashboardLayout;
  
  // Si no estamos en auth y no es admin, filtrar las rutas
  let activePages = activeLayout?.pages || [];
  if (!isAuthPage) {
    // IMPORTANTE: Eliminar explícitamente las opciones de crear y editar empleado
    activePages = activePages.filter(page => 
      !page.hideInSidebar && 
      page.name !== "crear empleado" && 
      page.name !== "editar empleado" &&
      page.name !== "Editar Empleado" &&
      page.name !== "Crear Empleado"
    );
    
    // Filtrar rutas solo para administradores si el usuario no es admin
    if (!isAdmin) {
      activePages = activePages.filter(
        page => page.name && 
          !page.name.includes("Usuarios") && 
          !page.name.includes("Empleados") &&
          !page.adminOnly
      );
    }
  }

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {activeLayout?.title && (
          <div className="mx-3.5 mt-4 mb-2">
            <Typography
              variant="small"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
              className="font-black uppercase opacity-75"
            >
              {activeLayout.title}
            </Typography>
          </div>
        )}
        <ul className="mb-4 flex flex-col gap-1">
          {activePages.map((page, key) => {
            if (!page.name) return null; // Omitir elementos sin nombre
            
            return (
              <li key={key}>
                <NavLink to={`/${activeLayout.layout}${page.path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {page.icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {page.name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
