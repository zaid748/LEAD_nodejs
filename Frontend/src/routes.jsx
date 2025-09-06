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
  PhotoIcon,
  WrenchScrewdriverIcon,
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
import { ProyectosMarketing, EditarMarketing, DetalleMarketing } from '@/pages/dashboard/Publicidad';
import { RemodelacionPage, DetalleRemodelacion, EditarRemodelacion } from '@/pages/dashboard/remodelacion';
import ListasCompraAdminPage from '@/pages/dashboard/administracion/ListasCompraAdminPage';

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
        roleAccess: ["administrator", "administrador", "ayudante de administrador"], // Solo administradores - otros van a profile
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
        roleAccess: ["administrator", "administrador", "ayudante de administrador"], // Solo administradores
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
        roleAccess: ["administrator", "administrador", "ayudante de administrador"], // Solo administradores
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
        roleAccess: ["user", "administrator", "administrador", "ayudante de administrador"], // Supervisor y contratista no tienen acceso
      },
      {
        icon: <PlusIcon {...icon} />,
        name: "Nueva Captación",
        path: "/captaciones/nueva",
        element: <CrearCaptacion />,
        roleAccess: ["user", "administrator", "administrador", "ayudante de administrador"], // Supervisor y contratista no tienen acceso
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
      // Rutas para Marketing Inmobiliario
      {
        icon: <PhotoIcon {...icon} />,
        name: "Marketing",
        path: "/marketing",
        element: <ProyectosMarketing />,
        roleAccess: ["user", "administrator", "administrador", "ayudante de administrador"], // Supervisor y contratista no tienen acceso
      },
      {
        path: "/marketing/:id/editar",
        element: <EditarMarketing />,
        showInSidebar: false,
      },
      {
        path: "/marketing/:id/detalle",
        element: <DetalleMarketing />,
        showInSidebar: false,
      },
      // Rutas para Remodelación
      {
        icon: <WrenchScrewdriverIcon {...icon} />,
        name: "Remodelación",
        path: "/remodelacion",
        element: <RemodelacionPage />,
        roleAccess: ["administrator", "administrador", "supervisor", "contratista", "ayudante de administrador"], // Contratistas tienen acceso pero con vistas limitadas
      },
      {
        path: "/remodelacion/:id",
        element: <DetalleRemodelacion />,
        showInSidebar: false,
        // Contratistas pueden acceder a proyectos individuales, pero el backend validará si están asignados
      },
      {
        path: "/remodelacion/:id/editar",
        element: <EditarRemodelacion />,
        showInSidebar: false,
      },
      // Rutas para Administración de Listas de Compra
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Listas de Compra",
        path: "/administracion/listas-compra",
        element: <ListasCompraAdminPage />,
        roleAccess: ["administrator", "administrador", "ayudante de administrador"], // Solo administradores
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
