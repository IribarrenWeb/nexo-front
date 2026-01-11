import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";

const BASE_API = 'comments/' 
export const commentService = () => {
    const { execute } = useFetch();
    
    // metodo store para crear un nuevo comment
    const store = async (formData) => {
        const { data, error } = await execute(`${BASE_API}`, 'POST', formData);

        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        
        return data;
    }

    // metodo index para listar comments
    const index = async (params = {}) => {
        const { data, error } = await execute(`${BASE_API}`, 'GET', params);
        if (error) {
            toast.error(error.message);
            new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    const update = async (commentId, formData) => {
        const { data, error } = await execute(`${BASE_API}${commentId}`, 'PUT', formData);
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    const show = async (commentId) => {
        const { data, error } = await execute(`${BASE_API}${commentId}`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    const liked = async (commentId) => {
        const { data, error } = await execute(`${BASE_API}like/${commentId}`, 'PUT', {});
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    return {
        store,
        index,
        update,
        show,
        liked
    }
}
