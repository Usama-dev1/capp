import useFetchData from "../hooks/useFetchData";
import Loader from "./Loader";
import PostCard from "./PostCard";

const PostCardList = () => {
  const { loading, data, deletePost } = useFetchData();
  if (loading) return <Loader />;
  return (
    <>
      {data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-900">No posts found</h3>
          <p className="text-xs text-gray-500 mt-1">
            Get started by creating your first post.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {data.map((post, index) => (
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

export default PostCardList;
