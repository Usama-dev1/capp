import { Link } from "react-router";
import { useNavigate } from "react-router";

const PostCard = ({ post, index, deletePost }) => {
  const navigate = useNavigate();

  return (
    <li
      key={post.id}
      className="group bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl p-5 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      {/* Clickable Content */}
      <Link
        to={`${post.id}`}
        className="block flex-1 group-hover:text-indigo-600 transition-colors"
      >
        <h2 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 flex items-baseline gap-2">
          <span className="text-xs font-mono px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 pr-4">
          {post.body}
        </p>
      </Link>

      {/* Action Buttons */}
      <div className="flex md:flex-col lg:flex-row gap-2 justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-50">
        <button
          onClick={() => navigate(`/dashboard/create-post/${post.id}`)}
          className="flex-1 md:w-24 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          Edit
        </button>
        <button
          onClick={() => deletePost(post.id)}
          className="flex-1 md:w-24 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default PostCard;
