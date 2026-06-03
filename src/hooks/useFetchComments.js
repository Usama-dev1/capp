import { useEffect, useState } from "react";

const useFetchComments = (postId) => {
  const [comments, setComments] = useState(() => {
    try {
      const stored = localStorage.getItem(`comments_${postId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("unable to initialize comments", error);
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem(`comments_${postId}`);
    //check if comments exist don't refetch if zero then refetch
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
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
  }, [comments, postId]);

  const addComment = (comm) => {
    setComments((prev) => [comm, ...prev]);
  };

  const deleteComment = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const updateComment = (id, comm) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, body: comm.body } : c)),
    );
  };

  return { comments, addComment, deleteComment, updateComment, loading };
};

export default useFetchComments;
