import Navbar from '../Navbar'
import Footer from '../Footer'

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto'>{children}</main>
      <Footer />
    </>
  )
}

export default RootLayout
