import { LayoutDashboard, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menus = [
  { name: "Inicio", href: "/", icon: LayoutDashboard },
  { name: "Perfil", href: "/profile", icon: User },
  { name: "Usuarios", href: "/users", icon: Users, role: "admin" },
];

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <aside className="flex w-72 flex-col bg-[#0F0140] border-r border-gray-800">
            <div className="flex h-16 items-center px-6">
                <h1 className="text-2xl font-bold text-white">Nexo.io</h1>
            </div>
            <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
                <ul className="-mx-2 space-y-1">
                    {
                        menus.filter(m => !m.role || user.rol == m.role).map((menu) => (
                            <li key={menu.name}>
                                <Link
                                    to={menu.href}
                                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                >
                                    <menu.icon className="h-5 w-5 text-gray-400" />
                                    {menu.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;