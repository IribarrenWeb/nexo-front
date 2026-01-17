import { useRef, useState } from "react";
import PostCreator from "../components/PostCreator";
import PostList from "../components/PostsList";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks/useNotification";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const listRef =  useRef(null);
  const navigate = useNavigate();
  const [posibleNewPosts, setPosibleNewPosts] = useState(false);

  // funcion para agregar un nuevo post al listado
  // cuando el usuario autenticado crea un nuevo post
  const pushNewPostToList = (newPost) => {
    listRef.current?.pushNewPost(newPost);
  }

  // funcion para seleccionar un post
  // redirige a la pagina del post
  const onSelect = (post) => {
    navigate(`/post/${post._id}`);
  }

  // handler de nuevos posts recibidos por notificaciones
  const handleNewPost = (post) => {
    if (post.author == user._id) return; // ignoramos los posts del propio usuario

    setPosibleNewPosts(true);
  }

  // recargar los posts
  const toReloadPosts = () => {
    listRef.current?.reset();
    setPosibleNewPosts(false);
  }

  // suscribirse a notificaciones de nuevos posts
  useNotification('posts', 'new-post', handleNewPost);

  return (
    <div className="py-5">
      <div className="bg-gray-950">
        <PostCreator onPosted={pushNewPostToList} />
      </div>

      <div className="pt-7 border-t-2 border-gray-800 mt-10">
        {posibleNewPosts && (
          <div className="mb-5 text-center">
            <button
              className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              onClick={toReloadPosts}
            >
              Cargar nuevos posts
            </button>
          </div>
        )}
        <PostList ref={listRef} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default Home;