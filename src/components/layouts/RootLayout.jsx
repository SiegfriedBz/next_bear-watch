import Navbar from '../Navbar'
import Footer from '../Footer'

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default RootLayout
