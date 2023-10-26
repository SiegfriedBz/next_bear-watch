import { useState, createContext, useContext } from 'react'
import { toast } from 'react-toastify'

const AppContext = createContext(null)
export const useAppContext = () => {
  if (!AppContext) {
    throw new Error('useAppContext must be used within AppContextProvider')
  }

  return useContext(AppContext)
}

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

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
    <AppContext.Provider value={{ user, setUser, handleToast }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
