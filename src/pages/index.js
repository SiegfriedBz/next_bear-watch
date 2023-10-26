import { useState } from 'react'
import { useAppContext } from '@/context/appContext'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../server/db/prismaClient'
import HomePageLayout from '@/components/layouts/HomePageLayout'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import MapView from '@/components/MapView'

export default function Home(props) {
  const [bearMarkers, setBearMarkers] = useState(props.bearMarkers)
  const user = props?.user
  const { setUser } = useAppContext()
  const [isEditMode, setIsEditMode] = useState(false)

  if (user) {
    setUser(user)
  }

  return (
    <HomePageLayout>
      <section id='hero'>
        <Hero />
      </section>

      <section id='sub-hero'>
        <section id='features' className='my-8 scroll-mt-24 px-4'>
          <Features />
        </section>

        <div id='map' className='px-2'>
          <label
            htmlFor='edit-mode'
            className='my-2 flex items-center space-x-2'
          >
            <input
              id='edit-mode'
              value={isEditMode}
              onChange={() => setIsEditMode((prev) => !prev)}
              type='checkbox'
              className='me-2 h-6 w-6 accent-success'
            />
            Map Edit mode
          </label>
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

  if (!session) {
    return {
      props: {
        bearMarkers: JSON.parse(JSON.stringify(bearMarkers)),
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    // include: {
    //   markers: true,
    // },
  })

  return {
    props: {
      session,
      user,
      bearMarkers: JSON.parse(JSON.stringify(bearMarkers)),
    },
  }
}
