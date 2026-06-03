import { useParams, useNavigate } from "react-router";
import CommentSection from "../components/comments/CommentSection";

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getPosts = localStorage.getItem("data");
  const allPosts = getPosts ? JSON.parse(getPosts) : [];
  const post = allPosts.find((p) => String(p.id) === id);

  if (!post) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-red-500 font-medium mb-4">Post not found!</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Navigation Row */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition"
        >
          ← Go back to posts
        </button>
      </div>

      {/* Post Article Section */}
      <article className="border-b border-gray-100 pb-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {post.title}
        </h1>
        <p className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line">
          {post.body}
        </p>
      </article>

      <CommentSection />
    </div>
  );
};

export default PostDetailsPage;
