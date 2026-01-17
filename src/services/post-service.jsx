import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";

const BASE_API = 'posts/' 
export const postService = () => {
    const { execute } = useFetch();
    
    // metodo store para crear un nuevo post
    const store = async (formData) => {
        const { data, error } = await execute(`${BASE_API}`, 'POST', formData);

        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        
        return data;
    }

    // metodo index para listar posts
    const index = async (params = {}) => {
        const { data, error } = await execute(`${BASE_API}`, 'GET', params);
        if (error) {
            toast.error(error.message);
            new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // metodo update para actualizar un post
    const show = async (postId) => {
        const { data, error } = await execute(`${BASE_API}${postId}`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // metodo liked para dar like a un post
    const liked = async (postId) => {
        const { data, error } = await execute(`${BASE_API}like/${postId}`, 'PUT', {});
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // metodo loadVirals para obtener los posts virales
    const loadVirals = async () => {
        const { data, error } = await execute(`${BASE_API}viral`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    return {
        store,
        index,
        show,
        liked,
        loadVirals,
    }
}
