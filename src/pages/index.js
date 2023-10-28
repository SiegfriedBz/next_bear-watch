import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { useAppContext } from '@/context/appContext'
import { prisma } from '../../server/db/prismaClient'
import HomePageLayout from '@/components/layouts/HomePageLayout'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import MapView from '@/components/MapView'
import ButtonSwitch from '@/components/ButtonSwitch'

const meta = {
  title: 'Bear Watch | Home',
  description:
    'Discover Bear Watch, Explore Bear Sightings, Mark Your Bear Encounters, Send SOS Message and Get Help When You Need It!',
}

export default function Home(props) {
  const { setUser, handleToast } = useAppContext()
  const [bearMarkers, setBearMarkers] = useState(null)
  const [isMapEditMode, setIsMapEditMode] = useState(false)
  const [isFilteredMap, setIsFilteredMap] = useState(false)
  const [isCenteredMap, setIsCenteredMap] = useState(false)
  const { status } = useSession()

  useEffect(() => {
    // set user on appContext
    setUser(props?.user)
    // set local state
    setBearMarkers(props?.bearMarkers)
  }, [props, setUser])

  const isAuthenticated = () => {
    return status === 'authenticated'
      ? true
      : handleToast({
          type: 'info',
          message: 'Please sign-in to add your own bear sights.',
        }) && false
  }

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

        <section id='sub-hero'>
          <section id='features' className='my-8 scroll-mt-24 px-4'>
            <Features />
          </section>

          <hr />

          <div id='home-map' className='scroll-mt-24 px-2'>
            <h2 className='text-center font-bold'>Bear Sighting Map</h2>

            <p>Tap the switches to enable the map features.</p>
            <ul className='my-4 ms-4 list-disc space-y-2'>
              <li>
                <p>
                  <span className='font-semibold italic'>Filter </span>
                  <span> to </span>
                  <span className='font-semibold'> show last week</span>
                  <span> bear sights.</span>
                </p>
              </li>
              <li>
                <p>
                  <span className='font-semibold italic'>Center </span>
                  the
                  <span className='font-semibold'> map on you</span>
                  <span> (requires device access to your location).</span>
                </p>
              </li>
              <li>
                <p>
                  <span className='font-semibold'>Switch</span> to{' '}
                  <span className='font-semibold italic'>edit mode</span>, and{' '}
                  <span className='font-semibold'>click on the map</span>{' '}
                  <span> to </span>
                  <span className='font-semibold'>
                    add your own bear sights
                  </span>
                  .
                </p>
              </li>
            </ul>

            <div className='mb-1 mt-4 flex w-full items-center justify-start space-x-16'>
              <ButtonSwitch
                label='Filter'
                isChecked={isFilteredMap}
                onChange={() => setIsFilteredMap((prev) => !prev)}
                className='my-2'
              />
              <ButtonSwitch
                label='Center'
                isChecked={isCenteredMap}
                onChange={() => setIsCenteredMap((prev) => !prev)}
                className='my-2'
              />
              <ButtonSwitch
                label='Edit'
                isChecked={isMapEditMode}
                onChange={() => {
                  isAuthenticated() && setIsMapEditMode((prev) => !prev)
                }}
                className='my-2'
              />
            </div>

            <MapView
              isFilteredMap={isFilteredMap}
              isCenteredMap={isCenteredMap}
              isMapEditMode={isMapEditMode}
              bearMarkers={bearMarkers}
              setBearMarkers={setBearMarkers}
            />
          </div>
        </section>
      </HomePageLayout>
    </>
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
