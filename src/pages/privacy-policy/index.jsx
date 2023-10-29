import Head from 'next/head'
import PageLayout from '@/components/layouts/PageLayout'

const meta = {
  title: 'Bear Watch | Privacy Policy',
  description:
    'At Bear Watch, we are committed to protecting your privacy and ensuring the security of your personal information.',
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
        <h1>Privacy Policy</h1>
        <p>
          At Bear Watch, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy outlines the data we collect and how we use it.
        </p>
        <ul>
          <li>
            <h2>Information We Collect</h2>
            <ul>
              <li>
                <h3>Account Information</h3>
                <p>
                  When you create an account with Bear Watch, we collect your
                  email address and any additional information you choose to
                  provide, such as your blood group and a friend&apos;s contact
                  number.
                </p>
              </li>
              <li>
                <h3>Location Data</h3>
                <p>
                  If you choose to use the
                  <span className='text-color font-semibold italic'>
                    {' '}
                    Get Help feature
                  </span>
                  , we collect your current location to generate a message with
                  your coordinates.
                </p>
              </li>
              <li>
                <h3>Usage Information</h3>
                <p>
                  We collect data about how you use the app, including the
                  markers you add to the map.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>
                <h3>Get Help feature</h3>
                <p>
                  We use your email address for authentication and
                  communication. Your blood group and friend&apos;s contact
                  number are stored for the{' '}
                  <span className='text-color font-semibold italic'>
                    Get Help feature
                  </span>{' '}
                  to send emergency messages.
                </p>
              </li>
              <li>
                <h3>Location Data</h3>
                <p>
                  Your location data is used to generate a message for your
                  chosen friend in case of emergencies.
                </p>
              </li>
              <li>
                <h3>Usage Information</h3>
                <p>
                  We analyze usage data to improve the app&apos;s features and
                  performance.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <h2>Data Sharing</h2>
            <p>
              We do not share your personal information with third parties,
              except as required by law or to fulfill our services.
            </p>
          </li>
          <li>
            <h2>Security</h2>
            <p>
              We employ industry-standard security measures to protect your
              data.
            </p>
          </li>
        </ul>
      </PageLayout>
    </>
  )
}

export default index
