import { useNavigate, useParams } from "react-router-dom";
import ChatsList from "../components/ChatsList";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/user-service";
import { useEffect, useRef, useState } from "react";
import ChatDetail from "../components/ChatDetail";
import { cn } from "../utils/helpers";

const Messages = () => {
    const { from } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { showByUsername } = userService();
    const [fromUser, setFromUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const chatsRef = useRef(null);

    if (from && from === user?.username) {
        // si el usuario intenta abrir un chat consigo mismo, lo redirigimos a la lista de chats
        navigate('/messages');
    }

    // funcion para cargar el usuario del chat
    const loadFromUser = async () => {
        if (!from) return;
        try {
            setLoading(true);

            // buscamos el usuario por su username
            const userData = await showByUsername(from);
            setFromUser(userData);
        } catch (error) {
            toast.error('Error al cargar el usuario del chat');
            navigate('/messages');
        } finally {
            setLoading(false);
        }
    }

    // funcion para seleccionar un chat
    const onSelectChat = (user) => {
        setFromUser(user);
    }

    useEffect(() => {
        loadFromUser();
    }, [from, user]);

    // si se esta cargando el usuario del chat
    // y hay un parametro from en la url mostramos el loading
    if (from && loading) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Cargando chat...</h1>
            </div>
        );
    }
    
    return (
        <div className={cn("grid grid-cols-5 h-[calc(100vh-64px)]")}>
            <div id="nx-chats" className={cn("col-span-2 border-r border-gray-800", {"selected-chat": fromUser})}>
                <div className="px-4 py-2">
                    <h1 className="text-2xl font-bold">Chats</h1>
                </div>
                <div id="nx-chats-list" className={cn("border-t-2 border-gray-800")}>
                    <ChatsList ref={chatsRef} selected={fromUser} onSelect={onSelectChat} />
                </div>
            </div>
            <div id="nx-chat-container" className={cn("col-span-3", {"selected-chat": fromUser})}>
                {
                    fromUser ?
                    <ChatDetail fromData={fromUser} unsetChat={() => setFromUser(null)} onSendMessage={chatsRef.current?.updateLastMessage} />
                    : (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-lg font-bold text-gray-500">Selecciona un chat para ver los mensajes</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Messages;