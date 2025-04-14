import {useState, useEffect, useRef} from 'react';

/**
 * Custom hook to fetch data from a given URL with caching and abort support.
 * 
 * @param {string} url - The API endpoint to fetch data from.
 * @returns {object} - An object containing the fetched data, loading status, and error.
 */

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const cache = useRef({});

    useEffect(() => {
        if (cache.current[url]) {
            setData(cache.current[url]);
            return;
        }
        setLoading(true);
        
        // Create a new AbortController instance for this fetch
        const controller = new AbortController();

        // The `signal` allows us to associate this fetch with the controller
        const { signal } = controller;

        fetch(url, {signal}).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong while fetching data');
            }
            return response.json();
        }).then((formattedResponse) => {
            setData(formattedResponse);
            cache.current[url] = formattedResponse;
        }).catch((error) => {
            // If fetch was aborted, we can ignore the error
            if (error.name === 'AbortError') return;

            setError(error);
        }).finally(() => {
            setLoading(false);
        });
        // Cleanup function: this runs when the component unmounts or before the next effect
        return () => {
            // Abort the fetch request if it's still ongoing
            // This prevents updating state on an unmounted component and avoids memory leaks
            controller.abort();
        };
    }, [url]);

    return {data, loading, error};
}

export default useFetch;

