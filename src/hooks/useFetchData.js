import { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem("data");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error(`unable to initialize data${error}`);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const addPost = (post) => {
    setData((prevData) => [post, ...prevData]);
  };

  const deletePost = (id) => {
    setData((prevData) => prevData.filter((d) => d.id !== id));
  };

  const updatePost = (post) => {
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
