import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../Loader";
import PostCard from "./PostCard";

const PostByUser = () => {
  const { loading, data, deletePost } = useFetchData();
  const { session } = useAuth();
  const userPosts = data.filter((d) => d.userId === session.id);
  if (loading) return <Loader />;
  return (
    <>
      {userPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-900">No posts found</h3>
          <p className="text-xs text-gray-500 mt-1">
            Get started by creating your first post.
          </p>
          <div className="w-full flex justify-center mt-8">
            <Link
              to="/dashboard/create-post"
              className=" w-40 text-center bg-purple-500 hover:bg-purple-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200 shadow-sm shadow-indigo-100 flex justify-center items-center gap-1.5"
            >
              Create a Post
            </Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {userPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              deletePost={deletePost}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default PostByUser;
