import { UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Dropdown from "../ui/Dropdown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileNav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        console.log('ProfileNav USER', user);
    }, [user]);

    const toLogout = () => {
        logout();
        navigate('/login');
    }
    return (
        <div className="flex items-center">
            <Dropdown triggerClass="hover:text-gray-400" actions={[{ label: 'Logout', onClick: () => toLogout() }]}>
                <UserCircle className="h-6 w-6 text-gray-300 mr-2" />
                {user ? user.name : 'Cargando...'}
            </Dropdown>
        </div>
    );
};

export default ProfileNav;
