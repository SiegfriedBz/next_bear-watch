import Head from 'next/head'
import PageLayout from '@/components/layouts/PageLayout'

const meta = {
  title: 'Bear Watch | Terms of Service',
  description: 'By using Bear Watch, you agree to our terms and conditions.',
}

const index = () => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name='description' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
      </Head>

      <PageLayout>
        <h1>Terms of Service</h1>
        <p>By using Bear Watch, you agree to these terms and conditions: </p>
        <ul>
          <li>
            <h2>Registration</h2>
            <p>
              You must provide accurate and complete information when creating
              an account.
            </p>
          </li>
          <li>
            <h2>Privacy</h2>
            <p>
              You agree to our Privacy Policy and how we collect, use, and
              protect your data.
            </p>
          </li>
          <li>
            <h2>User Responsibilities</h2>
            <p>
              You are responsible for your actions on the app, including the
              content you add and messages you send.
            </p>
          </li>
          <li>
            <h2>Emergency Services</h2>
            <p>
              The{' '}
              <span className='text-color font-semibold italic'>
                Get Help feature
              </span>{' '}
              is intended for emergencies. You agree to use it responsibly.
            </p>
          </li>
        </ul>
      </PageLayout>
    </>
  )
}

export default index
