import { useEffect, useImperativeHandle, useState } from "react";
import { messageService } from "../services/message-service";
import { toast } from "sonner";
import { Loader2, MessageCircleOffIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Avatar from "./ui/Avatar";
import { cn } from "../utils/helpers";
import { useNotification } from "../hooks/useNotification";

const ChatsList = ({ref, onSelect, selected}) => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const { getChats, toRead } = messageService()
    const [loading, setLoading] = useState(false)

    // funcion para cargar los chats
    const loadChats = async () => {
        try {
            setLoading(true);
            const data = await getChats();
            setChats(data);
        } catch (error) {
            toast.error('Error al cargar los chats');
        } finally {
            setLoading(false);
        }
    }

    // funcion para seleccionar un chat
    const handleSelect = async (chat) => {
        onSelect(chat.user);

        // marcamos los mensajes como leidos
        if (chat.unreadCount > 0) {
            await toRead(chat.userId)

            // actualizamos el contador de mensajes no leidos a 0
            setChats((prevChats) => {
                return prevChats.map((c) => {
                    if (c.userId === chat.userId) {
                        return {
                            ...c,
                            unreadCount: 0
                        }
                    }
                    return c;
                });
            });
        }
    }

    // funcion para actualizar el ultimo mensaje de un chat
    const updateLastMessage = (message) => {
        setChats((prevChats) => {
            const fromId = message.from?._id === user._id ? message.to?._id : message.from?._id;
            const isSelected = selected && selected._id === fromId;
            
            if (isSelected) {
                // si el chat esta seleccionado, marcamos el mensaje como leido
                message.read = true;
                toRead(fromId);
            }
            
            // actualizamos el ultimo mensaje del chat correspondiente
            const updatedChats = prevChats.map((chat) => {
                // validamos si el mensaje pertenece al chat actual
                if (chat.userId === message.from?._id || chat.userId === message.to._id) {
                    const incrementUnread = message.to._id === user._id && !message.read; // validamos si debemos incrementar el contador de mensajes no leidos
                    return {
                        ...chat,
                        lastMessage: message,
                        unreadCount: incrementUnread ? chat.unreadCount + 1 : chat.unreadCount
                    };
                }
                return chat;
            });

            // ordenamos los chats por fecha del ultimo mensaje
            updatedChats.sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));
            return updatedChats;
        })
    }

    // handler de nueva notificacion de mensaje
    const handleNewMessage = (message) => {
        const chatExists = chats.findIndex(chat => chat.userId === message.from?._id || chat.userId === message.to?._id); // verificamos si el chat ya existe
        if (chatExists >= 0) updateLastMessage(message); // si el chat existe, actualizamos el ultimo mensaje
        else loadChats(); // si el chat no existe, recargamos los chats para añadir el nuevo chat
    }

    // suscripcion a nuevas notificaciones de mensajes
    useNotification(`messages-${user?._id ?? null}`, "new-message", handleNewMessage);

    // exponemos el metodo updateLastMessage al componente padre
    useImperativeHandle(ref, () => ({
        updateLastMessage
    }));
    
    useEffect(() => {
        loadChats();
    }, [user?._id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32 w-full">
                <Loader2 className="animate-spin h-5 w-5 text-gray-600 mx-auto" />
                Cargando chats...
            </div>
        )
    }

    if (chats?.length === 0) {
        return (
            <div className="flex items-center justify-center p-4 text-center h-32 text-gray-500">
                <MessageCircleOffIcon className="h-6 w-6 mr-2" />
                No tienes chats aun. Inicia una conversacion para ver tus mensajes aqui.
            </div>
        )
    }

    return (
        <>
            {chats?.map((chat) => (
                <div key={chat.userId} onClick={() => handleSelect(chat)} className={cn("p-1 lg:p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer relative", {"bg-gray-800": selected?._id === chat?.user?._id})}>
                    <div className="flex mb-2">
                        <div className="flex items-center">
                            <Avatar src={chat?.user?.avatar} alt={`${chat?.user?.name} ${chat?.user?.lastName}`} size="sm" className="mr-4" />
                            <div className="font-bold text-sm text-white capitalize">
                                {`${chat?.user?.name} ${chat?.user?.lastName}`}
                                <span className="text-gray-400 text-xs font-light block">
                                    @{chat?.user?.username}
                                </span>
                            </div>
                        </div>
                        <div className="ml-auto text-xs text-gray-500">
                            {new Date(chat.lastMessage?.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="text-sm text-gray-400 pl-12 truncate">
                        {chat.lastMessage?.content}
                    </div>
                    
                    {chat.unreadCount > 0 && (
                        <span className="text-blue-600 absolute text-xs font-bold rounded-full right-5 border border-blue-500 px-2 py-1 top-8">
                            {chat.unreadCount}
                        </span>
                    )}
                </div>
            ))}
        </>
    )
}

export default ChatsList;