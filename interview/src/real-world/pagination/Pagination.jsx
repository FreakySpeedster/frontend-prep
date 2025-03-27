import { useState, useEffect, useRef, useLayoutEffect } from "react";


export default function Pagination() {
    const [results, setResults] = useState([]);
    const [currentSkip, setCurrentSkip] = useState(0);
    const myRef = useRef(null);

    const fetchData = async () => {
        let response = await fetch(`https://dummyjson.com/recipes?limit=10&skip=${currentSkip}`);
        response = await response.json();
        setResults(prev => [...prev, ...response.recipes]);
        setCurrentSkip(prev => prev + 10);
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        myRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [results]);
    return (
        <div className={{display: 'flex', flexDirection: 'column'}}>
            {results.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
            <div ref={myRef} />
            <button key='show-more-btn' onClick={fetchData}>Show More</button>
        </div>
    )
}