import { useState } from "react";
import { v4 as uuid } from "uuid";

const CommentPostForm = ({ id, session, addComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!session) {
      alert("Please login to comment");
      return;
    }

    if (!newComment.trim()) return;

    addComment({
      postId: id,
      id: uuid(),
      userId: session.id,
      name: session.name || "User",
      email: session.email,
      body: newComment.trim(),
      createdAt: new Date().toISOString(),
    });

    setNewComment("");
  };

  return (
    <form
      onSubmit={handleSubmitComment}
      className="mt-6 pt-6 border-t border-gray-100"
    >
      <label
        htmlFor="comment"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Add a comment
      </label>
      <div className="flex flex-col gap-3">
        <textarea
          id="comment"
          rows="3"
          className="w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Write your thoughts here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="btn-secondary btn-sm hover:bg-blue-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentPostForm;
