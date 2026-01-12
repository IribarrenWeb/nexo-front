import { useRef } from "react";
import PostCreator from "../components/PostCreator";
import PostList from "../components/PostsList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const listRef =  useRef(null);
  const navigate = useNavigate();

  const pushNewPostToList = (newPost) => {
    listRef.current?.pushNewPost(newPost);
  }

  const onSelect = (post) => {
    navigate(`/post/${post._id}`);
  }

  return (
    <div className="py-5">
      <div className="bg-gray-950">
        <PostCreator onPosted={pushNewPostToList} />
      </div>

      <div className="pt-7 border-t-2 border-gray-800 mt-10">
        <PostList ref={listRef} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default Home;