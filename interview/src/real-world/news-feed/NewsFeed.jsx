import { useEffect, useState, useRef } from "react";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    fetchMorePosts();
  }, []);

  const fetchMorePosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`);
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePosts();
      }
    });
    if (document.getElementById("load-more")) {
      observer.current.observe(document.getElementById("load-more"));
    }
    return () => observer.current && observer.current.disconnect();
  }, [posts]);

  return (
    <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>News Feed</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '0.75rem' }}>
            <h2 style={{ fontWeight: '600' }}>{post.title}</h2>
            <p style={{ fontSize: '0.875rem', color: '#4a4a4a' }}>{post.body}</p>
          </li>
        ))}
      </ul>
      <div id="load-more" style={{ height: '2.5rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading && <p>Loading more posts...</p>}
      </div>
    </div>
  );
};

export default NewsFeed;
