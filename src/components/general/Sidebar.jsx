import { LayoutDashboardIcon, MessageCircle, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/helpers";
import { messageService } from "../../services/message-service";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNotification } from "../../hooks/useNotification";

// definicion de los menus del sidebar
const menus = [
  { name: "Feed", href: "/", icon: LayoutDashboardIcon },
  { name: "Perfil", href: "/profile", icon: User },
  { name: "Usuarios", href: "/users", icon: Users, role: "admin" },
  { name: "Mensajes", href: "/messages", icon: MessageCircle },
];

const Sidebar = () => {
    const { user } = useAuth();
    const [unreadMsgCount, setUnreadMsgCount] = useState(0);
    const { getTotalUnread } = messageService();

    // variable para saber si mostrar el badge de mensajes no leidos.
    // no lo mostramos si estamos en la pagina de mensajes para evitar redundancia
    const canShowUnreadBadge = useMemo(() => unreadMsgCount > 0 && !window.location.pathname.startsWith('/messages'), [unreadMsgCount, window.location.pathname]);

    const linkBaseClass = "group flex gap-x-3 items-center justify-center lg:justify-start text-gray-300 hover:text-white hover:bg-gray-800 transition rounded-md p-2 text-sm font-semibold leading-6";
    
    // funcion para cargar el total de mensajes no leidos
    const fetchUnreadMessages = async () => {
        try {
            const count = await getTotalUnread();
            setUnreadMsgCount(count);
        } catch (error) {
        }
    }

    // suscripcion a nuevas notificaciones de mensajes
    useNotification(`messages-${user?._id ?? null}`, "new-message", fetchUnreadMessages);
    
    // si el usuario cambia, recargamos el contador de mensajes no leidos
    useEffect(() => {
        fetchUnreadMessages();
    }, [user?._id]);

    return (
        <aside id="nx-sidebar" className="flex w-20 lg:w-72 transition-all flex-col bg-blend-hard-light border-r border-gray-800 py-4 nx-aside">
            <div id="nx-sidebar-logo" className="flex h-16 items-center px-6 mb-5">
                <img src="/images/nexo-logo.png" alt="nexo" className="h-8 w-auto mr-2" />
                <h1 className="text-3xl font-bold text-white hidden lg:inline">Nexo.io</h1>
            </div>
            <nav id="nx-sidebar-nav" className="flex-1 p-4 space-y-8 overflow-y-auto">
                <ul className="space-y-1">
                    {
                        menus.filter(m => !m.role || user.rol == m.role).map((menu) => (
                            <li key={menu.name}>
                                <Link
                                    to={menu.href}
                                    className={cn(linkBaseClass, 'relative', {
                                        'bg-gray-800 text-white': window.location.pathname === menu.href
                                    })}
                                >
                                    <menu.icon className="h-5 w-5 just" />
                                    <span className="hidden lg:block">{menu.name}</span>
                                    { canShowUnreadBadge && menu.name === 'Mensajes' && (
                                        <span className="absolute bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 right-0 top-0">
                                            {unreadMsgCount}
                                        </span>
                                    ) }
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