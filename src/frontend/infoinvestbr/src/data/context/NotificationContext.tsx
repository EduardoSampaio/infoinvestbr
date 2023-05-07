import { createContext, useState } from "react";

interface NotificationContextProps {
    setVisible?: (message : string, type: 'success' | 'error' | 'info' | 'warning') => void
    showNotification?: boolean
    handleClose?: () => void
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' 
}

const NotificationContext = createContext<NotificationContextProps>({message: "", type: 'success'});

export function NotificationProvider(props: any) {
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>('success')

    function setVisible(message : string, type: 'success' | 'error' | 'info' | 'warning') {
        setShowNotification(true)
        setMessage(message)
        setType(type)
    }

    function handleClose() {
      setShowNotification(false)
    }

    return (
        <NotificationContext.Provider
          value={{
            setVisible,
            type,
            message,
            showNotification,
            handleClose
          }}
        >
          {props.children}
        </NotificationContext.Provider>
    )
} 

export default NotificationContext;