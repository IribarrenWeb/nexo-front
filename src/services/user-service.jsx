import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";

const BASE_API = 'users/' 
export const userService = () => {
    const { execute } = useFetch();
    
    // metodo store para crear un nuevo usuario
    const store = async (formData) => {
        const { data, error } = await execute(`${BASE_API}`, 'POST', formData);

        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        
        return data;
    }

    // metodo index para listar usuarios
    const index = async (params = {}) => {
        const { data, error } = await execute(`${BASE_API}`, 'GET', params);
        if (error) {
            toast.error(error.message);
            new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // funcion para actualizar un usuario
    const update = async (userId, formData) => {
        const { data, error } = await execute(`${BASE_API}${userId}`, 'PUT', formData);
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // funcion para obtener un usuario por su id
    const show = async (userId) => {
        const { data, error } = await execute(`${BASE_API}${userId}`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // funcion para obtener un usuario por su username
    const showByUsername = async (username) => {
        const { data, error } = await execute(`${BASE_API}by-username/${username}`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // funcion para seguir/des-seguir a un usuario
    const toFollow = async (userId) => {
        const { data, error } = await execute(`${BASE_API}follow/${userId}`, 'PUT', {});
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // funcion para buscar usuarios
    const toSearch = async (query) => {
        const { data, error } = await execute(`${BASE_API}search`, 'GET', { q: query });
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    const remove = async (userId) => {
        const { data, error } = await execute(`${BASE_API}${userId}`, 'DELETE');
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
        toFollow,
        showByUsername,
        toSearch,
        remove,
    }
}
