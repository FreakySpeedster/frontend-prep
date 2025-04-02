import { useState, useEffect, useRef } from 'react';

const SocialMediaFeed = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const limit = 10;
    const observer = useRef();

    const fetchMorePosts = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            let results = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${(page-1)*10}`);
            results = await results.json();
            setPosts((prev) => [...prev, ...results.posts]);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchMorePosts();
            }
        });
        if (document.getElementById('load-more')) {
            observer.current.observe(document.getElementById('load-more'));
        }
        return () => observer.current?.disconnect();
    }, [posts]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Social Media</h1>
            {posts.map((post) => (
                <div style={{border: '1px solid black', borderRadius: '10px', 
                width: '500px', padding: '10px', marginBottom: '10px'}}key={post.id}>
                    <h3>{post.title}</h3>
                    <span>{post.body}</span>
                </div>
            ))}
            <div id='load-more'>
                {isLoading && <span>Loading more</span>}
            </div>

        </div>
    )
}

export default SocialMediaFeed;