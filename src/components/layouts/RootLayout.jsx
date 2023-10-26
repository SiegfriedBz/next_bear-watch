import Navbar from '../Navbar'
import Footer from '../Footer'
import PageLayout from './PageLayout'

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <PageLayout>{children}</PageLayout>
      <Footer />
    </>
  )
}

export default RootLayout
