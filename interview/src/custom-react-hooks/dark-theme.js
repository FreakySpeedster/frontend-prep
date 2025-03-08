/**
 * Custom hook to manage and persist dark theme state.
 * - Retrieves the theme preference from localStorage on initial render.
 * - Updates localStorage whenever the theme changes.
 * - Adds or removes the 'dark-theme' class on the document body.
 * 
 * @returns [darkTheme, setDarkTheme] - State and setter function for toggling the theme.

 * Usage
 * const [darkTheme, setDarkTheme] = useDarkTheme();
 * setDarkTheme(!darkTheme); 

*/

import { useEffect, useState } from 'react';

const useDarkTheme = () => {
    const [darkTheme, setDarkTheme] = useState(() => {
        return JSON.parse(localStorage.getItem('dark-theme')) || false;
    });
    useEffect(() => {
        localStorage.setItem('dark-theme', JSON.stringify(darkTheme));
        if (darkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [darkTheme]);
    return [darkTheme, setDarkTheme];
}

export default useDarkTheme;