import { ToastProvider } from '@/context/toastContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PageLayout = ({ children }) => {
  return (
    <ToastProvider>
      <main className='container mx-auto'>
        <>
          {children}
          <ToastContainer />
        </>
      </main>
    </ToastProvider>
  )
}

export default PageLayout
