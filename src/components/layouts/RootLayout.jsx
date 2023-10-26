import Navbar from '../Navbar'
import Footer from '../Footer'
import { AppContextProvider } from '@/context/appContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Helicopter from '../Helicopter'

const RootLayout = ({ children }) => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <AppContextProvider>
        <main className='container mx-auto'>
          <>
            {children}

            <ToastContainer />

            <Helicopter />
          </>
        </main>
      </AppContextProvider>
      <Footer />
    </div>
  )
}

export default RootLayout
