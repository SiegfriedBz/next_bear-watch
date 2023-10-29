import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { useAppContext } from '@/context/appContext'
import { prisma } from '../../server/db/prismaClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faHelicopter } from '@fortawesome/free-solid-svg-icons'
import HomePageLayout from '@/components/layouts/HomePageLayout'
import { Logo } from '@/components/Logo'
import Hero from '@/components/Hero'
import MapView from '@/components/MapView'
import ButtonSwitch from '@/components/ButtonSwitch'

const meta = {
  title: 'Bear Watch | Home',
  description:
    'Discover Bear Watch, Explore Bear Sightings, Mark Your Bear Encounters, Send SOS Message and Get Help When You Need It!',
}

export default function Home(props) {
  const { status } = useSession()
  const { setUser, setBearMarkers } = useAppContext()
  // map filters mode - display only last week's bear sightings
  const [isWeeklyMap, setIsWeeklyMap] = useState(false)
  // center map on user location
  const [isCenteredMap, setIsCenteredMap] = useState(false)

  useEffect(() => {
    // set user & bearMarkers on appContext
    setUser(props?.user)
    setBearMarkers(props?.bearMarkers)
  }, [props, setUser, setBearMarkers])

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name='description' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
      </Head>

      <HomePageLayout>
        <section id='hero'>
          <Hero />
        </section>

        <section id='sub-hero' className='my-4 flex flex-col space-y-4'>
          <div id='features' className='scroll-mt-24 px-4'>
            <Features status={status} />
          </div>

          <hr />

          <div id='map' className='scroll-mt-24'>
            <div>
              <MapFeatures
                status={status}
                isWeeklyMap={isWeeklyMap}
                setIsWeeklyMap={setIsWeeklyMap}
                isCenteredMap={isCenteredMap}
                setIsCenteredMap={setIsCenteredMap}
              />
            </div>

            <div className='px-2'>
              <MapView
                isWeeklyMap={isWeeklyMap}
                isCenteredMap={isCenteredMap}
              />
            </div>
          </div>
        </section>
      </HomePageLayout>
    </>
  )
}

const Features = ({ status }) => {
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
              className='text-color font-semibold italic underline underline-offset-[3px]'
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
                  onClick={() =>
                    signIn('google', {
                      callbackUrl: '/my-profile#my-profile-map',
                    })
                  }
                  className='text-color whitespace-nowrap font-semibold italic underline underline-offset-[3px]'
                >
                  Sign in
                </button>{' '}
                <span>with Google.</span>
              </p>
            </li>
            <li>
              <p>
                <span>To </span>
                <span className='text-color font-semibold italic'>add </span>or
                <span className='text-color font-semibold italic'>
                  {' '}
                  delete{' '}
                </span>
                <span className='text-color font-semibold italic'>
                  your own bear sights
                </span>
                <span>, visit </span>
                {status === 'unauthenticated' ? (
                  <button
                    onClick={() =>
                      signIn('google', {
                        callbackUrl: '/my-profile#my-profile-map',
                      })
                    }
                    className='text-color font-semibold underline underline-offset-[3px]'
                  >
                    your Profile
                  </button>
                ) : (
                  <Link
                    href='/my-profile'
                    target='_self'
                    className='text-color font-semibold underline underline-offset-[3px]'
                  >
                    your Profile
                  </Link>
                )}
                .
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
                  className='text-color whitespace-nowrap font-semibold italic underline underline-offset-[3px]'
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
                  Update{' '}
                  <span className='underline underline-offset-[3px]'>
                    your Profile
                  </span>
                </Link>{' '}
              </p>
              <ul className='ms-8 list-disc'>
                <li>
                  <p>
                    <span className='font-light italic'>
                      Add{' '}
                      <span className='text-color font-semibold italic'>
                        a friend&apos;s Whatsapp number.{' '}
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

const MapFeatures = ({
  status,
  isWeeklyMap,
  setIsWeeklyMap,
  isCenteredMap,
  setIsCenteredMap,
}) => {
  return (
    <div className='px-2'>
      <div className='px-2'>
        <h2 className='text-center font-bold'>Bear Sighting Map</h2>

        <p>Tap the switches to enable the map features.</p>
        <ul className='my-4 ms-4 list-disc space-y-2'>
          <li>
            <p>
              <span className='text-color font-semibold italic'>Filter </span>
              <span> to show only</span>
              <span className='font-semibold italic text-warning dark:text-warning-light'>
                {' '}
                last week
              </span>
              <span> bear sights.</span>
            </p>
          </li>
          <li>
            <p>
              <span className='text-color font-semibold italic'>Center </span>
              the
              <span className='text-color font-semibold italic'>
                {' '}
                map on you
              </span>
              <span> (requires device access to your location).</span>
            </p>
          </li>
          <li>
            <p>
              <span>To </span>
              <span className='text-color font-semibold italic'>add </span>or
              <span className='text-color font-semibold italic'> delete </span>
              <span className='text-color font-semibold italic'>
                your own bear sights
              </span>
              <span>, visit </span>
              {status === 'unauthenticated' ? (
                <button
                  onClick={() =>
                    signIn('google', { callbackUrl: '/my-profile' })
                  }
                  className='text-color font-semibold underline underline-offset-[3px]'
                >
                  your Profile
                </button>
              ) : (
                <Link
                  href='/my-profile'
                  target='_self'
                  className='text-color font-semibold underline underline-offset-[3px]'
                >
                  your Profile
                </Link>
              )}
              .
            </p>
          </li>
        </ul>
      </div>

      <div
        id=''
        className='mt-4 flex w-full items-center justify-start space-x-16'
      >
        <ButtonSwitch
          label='Filter'
          isChecked={isWeeklyMap}
          onChange={() => setIsWeeklyMap((prev) => !prev)}
          className='my-2'
        />
        <ButtonSwitch
          label='Center'
          isChecked={isCenteredMap}
          onChange={() => setIsCenteredMap((prev) => !prev)}
          className='my-2'
        />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  const bearMarkers = await prisma.marker.findMany()

  // if no session, return only bearMarkers props
  if (!session) {
    return {
      props: {
        bearMarkers: JSON.parse(JSON.stringify(bearMarkers)),
      },
    }
  }

  // if session, server-side get full user data form DB
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      markers: true,
    },
  })

  // ...and pass user + bearMarkers as props to the Home page component, along with the session data to the SessionProvider
  return {
    props: {
      session,
      user: JSON.parse(JSON.stringify(user)),
      bearMarkers: JSON.parse(JSON.stringify(bearMarkers)),
    },
  }
}
