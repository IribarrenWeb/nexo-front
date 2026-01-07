import { createContext, useContext, useMemo, useState } from "react"

export const userModel = {
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
    const [user, setUser] = useState({...userModel})

    const toProvide = useMemo(() => ({
        user,
        setUser,
        isAuth: localStorage.getItem('access_token')?.length ? true : false
    }), [user])

    return (
        <AuthContext.Provider value={toProvide}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext)