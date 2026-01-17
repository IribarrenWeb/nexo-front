import Notifications from "./Notifications";
import ProfileNav from "./ProfileNav";
import SearchUser from "./SearchUser";

const HeaderApp = () => {
    return (
        <header id="nx-header" className="flex h-16 items-center gap-x-4 border-b border-gray-800 bg-gray-950 px-6 shadow-sm">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
                <img id="nx-header-logo" src="/images/nexo-logo.png" alt="nexo" className="h-6 hidden w-auto pr-4 border-r-2" />

                <SearchUser />

                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Notifications />
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-700" />
                    <ProfileNav />
                </div>
            </div>
        </header>
    );
};

export default HeaderApp;
