import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useParams, useNavigate } from "react-router"; // Added useNavigate

import useFetchData from "../../hooks/useFetchData";

const EditPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePost } = useFetchData();

  const getPosts = localStorage.getItem("data");
  const allPosts = getPosts ? JSON.parse(getPosts) : [];
  const post = allPosts.find((p) => String(p.id) === id);

  const [newTitle, setNewTitle] = useState(post?.title || "");
  const [newPost, setNewPost] = useState(post?.body || "");

  if (!post) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="text-red-500 font-medium mb-4">
          Post not found or loading...
        </p>
        <button
          onClick={() => navigate("/dashboard/posts")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
        >
          Back to Posts
        </button>
      </div>
    );
  }

  const handleSubmitPost = (e) => {
    e.preventDefault();

    if (!newPost.trim() || !newTitle.trim()) return;

    updatePost({
      id,
      userId: post?.userId || uuid(),
      title: newTitle.trim(),
      body: newPost.trim(),
    });
    navigate("/dashboard/posts");
  };

  return (
    <>
      <form onSubmit={handleSubmitPost} className="space-y-5">
        {/* Title Input Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Post Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Enter an engaging title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>

        {/* Body Textarea Field */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Post Body
          </label>
          <textarea
            id="body"
            rows="5"
            className="w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Write your story or thoughts here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            required
          />
        </div>

        {/* Action Button Row */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!newTitle.trim() || !newPost.trim()}
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            Update Post
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPostForm;
