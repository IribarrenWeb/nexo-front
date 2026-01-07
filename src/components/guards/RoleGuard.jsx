import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const RoleGuard = ({role}) => {
    const { user } = useAuth();
    
    console.log(user.rol, role);
    if (user.rol !== role) {
        return <Navigate to="/" replace />
    }

    return <Outlet/>
}