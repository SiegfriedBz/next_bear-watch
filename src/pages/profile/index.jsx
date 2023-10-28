import { useState, useEffect } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../server/db/prismaClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useAppContext } from '@/context/appContext'
import PageLayout from '@/components/layouts/PageLayout'
import Head from 'next/head'
import MapView from '@/components/MapView'

const BLOOD_GROUPS = [
  'O_POSITIVE',
  'O_NEGATIVE',
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE',
]

const meta = {
  title: 'Bear Watch | My Profile',
  description:
    'Fill in your details. Be ready to quickly send your current location to a trusted friend, complete with your blood group information and a link to your precise coordinates on Google Maps',
}

const Profile = (props) => {
  const router = useRouter()
  const { setUser, handleToast } = useAppContext()
  const [friendWhatsappNumber, setFriendWhatsappNumber] = useState(null)
  const [bloodGroup, setBloodGroup] = useState(null)
  const [bearMarkers, setBearMarkers] = useState(null)

  useEffect(() => {
    // set user on appContext
    setUser(props?.user)
    // set local state
    setFriendWhatsappNumber(props?.user?.friendWhatsappNumber)
    setBloodGroup(props?.user?.bloodGroup)
    setBearMarkers(props?.bearMarkers)
  }, [props, setUser])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          friendWhatsappNumber,
          bloodGroup,
        }),
      })

      const data = await response.json()

      setUser(data)
      handleToast({ type: 'success', message: 'Profile saved successfully!' })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name='description' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
      </Head>

      <PageLayout>
        <div className='layout-gradient flex flex-col items-center'>
          <h2 className='text-3xl'>My Profile</h2>

          <form
            onSubmit={handleSubmit}
            className='my-4 flex w-full flex-col items-center justify-center rounded-lg border-2 px-8 py-8 shadow-md dark:border'
          >
            <div className='flex flex-col items-center justify-center space-y-8'>
              <div className='flex flex-col items-center justify-center'>
                <label
                  htmlFor='friendWhatsappNumber'
                  className='mb-2 flex items-center space-x-2'
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className='text-3xl text-teal-700 dark:text-teal-500'
                  />

                  <h3 className='trac m-0 font-bold tracking-wide'>
                    My Friend&apos;s Whatsapp
                  </h3>
                </label>
                <input
                  type='text'
                  id='friendWhatsappNumber'
                  placeholder='intl format, no spaces'
                  value={friendWhatsappNumber || ''}
                  onChange={(e) => setFriendWhatsappNumber(e.target.value)}
                  className='w-full rounded-md border-2 border-gray-300 py-1 text-center outline-none dark:text-slate-900 '
                />
              </div>

              <div className='flex w-full flex-col items-center justify-center'>
                <label
                  htmlFor='bloodGroup'
                  className='mb-2 flex items-center space-x-2'
                >
                  <FontAwesomeIcon
                    icon={faNotesMedical}
                    className='text-3xl text-primary dark:text-primary-light'
                  />
                  <h3 className='m-0 font-bold tracking-wide'>
                    My Blood Group
                  </h3>
                </label>
                <select
                  id='bloodGroup'
                  value={bloodGroup || BLOOD_GROUPS[0]}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className='w-full rounded-md border-2 border-gray-300 py-1 text-center outline-none dark:text-slate-900'
                >
                  {BLOOD_GROUPS.map((bloodGroup) => {
                    return (
                      <option key={bloodGroup} value={bloodGroup}>
                        {bloodGroup}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            <button
              className='mb-4 mt-8 w-full rounded-md bg-primary px-4 py-2 font-semibold uppercase tracking-wide text-stone-100'
              type='submit'
            >
              Save
            </button>
          </form>
        </div>
        <MapView bearMarkers={bearMarkers} setBearMarkers={setBearMarkers} />
      </PageLayout>
    </>
  )
}

export default Profile

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // protected route
  // if no session, redirects to home page
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
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

  const bearMarkers = await prisma.marker.findMany()

  // ...and pass user full data + bearMarkers as props to the Profile page component, along with the session data to the SessionProvider
  return {
    props: {
      session,
      user: JSON.parse(JSON.stringify(user)),
      bearMarkers: JSON.parse(JSON.stringify(bearMarkers)),
    },
  }
}
