import Navbar from '../Navbar'
import Footer from '../Footer'

const RootLayout = ({ children }) => {
  return (
    <div className='p-2'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default RootLayout
