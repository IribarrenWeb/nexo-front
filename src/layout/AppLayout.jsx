import { Outlet } from "react-router-dom";

import Sidebar from "../components/general/Sidebar.jsx";
import HeaderApp from "../components/general/HeaderApp.jsx";
import { authService } from "../services/auth-service.jsx";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const AppLayout = () => {
    const { me } = authService();
    const { setUser } = useAuth();
    
    useEffect(() => {
        me().then((user) => {
            if (!user) return;
            console.log('USER', user);
            setUser(user);
        });
    }, []);

    return (
        <div className="flex h-screen bg-gray-950 text-white overflow-hidden">

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <HeaderApp />
                <main className="felx-1 overflow-y-auto p-8">
                    <div className="border-2 border-gray-950 rounded-lg p-6 bg-gray-800 shadow-sm h-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* <aside className="hidden lg:block w-80 sticky top-0 h-screen p-4">
                <div className="bg-gray-50 rounded-xl p-4 h-full">
                    <h2 className="font-bold text-gray-500 mb-4">Clippers virales</h2>
                </div>
            </aside> */}
        </div>
    )
}

export default AppLayout;