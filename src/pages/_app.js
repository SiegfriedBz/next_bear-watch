import Head from 'next/head'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'
import RootLayout from '@/components/layouts/RootLayout'
import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import generateSocialImage from '@/utils/generateSocialImage'
config.autoAddCss = false

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const socialImageConf = generateSocialImage({
  title: 'Bear Watch',
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  imagePublicID: 'og_social_bear_watch',
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <SessionProvider session={session}>
        <RootLayout imageUrl={socialImageConf}>
          <Component {...pageProps} />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-L692E7HF9N`}
          />
          <Script id='google-analytics'>
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-L692E7HF9N');
        `}
          </Script>
        </RootLayout>
      </SessionProvider>
    </>
  )
}
