import { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState(() => {
    //lazy initialize the post data from local storage if no data []
    try {
      const stored = localStorage.getItem("data");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error(`unable to initialize data${error}`);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  //if post exists in storage dont fetch posts
  useEffect(() => {
    if (data.length > 0) return;
    const fetchData = async () => {
      if (data.length > 0) return;
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        if (response.ok) {
          const dataApi = await response.json();
          setData(dataApi);
        }
      } catch (error) {
        console.log(`unable to fetch data ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  //set posts to storage if there are in post state
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  //add new post
  const addPost = (post) => {
    setData((prevData) => [post, ...prevData]);
  };

  //only delete if post exists and userId and matches post userId
  const deletePost = (id, userId) => {
    const postExist = data.find((d) => d.id === id);
    if (postExist && postExist.userId !== userId) {
      return { error: "you cant delete this post" };
    }
    setData((prevData) => prevData.filter((d) => d.id !== id));
  };
  //only allow edit if post exists and userId and matches post userId

  const updatePost = (id, post, userId) => {
    const existingPost = data.find((d) => d.id === id);
    if (existingPost && post.userId !== userId) {
      return { error: "you cant edit this post" };
    }
    setData((prevData) =>
      prevData.map((d) =>
        String(d.id) === String(post.id)
          ? { ...d, title: post.title, body: post.body }
          : d,
      ),
    );
  };

  return { data, addPost, deletePost, updatePost, loading };
};

export default useFetchData;
