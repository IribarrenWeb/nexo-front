import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { toast } from "sonner";
import InfiniteScroll from "./ui/InfiniteScroll";
import { commentService } from "../services/comment-service";
import CommentElement from "./CommentElement";
import { cn } from "../utils/helpers";

const CommentsList = ({ref, postId, onSelect}) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const infiniteRef = useRef();
    const { index } = commentService();

    useImperativeHandle(ref, () => ({
        reset: resetComments,
        pushNewComment: (newComment) => {
            setComments(prevComment => [newComment, ...prevComment]);
        }
    }));

    const loadComments = async () => {
        try {
            infiniteRef.current?.loading();
            const params = { page };
            if (postId) {
                params.post = postId;
            }

            const comments = await index(params);
            if (!Array.isArray(comments)) return;

            setComments(prevComment => [...prevComment, ...comments]);
            setPage(prevPage => prevPage + 1);

            if (comments.length === 0 || comments?.length < 15) {
                infiniteRef.current?.stop();
            }
        } catch (error) {
            toast.error('Error al cargar los comentarios');
        } finally {
            infiniteRef.current?.loaded();
        }
    }

    const resetComments = () => {
        setComments([]);
        setPage(1);
        loadComments();
    }

    useEffect(() => {
        resetComments();
    }, [postId]); // recargar los comments cuando cambie el postId

    return (
        <>
            {/* mostrar mensaje en caso de no haber comentarios y no estar en estado de carga */}
            {
                comments.length === 0 && !infiniteRef.current?.isLoading() && (
                    <div className="p-5 text-center text-gray-500">
                        No hay comentarios para mostrar.
                    </div>
                )
            }

            {/* infinite scroll */}
            <InfiniteScroll className={cn({"hidden": !comments?.length && !infiniteRef.current?.isLoading()})} scrollTarget="#nx-app-main" offsetH={200} loadMore={loadComments} ref={infiniteRef}>
                {comments.map(comment => (
                    <CommentElement onClick={() => onSelect(comment)} className="nx-comments" key={comment._id} commentData={comment} />
                ))}
            </InfiniteScroll>
        </>
    )
}

export default CommentsList;