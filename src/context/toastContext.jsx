import { createContext, useContext } from 'react'
import { toast } from 'react-toastify'

const ToastContext = createContext(null)
export const useToastContext = () => {
  if (!ToastContext) {
    throw new Error('useToastContext must be used within ToastContextProvider')
  }

  return useContext(ToastContext)
}

export const ToastProvider = ({ children }) => {
  const handleToast = ({ type = 'success', message = '' }) => {
    switch (type) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      case 'warn':
        toast.warn(message)
        break
      default:
        toast.success(message)
    }
  }

  return (
    <ToastContext.Provider value={{ handleToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
