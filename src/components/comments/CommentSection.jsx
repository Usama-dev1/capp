import { useState } from "react";
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";
import useFetchComments from "../../hooks/useFetchComments";

const CommentSection = () => {
  const { id } = useParams();
  const { comments, deleteComment, addComment, updateComment } =
    useFetchComments(id);

  const [editingId, setEditingId] = useState(null);
  const [editingBody, setEditingBody] = useState("");

  // Local state for the comment input form
  const [newComment, setNewComment] = useState("");
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment({
      postId: id,
      id: uuid(),
      name: "Current User",
      email: "user@example.com",
      body: newComment.trim(),
    });

    setNewComment("");
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Comments ({comments ? comments.length : 0})
        </h2>
      </div>

      {/* Dynamic Comments List */}
      {comments && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between sm:items-start group transition hover:bg-gray-100/70"
            >
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800 text-sm">
                    {comment.name}
                  </span>
                  {comment.email && (
                    <span className="text-xs text-gray-400 font-normal">
                      {comment.email}
                    </span>
                  )}
                </div>

                {editingId === comment.id ? (
                  <textarea
                    rows={3}
                    value={editingBody}
                    onChange={(e) => setEditingBody(e.target.value)}
                    className="w-full p-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                ) : (
                  <p className="text-gray-700 text-sm leading-normal whitespace-pre-line">
                    {comment.body}
                  </p>
                )}
              </div>

              <div className="w-full flex justify-end mt-2 gap-2">
                {editingId === comment.id ? (
                  <>
                    <button
                      onClick={() => {
                        if (!editingBody.trim()) return;
                        updateComment(comment.id, {
                          body: editingBody.trim(),
                        });
                        setEditingId(null);
                        setEditingBody("");
                      }}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingBody("");
                      }}
                      className="text-xs font-medium text-gray-500 hover:text-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditingBody(comment.body || "");
                      }}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-700 transition opacity-80 group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic py-4">
          No comments yet. Be the first to say something!
        </p>
      )}

      {/* Interactive Add Comment Form */}
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
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CommentSection;
