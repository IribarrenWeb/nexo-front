import { useEffect, useState } from "react";
import { messageService } from "../services/message-service";
import { toast } from "sonner";
import { DotIcon, Loader2, MessageCircleOffIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Avatar from "./ui/Avatar";
import { useNavigate } from "react-router-dom";

const ChatsList = () => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const { getChats } = messageService()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

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
                <div key={chat.userId} onClick={() => navigate(`/messages/${chat.user.username}`)} className="p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer">
                    <div className="flex items-center mb-2">
                        <Avatar src={chat?.user?.avatar} alt={`${chat?.user?.name} ${chat?.user?.lastName}`} size="sm" className="mr-4" />
                        <div className="font-bold text-white capitalize">
                            {`${chat?.user?.name} ${chat?.user?.lastName}`}
                        </div>
                        <span className="text-gray-400 text-sm">
                            <DotIcon className="inline-block h-3 w-3 mx-2" />
                            @{chat?.user?.username}
                        </span>
                        <div className="ml-auto text-xs text-gray-500">
                            {new Date(chat.lastMessage?.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="text-sm text-gray-400 pl-12 truncate">
                        {chat.lastMessage?.content}
                    </div>
                </div>
            ))}
        </>
    )
}

export default ChatsList;