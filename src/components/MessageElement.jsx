import { useMemo } from "react";
import { cn } from "../utils/helpers";
import Avatar from "./ui/Avatar";
import { useAuth } from "../context/AuthContext";

const MessageElement = ({ message }) => {
    const { user } = useAuth();
    const fromMe = useMemo(() => message.from._id === user._id, [message.from._id, user._id]);

    // formateamos la fecha del mensaje
    const messageDate = useMemo(() => {
        const date = new Date(message.createdAt);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, [message.createdAt]);

    return (
        <div className={cn("flex", {
            'justify-end': fromMe,
            'justify-start': !fromMe,
        })}>
            {!fromMe && (
                <div className="mr-2 mt-3">
                    <Avatar size="sm" alt={message.from.fullName} src={message.from.avatar} />
                </div>
            )}
            <div className={cn("max-w-xl px-4 py-2 my-2 rounded-lg", {
                'bg-blue-500 text-white self-end': fromMe,
                'bg-gray-800 text-gray-200 self-start': !fromMe,
            })}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs text-gray-300 mt-1 block text-right">{messageDate}</span>
            </div>
            {fromMe && (
                <div className="ml-2 mt-3">
                    <Avatar size="sm" alt={message.from.fullName} src={message.from.avatar} />
                </div>
            )}
        </div>
    )
}

export default MessageElement;