import { useEffect, useState } from "react";
import { postService } from "../../services/post-service";
import { toast } from "sonner";
import { cn } from "../../utils/helpers";
import { HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AsideViral = () => {
    const [viralPosts, setViralPosts] = useState([]);
    const { loadVirals } = postService();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // funcion para cargar los nexos virales
    const fetchViralPosts = async () => {
        try {
            setLoading(true);
            const posts = await loadVirals();
            setViralPosts(posts);
        } catch (error) {
            toast.error("Error al cargar los nexos virales.");
        } finally {
            setLoading(false);
        }
    }

    // funcion para navegar al post
    const toPost = (postId) => {
        navigate(`/post/${postId}`);
    }

    // cargar los nexos virales al montar el componente
    useEffect(() => {
        fetchViralPosts();
    }, []);

    return (
        <aside className="col-span-2 hidden lg:block w-full sticky top-0 h-screen py-4 px-2 border-l-2 border-gray-800">
            <div className="bg-gray-950 rounded-xl p-4">
                <h2 className="font-bold text-gray-200 mb-4">Nexos virales</h2>
            </div>

            <div className={cn("p-5 text-center text-gray-500 hidden", {'block': loading})}>
                Cargando nexos virales...
            </div>
            {!loading && !viralPosts && (
                <div className="p-5 text-center text-gray-500">
                    No se encontraron nexos virales.
                </div>
            )}

            <div className="px-3 "> 
                {!loading && viralPosts?.length &&
                    viralPosts.map((post) => (
                        <div onClick={() => toPost(post._id)} key={post._id} className="cursor-pointer border relative rounded-lg mb-3 bg-gray-500 border-gray-800 p-3 text-gray-800 hover:bg-gray-700 transition hover:text-gray-400">
                            <p className="font-semibold text-sm">
                                {post.content.slice(0, 100)}
                                {post.content.length > 100 ? "..." : ""}
                            </p>
                            <span className="absolute top-2 right-2 flex bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                <HeartIcon className="h-4 w-4 mr-2" /> {post.likes.length}
                            </span>
                            <span className="absolute bottom-2 right-2 text-xs">
                                @{post.author[0].name} {post.author[0].lastName}
                            </span>
                            <span className="block mt-2 text-xs">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                }
            </div>

        </aside>
    );
};

export default AsideViral;
