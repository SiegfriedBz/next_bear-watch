import { useState, useEffect } from 'react'
import { useAppContext } from '@/context/appContext'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../server/db/prismaClient'
import HomePageLayout from '@/components/layouts/HomePageLayout'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import MapView from '@/components/MapView'
import ButtonSwitch from '@/components/ButtonSwitch'
import Head from 'next/head'

const meta = {
  title: 'Bear Watch | Home',
  description:
    'Discover Bear Watch, Explore Bear Sightings, Mark Your Bear Encounters, Send SOS Message and Get Help When You Need It!',
}

export default function Home(props) {
  const { setUser } = useAppContext()
  const [bearMarkers, setBearMarkers] = useState(null)
  const [isMapEditMode, setIsMapEditMode] = useState(false)
  const [isFilteredMap, setIsFilteredMap] = useState(false)
  const [isCenteredMap, setIsCenteredMap] = useState(false)

  useEffect(() => {
    // set user on appContext
    setUser(props?.user)
    // set local state
    setBearMarkers(props?.bearMarkers)
  }, [props, setUser])

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

          <div id='map' className='scroll-mt-24 px-2'>
            <h2 className='text-center font-bold'>Bear Sighting Map</h2>

            <div className='my-1 p-2'>
              <p>
                Display only{' '}
                <span className='font-semibold italic'>
                  last week bear sights
                </span>
                .
              </p>
              <ButtonSwitch
                label='Filter_Map'
                isChecked={isFilteredMap}
                onChange={() => setIsFilteredMap((prev) => !prev)}
                className='my-2'
              />
            </div>

            <div className='my-1 p-2'>
              <p>
                <span className='font-semibold italic'>Center </span>
                the
                <span className='font-semibold italic'> map around you</span>.
                <span className='block'>
                  (requires location access for your device.)
                </span>
              </p>
              <ButtonSwitch
                label='Center_Map'
                isChecked={isCenteredMap}
                onChange={() => setIsCenteredMap((prev) => !prev)}
                className='my-2'
              />
            </div>

            <div className='my-1 p-2'>
              <p>
                <button
                  onClick={() => signIn({ callbackUrl: '/' })}
                  className='whitespace-nowrap text-lg font-semibold italic'
                >
                  Sign in
                </button>
                , switch the map to{' '}
                <span className='font-semibold italic'>edit mode</span> and{' '}
                <span className='font-semibold italic'>
                  add your own bear markers
                </span>{' '}
                on a map click.
              </p>

              <ButtonSwitch
                label='Edit_Mode'
                isChecked={isMapEditMode}
                onChange={() => setIsMapEditMode((prev) => !prev)}
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
