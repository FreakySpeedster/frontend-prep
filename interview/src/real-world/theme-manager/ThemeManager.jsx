import { createContext, useContext, useEffect, useState } from "react";

const ThemeManagerContext = createContext();

export const ThemeManagerProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        return JSON.parse(localStorage.getItem('theme')) || 'default-theme';
    });
    useEffect(() => {
        const previousTheme = document.body.getAttribute("data-theme"); // Store previous theme
        if (previousTheme) {
            document.body.classList.remove(previousTheme); // Remove previous theme
        }
        localStorage.setItem('theme', JSON.stringify(theme));
        document.body.classList.add(theme);
        document.body.setAttribute('data-theme', theme);
    }, [theme]);
    return (
        <ThemeManagerContext.Provider value={{theme, setTheme}} >
            {children}
        </ThemeManagerContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeManagerContext);