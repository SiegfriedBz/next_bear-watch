import { useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../server/db/prismaClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'

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
  const [user, setUser] = useState(props.user)
  const [friendWhatsappNumber, setFriendWhatsappNumber] = useState(
    user.friendWhatsappNumber
  )
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup)

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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-3xl'>My Profile</h2>

      <form
        onSubmit={handleSubmit}
        className='mt-8 flex flex-col items-center justify-center space-y-8'
      >
        <div className='flex flex-col items-center justify-center'>
          <label
            htmlFor='friendWhatsappNumber'
            className='mb-1 flex items-center space-x-1'
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className='text-2xl text-teal-700 dark:text-teal-500'
            />
            <span className='font-lightbold'>My Friend&apos;s Whatsapp</span>
          </label>
          <input
            type='text'
            id='friendWhatsappNumber'
            value={friendWhatsappNumber || ''}
            onChange={(e) => setFriendWhatsappNumber(e.target.value)}
            className='w-full rounded-md border-2 border-gray-300 px-2 py-2 text-center outline-none '
          />
        </div>

        <div className='flex w-full flex-col items-center justify-center'>
          <label
            htmlFor='bloodGroup'
            className='mb-1 flex items-center space-x-1'
          >
            <FontAwesomeIcon
              icon={faNotesMedical}
              className='text-primary dark:text-primary-light text-2xl'
            />
            <span className='font-lightbold'>My Blood Group</span>
          </label>
          <select
            id='bloodGroup'
            value={bloodGroup || BLOOD_GROUPS[0]}
            onChange={(e) => setBloodGroup(e.target.value)}
            className='w-full rounded-md border-2 border-gray-300 px-2 py-2 text-center outline-none '
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
          className='bg-primary w-1/2 rounded-md px-4 py-2 text-white'
          type='submit'
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default Profile

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
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
    },
  }
}
