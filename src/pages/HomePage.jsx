import PostCardList from "../components/post/PostCardList";

const PostListPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            All Posts
          </h1>
        </div>
      </div>
      <PostCardList />
    </div>
  );
};

export default PostListPage;
