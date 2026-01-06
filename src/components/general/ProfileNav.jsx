import { ChevronDown, UserCircle } from "lucide-react";

const ProfileNav = () => {
    return (
        <div className="flex items-center">
            <UserCircle className="h-8 w-8 text-gray-400" />
            <span className="ml-4 hidden text-sm font-semibold text-white lg:flex lg:items-center">
                Keinher
                <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
            </span>
        </div>
    );
};

export default ProfileNav;
