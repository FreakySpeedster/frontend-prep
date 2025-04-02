import { useState, useContext, createContext } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({children}) => {
  const [showToast, setShowToast] = useState(false);
  const [messageType, setMessageType] = useState('success');
  const [message, setMessage] = useState('');

  const triggerToast = ({messageType, message}) => {
    setMessageType(messageType);
    setMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <ToastContext.Provider value={{triggerToast, showToast, message, messageType}}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext);