import { useTheme } from "../../theme-manager/ThemeManager";
import { useMultiToast } from "./MultiToastContext";
// import { useToast } from "./ToastContext";

export const Toast = () => {
    const {theme, setTheme} = useTheme();
    // const { showToast, message, messageType} = useToast();
    const {toasts} = useMultiToast();

    // if (!showToast) return null;
    if (toasts.length === 0) return null;
    return (
        <div>
            {toasts.map((singleToast) => (
                <div key={singleToast.id} style={{boxShadow: 'inset 1px 10px 10px', backgroundColor: singleToast.messageType === 'success' && theme === 'default-theme' ? '#fff' : '#000'}}>
                {singleToast.message}
            </div>
            ))}
        </div>
        
    );
}