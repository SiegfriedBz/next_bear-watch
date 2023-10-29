import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useAppContext } from '@/context/appContext'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../server/db/prismaClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import PageLayout from '@/components/layouts/PageLayout'
import MapView from '@/components/MapView'
import ButtonSwitch from '@/components/ButtonSwitch'

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
  const { setUser, setBearMarkers, handleToast } = useAppContext()
  const [friendWhatsappNumber, setFriendWhatsappNumber] = useState(null)
  const [bloodGroup, setBloodGroup] = useState(null)
  const [isUserBearMarkersOnly, setIsUserBearMarkersOnly] = useState(false)
  const [isMapEditMode, setIsMapEditMode] = useState(false)

  useEffect(() => {
    // set user & bearMarkers on appContext
    setUser(props?.user)
    setBearMarkers(props?.bearMarkers)

    // set local state
    setFriendWhatsappNumber(props?.user?.friendWhatsappNumber)
    setBloodGroup(props?.user?.bloodGroup)
  }, [props, setUser, setBearMarkers])

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name='description' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
      </Head>

      <PageLayout>
        <div className='layout-gradient my-4 flex flex-col space-y-4'>
          <h2 className='text-center text-3xl'>My Profile</h2>

          <Form
            friendWhatsappNumber={friendWhatsappNumber}
            setFriendWhatsappNumber={setFriendWhatsappNumber}
            bloodGroup={bloodGroup}
            setBloodGroup={setBloodGroup}
            setUser={setUser}
            handleToast={handleToast}
          />

          <div id='my-profile-map scroll-mt-24'>
            <MapFeatures
              isUserBearMarkersOnly={isUserBearMarkersOnly}
              setIsUserBearMarkersOnly={setIsUserBearMarkersOnly}
              isMapEditMode={isMapEditMode}
              setIsMapEditMode={setIsMapEditMode}
            />

            <MapView
              isUserBearMarkersOnly={isUserBearMarkersOnly}
              isMapEditMode={isMapEditMode}
            />
          </div>
        </div>
      </PageLayout>
    </>
  )
}

export default Profile

const Form = ({
  friendWhatsappNumber,
  setFriendWhatsappNumber,
  bloodGroup,
  setBloodGroup,
  setUser,
  handleToast,
}) => {
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
      handleToast({ type: 'primary', message: 'Profile saved successfully!' })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='border-cfg-black/10 dark:border-cfg-white/30 my-4 flex w-full flex-col items-center justify-center rounded-xl border-2 px-8 py-8 shadow-lg dark:border'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col items-center justify-center space-y-8 '>
          <div className='flex flex-col items-center justify-center'>
            <label
              htmlFor='friendWhatsappNumber'
              className='mb-2 flex items-center space-x-2'
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className='text-3xl text-primary dark:text-primary-light'
              />

              <h3 className='m-0'>My Friend&apos;s Whatsapp</h3>
            </label>
            <input
              type='text'
              id='friendWhatsappNumber'
              placeholder='intl format, no spaces'
              value={friendWhatsappNumber || ''}
              onChange={(e) => setFriendWhatsappNumber(e.target.value)}
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
              <h3 className='m-0'>My Blood Group</h3>
            </label>
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
          </div>
        </div>

        <button className='btn pt-8' type='submit'>
          Save
        </button>
      </form>

      <div id='user-data-info'>
        <p className='text-center'>
          The information will be used to{' '}
          <span className='text-color font-semibold italic'>quickly send </span>
          a{' '}
          <span className='font-semibold italic text-warning dark:text-warning-light'>
            Whatsapp SOS message
          </span>{' '}
          to your friend,{' '}
          <span className='text-color font-semibold italic'>complete</span> with{' '}
          <span className='text-color font-semibold italic'>
            your blood group
          </span>{' '}
          information and a{' '}
          <span className='text-color font-semibold italic'>link</span> to{' '}
          <span className='text-color font-semibold italic'>
            your coordinates
          </span>{' '}
          on
          <span className='text-color font-semibold italic'> Google Maps</span>.
        </p>
      </div>
    </div>
  )
}

const MapFeatures = ({
  isUserBearMarkersOnly,
  setIsUserBearMarkersOnly,
  isMapEditMode,
  setIsMapEditMode,
}) => {
  return (
    <div id='my-profile-map' className='scroll-mt-24'>
      <div className='px-2'>
        <h2 className='text-center font-bold'>Bear Sighting Map</h2>

        <p>Tap the switches to enable the map features.</p>
        <ul className='my-4 ms-4 list-disc space-y-2'>
          <li>
            <p>
              <span className='text-color font-semibold italic'>Filter </span>
              <span> to </span>
              <span className='text-color font-semibold italic'>
                show only your bear sights
              </span>
              .
            </p>
          </li>
          <li>
            <p>
              <span className='text-color font-semibold italic'>Switch</span> to{' '}
              <span className='text-color font-semibold italic'>
                edit mode,
              </span>
              <span> and </span>
            </p>
            <ul className='ms-4 list-disc'>
              <li>
                <p>
                  <span className='text-color font-semibold italic'>
                    click on the map
                  </span>{' '}
                  <span> to </span>
                  <span className='text-color font-semibold italic'>
                    add a new{' '}
                    <span className='whitespace-nowrap'>bear sight</span>
                  </span>
                  .
                </p>
              </li>
              <li>
                <p>
                  <span className='text-color font-semibold italic'>
                    click on a bear sight
                  </span>{' '}
                  <span> to </span>
                  <span className='text-color font-semibold italic'>
                    delete it
                  </span>
                  .
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className='mt-4 flex w-full items-center justify-start space-x-32'>
        <ButtonSwitch
          label='My_sights_only'
          isChecked={isUserBearMarkersOnly}
          onChange={() => setIsUserBearMarkersOnly((prev) => !prev)}
          className='my-2'
        />
        <ButtonSwitch
          label='Edit'
          isChecked={isMapEditMode}
          onChange={() => setIsMapEditMode((prev) => !prev)}
          className='my-2'
        />
      </div>
    </div>
  )
}

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
