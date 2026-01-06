import { LayoutDashboard, User } from "lucide-react";
import { Link } from "react-router-dom";

const menus = [
  { name: "Inicio", href: "/", icon: LayoutDashboard },
  { name: "Perfil", href: "/profile", icon: User },
];

const Sidebar = () => {
    return (
        <aside className="flex w-72 flex-col bg-[#0F0140] border-r border-gray-800">
            <div className="flex h-16 items-center px-6">
                <h1 className="text-2xl font-bold text-white">ClipperAPP</h1>
            </div>
            <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
                <ul className="-mx-2 space-y-1">
                    {
                        menus.map((menu) => (
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