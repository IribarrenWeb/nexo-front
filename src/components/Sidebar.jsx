import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <nav className="flex flex-col gap-6 h-full">
            <div className="text-3xl font-bold text-blue-500 px-2">

                <div className="flex flex-col gap-4 text-xl">
                    <Link to="/">Inicio</Link>
                    <Link to="/profile">Perfil</Link>
                </div>
                <div className="mt-auto">
                    <button className="bg-blue-500 text-white rounded-full p-3 w-full font-bold shadow-md hover:bg-blue-600 transition">
                        <span className="hidden xl:inline">Clippear</span>
                        <span className="xl:hidden">+</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar;