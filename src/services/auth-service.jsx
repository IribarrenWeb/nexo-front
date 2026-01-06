import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const BASE_API = 'auth/' 
export const authService = () => {
    const { execute } = useFetch();
    const navigate = useNavigate()
    
    const login = async (formData) => {
        try {
            const { data, error } = await execute(`${BASE_API}login`, 'POST', formData);
    
            if (data?.token) {
                navigate('/')
                return 
            }

            toast.error(error.message)
            
            return data;
        } catch (error) {
            toast.error('Error desconocido')
        }
    }

    return {
        login
    }
}
