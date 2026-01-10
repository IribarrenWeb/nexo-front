import { LayoutDashboardIcon, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/helpers";

const menus = [
  { name: "Feed", href: "/", icon: LayoutDashboardIcon },
  { name: "Perfil", href: "/profile", icon: User },
  { name: "Usuarios", href: "/users", icon: Users, role: "admin" },
];

const Sidebar = () => {
    const { user } = useAuth();

    const linkBaseClass = "group flex gap-x-3 items-center text-gray-300 hover:text-white hover:bg-gray-800 transition rounded-md p-2 text-sm font-semibold leading-6";
    
    return (
        <aside className="flex w-72 flex-col bg-blend-hard-light border-r border-gray-800 py-4 nx-aside">
            <div className="flex h-16 items-center px-6 mb-5">
                <img src="/images/nexo-logo.png" alt="nexo" className="h-8 w-auto mr-2" />
                <h1 className="text-3xl font-bold text-white">Nexo.io</h1>
            </div>
            <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
                <ul className="space-y-1">
                    {
                        menus.filter(m => !m.role || user.rol == m.role).map((menu) => (
                            <li key={menu.name}>
                                <Link
                                    to={menu.href}
                                    className={cn(linkBaseClass, {
                                        'bg-gray-800 text-white': window.location.pathname === menu.href
                                    })}
                                >
                                    <menu.icon className="h-5 w-5" />
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