import { useEffect, useState } from "react";
import React from "react";

const SUCCESS = 'success'

export default function ToastMessage({messageType, message}) {
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const toastTimer = setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return () => clearTimeout(toastTimer);
    }, [message, messageType]);

    if (!showToast) return null;
    return (
         <div className={`container-class  ${messageType === SUCCESS ? 'success-container' : 'failure-container'}`}>
                {message}
        </div>
    )

}