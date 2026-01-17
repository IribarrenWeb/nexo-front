import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { toast } from "sonner";
import PostElement from "./PostElement";
import InfiniteScroll from "./ui/InfiniteScroll";
import { postService } from "../services/post-service";
import { cn } from "../utils/helpers";
import { Loader2Icon } from "lucide-react";

const PostList = ({ref, userId, onSelect}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const infiniteRef = useRef();
    const { index } = postService();

    useImperativeHandle(ref, () => ({
        reset: resetPosts,
        pushNewPost: (newPost) => {
            setPosts(prevPosts => [newPost, ...prevPosts]);
        }
    }));

    const loadPosts = async () => {
        try {
            infiniteRef.current?.loading();
            setLoading(true);
            const params = { page };
            if (userId) {
                params.userId = userId;
            }

            const posts = await index(params);
            if (!Array.isArray(posts)) return;

            setPosts(prevPosts => [...prevPosts, ...posts]);
            setPage(prevPage => prevPage + 1);

            if (posts.length === 0 || posts.length < 15) infiniteRef.current?.stop();
            setLoading(false);
        } catch (error) {
            toast.error('Error al cargar los posts');
            setLoading(false);
        } finally {
            infiniteRef.current?.loaded();
        }
    }

    const resetPosts = () => {
        setPosts([]);
        setPage(0);
        loadPosts();
    }

    useEffect(() => {
        resetPosts();
    }, [userId]); // recargar los posts cuando cambie el userId


    return (
        <>
            <div className={cn("p-5 text-center text-gray-500 hidden", {'block': !posts?.length && !loading})}>
                No hay posts para mostrar.
            </div>
            <div className={cn("p-5 text-center text-gray-500 hidden", {'block': loading && !posts?.length})}>
                <Loader2Icon className="animate-spin mx-auto mb-2" />
                Cargando posts...
            </div>
            <InfiniteScroll scrollTarget="#nx-app-main" offsetH={200} loadMore={loadPosts} ref={infiniteRef}>
                {posts.map(post => (
                    <PostElement onClick={() => onSelect(post)} className="nx-posts" key={post._id} postData={post} />
                ))}
            </InfiniteScroll>
        </>
    )
}

export default PostList;