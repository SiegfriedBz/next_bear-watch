import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { useAppContext } from '@/context/appContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faHelicopter } from '@fortawesome/free-solid-svg-icons'
import { Logo } from './Logo'

const Features = () => {
  const router = useRouter()
  const { setHelpIsOpened } = useAppContext()

  return (
    <>
      <h2 className='text-center font-bold'>Bear Watch&apos;s Key Features</h2>
      <p>
        Bear Watch is your ultimate companion for outdoor adventures. Whether
        you&apos;re an enthusiastic hiker, seasoned camper, or a nature lover,
        our app offers three essential features to keep you safe and connected:
      </p>

      <div className='my-6'>
        <h3
          onClick={() => router.push('/#map')}
          className='flex items-center space-x-2 font-bold'
        >
          <FontAwesomeIcon
            icon={faEye}
            className='rounded-full p-[0.05rem] text-xl ring-2 ring-success'
          />
          <span>Explore Bear Sightings</span>
        </h3>
        <p>
          <Link href='/#map' target='_self' className='font-semibold italic'>
            View bear markers
          </Link>{' '}
          added by fellow hikers. Gain insights into recent bear sightings, so
          you can make informed decisions about your route and stay vigilant
          during your outdoor journey.
        </p>
      </div>

      <div className='my-6'>
        <h3
          onClick={() => router.push('/#map')}
          className='flex items-center space-x-2 font-bold'
        >
          <Logo className='h-6 w-6 ring-2 ring-success' />
          <span>Mark Your Bear Encounters</span>
        </h3>
        <p>
          Share your experience and help create a bear encounters community to
          benefit all outdoor enthusiasts.
        </p>
        <ul className='ms-4 mt-2 list-decimal'>
          <li>
            <p>
              <button
                onClick={() => signIn({ callbackUrl: '/' })}
                className='whitespace-nowrap text-lg font-semibold italic'
              >
                Sign in
              </button>{' '}
              <span>with Google.</span>
            </p>
          </li>
          <li>
            <p>
              <span className='font-semibold italic'>Switch </span> the map to
              <span className='font-semibold italic'> edit mode</span>.
            </p>
          </li>
          <li>
            <p>
              <span className='font-semibold italic'>
                Add your own bear markers{' '}
              </span>
              by simply tapping on the map.
            </p>
          </li>
        </ul>
      </div>

      <div className='my-6'>
        <h3
          onClick={() => setHelpIsOpened(true)}
          className='flex items-center space-x-2 font-bold'
        >
          <span className='flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 ring-2 ring-success'>
            <FontAwesomeIcon
              icon={faHelicopter}
              className='rounded-full text-sm font-extrabold text-slate-900'
            />
          </span>
          <span>Get Help When You Need It</span>
        </h3>

        <p>
          The <span className='font-semibold italic'> Get Help feature</span> is
          your lifeline in emergencies. Quickly send your current location to a
          trusted friend, complete with your blood group information and a link
          to your precise coordinates on Google Maps. Stay connected and ensure
          a swift response when you require assistance.
        </p>
        <ul className='ms-4 mt-2 list-decimal'>
          <li>
            <p>
              <button
                onClick={() => signIn({ callbackUrl: '/' })}
                className='whitespace-nowrap text-lg font-semibold italic'
              >
                Sign in
              </button>{' '}
              <span>with Google.</span>
            </p>
          </li>
          <li>
            <p>
              <Link
                href='/profile'
                target='_self'
                className='font-semibold italic'
              >
                Update your Profile page
              </Link>{' '}
            </p>
            <ul className='ms-8 list-disc'>
              <li>
                <p>
                  <span className='font-light italic'>
                    Add{' '}
                    <span className='font-semibold italic'>
                      a friend Whatsapp number.{' '}
                    </span>
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span className='font-light italic'>
                    Add{' '}
                    <span className='font-semibold italic'>
                      your blood group type.{' '}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              <span className='font-semibold italic'>
                Enable location access
              </span>{' '}
              <span>on your device.</span>
            </p>
          </li>
          <li>
            <p>
              <span
                onClick={() => setHelpIsOpened(true)}
                className='inline-flex items-center space-x-2 font-semibold italic'
              >
                <span>Click the Get Help button</span>
                <span className='flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 ring-2 ring-warning'>
                  <FontAwesomeIcon
                    icon={faHelicopter}
                    className='rounded-full text-sm font-extrabold text-warning'
                  />
                </span>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Features
