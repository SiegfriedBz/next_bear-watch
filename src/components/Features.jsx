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
    <div className='flex flex-col space-y-4'>
      <div id='features-header'>
        <h2 className='text-color text-center font-extrabold'>
          Bear Watch&apos;s Key Features
        </h2>
        <p>
          <span className='text-color font-semibold italic'>Bear Watch </span>is
          your ultimate companion for outdoor adventures. Whether you&apos;re an
          enthusiastic hiker, seasoned camper, or a nature lover, our app offers
          three essential features to{' '}
          <span className='text-color font-semibold italic'>
            keep you safe and connected
          </span>
          .
        </p>
      </div>

      <div id='features-content' className='flex flex-col space-y-4'>
        <div>
          <h3
            onClick={() => router.push('/#map')}
            className='flex items-center space-x-2 font-bold'
          >
            <FontAwesomeIcon
              icon={faEye}
              className='text-secondary dark:text-secondary-light rounded-full text-2xl'
            />
            <span className='text-color'>Explore Bear Sightings</span>
          </h3>
          <p>
            <Link
              href='/#map'
              target='_self'
              className='text-color font-semibold italic'
            >
              View bear markers
            </Link>{' '}
            added by fellow hikers. Gain insights into recent bear sightings, so
            you can make informed decisions about your route and stay vigilant
            during your outdoor journey.
          </p>
        </div>

        <div>
          <h3
            onClick={() => router.push('/#map')}
            className='flex items-center space-x-2 font-bold'
          >
            <Logo
              smallLogo={true}
              className='dark:bg-secondary-light bg-secondary h-7 w-7'
            />
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
                  className='text-color whitespace-nowrap font-semibold italic'
                >
                  Sign in
                </button>{' '}
                <span>with Google.</span>
              </p>
            </li>
            <li>
              <p>
                <span className='text-color font-semibold italic'>Switch </span>{' '}
                the map to
                <span className='text-color font-semibold italic'>
                  {' '}
                  add mode
                </span>
                .
              </p>
            </li>
            <li>
              <p>
                <span className='text-color font-semibold italic'>
                  Add your own bear markers{' '}
                </span>
                by simply tapping on the map.
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h3
            onClick={() => setHelpIsOpened(true)}
            className='flex items-center space-x-2 font-bold'
          >
            <span className='dark:bg-secondary-light bg-secondary flex h-7 w-7 items-center justify-center rounded-full'>
              <FontAwesomeIcon
                icon={faHelicopter}
                className='dark:text-cfg-black text-cfg-white rounded-full text-sm'
              />
            </span>
            <span>Get Help When You Need It</span>
          </h3>

          <p>
            The{' '}
            <span className='text-color font-semibold italic'>
              {' '}
              Get Help feature
            </span>{' '}
            is your lifeline in emergencies. Quickly send your current location
            to a trusted friend, complete with your blood group information and
            a link to your precise coordinates on Google Maps. Stay connected
            and ensure a swift response when you require assistance.
          </p>
          <ul className='ms-4 mt-2 list-decimal'>
            <li>
              <p>
                <button
                  onClick={() => signIn({ callbackUrl: '/' })}
                  className='text-color whitespace-nowrap font-semibold italic'
                >
                  Sign in
                </button>{' '}
                <span>with Google.</span>
              </p>
            </li>
            <li>
              <p>
                <Link
                  href='/my-profile'
                  target='_self'
                  className='text-color font-semibold italic'
                >
                  Update your Profile page
                </Link>{' '}
              </p>
              <ul className='ms-8 list-disc'>
                <li>
                  <p>
                    <span className='font-light italic'>
                      Add{' '}
                      <span className='text-color font-semibold italic'>
                        a friend Whatsapp number.{' '}
                      </span>
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className='font-light italic'>
                      Add{' '}
                      <span className='text-color font-semibold italic'>
                        your blood group type.{' '}
                      </span>
                    </span>
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <span className='text-color font-semibold italic'>
                  Enable location access
                </span>{' '}
                <span>on your device.</span>
              </p>
            </li>
            <li>
              <p>
                <span
                  onClick={() => setHelpIsOpened(true)}
                  className='inline-flex items-center space-x-2'
                >
                  <span className='text-color font-semibold italic'>Click</span>
                  <span> the </span>
                  <span className='text-color font-semibold italic'>
                    Get Help button
                  </span>
                  <span className='bg-cfg-white flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-warning'>
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
      </div>
    </div>
  )
}

export default Features
