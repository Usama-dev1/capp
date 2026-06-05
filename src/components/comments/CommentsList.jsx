import { useState } from "react";
const CommentsList = ({ comments, session, deleteComment, updateComment }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingBody, setEditingBody] = useState("");

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const isCommentOwner = String(session?.id) === String(comment.userId);

        return (
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
              {/* edit comment toggle between form and comment text */}
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

            {/* show Edit/Delete button only for users own comments else hide */}
            {session && isCommentOwner && (
              <div className="w-full flex justify-end mt-2 gap-2">
                {editingId === comment.id ? (
                  <>
                    <button
                      onClick={() => {
                        if (!editingBody.trim()) return;
                        updateComment(
                          comment.id,
                          {
                            body: editingBody.trim(),
                          },
                          session?.id,
                        );
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
                      className="btn-secondary btn-sm hover:bg-blue-muted/60"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id, session?.id)}
                      className="btn-destructive btn-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
