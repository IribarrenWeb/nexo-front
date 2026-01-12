import { useNavigate, useParams } from "react-router-dom";
import ChatsList from "../components/ChatsList";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/user-service";
import { useEffect, useState } from "react";
import ChatDetail from "../components/ChatDetail";
import { cn } from "../utils/helpers";

const Messages = () => {
    const { from } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { showByUsername } = userService();
    const [fromUser, setFromUser] = useState(null);
    const [loading, setLoading] = useState(false);

    if (from && from === user?.username) {
        // si el usuario intenta abrir un chat consigo mismo, lo redirigimos a la lista de chats
        navigate('/messages');
    }

    const loadFromUser = async () => {
        if (!from) return;
        try {
            setLoading(true);
            const userData = await showByUsername(from);
            setFromUser(userData);
        } catch (error) {
            toast.error('Error al cargar el usuario del chat');
            navigate('/messages');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadFromUser();
    }, [from, user]);

    if (from && loading) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Cargando chat...</h1>
            </div>
        );
    }
    
    return (
        <>
            {!from && (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Mensajes</h1>
                    
                        <p>Selecciona un chat para ver los mensajes</p>
                </div>
            )}
            <div className={cn({"border-t-2 border-gray-800 mt-4": !from, '-mx-10 -mt-10': from})}>
                {
                    !from ? <ChatsList /> : <ChatDetail fromData={fromUser} />
                }
            </div>
        </>
    );
}

export default Messages;