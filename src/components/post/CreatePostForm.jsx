import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useAuth } from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router";

const CreatePostForm = () => {
  const { session } = useAuth(); 
  const { addPost } = useFetchData();
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const navigate = useNavigate();

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPost.trim() || !newTitle.trim()) return;

    addPost({
      id: uuid(),
      userId: session?.id,
      title: newTitle.trim(),
      body: newPost.trim(),
      createdAt: new Date().toISOString(),
    });

    setNewTitle("");
    setNewPost("");
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
            value={newTitle} // FIXED: Tied to newTitle state
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
            value={newPost} // FIXED: Tied to newPost state
            onChange={(e) => setNewPost(e.target.value)}
            required
          />
        </div>

        {/* Action Button Row */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!newTitle.trim() || !newPost.trim()}
            className="btn-secondary btn-lg  hover:bg-blue-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            Publish Post
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
