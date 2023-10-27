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

export default function Home(props) {
  const { setUser } = useAppContext()
  const [bearMarkers, setBearMarkers] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    // set user on appContext
    setUser(props?.user)
    // set local state
    setBearMarkers(props.bearMarkers)
  }, [props, setUser])

  return (
    <HomePageLayout>
      <section id='hero'>
        <Hero />
      </section>

      <section id='sub-hero'>
        <section id='features' className='my-8 scroll-mt-24 px-4'>
          <Features />
        </section>

        <div id='map' className='scroll-mt-28 px-2'>
          <ButtonSwitch isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

          <MapView
            isEditMode={isEditMode}
            bearMarkers={bearMarkers}
            setBearMarkers={setBearMarkers}
          />
        </div>
      </section>
    </HomePageLayout>
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
