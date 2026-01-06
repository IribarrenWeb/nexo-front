import { useContext, useMemo, useState } from "react"

const userModel = {
    name: '',
    lastName: '',
    username: '',
    avatar: '',
    bio: '',
    followings: [],
    followers: [],
    deactivated: false,
    rol: ''
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({...userModel})

    const toProvide = useMemo(() => ({
        user,
        setUser
    }), [user])

    return (
        <AuthContext.Provider value={toProvide}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthProvider)