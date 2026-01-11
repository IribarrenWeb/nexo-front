import { useRef } from "react";
import PostCreator from "../components/PostCreator";
import PostList from "../components/PostsList";

const Home = () => {
  const listRef =  useRef(null);

  const pushNewPostToList = (newPost) => {
    listRef.current?.pushNewPost(newPost);
  }

  return (
    <>
      <div className="bg-gray-950">
        <PostCreator onPosted={pushNewPostToList} />
      </div>

      <div className="pt-7 border-t-2 border-gray-800 mt-10">
        <PostList ref={listRef} />
      </div>
    </>
  );
};

export default Home;