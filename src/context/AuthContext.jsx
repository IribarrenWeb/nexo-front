import { createContext, useContext, useMemo, useState } from "react"

export const USER_MODEL = {
    name: '',
    lastName: '',
    username: '',
    avatar: '',
    bio: '',
    followings: [],
    followers: [],
    deactivated: false,
    rol: '',
    password: '',
    email: '',
    rePassword: '',
}

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({...USER_MODEL})
    const fullName = useMemo(() => `${user.name} ${user.lastName}`, [user])

    // estado para forzar recarga del avatar
    const [reloadAvatar, setReloadAvatar] = useState(false);

    const logout = () => {
        setUser({...USER_MODEL})
        localStorage.removeItem('access_token')
    }

    const toProvide = useMemo(() => ({
        user,
        fullName,
        setUser,
        logout,
        isAuth: localStorage.getItem('access_token')?.length ? true : false,
        role: user.rol,
        reloadAvatar,
        setReloadAvatar,
    }), [user, reloadAvatar])

    return (
        <AuthContext.Provider value={toProvide}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext)