import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";

const BASE_API = 'messages/' 
export const messageService = () => {
    const { execute } = useFetch();
    
    const getChats = async () => {
        const { data, error } = await execute(`${BASE_API}chats`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    const getMessages = async (fromId, params = {}) => {
        const { data, error } = await execute(`${BASE_API}chats/${fromId}`, 'GET', params);
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // metodo store para crear un nuevo message
    const store = async (formData) => {
        const { data, error } = await execute(`${BASE_API}`, 'POST', formData);

        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
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

    return {
        store,
        update,
        getChats,
        getMessages
    }
}
