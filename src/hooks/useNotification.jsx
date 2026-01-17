import Pusher from "pusher-js";
import { useEffect, useRef } from "react";

export const useNotification = (room, event, callback) => {
    const callbackRef = useRef(callback);

    // actualizar la referencia del callback si cambia
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        
        // configurar Pusher
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        });
        
        // suscribirse al room
        const channel = pusher.subscribe(room);
        
        // escuchar el evento
        channel.bind(event, (data) => {
            if (callbackRef.current) callbackRef.current(data);
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
