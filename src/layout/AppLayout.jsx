import { Outlet } from "react-router-dom";

import Sidebar from "../components/general/Sidebar.jsx";
import HeaderApp from "../components/general/HeaderApp.jsx";
import { authService } from "../services/auth-service.jsx";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { cn } from "../utils/helpers.jsx";

const AppLayout = () => {
    const { me } = authService();
    const { setUser } = useAuth();
    
    useEffect(() => {
        me().then((user) => {
            if (!user) return;
            setUser(user);
        });
    }, []);

    const baseMainClasses = "relative border-2 border-gray-950 rounded-lg bg-gray-950 shadow-sm h-full";
    return (
        <div className="flex h-screen bg-gray-950 text-white overflow-hidden">

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <HeaderApp />
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <main className="felx-1 overflow-y-auto p-8 col-span-3 h-screen">
                        <div className={cn(baseMainClasses)}>
                            <Outlet />
                        </div>
                    </main>
                    <aside className="hidden lg:block w-full sticky top-0 h-screen p-4">
                        <div className="bg-gray-950 rounded-xl p-4 h-full">
                            <h2 className="font-bold text-gray-200 mb-4">Nexos virales</h2>
                        </div>
                    </aside>
                </div>
            </div>

        </div>
    )
}

export default AppLayout;