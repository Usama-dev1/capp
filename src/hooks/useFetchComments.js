import { useEffect, useState } from "react";

// module-level plain object — not a hook, survives remounts
const lastComm = { current: null };

const useFetchComments = (postId) => {
  const [comments, setComments] = useState(() => {
    try {
      const stored = localStorage.getItem(`comments_${postId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`comments_${postId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();

        if (lastComm.current && lastComm.current !== postId) {
          localStorage.removeItem(`comments_${lastComm.current}`);
        }

        lastComm.current = postId;
        setComments(data);
      } catch (error) {
        console.error("unable to fetch comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    if (comments.length === 0) return;
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
  }, [comments, postId]);

  const addComment = (comm) => {
    setComments((prev) => [...prev, comm]);
  };

  const deleteComment = (id, userId) => {
    const comment = comments.find((c) => c.id === id);
    if (comment && comment.userId !== userId) {
      return { error: "you cant delete this comment" };
    }
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const updateComment = (id, comm, userId) => {
    const comment = comments.find((c) => c.id === id);
    if (comment && comment.userId !== userId) {
      return { error: "you cant edit this post" };
    }
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, body: comm.body } : c)),
    );
  };

  return { comments, addComment, deleteComment, updateComment, loading };
};

export default useFetchComments;
