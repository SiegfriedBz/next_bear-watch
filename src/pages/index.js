import { useState } from 'react'
import MapView from '@/components/MapView'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../server/db/prismaClient'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home(props) {
  const [bearMarkers, setBearMarkers] = useState(props.bearMarkers)

  const handleToast = (message) => {
    toast.warn(message)
  }

  return (
    <main className=''>
      <ToastContainer />
      <MapView
        bearMarkers={bearMarkers}
        setBearMarkers={setBearMarkers}
        handleToast={handleToast}
      />
    </main>
  )
}

export async function getServerSideProps(context) {
  const bearMarkers = await prisma.marker.findMany()

  const session = await getServerSession(context.req, context.res, authOptions)

  return {
    props: {
      bearMarkers: JSON.parse(JSON.stringify(bearMarkers)),
      session,
    },
  }
}
