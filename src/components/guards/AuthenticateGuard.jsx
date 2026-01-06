import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export const AuthenticateGuard = () => {
    const { isAuth } = useAuth()

    const location = useLocation();

    if (!isAuth) return <Navigate to="login" state={{from: location}} replace />

    return <Outlet/>
}