import { Calendar, Dot, Heart, MessageCircleMore } from "lucide-react";
import { cn } from "../utils/helpers";
import Avatar from "./ui/Avatar";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { postService } from "../services/post-service";
import { useMemo, useState } from "react";

const Post = ({postData, className}) => {
    const { user } = useAuth();
    const { liked } = postService();
    const [modelPost, setModelPost] = useState({...postData});

    // nombre completo del autor
    const authorFullName = `${modelPost.author.name} ${modelPost.author.lastName}`;
    
    // computada para saber si el post ha sido liked por el usuario actual
    const isLikedByUser = useMemo(() => {
        return modelPost.likes.some(like => like._id === user._id);
    }, [modelPost.likes, user._id]);

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

    // funcion para dar like a un post
    const toLike = async () => {
        try {
            const res = await liked(modelPost._id);
            setModelPost(prevPost => ({...prevPost, likes: res.likes})); // actualizamos los likes del post
        } catch (error) {
            toast.error('Error al dar like');
        }
    }

    return (
        <div className={cn('bg-white dark:bg-gray-900 p-5 hover:rounded-lg shadow-md', className)}>
            <div className="flex">
                <div className="mr-4">
                    <Avatar src={modelPost.author.avatar} alt={authorFullName} size="md" className="mb-4" />
                </div>
                <div>
                    {/* contenedor de info */}
                    <div className="mb-4">
                        <div className="flex items-center mb-1">
                            <h3 className="text-lg font-semibold text-gray-200 capitalize">
                                {authorFullName}
                                <span className="text-sm text-gray-500 ml-2">@{modelPost.author.username}</span>
                            </h3>
                            <div className="text-sm text-gray-500">
                                <Dot className="inline-block h-4 w-4" />
                                {relativeTime(modelPost.createdAt)}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="inline-block mr-1 h-4 w-4" />
                            {new Date(modelPost.createdAt).toLocaleString()}
                        </p>
                    </div>
                    
                    {/* contenito del post */}
                    <p className="text-gray-300">{modelPost.content}</p>
                    
                    {/* acciones */}
                    <div className="mt-4 flex space-x-4">
                        <button onClick={toLike} className="cursor-pointer flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200">
                            <Heart fill={isLikedByUser ? 'red' : ''} className={cn("inline-block mr-1 h-5 w-5",{'text-red-500': isLikedByUser})} />
                            {modelPost.likes?.length > 10 ? '+10' : modelPost.likes.length}
                        </button>
                        <button className="cursor-pointer flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200">
                            <MessageCircleMore className="inline-block mr-1 h-5 w-5" />
                            {modelPost.comments?.length}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;