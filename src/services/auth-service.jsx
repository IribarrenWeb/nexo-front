import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const BASE_API = 'auth/' 
export const authService = () => {
    const { execute } = useFetch();
    
    const login = async (formData) => {
        const { data, error } = await execute(`${BASE_API}login`, 'POST', formData);

        if (data?.token) {
            localStorage.setItem('access_token', data.token)
            return data.user;
        }
        
        toast.error(error.message)
        throw new Error(error.message);
    }

    const me = async () => {
        try {
            const { data, error } = await execute(`${BASE_API}me`, 'GET');
            if (error) {
                if (error.message == 'signal is aborted without reason') return null
                toast.error(error.message)
                localStorage.removeItem('access_token')
                return null
            }
            return data;
        } catch (error) {
            toast.error('Error desconocido')
            return null
        }
    }

    return {
        login,
        me
    }
}
