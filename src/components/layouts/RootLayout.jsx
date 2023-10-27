import { useRouter } from 'next/router'
import { AppContextProvider } from '@/context/appContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Helicopter from '../Helicopter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'

const RootLayout = (props) => {
  const { children, ...customMeta } = props

  const router = useRouter()

  const meta = {
    canonicalUrl: `https://bear-watch.vercel.app/${router.asPath}`,
    ...customMeta,
  }

  return (
    <>
      <Head>
        <meta name='robots' content='follow, index' />
        <meta name='keywords' content='Bear Watch'></meta>
        <meta
          property='og:url'
          content={`https://bear-watch.vercel.app${router.asPath}`}
        />
        <link rel='canonical' href={meta.canonicalUrl} />
        <meta property='og:site_name' content='Bear Watch' />
        <meta property='og:image' content={meta.imageUrl} />
      </Head>

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
    </>
  )
}

export default RootLayout
