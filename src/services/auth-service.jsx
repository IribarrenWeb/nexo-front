import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const BASE_API = 'auth/' 
export const authService = () => {
    const { execute } = useFetch();
    
    const login = async (formData) => {
        try {
            const { data, error } = await execute(`${BASE_API}login`, 'POST', formData);
    
            if (data?.token) {
                localStorage.setItem('access_token', data.token)
                return data.user;
            }

            toast.error(error.message)
            
            return data;
        } catch (error) {
            toast.error('Error desconocido')
        }
    }

    const me = async () => {
        try {
            const { data, error } = await execute(`${BASE_API}me`, 'GET');
            if (error) {
                toast.error(error.message)
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
