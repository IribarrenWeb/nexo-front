import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Post from "./Post";
import InfiniteScroll from "./ui/InfiniteScroll";
import { postService } from "../services/post-service";

const PostList = ({userId}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const infiniteRef = useRef();
    const { index } = postService();

    const loadPosts = async () => {
        try {
            infiniteRef.current?.loading();
            const params = { page };
            if (userId) {
                params.userId = userId;
            }
            const posts = await index(params);
            
            if (!Array.isArray(posts)) return;

            setPosts(prevPosts => [...prevPosts, ...posts]);
            setPage(prevPage => prevPage + 1);

            if (posts.length === 0 || posts.length < 15) infiniteRef.current?.stop();
        } catch (error) {
            toast.error('Error al cargar los posts');
        } finally {
            infiniteRef.current?.loaded();
        }
    }

    const resetPosts = () => {
        setPosts([]);
        setPage(1);
        loadPosts();
    }

    useEffect(() => {
        resetPosts();
    }, [userId]); // recargar los posts cuando cambie el userId

    // mostrar mensaje si no hay posts
    if (posts.length === 0 && !infiniteRef.current?.isLoading()) {
        return (
            <div className="p-5 text-center text-gray-500">
                No hay posts para mostrar.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <InfiniteScroll maxH="80vh" offsetH={200} loadMore={loadPosts} ref={infiniteRef}>
                {posts.map(post => (
                    <Post className="nx-posts" key={post._id} postData={post} />
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default PostList;