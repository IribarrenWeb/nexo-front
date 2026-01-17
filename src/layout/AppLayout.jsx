import { Outlet } from "react-router-dom";

import Sidebar from "../components/general/Sidebar.jsx";
import HeaderApp from "../components/general/HeaderApp.jsx";
import { authService } from "../services/auth-service.jsx";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { cn } from "../utils/helpers.jsx";
import AsideViral from "../components/general/AsideViral.jsx";

const AppLayout = () => {
    const { me } = authService();
    const { setUser } = useAuth();
    const path = window.location.pathname; // ruta actual

    // cargar los datos del usuario al montar el componente
    useEffect(() => {
        me().then((user) => {
            if (!user) return;
            setUser(user); // seteamos el usuario en el contexto
        });
    }, []);

    const baseMainClasses = "relative border-2 border-gray-950 rounded-lg bg-gray-950 shadow-sm h-full";
    return (
        <div className="flex h-screen bg-gray-950 text-white overflow-hidden">

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderApp />
                <div className="grid grid-cols-1 md:grid-cols-5">
                    <main id="nx-app-main" className={cn("felx-1 overflow-y-auto md:col-span-3", {"md:col-span-5": path.startsWith('/messages')})}>
                        <div className={cn(baseMainClasses)}>
                            <Outlet />
                        </div>
                    </main>
                    {
                        // no mostramos el aside viral en la pagina de mensajes ya que ocupa mucho espacio y no es relevante
                        !path.startsWith('/messages') && (
                            <AsideViral/>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default AppLayout;