import { Link } from "react-router";
import PostCardList from "../components/post/PostCardList";
import { useAuth } from "../hooks/useAuth";

const PostListPage = () => {
  const { session } = useAuth();
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row space-y-4  sm:justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-center sm:text-start tracking-tight">
            Your Posts
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and view your content list
          </p>
        </div>
        {session && (
          <Link
            to="/dashboard/create-post"
            className="btn-secondary hover:bg-muted/80 btn-sm text-xs sm:btn-lg sm:text-base"
          >
            + Add Post
          </Link>
        )}
      </div>
      <PostCardList />
    </div>
  );
};

export default PostListPage;
