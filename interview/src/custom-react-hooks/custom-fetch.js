import {useState, useEffect, useRef} from 'react';
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
        const controller = new AbortController();  // Create a new AbortController
        const { signal } = controller;             // Extract the signal
        fetch(url, {signal}).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong while fetching data');
            }
            return response.json();
        }).then((formattedResponse) => {
            setData(formattedResponse);
            cache.current[url] = formattedResponse;
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
        return () => controller.abort();
    }, [url]);

    return {data, loading, error};
}

