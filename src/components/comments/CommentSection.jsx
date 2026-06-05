import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useFetchComments from "../../hooks/useFetchComments";
import CommentsList from "./CommentsList";
import CommentPostForm from "./CommentPostForm";
const CommentSection = () => {
  const { id } = useParams();
  const { session } = useAuth();
  const { comments, deleteComment, addComment, updateComment } =
    useFetchComments(id);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Comments ({comments ? comments.length : 0})
        </h2>
      </div>

      {/* Dynamic Comments List */}
      {comments && comments.length > 0 ? (
        <CommentsList
          comments={comments}
          session={session}
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      ) : (
        <p className="text-sm text-gray-400 italic py-4">No comments yet</p>
      )}

      {/* show comment form if user is logged in */}
      {session ? (
        <CommentPostForm id={id} session={session} addComment={addComment} />
      ) : (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-4">
            Please{" "}
            <a
              href="/login"
              className="font-bold text-blue-600 hover:underline"
            >
              <span className="mx-1 btn-secondary btn-sm">login</span>
            </a>
            to comment.
          </p>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
