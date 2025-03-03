import { DocumentTextIcon } from "@heroicons/react/24/solid";

// Asegúrate de que esta opción solo se muestre para usuarios con empleado_id
{user && user.empleado_id && (
  <li>
    <NavLink
      to="/dashboard/nominas/mi-nomina"
      className={({ isActive }) => 
        `flex items-center gap-2 rounded-lg px-4 py-2 ${
          isActive
            ? "bg-blue-500 text-white font-medium"
            : "text-gray-700 hover:bg-blue-gray-50"
        }`
      }
    >
      <DocumentTextIcon className="h-5 w-5" />
      <span>Mi Nómina</span>
    </NavLink>
  </li>
)} 