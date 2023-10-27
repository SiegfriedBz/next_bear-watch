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
  // user fetched from DB (not just from session)
  const [user, setUser] = useState(null)

  // help button state
  const [helpIsOpened, setHelpIsOpened] = useState(false)

  // Toast notifications helper
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
    <AppContext.Provider
      value={{ user, setUser, helpIsOpened, setHelpIsOpened, handleToast }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
