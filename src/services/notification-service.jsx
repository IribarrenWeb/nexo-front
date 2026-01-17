import { toast } from "sonner";
import { useFetch } from "../hooks/useFetch";

const BASE_API = 'notifications/' 
export const notificationService = () => {
    const { execute } = useFetch();
    
    // metodo getNotifications para obtener la lista de notificaciones
    const getNotifications = async () => {
        const { data, error } = await execute(`${BASE_API}`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // metodo para marcar todas las notificaciones del usuario como leidas
    const markRead = async () => {
        const { data, error } = await execute(`${BASE_API}mark-read`, 'GET');
        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        return data;
    }

    // metodo store para crear un nuevo message
    const remove = async (id) => {
        const { data, error } = await execute(`${BASE_API}${id}`, 'DELETE');

        if (error) {
            toast.error(error.message);
            throw new Error(JSON.stringify(data)); // enviamos la data en jsonstring para poder parsearla despues
        }
        
        return data;
    }

    return {
        getNotifications,
        markRead,
        remove,
    }
}
