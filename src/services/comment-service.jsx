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

    // metodo liked para dar like a un comentario
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
        liked
    }
}
