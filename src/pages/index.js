import MapView from '@/components/MapView'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default function Home() {
  return (
    <main className=''>
      <MapView />
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  return {
    props: {
      session,
    },
  }
}
