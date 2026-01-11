import PostCreator from "../components/PostCreator";
import PostList from "../components/PostsList";

const Home = () => {
  return (
    <>
      <div className="bg-gray-950">
        <PostCreator />
      </div>

      <div className="pt-7 border-t-2 border-gray-800 mt-10">
        <PostList />
      </div>
    </>
  );
};

export default Home;