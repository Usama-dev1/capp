import { useEffect, useState, useRef } from "react";
const useFetchComments = (postId) => {
  //lazy iniiallize the commentt check if the comments already in storage for this post
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
    //fetch comments for the post
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
  //keep the localstorage sync with post comments when ever post changes and new comment is added
  useEffect(() => {
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
  }, [comments, postId]);

  //add new comment to comments array
  const addComment = (comm) => {
    setComments((prev) => [...prev, comm]);
  };

  //check if comment exists and the comment id and userId matches then allow to delete the comment
  const deleteComment = (id, userId) => {
    const comment = comments.find((c) => c.id === id);
    if (comment && comment.userId !== userId) {
      return { error: "you cant delete this comment" };
    }
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const updateComment = (id, comm, userId) => {
    //check if comment exists and the comment id and userId matches then allow to edit the comment
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
