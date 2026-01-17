import Pusher from "pusher-js";
import { useEffect } from "react";

export const useNotification = (room, event, callback) => {
    useEffect(() => {
        
        // configurar Pusher
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        });
        
        // suscribirse al room
        const channel = pusher.subscribe(room);
        
        // escuchar el evento
        channel.bind(event, (data) => {
            callback(data);
        });

        // limpiar la suscripcion al desmontar el componente
        // para evitar fugas de memoria
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };

    }, [room, event]); // escuchar cambios en el room o el evento
};
