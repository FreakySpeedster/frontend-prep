import { useToast } from "./ToastContext";

export const Toast = () => {
    const { showToast, message, messageType} = useToast();
    if (!showToast) return null;
    return (
        <div style={{boxShadow: 'inset 1px 10px 10px', backgroundColor: messageType === 'success' ? '#fff' : '#000'}}>
            {message}
        </div>
    );
}