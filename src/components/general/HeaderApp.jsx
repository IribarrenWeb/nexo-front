import { Bell, ChevronDown, Search } from "lucide-react";
import ProfileNav from "./ProfileNav";

const HeaderApp = () => {
    return (
        <header id="nx-header" className="flex h-16 items-center gap-x-4 border-b border-gray-800 bg-gray-950 px-6 shadow-sm">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
                <img id="nx-header-logo" src="/images/nexo-logo.png" alt="nexo" className="h-6 hidden w-auto pr-4 border-r-2" />

                <form className="relative flex flex-1" action="#" method="GET">

                    <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" />
                    <input
                        className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm outline-0"
                        placeholder="Buscar..."
                    />
                </form>

                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                        <Bell className="h-6 w-6" />
                    </button>
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-700" />
                    <ProfileNav />
                </div>
            </div>
        </header>
    );
};

export default HeaderApp;
