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
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, UsersTable, ProfileUsers, EmpleadosTable, ProfileEmpleados, EditarNomina, DocumentosEmpleado } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { CrearEmpleado } from "@/pages/dashboard/CrearEmpleado";
import { EditarEmpleado } from "@/pages/dashboard/EditarEmpleado";
import { CrearNomina } from "@/pages/dashboard/CrearNomina";
import { MiNominaPage } from "@/pages/dashboard/MiNominaPage";

const icon = {
  className: "w-5 h-5 text-inherit",
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
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Usuarios",
        path: "/users",
        element: <UsersTable />,
      },
      {
        icon: <PlusCircleIcon {...icon} />,
        name: "+ Usuario",
        path: "/users/crear",
        element: <SignUp dashboard={true} />,
        adminOnly: true,
      },
      {
        path: "/profile/:userId",
        element: <ProfileUsers />,
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
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
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
        path: "/dashboard/empleados/crear",
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
      },
    ],
  },
];

export default routes;
