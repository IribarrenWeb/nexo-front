import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext"
import Avatar from "./ui/Avatar";
import InfiniteScroll from "./ui/InfiniteScroll";
import { messageService } from "../services/message-service";
import { toast } from "sonner";
import MessageElement from "./MessageElement";
import { ArrowLeft, Send } from "lucide-react";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import { useNotification } from "../hooks/useNotification";

const ChatDetail = ({fromData, unsetChat, onSendMessage}) => {
    const { user } = useAuth();
    const fromFullName = `${fromData?.name || ''} ${fromData?.lastName || ''}`.trim();
    const infiniteRef = useRef();
    const [page, setPage] = useState(1);
    const [messages, setMessages] = useState([]);
    const { getMessages, store: sendMessage } = messageService();
    const [newMessage, setNewMessage] = useState(''); 
    const [sending, setSending] = useState(false);
    
    const loadMessages = async () => {
        if (!fromData?._id) return; // si no hay usuario del que cargar mensajes, salimos

        try {
            infiniteRef.current?.loading();
            let data = await getMessages(fromData._id, { page: page, limit: 20 });
            console.log('messages loaded', data);
            if (data?.length) {
                data = data.reverse();
                setMessages(prev => [...data, ...prev]);
                setPage(prev => prev + 1);
            } else if (data !== null) {
                infiniteRef.current?.stop();
            }
            
        } catch (error) {
            toast.error('Error al cargar los mensajes');
        } finally {
            infiniteRef.current?.loaded();
        }
    }

    // funcion para enviar un mensaje
    const toSendMessage = async () => {
        try {
            setSending(true); // seteamos el loading
            
            // enviamos el mensaje
            const data = await sendMessage({
                to: fromData._id,
                content: newMessage,
            })

            // añadimos el mensaje a la lista
            setMessages(prev => [...prev, data]);
            setNewMessage('');

            // notificamos al componente padre que se ha enviado un mensaje
            // para que pueda actualizar el ultimo mensaje del chat
            if (onSendMessage) onSendMessage(data);

            toast.success('Mensaje enviado');
        } catch (error) {
            console.error(error);
            toast.error('Error al enviar el mensaje');
        } finally {
            setSending(false);
        }
    }

    // funcion para resetear los mensajes
    const resetMessages = () => {
        setMessages([]); // limpiamos los mensajes
        setPage(0); // reseteamos la pagina a 1
        loadMessages(); // cargamos los mensajes nuevamente
    }

    // manejador de nueva notificacion de mensaje
    const handleNewMessage = (message) => {
        // agregamos el nuevo mensaje a la lista de ultimo
        setMessages((prevMessages) => [...prevMessages, message]);
    }

    // suscripcion a nuevas notificaciones de mensajes
    useNotification(`messages-${user._id??null}`, 'new-message', handleNewMessage);


    useEffect(() => {
        resetMessages();
    }, [fromData?._id]); // actualizams mensajes en caso de cambial el id del chat

    useEffect(() => {
        // mandamos el scroll al final apenas se carga la primera pagina
        if (infiniteRef.current && page <= 2) {
            infiniteRef.current.scrollToBottom();
        }
    }, [messages]);

    return (
        <div id="nx-chat" className="h-full grid grid-rows-[auto_1fr_auto]">
            <div id="nx-chat-info" className="w-full border-b border-gray-900 flex items-center">
                <ArrowLeft className="h-6 w-6 m-4 cursor-pointer" onClick={() => unsetChat()} />
                <span>Chats</span>
            </div>
            <div className="flex items-center p-4 border-b border-gray-800">
                <Avatar src={fromData?.avatar} alt={fromFullName} className="h-12 w-12 mr-4" />
                <div>
                    <h3 className="text-lg font-semibold">{fromFullName}</h3>
                    <p className="text-sm text-gray-400">@{fromData?.username}</p>
                </div>
            </div>
            <div id="nx-chat-messages" className="flex-1 overflow-y-auto">
                <InfiniteScroll id="nx-messages-list" 
                    ref={infiniteRef} 
                    scrollTarget="#nx-chat-messages" 
                    className="h-[calc(100vh-300px)] px-4" 
                    reverse={true}
                    loadMore={loadMessages}
                >
                    {
                        messages.map((message) => (
                            <MessageElement key={message._id} message={message} />
                        ))
                    }
                </InfiniteScroll>
            </div>
            <div className="grid grid-cols-4 px-8 pt-4 border-t border-gray-800">
                <div className="col-span-3">
                    <Textarea 
                        rows={2} 
                        onEnter={toSendMessage} 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e?.target?.value)} 
                        placeholder="Escribe un mensaje..." 
                        className="h-20" 
                        containerClass="mb-0" 
                    />
                </div>

                <div className="ml-4 col-span-1 flex items-center">
                    <Button disabled={newMessage?.trim()?.length === 0} loading={sending} onClick={toSendMessage} className="w-full flex justify-center items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatDetail