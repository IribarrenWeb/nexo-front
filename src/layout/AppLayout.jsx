import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto flex">

                <aside className="hidden sm:block w-20 xl:w-64 sticky top-0 h-screen border-r border-gray-100 p-4">
                    <Sidebar />
                </aside>

                <main className="flex-1 min-w-0 border-r border-gray-100">
                    <Outlet />
                </main>

                <aside className="hidden lg:block w-80 sticky top-0 h-screen p-4">
                    <div className="bg-gray-50 rounded-xl p-4 h-full">
                        <h2 className="font-bold text-gray-500 mb-4">Clippers virales</h2>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default AppLayout;