import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import PostByUser from "../components/post/PostsByUser";

const PostByUserPage = () => {
  const { session } = useAuth();
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Your Posts
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and view your content list
          </p>
        </div>
        {session && (
          <Link
            to="/dashboard/create-post"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-200 shadow-sm shadow-indigo-100 flex items-center gap-1.5"
          >
            + Add Post
          </Link>
        )}
      </div>
      <PostByUser />
    </div>
  );
};

export default PostByUserPage;
