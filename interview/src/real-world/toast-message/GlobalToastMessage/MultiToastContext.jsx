import { createContext, useContext, useState } from "react";

const MultiToastContext = createContext();

export const MultiToastProvider = ({children}) => {
    const [toasts, setToasts] = useState([]);
    const triggerToast = ({messageType, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, {id, message, messageType}]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((item) => {
                return item.id !== id
            }));
        }, 3000);
    }
    return (
        <MultiToastContext.Provider value={{triggerToast, toasts}} >
            {children}
        </MultiToastContext.Provider>
    );
}

export const useMultiToast = () => useContext(MultiToastContext);