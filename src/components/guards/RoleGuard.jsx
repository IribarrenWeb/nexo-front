import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const RoleGuard = (role) => {
    const { user } = useAuth();
    
    if (user.rol !== role) {
        return <Navigate to="/" replace />
    }
    
    return <Outlet/>
}