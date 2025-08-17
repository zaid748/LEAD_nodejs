import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  UserPlusIcon,
  BuildingOffice2Icon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, UsersTable, ProfileUsers, EmpleadosTable, ProfileEmpleados, EditarNomina, DocumentosEmpleado } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { CrearEmpleado } from "@/pages/dashboard/Empleados/CrearEmpleado";
import { EditarEmpleado } from "@/pages/dashboard/Empleados/EditarEmpleado";
import { CrearNomina } from "@/pages/dashboard/Empleados/CrearNomina";
import { MiNominaPage } from "@/pages/dashboard/MiNominaPage";
import { EditarUser } from "@/pages/dashboard/Users/EditarUser";
import { TestUpload } from "@/pages/dashboard/Users/TestUpload";
import { TestImageDisplay } from "@/pages/dashboard/Users/TestImageDisplay";
import { TestCORS } from "@/pages/dashboard/Users/TestCORS";

import { CrearCaptacion } from '@/pages/dashboard/captaciones/CrearCaptacion';
import { EditarCaptacion } from '@/pages/dashboard/captaciones/EditarCaptacion';
import { MisProyectos } from "@/pages/dashboard/captaciones/MisProyectos";
import { DetalleCaptacion } from '@/pages/dashboard/captaciones/DetalleCaptacion';

const icon = {
  className: "w-5 h-5 text-inherit",
};

// Nueva función para determinar la ruta principal según el rol
const getHomeRoute = (user) => {
  if (!user) return null;
  
  const isAdmin = user.role?.toLowerCase().includes('administrator') || 
                 user.role === 'Superadministrator';
  
  return isAdmin ? <Home /> : <Profile />;
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        shouldRedirectToProfile: true,
        
      },
      {
        path: "/",
        element: <Home />,
        shouldRedirectToProfile: true
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        firstForNonAdmin: true
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Usuarios",
        path: "/users",
        element: <UsersTable />,
      },
      {
        path: "/users/crear",
        element: <SignUp dashboard={true} />,
        showInSidebar: false,
      },
      {
        path: "/users/edit/:userId",
        element: <EditarUser dashboard={true} />,
        showInSidebar: false,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/test-upload",
        element: <TestUpload />,
        showInSidebar: false,
      },
      {
        path: "/test-images",
        element: <TestImageDisplay />,
        showInSidebar: false,
      },
      {
        path: "/test-cors",
        element: <TestCORS />,
        showInSidebar: false,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Empleados",
        path: "/empleados",
        element: <EmpleadosTable />,
      },
      {
        path: "/empleado-profile/:empleadoId",
        element: <ProfileEmpleados />,
      },
      /* {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      }, */
      {
        path: "/empleado-documents/:empleadoId",
        element: <DocumentosEmpleado />,
      },
      {
        path: "/nomina/update/:nominaId",
        element: <EditarNomina />,
      },
      {
        name: "crear empleado",
        path: "/empleados/crear",
        element: <CrearEmpleado />,
      },
      {
        name: "editar empleado",
        path: "/empleados/editar/:empleadoId",
        element: <EditarEmpleado />,
      },
      {
        path: "/nomina/crear/:empleadoId",
        element: <CrearNomina />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Mi Nómina",
        path: "/nominas/mi-nomina",
        element: <MiNominaPage />,
        alwaysShow: true,
      },
      {
        path: "/user-profile/:userId",
        element: <ProfileUsers />,
      },
      // Nuevas rutas para captaciones inmobiliarias
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: "Proyectos",
        path: "/captaciones",
        element: <MisProyectos />,
        alwaysShow: true, // Disponible para todos los roles
      },
      {
        icon: <PlusIcon {...icon} />,
        name: "Nueva Captación",
        path: "/captaciones/nueva",
        element: <CrearCaptacion />,
        roleAccess: ["user", "administrator", "admin"], // Solo accesible para estos roles
      },
      // Rutas adicionales para captaciones (sin mostrar en sidebar)
      {
        path: "/captaciones/:id",
        element: <MisProyectos />, // Reemplazar por un componente de Detalle cuando exista
        showInSidebar: false,
      },
      {
        path: "/captaciones/editar/:id",
        element: <EditarCaptacion />, // Reutilizar el componente de creación para edición
        showInSidebar: false,
      },
      {
        path: "/captaciones/:id/detalle",
        element: <DetalleCaptacion />, // Nueva vista de detalle
        showInSidebar: false,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        showInSidebar: false,
      },
    ],
  },
];

export default routes;
