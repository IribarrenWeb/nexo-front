import { useAuth } from "../../context/AuthContext";
import Dropdown from "../ui/Dropdown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";

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
                <Avatar src={user?.avatar} className="mr-3" size="sm" alt={`${user.name} ${user.lastName}`}></Avatar>
                {user ? user.name : 'Cargando...'}
            </Dropdown>
        </div>
    );
};

export default ProfileNav;
