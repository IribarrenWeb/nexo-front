import { useFetch } from "../hooks/useFetch";

const BASE_API = 'users/' 
export const userService = () => {
    const { execute } = useFetch();
    
    const store = async (formData) => {
        try {
            const { data, error } = await execute(`${BASE_API}`, 'POST', formData);

            if (error) {
                return toast.error(error.message);
            }
            
            return data;
        } catch (error) {
            toast.error('Error desconocido')
        }
    }

    const index = async (params = {}) => {
        try {
            const { data, error } = await execute(`${BASE_API}`, 'GET', params);
            if (error) {
                return toast.error(error.message);
            }
            return data;
        } catch (error) {
            toast.error('Error desconocido')
        }
    }

    return {
        store,
        index
    }
}
