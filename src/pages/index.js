import { useState } from 'react'
import MapView from '@/components/MapView'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../server/db/prismaClient'
import ButtonHelp from '@/components/ButtonHelp'

export default function Home(props) {
  const [user, setUser] = useState(props.user)
  const [bearMarkers, setBearMarkers] = useState(props.bearMarkers)

  return (
    <main>
      <ButtonHelp user={user} />

      <MapView bearMarkers={bearMarkers} setBearMarkers={setBearMarkers} />
    </main>
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
    include: {
      markers: true,
    },
  })

  return {
    props: {
      session,
      user: JSON.parse(JSON.stringify(user)),
      bearMarkers: JSON.parse(JSON.stringify(bearMarkers)),
    },
  }
}
