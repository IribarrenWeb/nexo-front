import { useEffect, useRef, useState } from "react";
import PostElement from "../components/PostElement";
import { postService } from "../services/post-service";
import { Loader2, MoveLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import ReplyCreator from "../components/ReplyCreator";

const Post = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(false);
    const commentsRef = useRef(null);
    const { show } = postService();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const loadPostData = async () => {
        try {
            setLoading(true);
            const post = await show(id);
            setPostData(post);
        } catch (error) {
            toast.error('Error al cargar el post');
        } finally {
            setLoading(false);
        }
    }

    const handleReplied = (newComment) => {
        // añadimos el nuevo comentario a la lista de comentarios
        commentsRef.current?.pushNewComment(newComment);
        loadPostData(); // recargamos el post para actualizar el contador de comentarios
    }

    useEffect(() => {
        loadPostData();
    }, [id]);

    if (loading) {
        return (
            <div className="p-5 text-center text-gray-500">
                <Loader2 className="animate-spin mx-auto mb-2" />
                Cargando post...
            </div>
        )
    }

    if (!postData) {
        return (
            <div className="p-5 text-center text-gray-500">
                No se encontró el post.
            </div>
        )
    }

    return (
        <>
            <div className="text-2xl font-bold mb-10 text-gray-200">
                <MoveLeft className="cursor-pointer inline-block mr-10" onClick={goBack} /> 
                Post
            </div>
            <PostElement className="bg-gray-950" detailMode postData={postData} />
            <ReplyCreator className="-mx-10 border-b border-gray-700 pb-5" postId={postData._id} onReplied={handleReplied} />
            <CommentsList ref={commentsRef} postId={postData._id} />
        </>
    )
}

export default Post;