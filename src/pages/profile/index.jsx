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

const Profile = (props) => {
  const { setUser } = useAppContext()
  const [friendWhatsappNumber, setFriendWhatsappNumber] = useState(null)
  const [bloodGroup, setBloodGroup] = useState(null)
  const router = useRouter()
  const { handleToast } = useAppContext()

  useEffect(() => {
    // set user on appContext
    setUser(props.user)
    // set local state
    setFriendWhatsappNumber(props.user.friendWhatsappNumber)
    setBloodGroup(props.user.bloodGroup)
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
    <PageLayout>
      <div className='layout-gradient flex flex-col items-center justify-center pb-20'>
        <h2 className='text-3xl'>My Profile</h2>

        <form
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col items-center justify-center space-y-12'
        >
          <div className='flex flex-col items-center justify-center'>
            <label
              htmlFor='friendWhatsappNumber'
              className='mb-4 flex items-center space-x-2'
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className='text-2xl text-teal-700 dark:text-teal-500'
              />
              <h3 className='font-lightbold'>My Friend&apos;s Whatsapp</h3>
            </label>
            <input
              type='text'
              id='friendWhatsappNumber'
              value={friendWhatsappNumber || ''}
              onChange={(e) => setFriendWhatsappNumber(e.target.value)}
              className='w-full rounded-md border-2 border-gray-300 px-2 py-2 text-center outline-none dark:text-slate-900 '
            />
          </div>

          <div className='flex w-full flex-col items-center justify-center'>
            <label
              htmlFor='bloodGroup'
              className='mb-4 flex items-center space-x-2'
            >
              <FontAwesomeIcon
                icon={faNotesMedical}
                className='text-2xl text-primary dark:text-primary-light'
              />
              <h3 className='font-lightbold'>My Blood Group</h3>
            </label>
            <select
              id='bloodGroup'
              value={bloodGroup || BLOOD_GROUPS[0]}
              onChange={(e) => setBloodGroup(e.target.value)}
              className='w-full rounded-md border-2 border-gray-300 px-2 py-2 text-center outline-none dark:text-slate-900'
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

          <button
            className='w-full rounded-md bg-primary px-4 py-2 text-stone-100'
            type='submit'
          >
            Save
          </button>
        </form>
      </div>
    </PageLayout>
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

  // ...and pass it as props to the Profile page component, along with the session data to the SessionProvider
  return {
    props: {
      session,
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
