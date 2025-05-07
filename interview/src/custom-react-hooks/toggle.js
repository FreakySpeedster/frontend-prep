import { useState, useCallback } from 'react';

export default function useToggle(defaultState) {
    const [item, setItem] = useState(defaultState);

    const toggle = useCallback(() => {
        setItem((prev) => !prev);
    }, []);

    const setTrue = useCallback(() => setItem(true), []);
    const setFalse = useCallback(() => setItem(false), []);

    return [item, toggle, setTrue, setFalse];
}