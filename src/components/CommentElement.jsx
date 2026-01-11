import { Calendar, Dot, Heart } from "lucide-react";
import { cn } from "../utils/helpers";
import Avatar from "./ui/Avatar";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useMemo, useRef, useState } from "react";
import { commentService } from "../services/comment-service";

const CommentElement = ({commentData, className}) => {
    const { user } = useAuth();
    const { liked } = commentService();
    const [modelComment, setModelComment] = useState({...commentData});

    // nombre completo del autor
    const authorFullName = `${modelComment.author.name} ${modelComment.author.lastName}`;
    
    // computada para saber si el comentario ha sido likeado por el usuario actual
    const isLikedByUser = useMemo(() => {
        return modelComment.likes.some(like => like._id === user._id);
    }, [modelComment.likes, user._id]);

    // funcion para calcular el tiempo relativo
    // en segundos, minutos, horas o dias
    const relativeTime = (date) => {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return `${seconds}s`;
    }

    // funcion para dar like a un comentario
    const toLike = async () => {
        try {
            const res = await liked(modelComment._id);
            setModelComment(prevPost => ({...prevPost, likes: res.likes})); // actualizamos los likes del comentario
        } catch (error) {
            toast.error('Error al dar like');
        }
    }

    return (
        <>
            <div className={cn('bg-white p-5 shadow-md -mx-10', className)}>
                <div className={cn("flex")}>
                    <div className="mr-4 nx-post-avatar">
                        <Avatar src={modelComment.author.avatar} alt={authorFullName} size="md" className="mb-4" />
                    </div>
                    <div>
                        {/* contenedor de info */}
                        <div className="mb-4">
                            <div className="flex items-center mb-1">
                                <h3 className="text-lg font-semibold text-gray-200 capitalize">
                                    {authorFullName}
                                    <span className="text-sm text-gray-500 ml-2">@{modelComment.author.username}</span>
                                </h3>
                                <div className="text-sm text-gray-500">
                                    <Dot className="inline-block h-4 w-4" />
                                    {relativeTime(modelComment.createdAt)}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="inline-block mr-1 h-4 w-4" />
                                {new Date(modelComment.createdAt).toLocaleString()}
                            </p>
                        </div>
                        
                        {/* contenito del comentario */}
                        <p className="text-gray-300">{modelComment.text}</p>
                        
                        {/* acciones */}
                            
                        <div className={cn("mt-4 flex space-x-4")}>
                            <button onClick={toLike} className="cursor-pointer flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200">
                                <Heart fill={isLikedByUser ? 'red' : ''} className={cn("inline-block mr-1 h-5 w-5",{'text-red-500': isLikedByUser})} />
                                {modelComment.likes?.length > 10 ? '+10' : modelComment.likes.length}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommentElement;