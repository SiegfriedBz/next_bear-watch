import { useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../server/db/prismaClient'

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
    <div>
      Profile
      <span className='inline-block'>{user.email}</span>
      <span className='inline-block'>{user.name}</span>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor='friendWhatsappNumber'>Friend Whatsapp</label>
        <input
          type='text'
          id='friendWhatsappNumber'
          value={friendWhatsappNumber || ''}
          onChange={(e) => setFriendWhatsappNumber(e.target.value)}
        />

        <label htmlFor='bloodGroup'>Blood Group</label>
        <select
          id='bloodGroup'
          value={bloodGroup || BLOOD_GROUPS[0]}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          {BLOOD_GROUPS.map((bloodGroup) => {
            return (
              <option key={bloodGroup} value={bloodGroup}>
                {bloodGroup}
              </option>
            )
          })}
        </select>
        <button type='submit'>Save</button>
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
