import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";

const BASE_API = 'messages/' 
export const messageService = () => {
    const { execute } = useFetch();
    
    // metodo getChats para obtener la lista de chats
    const getChats = async () => {
        const { data, error } = await execute(`${BASE_API}chats`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // metodo getMessages para obtener los mensajes de un chat
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

    // metodo update para actualizar un message
    const update = async (commentId, formData) => {
        const { data, error } = await execute(`${BASE_API}${commentId}`, 'PUT', formData);
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // marcar mensajes como leidos
    const toRead = async (fromId) => {
        const { data, error } = await execute(`${BASE_API}mark-read/${fromId}`, 'PUT');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // obtener el total de mensajes no leidos
    const getTotalUnread = async () => {
        const { data, error } = await execute(`${BASE_API}chats/unread`, 'GET');
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
        getMessages,
        toRead,
        getTotalUnread,
    }
}
