import { Calendar, Dot, Heart, MessageCircleMore } from "lucide-react";
import { cn } from "../utils/helpers";
import Avatar from "./ui/Avatar";
import { useAuth } from "../context/AuthContext";

const Post = ({postData, className}) => {
    const { user } = useAuth();

    const { author, content, createdAt, likes = [], comments = [] } = postData;
    const authorFullName = `${author.name} ${author.lastName}`;

    const isLiked = likes.some(likeUser => likeUser._id === user._id);

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

    return (
        <div className={cn('bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md', className)}>
            <div className="flex">
                <div className="mr-4">
                    <Avatar src={author.avatar} alt={authorFullName} size="md" className="mb-4" />
                </div>
                <div>
                    <div className="mb-4">
                        <div className="flex items-center mb-1">
                            <h3 className="text-lg font-semibold text-gray-200 capitalize">
                                {authorFullName}
                                <span className="text-sm text-gray-500 ml-2">@{author.username}</span>
                            </h3>
                            <div className="text-sm text-gray-500">
                                <Dot className="inline-block h-4 w-4" />
                                {relativeTime(createdAt)}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="inline-block mr-1 h-4 w-4" />
                            {new Date(createdAt).toLocaleString()}
                        </p>
                    </div>
                    <p className="text-gray-300">{content}</p>
                    <div className="mt-4 flex space-x-4">
                        <button className="cursor-pointer flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200">
                            <Heart fill={isLiked ? '#2B7FFF' : ''} className="inline-block mr-1 h-5 w-5" />
                            {likes.length > 10 ? '+10' : likes.length}
                        </button>
                        <button className="cursor-pointer flex items-center text-gray-400 hover:text-blue-500 transition-colors duration-200">
                            <MessageCircleMore className="inline-block mr-1 h-5 w-5" />
                            {comments.length}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;