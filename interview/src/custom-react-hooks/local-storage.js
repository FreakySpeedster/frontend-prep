import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        let storedValue = JSON.parse(localStorage.getItem(key));
        storedValue ? storedValue : initialValue;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;


/*
Usage Example

import React from "react";
import useLocalStorage from "./useLocalStorage";

export default function App() {
    const [name, setName] = useLocalStorage("userName", "Guest");

    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => setName("John Doe")}>Set Name</button>
        </div>
    );
}


*/